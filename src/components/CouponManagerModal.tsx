import { useRef } from "react";
import { FaTimes } from "react-icons/fa";
import { useDrag } from "@use-gesture/react";

import type { CouponItem } from "@/types/coupon.type";

type Props = {
  open: boolean;
  onClose: () => void;
  coupons: CouponItem[];
  excludedCodes: string[];
  onToggle: (code: string) => void;
  onReset: () => void;
  onSelectAll: () => void;
};

export function CouponManagerModal({
  open,
  onClose,
  coupons,
  excludedCodes,
  onToggle,
  onReset,
  onSelectAll,
}: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const momentumRef = useRef<number | null>(null);
  const isDraggingRef = useRef(false);

  useDrag(
    ({ down, movement: [, my], last }) => {
      if (down && Math.abs(my) > 5) {
        isDraggingRef.current = true;
      }

      if (last) {
        setTimeout(() => {
          isDraggingRef.current = false;
        }, 0);
      }
    },
    {
      target: scrollRef,
      axis: "y",
      pointer: { touch: true },
      eventOptions: { passive: false },
    }
  );

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

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      {/* modal */}
      <div className="relative z-10 flex max-h-[85vh] w-full max-w-xl flex-col rounded-2xl bg-slate-900 p-4 shadow-xl">
        {/* header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h2 className="text-base font-semibold">จัดการคูปองอัตโนมัติ</h2>
          <button
            onClick={onClose}
            className="rounded-md p-2 text-slate-400 hover:text-red-400"
          >
            <FaTimes />
          </button>
        </div>

        {/* description */}
        <div className="py-3 text-xs text-slate-400">
          เลือก coupon ที่ไม่ต้องการเติม
        </div>

        {/* scroll area (gesture target) */}
        <div
          ref={scrollRef}
          {...bind()}
          className="scrollbar-game flex-1 cursor-grab touch-none select-none overflow-y-auto pr-2 active:cursor-grabbing"
        >
          <div className="space-y-2">
            {coupons.map((c) => {
              const checked = excludedCodes.includes(c.itemCode);

              return (
                <label
                  key={c.itemCode}
                  onClick={(e) => {
                    if (
                      isDraggingRef.current &&
                      (e.target as HTMLElement).tagName !== "INPUT"
                    ) {
                      e.preventDefault();
                      return;
                    }
                    onToggle(c.itemCode);
                  }}
                  className={`relative flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
                    checked
                      ? "border-rose-400/40 bg-rose-500/10 opacity-80"
                      : "border-white/10 bg-white/5 hover:bg-white/10"
                  } `}
                >
                  {/* Checkbox */}
                  <div
                    className={`relative flex h-6 w-6 items-center justify-center rounded-lg border transition-all duration-150 ease-out ${
                      checked
                        ? "scale-105 border-rose-400 bg-rose-500/20"
                        : "border-white/20 bg-white/5 hover:bg-white/10"
                    } `}
                  >
                    {checked && (
                      <div className="animate-pop h-3 w-3 rounded-md bg-rose-400" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <div
                        className={`font-semibold tracking-wide ${
                          checked ? "text-rose-300 line-through" : "text-white"
                        }`}
                      >
                        {c.itemCode}
                      </div>

                      {checked && (
                        <span className="rounded-full bg-rose-500/20 px-2 py-0.5 text-[10px] font-semibold text-rose-300">
                          ข้าม
                        </span>
                      )}
                    </div>

                    <div className="mt-0.5 text-xs text-slate-400">
                      {c.reward}
                    </div>
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        {/* footer */}
        <div className="mt-3 flex items-center justify-end border-t border-white/10 pt-3">
          <div className="flex gap-2">
            <button
              onClick={onSelectAll}
              className="text-xs text-slate-400 hover:text-white"
            >
              เลือกทั้งหมด
            </button>
            <button
              onClick={onReset}
              className="text-xs text-slate-400 hover:text-white"
            >
              ล้างทั้งหมด
            </button>
          </div>

          {/* <button
            onClick={onClose}
            className="rounded-lg bg-sky-500 px-4 py-2 text-sm font-medium text-white hover:bg-sky-400"
          >
            บันทึก
          </button> */}
        </div>
      </div>
    </div>
  );
}
