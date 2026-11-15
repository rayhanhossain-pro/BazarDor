"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function AuthForm({ mode }) {
  const isSignup = mode === "signup";
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    if (!form.email || !form.password || (isSignup && !form.name.trim())) return toast.error("সব তথ্য সঠিকভাবে পূরণ করুন");
    if (form.password.length < 8) return toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
    setLoading(true);
    const result = isSignup
      ? await authClient.signUp.email({ name: form.name.trim(), email: form.email, password: form.password })
      : await authClient.signIn.email({ email: form.email, password: form.password });
    setLoading(false);
    if (result.error) return toast.error(result.error.message || "অনুরোধটি সম্পন্ন হয়নি");
    toast.success(isSignup ? "রেজিস্ট্রেশন সফল! এখন সাইন ইন করুন।" : "সাইন ইন সফল হয়েছে");
    router.push(isSignup ? "/signin" : "/");
    router.refresh();
  }

  async function social(provider) {
    setLoading(true);
    const result = await authClient.signIn.social({ provider, callbackURL: "/" });
    if (result?.error) { setLoading(false); toast.error(result.error.message || "সোশ্যাল লগইন ব্যর্থ হয়েছে"); }
  }

  return <div className="soft-card p-6 sm:p-8 w-full max-w-md mx-auto bangla">
    <div className="text-center mb-6"><div className="text-4xl mb-2">🛒</div><h1 className="text-2xl font-black">{isSignup ? "নতুন অ্যাকাউন্ট তৈরি করুন" : "আপনার অ্যাকাউন্টে প্রবেশ করুন"}</h1><p className="text-sm text-gray-500 mt-2">{isSignup ? "বাজার দর-এ যোগ দিন" : "বাজার দর ব্যবহার করতে সাইন ইন করুন"}</p></div>
    <form onSubmit={submit} className="space-y-4">
      {isSignup && <label className="block text-sm font-bold">নাম<input name="name" value={form.name} onChange={update} className="form-input mt-2" placeholder="আপনার নাম" required/></label>}
      <label className="block text-sm font-bold">ইমেইল<input type="email" name="email" value={form.email} onChange={update} className="form-input mt-2" placeholder="name@example.com" required/></label>
      <label className="block text-sm font-bold">পাসওয়ার্ড<input type="password" name="password" value={form.password} onChange={update} className="form-input mt-2" placeholder="কমপক্ষে ৮ অক্ষর" minLength={8} required/></label>
      <button className="btn btn-market w-full" disabled={loading}>{loading ? "অপেক্ষা করুন..." : isSignup ? "সাইন আপ" : "সাইন ইন"}</button>
    </form>
    <div className="divider text-xs text-gray-400">অথবা</div>
    <div className="grid grid-cols-2 gap-3">
      <button className="btn btn-outline" disabled={loading} onClick={() => social("google")}>Google</button>
      <button className="btn btn-outline" disabled={loading} onClick={() => social("github")}>GitHub</button>
    </div>
    <p className="text-sm text-center mt-6">{isSignup ? "আগে থেকেই অ্যাকাউন্ট আছে?" : "নতুন ব্যবহারকারী?"} <Link className="text-green-700 font-bold" href={isSignup ? "/signin" : "/signup"}>{isSignup ? "সাইন ইন" : "সাইন আপ"}</Link></p>
  </div>;
}
