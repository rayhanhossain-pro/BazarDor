import { API_BASES } from "./config";

const REQUEST_TIMEOUT = 9000;

export async function bazarFetch(path, options = {}) {
  const errors = [];
  for (const base of API_BASES) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);
    try {
      const response = await fetch(`${base}${path}`, {
        ...options,
        headers: { Accept: "application/json", ...(options.headers || {}) },
        signal: controller.signal,
        next: options.cache === "no-store" ? undefined : { revalidate: 300 }
      });
      clearTimeout(timeout);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      if (data?.success === false || data?.status === "error") throw new Error(data.message || "API returned an error");
      return data;
    } catch (error) {
      clearTimeout(timeout);
      errors.push(`${base}: ${error.message}`);
    }
  }
  throw new Error(`সব বাজার দর API এখন unavailable. ${errors.join(" | ")}`);
}
