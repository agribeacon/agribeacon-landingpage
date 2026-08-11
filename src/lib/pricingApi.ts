// Client đọc bảng giá từ sutagrow-api (endpoint public, không auth).
// Base URL lấy từ VITE_API_URL. Chỉ trả nội dung đã published, đã localize.

import { useEffect, useState } from "react";

export const API_BASE =
  (import.meta.env.VITE_API_URL as string | undefined) || "http://localhost:3018/api";

// Ảnh sản phẩm lưu dạng S3 key (bucket private) → hiển thị qua proxy công khai.
// - key trần → proxy.
// - URL S3 nội bộ (chứa 'farms/.../pricing/') → rút key ra rồi proxy (ảnh cũ vẫn hiện).
// - URL http(s) ngoài dán tay → dùng trực tiếp.
const proxyPricingImage = (key: string) =>
  `${API_BASE}/public/pricing/image?key=${encodeURIComponent(key)}`;
export const pricingImageSrc = (imageUrl?: string | null): string => {
  if (!imageUrl) return "";
  if (/^https?:\/\//i.test(imageUrl)) {
    try {
      const path = decodeURIComponent(new URL(imageUrl).pathname.replace(/^\/+/, ""));
      const idx = path.indexOf("farms/");
      const key = idx >= 0 ? path.slice(idx) : path;
      if (key.includes("/pricing/")) return proxyPricingImage(key);
    } catch { /* URL lỗi → dùng nguyên */ }
    return imageUrl;
  }
  return proxyPricingImage(imageUrl);
};

export type PricingLocale = "en" | "vi" | "ja";
export type PricingKind = "plan" | "addon" | "hardware" | "service";

export interface PricingItemDetail {
  tagline?: string;
  overview?: string;
  featuresTitle?: string;
  features?: string[];
  specTitle?: string;
  // Thông số chi tiết dạng {nhãn, giá trị} — khớp ProductDetailData của modal.
  specs?: { label: string; value: string }[];
  useCasesTitle?: string;
  useCases?: string[];
  includedTitle?: string;
  whatsIncluded?: string[];
}

export interface PricingItem {
  id: string;
  kind: PricingKind;
  key: string;
  order: number;
  icon: string;
  imageUrl: string;
  popular: boolean;
  group: "capacity" | "ai" | "soil-station" | "handheld" | "robot" | "uav" | null;
  priceType: "free" | "contact" | "paid";
  prices: { oneYear?: number | null; twoYears?: number | null };
  promoPrices: { oneYear?: number | null; twoYears?: number | null };
  priceModel: string | null;
  buyPrice: number | null;
  buyPromoPrice: number | null;
  rentPrices: { oneYear?: number | null; twoYears?: number | null };
  rentPromoPrices: { oneYear?: number | null; twoYears?: number | null };
  servicePrice: number | null;
  servicePromoPrice: number | null;
  serviceUnit: string;
  promoPercent: number | null;
  promoEndsAt: string | null;
  name: string;
  subtitle: string;
  description: string;
  priceLabel: string;
  priceSuffix: string;
  promoLabel: string;
  features: string[];
  excludedFeatures: string[];
  specs: string[];
  detail: PricingItemDetail;
}

export interface PricingComparisonRow {
  featureKey: string;
  label: string;
  values: (boolean | string)[];
}
export interface PricingComparisonGroup {
  categoryKey: string;
  label: string;
  rows: PricingComparisonRow[];
}
export interface PricingConfig {
  billingTerms: { key: "oneYear" | "twoYears"; order: number; label: string }[];
  hero: { badge?: string; title?: string; subtitle?: string };
  cta: { title?: string; subtitle?: string; primary?: string; secondary?: string; primaryUrl?: string; secondaryUrl?: string };
  comparison: { title: string; subtitle: string; groups: PricingComparisonGroup[] };
  faq: { q: string; a: string }[];
}

export interface PricingCatalog {
  items: PricingItem[];
  config: PricingConfig | null;
}

export async function fetchPricingCatalog(locale: PricingLocale): Promise<PricingCatalog> {
  const res = await fetch(`${API_BASE}/public/pricing?locale=${locale}`, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  if (!json?.success) throw new Error(json?.message || "Request failed");
  return json.data as PricingCatalog;
}

/**
 * Hook đọc bảng giá động theo ngôn ngữ. Trả { catalog, loading, error }.
 * catalog = null khi chưa load / lỗi → caller dùng fallback tĩnh.
 */
export function usePricingCatalog(locale: PricingLocale) {
  const [catalog, setCatalog] = useState<PricingCatalog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    fetchPricingCatalog(locale)
      .then((data) => {
        if (!alive) return;
        // Chỉ nhận khi có item — tránh render trang trống nếu BE chưa seed.
        setCatalog(data && data.items && data.items.length ? data : null);
        setError(null);
      })
      .catch((e) => {
        if (!alive) return;
        setCatalog(null);
        setError(e as Error);
      })
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [locale]);

  return { catalog, loading, error };
}
