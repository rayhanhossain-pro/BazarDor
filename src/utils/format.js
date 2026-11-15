import { digitsToEnglish, numberValue } from "@/lib/api/normalize-data";

export function formatBengaliNumber(value, options = {}) {
  const number = Number(value || 0);
  const formatted = new Intl.NumberFormat("en-US", { maximumFractionDigits: 2, ...options }).format(number);
  return formatted.replace(/\d/g, (digit) => "০১২৩৪৫৬৭৮৯"[Number(digit)]);
}
export function formatTaka(value) {
  return `${formatBengaliNumber(value)} টাকা`;
}
export function numericSort(products, direction) {
  const copy = [...products];
  if (direction === "asc") return copy.sort((a,b) => numberValue(a.price) - numberValue(b.price));
  if (direction === "desc") return copy.sort((a,b) => numberValue(b.price) - numberValue(a.price));
  return copy;
}
export function changeLabel(change) {
  const n = Number(change || 0);
  if (n > 0) return `▲ ${formatBengaliNumber(Math.abs(n))}%`;
  if (n < 0) return `▼ ${formatBengaliNumber(Math.abs(n))}%`;
  return "— ০.০%";
}
