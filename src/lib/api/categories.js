import { bazarFetch } from "./fetch-api";
import { normalizeCategory, toArray, unwrapPayload } from "./normalize-data";

export async function getCategories() {
  const data = await bazarFetch("/categories");
  return toArray(data).map(normalizeCategory);
}
export async function getCategory(slug) {
  try {
    const data = await bazarFetch(`/categories/${encodeURIComponent(slug)}`);
    const value = unwrapPayload(data);
    const item = Array.isArray(value) ? value[0] : value;
    if (item && typeof item === "object") return normalizeCategory(item);
  } catch {}
  const categories = await getCategories();
  return categories.find((category) => category.slug === slug) || null;
}
