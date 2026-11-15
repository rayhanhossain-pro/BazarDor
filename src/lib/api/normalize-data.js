const first = (...values) => values.find((value) => value !== undefined && value !== null && value !== "");

export function unwrapPayload(payload) {
  let value = payload;
  for (let i = 0; i < 4; i++) {
    if (value && !Array.isArray(value) && typeof value === "object") {
      const next = first(value.data, value.result, value.results, value.products, value.categories, value.product, value.category);
      if (next !== undefined) value = next;
      else break;
    } else break;
  }
  return value;
}

export function toArray(payload) {
  const value = unwrapPayload(payload);
  if (Array.isArray(value)) return value;
  if (value && typeof value === "object") {
    const candidate = first(value.items, value.products, value.categories, value.results, value.data);
    if (Array.isArray(candidate)) return candidate;
    return Object.values(value).filter((item) => item && typeof item === "object");
  }
  return [];
}

export function digitsToEnglish(value) {
  return String(value ?? "").replace(/[০-৯]/g, (digit) => "০১২৩৪৫৬৭৮৯".indexOf(digit));
}

export function numberValue(value) {
  if (typeof value === "number") return value;
  const cleaned = digitsToEnglish(value).replace(/[৳,٬\s]/g, "").replace(/[^\d.-]/g, "");
  const parsed = Number(cleaned);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function normalizeProduct(item, index = 0) {
  const priceObject = first(item.price, item.prices, item.marketPrices, item.market_prices, {});
  const price = first(item.currentPrice, item.current_price, item.todayPrice, item.today_price, item.price_per_unit,
    typeof priceObject === "number" || typeof priceObject === "string" ? priceObject : priceObject?.current,
    priceObject?.average, item.averagePrice, item.average_price, item.avgPrice, item.avg_price, item.minPrice, item.min_price, 0);
  const change = first(item.changePercent, item.change_percentage, item.priceChange, item.price_change, item.change, item.trend, 0);
  const id = first(item.id, item._id, item.productId, item.product_id, item.slug, `product-${index}`);
  return {
    ...item,
    id: String(id),
    slug: String(first(item.slug, id)),
    name: String(first(item.name, item.productName, item.product_name, item.title, "পণ্যের নাম নেই")),
    emoji: String(first(item.emoji, item.icon, item.symbol, "🛒")),
    unit: String(first(item.unit, item.measurement, item.unitName, item.unit_name, "প্রতি কেজি")),
    category: String(first(item.category, item.categoryName, item.category_name, item.categorySlug, item.category_slug, "")),
    price: numberValue(price),
    priceLabel: String(price),
    change: numberValue(change),
    description: String(first(item.description, item.summary, item.details, "")),
    markets: first(item.markets, item.bazars, item.marketPrices, item.market_prices, item.pricesByMarket, [])
  };
}

export function normalizeCategory(item, index = 0) {
  const slug = first(item.slug, item.id, item.categorySlug, item.category_slug, `category-${index}`);
  return {
    ...item,
    slug: String(slug),
    name: String(first(item.name, item.title, item.categoryName, item.category_name, slug)),
    emoji: String(first(item.emoji, item.icon, "🧺"))
  };
}
