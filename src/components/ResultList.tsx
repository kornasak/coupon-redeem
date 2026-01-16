import { useRef } from "react";
import { AiOutlineClear } from "react-icons/ai";
import { TbSettings } from "react-icons/tb";
import { useDrag } from "@use-gesture/react";

import { ResultItem } from "@/components/ResultItem";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import type { CouponResult } from "@/types/coupon.type";

type Props = {
  results: CouponResult[];
  total: number;
  canClear: boolean;
  onClear: () => void;
  canOpenCouponManager: boolean;
  onOpenCouponManager: () => void;
  loadingCoupons: boolean;
};

export function ResultList({
  results,
  total,
  canClear,
  onClear,
  canOpenCouponManager,
  onOpenCouponManager,
  loadingCoupons,
}: Props) {
  const isMobile = useMediaQuery("(max-width: 767px)");

  const scrollRef = useRef<HTMLDivElement>(null);

  const momentumRef = useRef<number | null>(null);

  useDrag(
    ({
      down,
      movement: [, my],
      velocity: [, vy],
      direction: [, dy],
      last,
      memo = scrollRef.current?.scrollTop || 0,
    }) => {
      const el = scrollRef.current;
      if (!el) return memo;

      if (down) {
        if (momentumRef.current) {
          cancelAnimationFrame(momentumRef.current);
          momentumRef.current = null;
        }

        el.scrollTop = memo - my;
      }

      if (last) {
        let velocity = vy * dy * 40;
        const friction = 0.95;

        const step = () => {
          velocity *= friction;
          el.scrollTop -= velocity;

          if (Math.abs(velocity) > 0.5) {
            momentumRef.current = requestAnimationFrame(step);
          }
        };

        step();
      }

      return memo;
    },
    {
      target: scrollRef,
      axis: "y",
      pointer: { touch: true },
      eventOptions: { passive: false },
    }
  );

  const bind = useDrag(
    ({ delta: [, dy], event }) => {
      event.preventDefault();
      if (scrollRef.current) {
        scrollRef.current.scrollTop -= dy;
      }
    },
    {
      axis: "y",
      pointer: { touch: true },
    }
  );

  return (
    <div className="mt-10 flex min-h-0 w-full flex-1 flex-col">
      <div className="mb-3 flex items-center justify-between gap-2">
        {/* Left */}
        <div className="flex min-w-0 items-center gap-2">
          <h2 className="truncate text-base font-medium md:text-xl">
            ผลการแลกคูปอง
            <span className="ml-1 text-sm text-slate-400">
              ({results.length}/{total})
            </span>
          </h2>

          <button
            onClick={onOpenCouponManager}
            disabled={loadingCoupons || !canOpenCouponManager}
            className={`flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-xs font-medium transition ${
              !loadingCoupons && canOpenCouponManager
                ? "text-slate-300 hover:bg-white/10"
                : "cursor-not-allowed text-slate-500"
            } md:h-auto md:w-auto md:px-3 md:py-1.5`}
            title="จัดการคูปอง"
          >
            <TbSettings className="text-base" />{" "}
            {!isMobile && <span className="ml-1 text-xs">จัดการคูปอง</span>}
          </button>
        </div>

        {/* Right */}
        <button
          onClick={onClear}
          disabled={!canClear}
          className={`flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-xs font-medium transition ${
            canClear
              ? "text-rose-300 hover:bg-rose-500/25"
              : "cursor-not-allowed text-slate-500"
          } md:h-auto md:w-auto md:px-3 md:py-1.5`}
          title="ล้างผลลัพธ์"
        >
          <AiOutlineClear className="text-base font-bold" />
          {!isMobile && <span className="ml-1 text-xs">ล้างผลลัพธ์</span>}
        </button>
      </div>
      <div
        ref={scrollRef}
        {...bind()}
        className={`scrollbar-game min-h-0 w-full min-w-0 flex-1 ${results.length === 0 ? "cursor-auto" : "cursor-grab"} touch-none select-none overflow-y-auto pr-2 ${results.length === 0 ? "active:cursor-auto" : "active:cursor-grabbing"}`}
      >
        <div className="flex flex-col gap-3">
          {results.map((r) => (
            <ResultItem key={r.code} result={r} />
          ))}
        </div>
      </div>
    </div>
  );
}
