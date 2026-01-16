import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { couponCode, pid, langCd = "TH_TH" } = req.query;

  const url = new URL("https://coupon.netmarble.com/api/coupon/reward");
  url.searchParams.set("gameCode", "tskgb");
  url.searchParams.set("couponCode", String(couponCode));
  url.searchParams.set("langCd", String(langCd));
  url.searchParams.set("pid", String(pid));

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "User-Agent": "Mozilla/5.0",
    },
  });

  const data = await response.json();
  res.status(200).json(data);
}
