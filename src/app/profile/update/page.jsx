import { headers } from "next/headers";
import { redirect } from "next/navigation";
import UpdateProfileForm from "@/components/UpdateProfileForm";
import { auth } from "@/lib/auth";

export const metadata = { title: "প্রোফাইল আপডেট | বাজার দর" };
export default async function UpdateProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) redirect("/signin?next=/profile/update");
  return <main className="site-container py-12"><UpdateProfileForm/></main>;
}
