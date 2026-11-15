import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { getProduct } from "@/lib/api/products";
import { formatTaka, formatBengaliNumber, changeLabel } from "@/utils/format";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return { title: `পণ্যের বিস্তারিত ${slug} | বাজার দর` };
}
export default async function ProductPage({ params }) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) redirect("/signin?next=/product");
  const { slug } = await params;
  let product;
  try { product = await getProduct(slug); } catch {}
  if (!product) notFound();

  const rawMarkets = Array.isArray(product.markets) ? product.markets : [];
  const marketRows = rawMarkets.map((m, i) => ({
    name: m.market || m.bazar || m.name || m.location || `বাজার ${i + 1}`,
    price: Number(m.price ?? m.currentPrice ?? m.current_price ?? m.average ?? 0),
    unit: m.unit || product.unit
  }));
  const prices = marketRows.map(m => m.price).filter(n => n > 0);
  const min = prices.length ? Math.min(...prices) : Number(product.minPrice ?? product.price);
  const max = prices.length ? Math.max(...prices) : Number(product.maxPrice ?? product.price);
  const avg = prices.length ? prices.reduce((a,b)=>a+b,0)/prices.length : Number(product.averagePrice ?? product.price);
  return <main className="site-container py-10 bangla">
    <Link href="/" className="text-sm text-green-700 font-bold">← হোম পেজ</Link>
    <section className="soft-card p-6 sm:p-8 mt-5">
      <div className="flex flex-wrap items-center gap-4"><div className="product-emoji text-4xl">{product.emoji}</div><div><h1 className="text-3xl font-black">{product.name}</h1><p className="text-gray-500 mt-1">{product.description || "বাজারের সর্বশেষ মূল্যতথ্য"}</p><div className="flex gap-2 mt-3"><span className="badge badge-success">{product.category || "পণ্য"}</span><span className="badge">{product.unit}</span></div></div></div>
    </section>
    <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
      {[["সর্বনিম্ন দাম",min],["সর্বোচ্চ দাম",max],["গড় দাম",avg]].map(([label,value])=><div key={label} className="soft-card p-5"><p className="text-sm text-gray-500">{label}</p><p className="text-2xl font-black text-green-800 mt-2">{formatTaka(value)}</p></div>)}
    </section>
    <section className="mt-9"><h2 className="section-title mb-4">বাজারভিত্তিক আজকের দাম</h2>
      {marketRows.length ? <div className="soft-card overflow-x-auto"><table className="table"><thead><tr><th>বাজার</th><th>আজকের দাম</th><th>একক</th></tr></thead><tbody>{marketRows.map((m,i)=><tr key={i}><td>{m.name}</td><td className="font-bold">{formatTaka(m.price)}</td><td>{m.unit}</td></tr>)}</tbody></table></div> : <div className="soft-card p-6 text-gray-500">এই পণ্যের জন্য আলাদা বাজারভিত্তিক তথ্য API-তে পাওয়া যায়নি। বর্তমান গড় মূল্য: {formatTaka(product.price)}।</div>}
    </section>
  </main>;
}
