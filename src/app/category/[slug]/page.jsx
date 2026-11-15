import Link from "next/link";
import { notFound } from "next/navigation";
import SectionTitle from "@/components/SectionTitle";
import SortProducts from "@/components/SortProducts";
import { getCategory, getCategories } from "@/lib/api/categories";
import { getCategoryProducts } from "@/lib/api/products";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return { title: `${slug} | বাজার দর` };
}
export default async function CategoryPage({ params }) {
  const { slug } = await params;
  let category, products;
  try {
    [category, products] = await Promise.all([getCategory(slug), getCategoryProducts(slug)]);
  } catch { products = []; }
  if (!category && products.length === 0) notFound();
  return <main className="site-container py-10 bangla">
    <div className="flex items-center gap-3 mb-6"><span className="text-4xl">{category?.emoji || "🧺"}</span><div><h1 className="text-3xl font-black">{category?.name || slug}</h1><p className="text-sm text-gray-500">এই ক্যাটাগরির পণ্যের তালিকা</p></div></div>
    {products.length > 0
      ? <SortProducts products={products}/>
      : <div className="text-center py-10 soft-card mt-5"><p>এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।</p><Link href="/" className="btn btn-market mt-4">হোম পেজে ফিরে যান</Link></div>}
  </main>;
}
