"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function HeaderAuth() {
  const { data: session, isPending } = authClient.useSession();
  const [busy, setBusy] = useState(false);
  async function logout() {
    setBusy(true);
    const result = await authClient.signOut();
    setBusy(false);
    if (result.error) toast.error(result.error.message || "সাইন আউট করা যায়নি");
    else { toast.success("সাইন আউট সফল হয়েছে"); window.location.href = "/"; }
  }
  if (isPending) return <div className="skeleton h-9 w-28"/>;
  if (session?.user) return <div className="flex items-center gap-2 bangla">
    <Link href="/profile" className="btn btn-sm btn-ghost">👤 {session.user.name || "প্রোফাইল"}</Link>
    <button className="btn btn-sm btn-outline" onClick={logout} disabled={busy}>{busy ? "..." : "সাইন আউট"}</button>
  </div>;
  return <div className="flex gap-2 bangla">
    <Link href="/signin" className="btn btn-sm btn-ghost">সাইন ইন</Link>
    <Link href="/signup" className="btn btn-sm btn-market">সাইন আপ</Link>
  </div>;
}
