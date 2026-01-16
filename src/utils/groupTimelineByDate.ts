import type { PatchTimelineItem } from "@/types/patch-note.type";
import { formatDateTH } from "@/utils/formatDateTH";

export function groupTimelineByDate(items: PatchTimelineItem[]) {
  const now = new Date();

  const dayMap = new Map<
    string,
    {
      dateKey: string;
      dateLabel: string;
      items: {
        itemCode: string;
        reward: string;
        type: "added" | "expired";
        at: string;
      }[];
    }
  >();

  for (const item of items) {
    for (const e of item.events) {
      const eventDate = new Date(e.at);
      if (eventDate > now) continue;
      const dateKey = e.at.split("T")[0];
      if (!dayMap.has(dateKey)) {
        dayMap.set(dateKey, {
          dateKey,
          dateLabel: formatDateTH(e.at),
          items: [],
        });
      }
      dayMap.get(dateKey)!.items.push({
        itemCode: item.itemCode,
        reward: item.reward,
        type: e.type,
        at: e.at,
      });
    }
  }

  return Array.from(dayMap.values())
    .map((d) => ({
      ...d,
      items: d.items.sort(
        (a, b) => new Date(b.at).getTime() - new Date(a.at).getTime()
      ),
    }))
    .sort(
      (a, b) => new Date(b.dateKey).getTime() - new Date(a.dateKey).getTime()
    );
}
