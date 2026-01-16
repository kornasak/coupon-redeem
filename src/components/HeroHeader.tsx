import { FaExternalLinkAlt, FaRegNewspaper, FaTicketAlt } from "react-icons/fa";

type Props = {
  onOpenPatchNote: () => void;
  showPatchBadge: boolean;
};

export function HeroHeader({ onOpenPatchNote, showPatchBadge }: Props) {
  return (
    <div className="mb-12 grid grid-cols-12 gap-y-3">
      {/* 🔹 Hero text (col-12) */}
      <div className="col-span-12 text-center">
        <h1 className="text-3xl font-extrabold tracking-wide text-yellow-300 md:text-4xl">
          Seven Knights Re:Birth
        </h1>

        <p className="mt-1 flex items-center justify-center gap-2 text-sm text-sky-300 md:text-base">
          <FaTicketAlt className="text-base md:text-lg" />
          Coupon Redemption
        </p>
      </div>

      {/* 🔹 Patch Notes (col-12, secondary) */}
      <div className="col-span-12 flex justify-center gap-4">
        <button
          onClick={onOpenPatchNote}
          className="relative flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/20"
        >
          {showPatchBadge && (
            <span className="absolute right-1.5 top-1.5 flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-500/70" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-rose-500 ring-2 ring-slate-900" />
            </span>
          )}
          <FaRegNewspaper className="text-base" />
          Patch Notes
        </button>

        <a
          href="https://docs.google.com/spreadsheets/d/1UY8-efNGq8wydgL_0DuEwAGr8iZQaYCmyDYHP0XW3XY/edit?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/20"
        >
          <FaExternalLinkAlt className="text-base" />
          Item Code ที่มี
        </a>
      </div>
    </div>
  );
}
