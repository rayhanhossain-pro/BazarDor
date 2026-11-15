"use client";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
export default function ProfilePanel() {
  const { data: session, isPending } = authClient.useSession();
  if (isPending) return <div className="skeleton h-40 w-full"/>;
  if (!session?.user) return <div className="soft-card p-8 text-center bangla"><p>প্রোফাইল দেখতে সাইন ইন করুন।</p><Link className="btn btn-market mt-4" href="/signin">সাইন ইন</Link></div>;
  return <div className="soft-card p-7 bangla max-w-xl mx-auto">
    <div className="text-4xl mb-4">👤</div><h1 className="text-2xl font-black">আমার প্রোফাইল</h1>
    <div className="mt-6 space-y-3 text-sm"><p><span className="text-gray-500">নাম:</span> <b>{session.user.name}</b></p><p><span className="text-gray-500">ইমেইল:</span> <b>{session.user.email}</b></p></div>
    <Link href="/profile/update" className="btn btn-market mt-6">তথ্য আপডেট করুন</Link>
  </div>;
}
