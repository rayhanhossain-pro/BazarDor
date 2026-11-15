import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ProfilePanel from "@/components/ProfilePanel";
import { auth } from "@/lib/auth";

export const metadata = { title: "আমার প্রোফাইল | বাজার দর" };
export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) redirect("/signin?next=/profile");
  return <main className="site-container py-12"><ProfilePanel/></main>;
}
