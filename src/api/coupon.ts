import type { CouponItem } from "@/types/coupon.type";

export async function validateCoupon(params: {
  couponCode: string;
  pid: string;
}) {
  const url = new URL("/api/netmarble/validate", window.location.origin);

  url.searchParams.set("couponCode", params.couponCode);
  url.searchParams.set("pid", params.pid);

  const res = await fetch(url.toString());
  return res.json();
}

export async function redeemCoupon(params: {
  couponCode: string;
  pid: string;
}) {
  const res = await fetch("/api/netmarble/redeem", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      gameCode: "tskgb",
      langCd: "TH_TH",
      couponCode: params.couponCode,
      pid: params.pid,
    }),
  });

  return res.json();
}

export async function fetchCoupons(): Promise<CouponItem[]> {
  const res = await fetch(import.meta.env.VITE_COUPON_SHEET_API);

  if (!res.ok) {
    throw new Error("Failed to fetch coupons");
  }

  return res.json();
}
