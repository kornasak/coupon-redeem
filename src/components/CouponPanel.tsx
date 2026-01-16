/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRef } from "react";
import { FaPaste } from "react-icons/fa";
import { HiOutlineIdentification } from "react-icons/hi";
import { toast } from "react-toastify";

import { ActionButton } from "@/components/ActionButton";
import { ProgressBar } from "@/components/ProgressBar";

type Props = {
  pid: string;
  loading: boolean;
  paused: boolean;
  progress: number;
  onPidChange: (v: string) => void;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
};

export function CouponPanel({
  pid,
  loading,
  paused,
  progress,
  onPidChange,
  onStart,
  onPause,
  onResume,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handlePaste = async () => {
    try {
      if (!navigator.clipboard?.readText) {
        toast.error("Browser ไม่รองรับการ Paste", { autoClose: 2500 });
        return;
      }

      const text = await navigator.clipboard.readText();

      if (!text) {
        toast.info("Clipboard ว่างอยู่", { autoClose: 2500 });
        return;
      }

      onPidChange(text.trim());

      requestAnimationFrame(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      });

      toast.success("วาง UID จาก Clipboard แล้ว", { autoClose: 2500 });
    } catch (err) {
      toast.error("ไม่สามารถอ่าน Clipboard ได้", { autoClose: 2500 });
    }
  };

  return (
    <div className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur">
      <label className="mb-1 flex items-center gap-2 text-xs font-semibold text-slate-300 md:text-sm">
        <HiOutlineIdentification className="text-sm text-sky-400" />
        UID (PID)
      </label>

      <div className="relative">
        <input
          ref={inputRef}
          value={pid}
          onChange={(e) => onPidChange(e.target.value)}
          disabled={loading}
          className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-white focus:border-sky-400 focus:outline-none md:text-base"
        />
        <button
          type="button"
          onClick={handlePaste}
          disabled={loading}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-slate-400 hover:text-amber-400 disabled:cursor-not-allowed disabled:opacity-40"
          title="Paste from clipboard"
        >
          <FaPaste className="text-sm" />
        </button>
      </div>

      <div className="mt-4">
        <ActionButton
          loading={loading}
          paused={paused}
          disabled={!pid}
          onStart={onStart}
          onPause={onPause}
          onResume={onResume}
        />
      </div>

      {loading && <ProgressBar progress={progress} paused={paused} />}
    </div>
  );
}
