import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Info } from "lucide-react";
import { BRAND } from "@/content/site";
import { CROP_PRESETS, SCENARIOS, computeRoi, formatMoney, type Improvement } from "@/content/roi";
import { cn } from "@/lib/utils";

const Field = ({
  label,
  unit,
  value,
  onChange,
  step = 1,
  min = 0,
  hint,
}: {
  label: string;
  unit?: string;
  value: number;
  onChange: (v: number) => void;
  step?: number;
  min?: number;
  hint?: string;
}) => (
  <label className="block">
    <span className="text-sm font-medium text-brand-navy">{label}</span>
    <div className="mt-1 flex items-center rounded-xl border border-border bg-white focus-within:border-brand-leaf focus-within:ring-2 focus-within:ring-brand-leaf/30">
      <input
        type="number"
        inputMode="decimal"
        min={min}
        step={step}
        value={Number.isFinite(value) ? value : ""}
        onChange={(e) => onChange(e.target.value === "" ? 0 : Number(e.target.value))}
        className="w-full rounded-xl bg-transparent px-3 py-2.5 text-brand-navy outline-none"
      />
      {unit && <span className="shrink-0 pr-3 text-xs text-muted-foreground">{unit}</span>}
    </div>
    {hint && <span className="mt-1 block text-xs text-muted-foreground">{hint}</span>}
  </label>
);

const Slider = ({ label, value, onChange, max = 50, suffix = "%" }: { label: string; value: number; onChange: (v: number) => void; max?: number; suffix?: string }) => (
  <label className="block">
    <div className="flex items-center justify-between text-sm">
      <span className="text-brand-navy">{label}</span>
      <span className="font-semibold text-brand-leaf-deep">
        {value}
        {suffix}
      </span>
    </div>
    <input type="range" min={0} max={max} step={1} value={value} onChange={(e) => onChange(Number(e.target.value))} className="mt-2 w-full accent-[#4F7A26]" />
  </label>
);

const Bar = ({ label, before, after }: { label: string; before: number; after: number }) => {
  const max = Math.max(Math.abs(before), Math.abs(after), 1);
  return (
    <div>
      <div className="mb-1 text-sm font-medium text-white/80">{label}</div>
      <div className="space-y-1.5">
        <div className="flex items-center gap-3">
          <div className="h-3 rounded-full bg-white/30" style={{ width: `${(Math.max(before, 0) / max) * 100}%` }} />
          <span className="shrink-0 text-xs text-white/70">Trước: {formatMoney(before)}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-3 rounded-full bg-brand-leaf" style={{ width: `${(Math.max(after, 0) / max) * 100}%` }} />
          <span className="shrink-0 text-xs font-semibold text-white">Sau: {formatMoney(after)}</span>
        </div>
      </div>
    </div>
  );
};

