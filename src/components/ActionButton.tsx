import { FaPause, FaPlay } from "react-icons/fa";

type Props = {
  loading: boolean;
  paused: boolean;
  disabled?: boolean;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
};

export function ActionButton({
  loading,
  paused,
  disabled,
  onStart,
  onPause,
  onResume,
}: Props) {
  if (!loading) {
    return (
      <button
        onClick={onStart}
        disabled={disabled}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-400 py-3 text-base font-semibold text-slate-900 hover:bg-amber-300 md:text-lg"
      >
        <FaPlay className="text-lg md:text-xl" />
        เริ่มแลกคูปองทั้งหมด
      </button>
    );
  }

  if (!paused) {
    return (
      <button
        onClick={onPause}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-500/90 py-3 text-base font-semibold text-white transition hover:bg-slate-400 md:text-lg"
      >
        <FaPause className="text-lg md:text-xl" />
        Pause
      </button>
    );
  }

  return (
    <button
      onClick={onResume}
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-400 py-3 text-base font-semibold text-slate-900 transition hover:bg-amber-300 md:text-lg"
    >
      <FaPlay className="text-lg md:text-xl" />
      Resume
    </button>
  );
}
