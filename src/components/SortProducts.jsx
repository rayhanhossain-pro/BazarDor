"use client";
import { useMemo, useState } from "react";
import ProductGrid from "@/components/ProductGrid";
import { numericSort } from "@/utils/format";

export default function SortProducts({ products }) {
  const [sort, setSort] = useState("default");
  const sorted = useMemo(() => numericSort(products, sort === "asc" ? "asc" : sort === "desc" ? "desc" : "default"), [products, sort]);
  return <div className="bangla">
    <div className="flex justify-end mb-5 items-center gap-2 text-sm">
      <label htmlFor="sort-products" className="font-bold">সাজান:</label>
      <select id="sort-products" className="select select-bordered select-sm rounded-full bg-white" value={sort} onChange={e => setSort(e.target.value)}>
        <option value="default">ডিফল্ট</option>
        <option value="asc">দাম: কম থেকে বেশি</option>
        <option value="desc">দাম: বেশি থেকে কম</option>
      </select>
    </div>
    <ProductGrid products={sorted}/>
  </div>;
}