const RoiCalculator = () => {
  useEffect(() => {
    document.title = "Tính hiệu quả đầu tư nông nghiệp chính xác (ROI) | AgriBeacon";
  }, []);

  const [cropKey, setCropKey] = useState(CROP_PRESETS[0].key);
  const preset = CROP_PRESETS.find((c) => c.key === cropKey)!;
  const [area, setArea] = useState(50);
  const [yieldT, setYieldT] = useState(preset.yieldT);
  const [price, setPrice] = useState(preset.price);
  const [fert, setFert] = useState(preset.fert);
  const [pest, setPest] = useState(preset.pest);
  const [water, setWater] = useState(preset.water);
  const [labor, setLabor] = useState(preset.labor);
  const [scenario, setScenario] = useState("mid");
  const [imp, setImp] = useState<Improvement>(SCENARIOS[1].v);
  const [capex, setCapex] = useState(0);
  const [software, setSoftware] = useState(0);
  const [maintPct, setMaintPct] = useState(8);

  const pickCrop = (key: string) => {
    const c = CROP_PRESETS.find((x) => x.key === key)!;
    setCropKey(key);
    setYieldT(c.yieldT);
    setPrice(c.price);
    setFert(c.fert);
    setPest(c.pest);
    setWater(c.water);
    setLabor(c.labor);
  };
  const pickScenario = (key: string) => {
    setScenario(key);
    setImp(SCENARIOS.find((s) => s.key === key)!.v);
  };
  const setI = (k: keyof Improvement) => (v: number) => {
    setScenario("custom");
    setImp((p) => ({ ...p, [k]: v }));
  };

  const r = useMemo(
    () => computeRoi({ area, yieldT, price, fert, pest, water, labor, imp, capex, software, maintPct }),
    [area, yieldT, price, fert, pest, water, labor, imp, capex, software, maintPct],
  );

  const quoteLink = `/contact?need=quote&from=roi&crop=${cropKey}&area=${area}`;

  return (
    <main>
      <section className="bg-brand-sand pb-12 pt-28 lg:pt-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-brand-leaf-deep">Công cụ</div>
          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight text-brand-navy sm:text-5xl">Tính hiệu quả đầu tư nông nghiệp chính xác</h1>
          <p className="mt-5 max-w-2xl text-lg text-brand-navy/75">
            Ước tính chi phí tiết kiệm được và giá trị tăng thêm mỗi năm khi áp dụng nông nghiệp chính xác với {BRAND.os}. Nhập số liệu của trang trại để có kết quả sát thực tế nhất.
          </p>
        </div>
      </section>

      <section className="bg-white py-12 lg:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:px-8">
          {/* Nhập liệu */}
          <div className="space-y-10">
            <div>
              <h2 className="text-lg font-bold text-brand-navy">1. Thông tin trang trại</h2>
              <div className="mt-4">
                <span className="text-sm font-medium text-brand-navy">Cây trồng</span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {CROP_PRESETS.map((c) => (
                    <button
                      key={c.key}
                      type="button"
                      onClick={() => pickCrop(c.key)}
                      className={cn("rounded-full border px-3 py-1.5 text-sm", c.key === cropKey ? "border-brand-navy bg-brand-navy text-white" : "border-border text-brand-navy hover:border-brand-leaf")}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                <Field label="Diện tích" unit="ha" value={area} onChange={setArea} step={0.5} />
                <Field label="Năng suất hiện tại" unit="tấn/ha/năm" value={yieldT} onChange={setYieldT} step={0.1} />
                <Field label="Giá bán bình quân" unit="triệu đ/tấn" value={price} onChange={setPrice} />
              </div>
            </div>

            <div>
              <h2 className="text-lg font-bold text-brand-navy">2. Chi phí canh tác hiện tại</h2>
              <p className="mt-1 text-sm text-muted-foreground">Tính trên 1 ha mỗi năm. Số liệu mặc định chỉ là mẫu tham khảo, hãy thay bằng số liệu của trang trại.</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Field label="Phân bón" unit="triệu đ/ha/năm" value={fert} onChange={setFert} />
                <Field label="Thuốc BVTV" unit="triệu đ/ha/năm" value={pest} onChange={setPest} />
                <Field label="Nước, điện tưới" unit="triệu đ/ha/năm" value={water} onChange={setWater} />
                <Field label="Nhân công" unit="triệu đ/ha/năm" value={labor} onChange={setLabor} />
              </div>
            </div>

            <div>
              <h2 className="text-lg font-bold text-brand-navy">3. Mức cải thiện kỳ vọng</h2>
              <p className="mt-1 text-sm text-muted-foreground">Chọn kịch bản hoặc tự điều chỉnh theo đánh giá của bạn.</p>
              <div className="mt-4 grid gap-2 sm:grid-cols-3">
                {SCENARIOS.map((s) => (
                  <button
                    key={s.key}
                    type="button"
                    onClick={() => pickScenario(s.key)}
                    className={cn("rounded-2xl border p-3 text-left", scenario === s.key ? "border-brand-navy bg-brand-navy text-white" : "border-border hover:border-brand-leaf")}
                  >
                    <div className="font-semibold">{s.name}</div>
                    <div className={cn("text-xs", scenario === s.key ? "text-white/70" : "text-muted-foreground")}>{s.desc}</div>
                  </button>
                ))}
              </div>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <Slider label="Giảm chi phí phân bón" value={imp.fert} onChange={setI("fert")} />
                <Slider label="Giảm chi phí thuốc BVTV" value={imp.pest} onChange={setI("pest")} />
                <Slider label="Giảm chi phí nước, điện tưới" value={imp.water} onChange={setI("water")} />
                <Slider label="Giảm chi phí nhân công" value={imp.labor} onChange={setI("labor")} />
                <Slider label="Tăng năng suất" value={imp.yieldUp} onChange={setI("yieldUp")} max={30} />
                <Slider label="Tăng giá bán (chất lượng, truy xuất)" value={imp.priceUp} onChange={setI("priceUp")} max={20} />
              </div>
            </div>

            <div>
              <h2 className="text-lg font-bold text-brand-navy">4. Chi phí đầu tư và vận hành công nghệ (không bắt buộc)</h2>
              <p className="mt-1 text-sm text-muted-foreground">Nhập theo báo giá của AgriBeacon để tính thời gian hoàn vốn.</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Field label="Đầu tư ban đầu" unit="triệu đ" value={capex} onChange={setCapex} hint="Thiết bị, lắp đặt, số hóa bản đồ, đào tạo" />
                <Field label="Gói phần mềm & AI hằng năm" unit="triệu đ/năm" value={software} onChange={setSoftware} hint="Gói SutaGrow, người dùng bổ sung, gói Tiểu Thần Nông" />
              </div>
              <div className="mt-5 rounded-2xl bg-brand-sand p-4">
                <Slider label="Bảo dưỡng, bảo hành thiết bị hằng năm (% giá trị đầu tư)" value={maintPct} onChange={setMaintPct} max={20} />
                <p className="mt-2 text-xs text-muted-foreground">
                  {capex > 0
                    ? `Tương đương ${formatMoney(r.techCost.maint)}/năm: thay thế linh kiện, hiệu chuẩn cảm biến, pin, gia hạn bảo hành.`
                    : "Nhập giá trị đầu tư ban đầu để tính chi phí bảo dưỡng, bảo hành hằng năm."}
                </p>
              </div>
              <Link to={quoteLink} className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-leaf-deep hover:gap-2">
                Chưa có báo giá? Nhận báo giá cho trang trại <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Kết quả */}
          <div>
            <div className="sticky top-24 rounded-3xl bg-brand-navy p-6 text-white sm:p-8" aria-live="polite">
              <div className="text-xs font-bold uppercase tracking-wider text-brand-leaf">Kết quả ước tính mỗi năm</div>
              <div className="mt-3 text-4xl font-extrabold sm:text-5xl">{formatMoney(r.netBenefit)}</div>
              <div className="mt-1 text-sm text-white/70">
                Lợi ích ròng/năm · {formatMoney(r.perHa)}/ha {r.techCost.total > 0 && "· đã trừ chi phí vận hành công nghệ"}
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white/5 p-4">
                  <div className="text-xs text-white/60">Chi phí tiết kiệm</div>
                  <div className="mt-1 text-xl font-bold text-brand-leaf">{formatMoney(r.savings.total)}</div>
                </div>
                <div className="rounded-2xl bg-white/5 p-4">
                  <div className="text-xs text-white/60">Giá trị tăng thêm</div>
                  <div className="mt-1 text-xl font-bold text-brand-leaf">{formatMoney(r.valueUp)}</div>
                </div>
              </div>

              <ul className="mt-5 space-y-1.5 text-sm text-white/75">
                <li className="flex justify-between"><span>Phân bón</span><span>{formatMoney(r.savings.fert)}</span></li>
                <li className="flex justify-between"><span>Thuốc BVTV</span><span>{formatMoney(r.savings.pest)}</span></li>
                <li className="flex justify-between"><span>Nước, điện tưới</span><span>{formatMoney(r.savings.water)}</span></li>
                <li className="flex justify-between"><span>Nhân công</span><span>{formatMoney(r.savings.labor)}</span></li>
              </ul>

              {r.techCost.total > 0 && (
                <div className="mt-5 rounded-2xl border border-white/10 p-4">
                  <div className="text-xs text-white/60">Chi phí vận hành công nghệ/năm</div>
                  <ul className="mt-2 space-y-1.5 text-sm text-white/75">
                    <li className="flex justify-between"><span>Gói phần mềm & AI</span><span>−{formatMoney(r.techCost.software)}</span></li>
                    <li className="flex justify-between"><span>Bảo dưỡng, bảo hành thiết bị</span><span>−{formatMoney(r.techCost.maint)}</span></li>
                    <li className="flex justify-between border-t border-white/10 pt-1.5 font-semibold text-white"><span>Tổng</span><span>−{formatMoney(r.techCost.total)}</span></li>
                  </ul>
                </div>
              )}

              <div className="mt-6 space-y-4 border-t border-white/10 pt-6">
                <Bar label="Doanh thu" before={r.before.revenue} after={r.after.revenue} />
                <Bar label="Tổng chi phí (gồm vận hành công nghệ)" before={r.before.cost} after={r.after.cost} />
                <Bar label="Lợi nhuận" before={r.before.profit} after={r.after.profit} />
              </div>

              {capex > 0 ? (
                <div className="mt-6 grid grid-cols-3 gap-3 border-t border-white/10 pt-6 text-center">
                  <div>
                    <div className="text-xs text-white/60">Hoàn vốn</div>
                    <div className="mt-1 font-bold">{r.paybackMonths !== null ? `${r.paybackMonths.toLocaleString("vi-VN", { maximumFractionDigits: 1 })} tháng` : "Chưa hoàn vốn"}</div>
                  </div>
                  <div>
                    <div className="text-xs text-white/60">ROI 3 năm</div>
                    <div className="mt-1 font-bold">{r.roi3y !== null ? `${r.roi3y.toLocaleString("vi-VN", { maximumFractionDigits: 0 })}%` : "–"}</div>
                  </div>
                  <div>
                    <div className="text-xs text-white/60">Đầu tư/ha</div>
                    <div className="mt-1 font-bold">{r.capexPerHa !== null ? formatMoney(r.capexPerHa) : "–"}</div>
                  </div>
                </div>
              ) : (
                <p className="mt-6 border-t border-white/10 pt-6 text-sm text-white/60">Nhập chi phí đầu tư ở mục 4 để xem thời gian hoàn vốn và ROI.</p>
              )}

              <Link to={quoteLink} className="mt-6 flex items-center justify-center gap-2 rounded-full bg-brand-leaf px-5 py-3 font-semibold text-brand-navy">
                Nhận đánh giá thực tế cho trang trại <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-brand-sand py-12">
        <div className="mx-auto flex max-w-7xl gap-3 px-4 text-sm text-brand-navy/75 sm:px-6 lg:px-8">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-brand-leaf-deep" />
          <p>
            Kết quả chỉ mang tính tham khảo, được tính từ số liệu và mức cải thiện do bạn nhập; không phải cam kết hiệu quả của AgriBeacon. Hiệu quả thực tế phụ thuộc vào loại cây, điều kiện đất, khí hậu, quy trình canh tác và mức độ áp dụng. Diện tích càng lớn, chi phí công nghệ trên mỗi hecta càng thấp. Để có đánh giá chính xác, đội ngũ AgriBeacon sẽ khảo sát hiện trạng trang trại.
          </p>
        </div>
      </section>
    </main>
  );
};

export default RoiCalculator;
