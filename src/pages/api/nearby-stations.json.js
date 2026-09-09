import { env } from "cloudflare:workers";
import proj4 from "proj4";

export const prerender = false;

const WGS84 = "+proj=longlat +datum=WGS84 +no_defs";
const KATEC = "+proj=tmerc +lat_0=38 +lon_0=128 +k=0.9999 +x_0=400000 +y_0=600000 +ellps=bessel +towgs84=-146.43,507.89,681.46,0,0,0,0 +units=m +no_defs";
const PRODUCTS = new Set(["B027", "D047", "K015"]);
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
      distanceKm: Number(item.DISTANCE) / 1000 || distanceKm(lat, lon, stationLat, stationLon),
    };
  }).filter((item) => Number.isFinite(item.lat) && Number.isFinite(item.lon));
};

const fetchOpenMapStations = async (lat, lon) => {
  const query = `[out:json][timeout:18];(node["amenity"="fuel"](around:5000,${lat},${lon});way["amenity"="fuel"](around:5000,${lat},${lon});relation["amenity"="fuel"](around:5000,${lat},${lon}););out center tags;`;
  const mirrors = ["https://overpass.kumi.systems/api/interpreter", "https://overpass-api.de/api/interpreter"];
  for (const endpoint of mirrors) {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
        body: new URLSearchParams({ data: query }),
        signal: AbortSignal.timeout(12000),
      });
      if (!response.ok) continue;
      const payload = await response.json();
      return (payload.elements || []).map((item) => {
        const stationLat = Number(item.lat ?? item.center?.lat);
        const stationLon = Number(item.lon ?? item.center?.lon);
        if (!Number.isFinite(stationLat) || !Number.isFinite(stationLon)) return null;
        return {
          id: `${item.type}-${item.id}`,
          name: item.tags?.name || item.tags?.brand || "이름 미등록 주유소",
          brand: item.tags?.brand || item.tags?.operator || "",
          lat: stationLat,
          lon: stationLon,
          price: null,
          distanceKm: distanceKm(lat, lon, stationLat, stationLon),
        };
      }).filter(Boolean).sort((a, b) => a.distanceKm - b.distanceKm);
    } catch {
      // Continue to the next public mirror.
    }
  }
  throw new Error("Map data unavailable");
};

export async function GET({ url }) {
  const lat = Number(url.searchParams.get("lat"));
  const lon = Number(url.searchParams.get("lon"));
  const requestedProduct = url.searchParams.get("product");
  const product = PRODUCTS.has(requestedProduct) ? requestedProduct : "B027";
  if (!Number.isFinite(lat) || !Number.isFinite(lon) || lat < 32 || lat > 39.8 || lon < 124 || lon > 132) {
    return json({ message: "대한민국 내의 올바른 위치가 필요합니다." }, 400);
  }

  try {
    const stations = await fetchOpinetStations(lat, lon, product);
    return json({ source: "한국석유공사 오피넷", livePrices: true, product, radiusKm: 5, stations });
  } catch {
    try {
      const stations = await fetchOpenMapStations(lat, lon);
      return json({ source: "OpenStreetMap contributors", livePrices: false, product, radiusKm: 5, stations });
    } catch {
      return json({ message: "주변 주유소 데이터를 불러오지 못했습니다." }, 503);
    }
  }
}
