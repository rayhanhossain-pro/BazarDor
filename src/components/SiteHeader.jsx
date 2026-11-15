import Image from "next/image";
import Link from "next/link";
import { getCategories } from "@/lib/api/categories";
import { getProducts } from "@/lib/api/products";
import { formatBengaliNumber, formatTaka, changeLabel } from "@/utils/format";
import HeaderAuth from "@/components/HeaderAuth";

export default async function SiteHeader() {
  let categories = [], products = [];
  try { [categories, products] = await Promise.all([getCategories(), getProducts()]); } catch {}
  const tickerItems = products.slice(0, 16);
  const date = new Intl.DateTimeFormat("bn-BD", { dateStyle: "full", timeZone: "Asia/Dhaka" }).format(new Date());
  return <>
    <header className="topbar">
      <div className="site-container py-3 flex flex-wrap items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/images/logo-icon.png" alt="বাজার দর logo" width={44} height={44} className="brand-mark"/>
          <span><span className="brand-title bangla block">বাজার দর</span><span className="text-xs text-gray-500 bangla">{date}</span></span>
        </Link>
        <HeaderAuth />
      </div>
      <div className="site-container pb-3">
        <nav className="category-nav bangla" aria-label="পণ্যের ক্যাটাগরি">
          <Link href="/" className="category-link active">সব পণ্য</Link>
          {categories.map((category) => <Link key={category.slug} href={`/category/${encodeURIComponent(category.slug)}`} className="category-link">{category.emoji} {category.name}</Link>)}
        </nav>
      </div>
    </header>
    {tickerItems.length > 0 && <div className="ticker bangla" aria-label="দামের আপডেট">
      <div className="ticker-track">{[...tickerItems, ...tickerItems].map((p, i) => <span className="ticker-item" key={`${p.id}-${i}`}>{p.emoji} {p.name} · {formatTaka(p.price)} / {p.unit} · {changeLabel(p.change)}</span>)}</div>
    </div>}
  </>;
}
