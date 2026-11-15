import ProductCard from "@/components/ProductCard";
export default function ProductGrid({ products }) {
  if (!products?.length) return <div className="soft-card p-10 text-center bangla"><div className="text-4xl mb-3">🧺</div><p className="font-bold">এই মুহূর্তে কোনো পণ্য পাওয়া যায়নি</p><p className="text-sm text-gray-500 mt-1">পরে আবার চেষ্টা করুন।</p></div>;
  return <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">{products.map((product) => <ProductCard key={product.id} product={product}/>)}</div>;
}
