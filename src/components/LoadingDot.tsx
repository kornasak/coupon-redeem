export function LoadingDot({ delay }: { delay: string }) {
  return (
    <span
      className="h-1.5 w-1.5 rounded-full bg-slate-300"
      style={{
        animation: "dot-bounce 1.2s infinite ease-in-out",
        animationDelay: delay,
      }}
    />
  );
}
