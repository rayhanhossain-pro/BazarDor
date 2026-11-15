import "./globals.css";
import Providers from "@/components/Providers";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";

export const metadata = {
  title: "বাজার দর | BazarDor",
  description: "প্রয়োজনীয় পণ্যের দাম এক নজরে।"
};

export default function RootLayout({ children }) {
  return <html lang="bn"><body><Providers><SiteHeader/>{children}<Footer/></Providers></body></html>;
}
