import Link from "next/link";
import { formatTaka, changeLabel } from "@/utils/format";

export default function ProductCard({ product }) {
  const direction = product.change > 0 ? "price-up" : product.change < 0 ? "price-down" : "price-flat";
  return <Link href={`/product/${encodeURIComponent(product.id)}`} className="product-card block bangla">
    <div className="flex items-start justify-between gap-3">
      <div className="product-emoji">{product.emoji}</div>
      <span className={`price-badge ${direction}`}>{changeLabel(product.change)}</span>
    </div>
    <h3 className="font-extrabold text-base mt-4 text-[#24392c]">{product.name}</h3>
    <p className="text-xs text-gray-500 mt-1">{product.unit}</p>
    <div className="border-t border-dashed border-gray-200 mt-4 pt-3 flex justify-between items-end gap-2">
      <div><p className="text-[11px] text-gray-500">আজকের দাম</p><p className="text-lg font-black text-[#145b36]">{formatTaka(product.price)}</p></div>
      <span className="text-[11px] text-gray-400">বাজার দর ↗</span>
    </div>
  </Link>;
}
