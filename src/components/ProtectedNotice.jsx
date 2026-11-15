"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
export default function ProtectedNotice() {
  const router = useRouter();
  useEffect(() => { toast.error("এই পেজটি দেখতে আগে সাইন ইন করুন"); router.replace("/signin"); }, [router]);
  return <div className="site-container py-20 text-center bangla">সাইন ইন পেজে নেওয়া হচ্ছে...</div>;
}
