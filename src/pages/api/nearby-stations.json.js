export const prerender = false;

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
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
  const value =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(value), Math.sqrt(1 - value));
};

export async function GET({ url }) {
  const lat = Number(url.searchParams.get("lat"));
  const lon = Number(url.searchParams.get("lon"));
  if (!Number.isFinite(lat) || !Number.isFinite(lon) || lat < 32 || lat > 39.8 || lon < 124 || lon > 132) {
    return json({ message: "대한민국 내의 올바른 위치가 필요합니다." }, 400);
  }

  const query = `[out:json][timeout:18];(node["amenity"="fuel"](around:5000,${lat},${lon});way["amenity"="fuel"](around:5000,${lat},${lon});relation["amenity"="fuel"](around:5000,${lat},${lon}););out center tags;`;
  try {
    const response = await fetch("https://overpass-api.de/api/interpreter", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        "User-Agent": "OilGuide/1.0 (oilguide.infoarounds.com; ttugttagi01@gmail.com)",
      },
      body: new URLSearchParams({ data: query }),
    });
    if (!response.ok) throw new Error("Map data unavailable");
    const payload = await response.json();
    const stations = (payload.elements || [])
      .map((item) => {
        const stationLat = Number(item.lat ?? item.center?.lat);
        const stationLon = Number(item.lon ?? item.center?.lon);
        if (!Number.isFinite(stationLat) || !Number.isFinite(stationLon)) return null;
        return {
          id: `${item.type}-${item.id}`,
          name: item.tags?.name || item.tags?.brand || "이름 미등록 주유소",
          brand: item.tags?.brand || item.tags?.operator || "",
          lat: stationLat,
          lon: stationLon,
          distanceKm: distanceKm(lat, lon, stationLat, stationLon),
        };
      })
      .filter(Boolean)
      .sort((a, b) => a.distanceKm - b.distanceKm);
    return json({ source: "OpenStreetMap contributors", radiusKm: 5, stations });
  } catch {
    return json({ message: "주변 주유소 데이터를 불러오지 못했습니다." }, 503);
  }
}
