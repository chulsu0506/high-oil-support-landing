import { fuelFallback } from "../../data/portal.js";
import { env } from "cloudflare:workers";

export const prerender = false;

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=900, s-maxage=1800, stale-while-revalidate=86400",
    },
  });

export async function GET() {
  const certKey = env.OPINET_API_KEY || import.meta.env.OPINET_API_KEY;

  if (!certKey) {
    return json({
      live: false,
      source: "한국석유공사 오피넷",
      tradeDate: "20260909",
      updatedAt: "2026-09-09T09:00:00+09:00",
      fuels: fuelFallback,
    });
  }

  try {
    const endpoint = new URL("https://www.opinet.co.kr/api/avgAllPrice.do");
    endpoint.searchParams.set("out", "json");
    endpoint.searchParams.set("certkey", certKey);
    const response = await fetch(endpoint, {
      headers: { Accept: "application/json", "User-Agent": "OilGuide/1.0 (oilguide.infoarounds.com)" },
    });
    if (!response.ok) throw new Error(`Opinet responded with ${response.status}`);
    const payload = await response.json();
    const oils = payload?.RESULT?.OIL;
    if (!Array.isArray(oils) || oils.length === 0) throw new Error("No fuel prices returned");
    const allowedCodes = new Set(["B027", "D047", "K015"]);
    const fuels = oils
      .filter((item) => allowedCodes.has(item.PRODCD))
      .map((item) => ({
        code: item.PRODCD,
        name: item.PRODNM,
        shortName: item.PRODCD === "B027" ? "휘발유" : item.PRODCD === "D047" ? "경유" : "LPG",
        price: Number(item.PRICE),
        diff: Number(item.DIFF),
      }));
    if (fuels.length !== 3 || fuels.some((item) => !Number.isFinite(item.price))) {
      throw new Error("Incomplete fuel prices returned");
    }
    return json({
      live: true,
      source: "한국석유공사 오피넷",
      tradeDate: String(oils[0]?.TRADE_DT || ""),
      updatedAt: new Date().toISOString(),
      fuels,
    });
  } catch {
    return json({
      live: false,
      source: "한국석유공사 오피넷",
      tradeDate: "20260909",
      updatedAt: "2026-09-09T09:00:00+09:00",
      fuels: fuelFallback,
    });
  }
}
