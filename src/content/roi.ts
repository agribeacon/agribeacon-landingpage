// Dữ liệu mẫu cho công cụ tính hiệu quả đầu tư (ROI).
// LƯU Ý: đây là số liệu MẪU để người dùng có điểm bắt đầu, không phải số liệu khảo sát chính thức.
// Đơn vị: năng suất tấn/ha/năm · giá bán triệu đồng/tấn · chi phí triệu đồng/ha/năm.

export interface CropPreset {
  key: string;
  name: string;
  yieldT: number;
  price: number;
  fert: number;
  pest: number;
  water: number;
  labor: number;
}

export const CROP_PRESETS: CropPreset[] = [
  { key: "ca-phe", name: "Cà phê (nhân)", yieldT: 3, price: 100, fert: 25, pest: 5, water: 8, labor: 40 },
  { key: "sau-rieng", name: "Sầu riêng", yieldT: 15, price: 60, fert: 60, pest: 30, water: 15, labor: 80 },
  { key: "cacao", name: "Cacao (hạt khô)", yieldT: 1.5, price: 150, fert: 15, pest: 5, water: 6, labor: 35 },
  { key: "bo", name: "Bơ", yieldT: 12, price: 25, fert: 30, pest: 10, water: 10, labor: 50 },
  { key: "ho-tieu", name: "Hồ tiêu", yieldT: 3, price: 140, fert: 40, pest: 10, water: 8, labor: 50 },
  { key: "khac", name: "Cây trồng khác", yieldT: 10, price: 20, fert: 20, pest: 8, water: 8, labor: 40 },
];

export interface Improvement {
  fert: number; // % giảm chi phí phân bón
  pest: number; // % giảm chi phí thuốc BVTV
  water: number; // % giảm chi phí nước, điện tưới
  labor: number; // % giảm chi phí nhân công
  yieldUp: number; // % tăng năng suất
  priceUp: number; // % tăng giá bán (chất lượng, truy xuất)
}

export const SCENARIOS: { key: string; name: string; desc: string; v: Improvement }[] = [
  { key: "low", name: "Thận trọng", desc: "Mới ghi nhận vận hành và lập bản đồ", v: { fert: 10, pest: 10, water: 15, labor: 5, yieldUp: 3, priceUp: 0 } },
  { key: "mid", name: "Trung bình", desc: "Có trạm đo, tưới tự động, định mức theo khu", v: { fert: 15, pest: 15, water: 25, labor: 10, yieldUp: 7, priceUp: 3 } },
  { key: "high", name: "Tích cực", desc: "Đã chuẩn hóa quy trình, tự động hóa, truy xuất", v: { fert: 25, pest: 25, water: 35, labor: 15, yieldUp: 12, priceUp: 5 } },
];

export interface RoiInput {
  area: number;
  yieldT: number;
  price: number;
  fert: number;
  pest: number;
  water: number;
  labor: number;
  imp: Improvement;
  capex: number; // tổng chi phí đầu tư ban đầu (triệu đồng)
  software: number; // gói phần mềm SutaGrow, gói AI hằng năm (triệu đồng)
  maintPct: number; // chi phí bảo dưỡng, bảo hành thiết bị hằng năm, % giá trị đầu tư ban đầu
}

export interface RoiResult {
  before: { revenue: number; cost: number; profit: number };
  after: { revenue: number; cost: number; profit: number };
  savings: { fert: number; pest: number; water: number; labor: number; total: number };
  valueUp: number;
  techCost: { software: number; maint: number; total: number }; // chi phí vận hành công nghệ/năm
  netBenefit: number; // lợi ích ròng/năm (đã trừ chi phí vận hành công nghệ)
  perHa: number;
  paybackMonths: number | null;
  roi3y: number | null; // %
  capexPerHa: number | null;
}

const n = (v: number) => (Number.isFinite(v) ? v : 0);

export function computeRoi(i: RoiInput): RoiResult {
  const area = Math.max(0, n(i.area));
  const p = (x: number) => n(x) / 100;
  const costPerHa = n(i.fert) + n(i.pest) + n(i.water) + n(i.labor);

  const beforeRevenue = area * n(i.yieldT) * n(i.price);
  const beforeCost = area * costPerHa;

  const s = {
    fert: area * n(i.fert) * p(i.imp.fert),
    pest: area * n(i.pest) * p(i.imp.pest),
    water: area * n(i.water) * p(i.imp.water),
    labor: area * n(i.labor) * p(i.imp.labor),
    total: 0,
  };
  s.total = s.fert + s.pest + s.water + s.labor;

  const afterRevenue = area * n(i.yieldT) * (1 + p(i.imp.yieldUp)) * n(i.price) * (1 + p(i.imp.priceUp));
  const capex = n(i.capex);
  const tech = { software: n(i.software), maint: (capex * n(i.maintPct)) / 100, total: 0 };
  tech.total = tech.software + tech.maint;
  const afterCost = beforeCost - s.total + tech.total;
  const valueUp = afterRevenue - beforeRevenue;
  const netBenefit = s.total + valueUp - tech.total;

  return {
    before: { revenue: beforeRevenue, cost: beforeCost, profit: beforeRevenue - beforeCost },
    after: { revenue: afterRevenue, cost: afterCost, profit: afterRevenue - afterCost },
    savings: s,
    valueUp,
    techCost: tech,
    netBenefit,
    perHa: area > 0 ? netBenefit / area : 0,
    paybackMonths: capex > 0 && netBenefit > 0 ? (capex / netBenefit) * 12 : null,
    roi3y: capex > 0 ? ((netBenefit * 3 - capex) / capex) * 100 : null,
    capexPerHa: capex > 0 && area > 0 ? capex / area : null,
  };
}

/** Định dạng số tiền đơn vị triệu đồng → "x triệu đ" hoặc "x tỷ đ" */
export function formatMoney(trieu: number): string {
  const v = n(trieu);
  const sign = v < 0 ? "−" : "";
  const a = Math.abs(v);
  if (a >= 1000) return `${sign}${(a / 1000).toLocaleString("vi-VN", { maximumFractionDigits: 2 })} tỷ đ`;
  return `${sign}${a.toLocaleString("vi-VN", { maximumFractionDigits: 1 })} triệu đ`;
}
