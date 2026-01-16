import { FaMinus, FaPlus } from "react-icons/fa";

import type { PatchTimelineDay } from "@/types/patch-note.type";
import { formatTimeTH } from "@/utils/formatTimeTH";

type Props = {
  timeline: PatchTimelineDay[];
};

export function PatchNoteContent({ timeline }: Props) {
  return (
    <ol className="relative border-s border-white/10 ps-6">
      {timeline.map((day) => (
        <li key={day.dateKey} className="relative pb-10">
          <span className="absolute -start-[30px] top-1 h-3 w-3 rounded-full bg-sky-400" />
          <div className="mb-4 text-sm font-semibold text-sky-300">
            {day.dateLabel}
          </div>
          <div className="space-y-4">
            {day.items.map((i) => (
              <div
                key={`${i.type}-${i.itemCode}-${i.at}`}
                className="relative flex gap-3 ps-1"
              >
                <div
                  className={`mt-[2px] ${
                    i.type === "added" ? "text-emerald-400" : "text-rose-400"
                  }`}
                >
                  {i.type === "added" ? (
                    <FaPlus className="text-xs" />
                  ) : (
                    <FaMinus className="text-xs" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="mb-0.5 text-[11px] text-slate-500">
                    {formatTimeTH(i.at)}
                  </div>
                  <div
                    className={`text-sm font-medium ${
                      i.type === "expired" && "text-rose-300 line-through"
                    } ${i.type === "added" && "text-emerald-300"}`}
                  >
                    {i.itemCode}
                  </div>
                  <div className="text-xs text-slate-400">{i.reward}</div>
                </div>
              </div>
            ))}
          </div>
        </li>
      ))}
    </ol>
  );
}
