export const API_BASES = [
  process.env.BAZARDOR_API_PRIMARY || "https://openapi.programming-hero.com/api/bazardor",
  process.env.BAZARDOR_API_BACKUP_1 || "https://api.api-store.workers.dev/api/bazardor",
  process.env.BAZARDOR_API_BACKUP_2 || "https://api.abcz.workers.dev/api/bazardor"
];
