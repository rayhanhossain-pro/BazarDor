import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import SectionTitle from "@/components/SectionTitle";

export default function HomeSections({ products }) {
  const risers = [...products].filter(p => p.change > 0).sort((a,b) => b.change-a.change).slice(0,6);
  const fallers = [...products].filter(p => p.change < 0).sort((a,b) => a.change-b.change).slice(0,6);
  return <>
    <Hero/>
    <main className="site-container py-10 space-y-12">
      <section><SectionTitle title="আজ দাম বেড়েছে ▲" subtitle="যেসব পণ্যের দাম আজ বেড়েছে"/><ProductGrid products={risers}/></section>
      <section><SectionTitle title="আজ দাম কমেছে ▼" subtitle="যেসব পণ্যের দাম আজ কমেছে"/><ProductGrid products={fallers}/></section>
      <section id="সব-পণ্য" className="scroll-mt-6"><SectionTitle title="সব পণ্য" subtitle="নিত্যপ্রয়োজনীয় পণ্যের সর্বশেষ তালিকা"/><ProductGrid products={products}/></section>
    </main>
  </>;
}
