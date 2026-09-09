import { env } from "cloudflare:workers";
import proj4 from "proj4";

export const prerender = false;

const WGS84 = "+proj=longlat +datum=WGS84 +no_defs";
const KATEC = "+proj=tmerc +lat_0=38 +lon_0=128 +k=0.9999 +x_0=400000 +y_0=600000 +ellps=bessel +towgs84=-146.43,507.89,681.46,0,0,0,0 +units=m +no_defs";
const PRODUCTS = new Set(["B027", "D047", "K015"]);
const AREA_CODES = new Set(["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17"]);
const BRAND_NAMES = {
  SKE: "SK에너지", GSC: "GS칼텍스", HDO: "HD현대오일뱅크", SOL: "S-OIL",
  RTE: "알뜰주유소", RTX: "고속도로알뜰", NHO: "농협알뜰", ETC: "자가상표",
  E1G: "E1", SKG: "SK가스",
};

const json = (body, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "public, max-age=300, s-maxage=900",
  },
});

const distanceKm = (lat1, lon1, lat2, lon2) => {
  const toRad = (degrees) => degrees * Math.PI / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const value = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(value), Math.sqrt(1 - value));
};

const fetchOpinetStations = async (lat, lon, product) => {
  if (!env.OPINET_API_KEY) throw new Error("Missing Opinet key");
  const [x, y] = proj4(WGS84, KATEC, [lon, lat]);
  const endpoint = new URL("https://www.opinet.co.kr/api/aroundAll.do");
  endpoint.search = new URLSearchParams({
    out: "json", x: x.toFixed(4), y: y.toFixed(4), radius: "5000",
    sort: "1", prodcd: product, certkey: env.OPINET_API_KEY,
  }).toString();

  const response = await fetch(endpoint, { signal: AbortSignal.timeout(12000) });
  if (!response.ok) throw new Error("Opinet unavailable");
  const payload = await response.json();
  const rows = payload?.RESULT?.OIL;
  if (!Array.isArray(rows)) throw new Error("Unexpected Opinet response");

  return rows.map((item) => {
    const [stationLon, stationLat] = proj4(KATEC, WGS84, [Number(item.GIS_X_COOR), Number(item.GIS_Y_COOR)]);
    return {
      id: item.UNI_ID,
      name: item.OS_NM || "이름 미등록 주유소",
      brand: BRAND_NAMES[item.POLL_DIV_CD] || item.POLL_DIV_CD || "",
      lat: stationLat,
      lon: stationLon,
      price: Number(item.PRICE) || null,
      address: item.NEW_ADR || item.VAN_ADR || "",
      distanceKm: Number(item.DISTANCE) / 1000 || distanceKm(lat, lon, stationLat, stationLon),
    };
  }).filter((item) => Number.isFinite(item.lat) && Number.isFinite(item.lon));
};

const fetchRegionalStations = async (lat, lon, product, area) => {
  if (!env.OPINET_API_KEY) throw new Error("Missing Opinet key");
  const productCodes = product === "K015" ? ["K105", "K015"] : [product];
  let rows = [];

  for (const productCode of productCodes) {
    const endpoint = new URL("https://www.opinet.co.kr/api/lowTop10.do");
    endpoint.search = new URLSearchParams({
      out: "json",
      prodcd: productCode,
      area,
      cnt: "20",
      certkey: env.OPINET_API_KEY,
    }).toString();

    const response = await fetch(endpoint, { signal: AbortSignal.timeout(12000) });
    if (!response.ok) continue;
    const payload = await response.json();
    if (Array.isArray(payload?.RESULT?.OIL) && payload.RESULT.OIL.length) {
      rows = payload.RESULT.OIL;
      break;
    }
  }

  return rows.map((item) => {
    const [stationLon, stationLat] = proj4(KATEC, WGS84, [Number(item.GIS_X_COOR), Number(item.GIS_Y_COOR)]);
    const brandCode = item.POLL_DIV_CD || item.POLL_DIV_CO;
    return {
      id: item.UNI_ID,
      name: item.OS_NM || "이름 미등록 주유소",
      brand: BRAND_NAMES[brandCode] || brandCode || "",
      lat: stationLat,
      lon: stationLon,
      price: Number(item.PRICE) || null,
      address: item.NEW_ADR || item.VAN_ADR || "",
      distanceKm: distanceKm(lat, lon, stationLat, stationLon),
    };
  }).filter((item) => Number.isFinite(item.lat) && Number.isFinite(item.lon))
    .sort((a, b) => a.distanceKm - b.distanceKm);
};

export async function GET({ url }) {
  const lat = Number(url.searchParams.get("lat"));
  const lon = Number(url.searchParams.get("lon"));
  const requestedProduct = url.searchParams.get("product");
  const product = PRODUCTS.has(requestedProduct) ? requestedProduct : "B027";
  const requestedArea = url.searchParams.get("area");
  const area = AREA_CODES.has(requestedArea) ? requestedArea : "";
  if (!Number.isFinite(lat) || !Number.isFinite(lon) || lat < 32 || lat > 39.8 || lon < 124 || lon > 132) {
    return json({ message: "대한민국 내의 올바른 위치가 필요합니다." }, 400);
  }

  try {
    let stations = await fetchOpinetStations(lat, lon, product);
    let scope = "nearby";
    if (!stations.length && area) {
      stations = await fetchRegionalStations(lat, lon, product, area);
      scope = "region";
    }
    return json({ source: "한국석유공사 오피넷", livePrices: true, product, radiusKm: scope === "nearby" ? 5 : null, scope, stations });
  } catch {
    return json({ message: "주변 주유소 데이터를 불러오지 못했습니다." }, 503);
  }
}
