import { FaGift } from "react-icons/fa";

import { StatusBadge } from "@/components/StatusBadge";
import type { CouponResult } from "@/types/coupon.type";

export function ResultItem({ result }: { result: CouponResult }) {
  return (
    <div className="w-full min-w-0 rounded-xl border border-white/10 bg-slate-900/60 p-4">
      <div className="flex items-start justify-between">
        <div className="text-sm font-semibold tracking-wide md:text-base">
          {result.code}
        </div>

        <StatusBadge success={result.success} errorCode={result.errorCode} />
      </div>
      {result.reward && (
        <div className="mt-2 flex items-center gap-2 text-xs text-emerald-300">
          <FaGift className="shrink-0 text-sm" />
          <span className="truncate">{result.reward}</span>
        </div>
      )}

      <div className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-400 md:text-sm">
        {result.message}
      </div>
    </div>
  );
}
