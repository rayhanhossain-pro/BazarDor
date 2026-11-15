"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
export default function UpdateProfileForm() {
  const { data: session, isPending } = authClient.useSession();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  if (isPending) return <div className="skeleton h-40 w-full"/>;
  if (!session?.user) return <div className="text-center bangla py-16">সাইন ইন করুন।</div>;
  async function submit(e) {
    e.preventDefault();
    if (!name.trim()) return toast.error("নাম লিখুন");
    setLoading(true);
    const result = await authClient.updateUser({ name: name.trim() });
    setLoading(false);
    if (result.error) return toast.error(result.error.message || "তথ্য আপডেট হয়নি");
    toast.success("প্রোফাইল আপডেট হয়েছে");
    router.push("/profile");
    router.refresh();
  }
  return <form onSubmit={submit} className="soft-card max-w-xl mx-auto p-7 bangla">
    <h1 className="text-2xl font-black mb-5">তথ্য আপডেট করুন</h1>
    <label className="block font-bold text-sm">নাম<input className="form-input mt-2" value={name} onChange={e => setName(e.target.value)} placeholder={session.user.name || "আপনার নাম"}/></label>
    <button className="btn btn-market mt-5" disabled={loading}>{loading ? "আপডেট হচ্ছে..." : "Update Information"}</button>
  </form>;
}
