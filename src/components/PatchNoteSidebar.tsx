import { useMemo } from "react";
import { FaNewspaper, FaTimes } from "react-icons/fa";

import { PatchNoteContent } from "@/components/PatchNoteContent";
import type { CouponItem } from "@/types/coupon.type";
import { buildCouponTimeline } from "@/utils/buildCouponTimeline";
import { groupTimelineByDate } from "@/utils/groupTimelineByDate";

type Props = {
  open: boolean;
  onClose: () => void;
  coupons: CouponItem[];
};

export function PatchNoteSidebar({ open, onClose, coupons }: Props) {
  const timelineItems = useMemo(() => buildCouponTimeline(coupons), [coupons]);
  const timeline = useMemo(
    () => groupTimelineByDate(timelineItems),
    [timelineItems]
  );

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-100 ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
      />
      <aside
        className={`fixed left-0 top-0 z-50 h-full w-[360px] max-w-[90vw] transform-gpu border-r border-white/10 bg-slate-900/95 shadow-2xl transition-transform duration-200 ease-out will-change-transform ${open ? "translate-x-0" : "-translate-x-full"} md:left-auto md:right-0 md:border-l md:border-r-0 ${open ? "md:translate-x-0" : "md:translate-x-full"}`}
      >
        <div className="flex h-14 items-center justify-between border-b border-white/10 px-4">
          <h2 className="flex items-center gap-2 text-base font-semibold text-white">
            <FaNewspaper className="text-base" />
            Patch Notes
          </h2>
          <button
            onClick={onClose}
            className="rounded-md p-2 text-slate-400 hover:text-red-500"
          >
            <FaTimes />
          </button>
        </div>
        <div className="scrollbar-game h-[calc(100%-3.5rem)] overflow-y-auto px-4 py-4 text-sm text-slate-300">
          <PatchNoteContent timeline={timeline} />
        </div>
      </aside>
    </>
  );
}
