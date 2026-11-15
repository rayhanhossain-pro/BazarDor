export default function Loading() {
  return <main className="site-container py-10">
    <div className="skeleton h-52 w-full mb-10" />
    <div className="skeleton h-8 w-52 mb-5" />
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">{Array.from({ length: 8 }).map((_, i) => <div key={i} className="skeleton h-48" />)}</div>
  </main>;
}
