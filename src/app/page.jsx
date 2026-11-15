import HomeSections from "@/components/HomeSections";
import { getProducts } from "@/lib/api/products";

export const revalidate = 300;
export default async function HomePage() {
  let products = [], error = false;
  try { products = await getProducts(); } catch (e) { error = true; }
  return <>
    {error && <div className="site-container mt-5 alert alert-warning bangla"><span>সার্ভার থেকে পণ্যের তথ্য আনা যায়নি। কিছুক্ষণ পর আবার চেষ্টা করুন।</span></div>}
    <HomeSections products={products}/>
  </>;
}
