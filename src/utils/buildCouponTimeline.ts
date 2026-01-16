import type { CouponItem } from "@/types/coupon.type";
import type { PatchTimelineItem } from "@/types/patch-note.type";

export function buildCouponTimeline(
  coupons: CouponItem[]
): PatchTimelineItem[] {
  const map = new Map<string, PatchTimelineItem>();
  for (const c of coupons) {
    if (!map.has(c.itemCode)) {
      map.set(c.itemCode, {
        itemCode: c.itemCode,
        reward: c.reward,
        initAt: c.initAt,
        expiredAt: c.expiredAt ?? "",
        events: [],
      });
    }
    const item = map.get(c.itemCode)!;
    if (c.initAt) {
      item.events.push({ type: "added", at: c.initAt });
    }
    if (c.expiredAt) {
      item.events.push({ type: "expired", at: c.expiredAt });
    }
  }
  for (const item of map.values()) {
    item.events.sort(
      (a, b) => new Date(a.at).getTime() - new Date(b.at).getTime()
    );
  }
  return Array.from(map.values());
}
