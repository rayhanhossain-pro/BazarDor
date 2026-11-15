import { bazarFetch } from "./fetch-api";
import { normalizeProduct, toArray, unwrapPayload } from "./normalize-data";

export async function getProducts() {
  const data = await bazarFetch("/products");
  return toArray(data).map(normalizeProduct);
}
export async function getProduct(id) {
  const data = await bazarFetch(`/products/${encodeURIComponent(id)}`);
  const value = unwrapPayload(data);
  const item = Array.isArray(value) ? value[0] : value;
  if (!item || typeof item !== "object") return null;
  return normalizeProduct(item);
}
export async function getCategoryProducts(slug) {
  const data = await bazarFetch(`/products?category=${encodeURIComponent(slug)}`);
  return toArray(data).map(normalizeProduct);
}
