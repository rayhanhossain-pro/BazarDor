"use client";
export default function Error({ reset }) {
  return <main className="site-container py-24 text-center bangla"><h1 className="text-2xl font-black">কিছু একটা সমস্যা হয়েছে</h1><p className="text-gray-500 mt-2">আবার চেষ্টা করুন।</p><button onClick={() => reset()} className="btn btn-market mt-5">আবার চেষ্টা করুন</button></main>;
}
