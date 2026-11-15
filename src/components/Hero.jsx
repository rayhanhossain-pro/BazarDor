import Image from "next/image";
export default function Hero() {
  return <section className="hero-shell site-container mt-7 sm:mt-10 px-6 py-8 sm:px-12 sm:py-10 flex flex-col md:flex-row items-center justify-between gap-6">
    <div className="max-w-xl bangla">
      <span className="inline-flex bg-white text-green-800 rounded-full px-4 py-2 text-xs font-bold mb-4">🌿 প্রতিদিনের বাজারের নির্ভরযোগ্য সঙ্গী</span>
      <h1 className="hero-title">প্রয়োজনীয় পণ্যের দাম<br/><span className="text-[#e18b16]">এক নজরে।</span></h1>
      <p className="text-gray-600 mt-4 max-w-lg leading-8">চাল, ডাল, মাছ, মাংস, সবজি ও নিত্যপ্রয়োজনীয় পণ্যের বাজারদর জানুন সহজেই।</p>
      <a href="#সব-পণ্য" className="btn btn-market mt-6 px-7">সব পণ্য দেখুন ↓</a>
    </div>
    <Image src="/images/bazar-hero.png" alt="বাজারের পণ্যের ঝুড়ি" width={315} height={263} priority className="hero-art"/>
  </section>;
}
