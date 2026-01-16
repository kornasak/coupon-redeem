import { HiOutlineClock } from "react-icons/hi";

import { LoadingDot } from "@/components/LoadingDot";

type Props = {
  progress: number;
  paused: boolean;
};

export function ProgressBar({ progress, paused }: Props) {
  return (
    <div className="mt-4">
      <div className="mb-1 flex justify-between">
        <span className="flex items-center gap-2 text-xs font-medium text-slate-300 md:text-sm">
          {paused ? (
            <>
              <HiOutlineClock className="text-base text-amber-400" />
              หยุดชั่วคราว
            </>
          ) : (
            <>
              กำลังแลกคูปอง
              <span className="flex items-center gap-1 leading-none">
                <LoadingDot delay="0s" />
                <LoadingDot delay="0.15s" />
                <LoadingDot delay="0.3s" />
              </span>
            </>
          )}
        </span>
        <span className="text-xs font-medium text-slate-300 md:text-sm">
          {progress}%
        </span>
      </div>

      <div className="relative h-2 w-full overflow-hidden rounded-full bg-white/20">
        <div
          className="relative h-full rounded-full bg-sky-400 transition-all duration-500"
          style={{ width: `${progress}%` }}
        >
          <div className="animate-progress-shine absolute inset-y-0 left-0 w-1/3 bg-white/40 blur-sm" />
        </div>
      </div>
    </div>
  );
}
