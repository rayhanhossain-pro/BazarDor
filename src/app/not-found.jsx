import Link from "next/link";
export default function NotFound() {
  return <main className="site-container py-24 text-center bangla"><div className="text-6xl">🧺</div><h1 className="text-3xl font-black mt-4">পেজটি খুঁজে পাওয়া যায়নি</h1><p className="text-gray-500 mt-2">আপনার খোঁজা পেজটি হয়তো সরানো হয়েছে।</p><Link href="/" className="btn btn-market mt-6">হোম পেজে ফিরে যান</Link></main>;
}
