export function formatTimeTH(dateISO: string) {
  const d = new Date(dateISO);

  return d.toLocaleTimeString("th-TH", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
