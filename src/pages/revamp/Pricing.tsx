import { Link } from "react-router-dom";
import { ArrowRight, Bot, ChevronDown, ChevronRight, Cpu, Database, FlaskConical, Info, LayoutDashboard, Wrench } from "lucide-react";
import { useEffect } from "react";
import { BRAND } from "@/content/site";
import { OFFER_JOURNEY, ONSITE_SERVICE, PLATFORM_OFFER, type OfferItem, type OfferKind } from "@/content/products";
import { rich } from "@/lib/rich";
import { cn } from "@/lib/utils";

const KIND: Record<OfferKind, { label: string; icon: typeof Cpu; chip: string }> = {
  service: { label: "Dịch vụ", icon: FlaskConical, chip: "bg-brand-amber/15 text-[#8a5a0b]" },
  device: { label: "Thiết bị", icon: Cpu, chip: "bg-brand-leaf/20 text-brand-leaf-deep" },
  software: { label: "Phần mềm", icon: LayoutDashboard, chip: "bg-brand-navy/10 text-brand-navy" },
  ai: { label: "AI", icon: Bot, chip: "bg-brand-navy text-white" },
};

const ItemCard = ({ it, bordered }: { it: OfferItem; bordered?: boolean }) => {
  const k = KIND[it.kind];
  return (
    <article className={cn("flex flex-col overflow-hidden rounded-2xl bg-white", bordered && "border border-border")}>
      {it.img ? (
        <div className="flex h-40 items-center justify-center bg-white p-4">
          <img src={it.img} alt={it.name} className="max-h-full w-auto object-contain" loading="lazy" />
        </div>
      ) : (
        <div className={cn("flex h-16 items-center px-5", it.kind === "ai" ? "bg-brand-navy" : "bg-brand-sand/70")}>
          <k.icon className={cn("h-7 w-7", it.kind === "ai" ? "text-brand-leaf" : "text-brand-navy/70")} />
        </div>
      )}
      <div className="flex flex-1 flex-col border-t border-border p-4">
        <div className="flex items-center gap-2">
          <span className={cn("rounded-full px-2 py-0.5 text-[11px] font-semibold", k.chip)}>{k.label}</span>
          {it.code && <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{it.code}</span>}
        </div>
        <h3 className="mt-2 font-semibold text-brand-navy">{it.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{rich(it.d)}</p>
      </div>
    </article>
  );
};

/** Gói & báo giá: 4 chặng triển khai, nền tảng SutaGrow OS xuyên suốt. Không công khai giá. */
const Pricing = () => {
  useEffect(() => {
    document.title = "Gói giải pháp & báo giá | AgriBeacon";
  }, []);

  return (
    <main>
      {/* Hero + sơ đồ hành trình */}
      <section className="bg-brand-sand pb-14 pt-28 lg:pt-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-brand-leaf-deep">Gói giải pháp</div>
          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight text-brand-navy sm:text-5xl">Bắt đầu từ việc trang trại cần nhất</h1>
          <p className="mt-5 max-w-2xl text-lg text-brand-navy/75">
            {rich("Xét nghiệm đất, đo đạc quy hoạch, lắp trạm tưới hay dùng UAV phun thuốc, làm hạng mục nào trước cũng được. Tất cả quản lý chung trên **SutaGrow OS**.")}
          </p>

          {/* Sơ đồ: 4 chặng nối nhau bằng mũi tên ngang (dọc trên mobile), mỗi chặng nối xuống nền tảng chung */}
          <div className="mt-10">
            <ol className="flex flex-col lg:flex-row" aria-label="Các chặng triển khai">
              {OFFER_JOURNEY.map((st, i) => (
                <li key={st.key} className="flex flex-col items-stretch lg:flex-1 lg:flex-row">
                  <div className="flex flex-1 flex-col items-center">
                    <a href={`#${st.key}`} className="flex w-full items-center gap-3 rounded-2xl bg-white p-3 ring-1 ring-transparent transition hover:ring-brand-leaf">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-leaf text-sm font-bold text-brand-navy">{i + 1}</span>
                      <span className="text-sm font-semibold leading-tight text-brand-navy">{st.short}</span>
                    </a>
                    <span aria-hidden className="flow-y hidden h-8 w-0.5 text-brand-leaf-deep lg:block" />
                  </div>
                  {i < OFFER_JOURNEY.length - 1 && (
                    <span aria-hidden className="flex flex-col items-center justify-center text-brand-leaf-deep lg:mb-8 lg:flex-row lg:px-1">
                      <span className="flow-y h-4 w-0.5 lg:hidden" />
                      <span className="flow-x hidden h-0.5 w-5 lg:block" />
                      <ChevronDown className="-mt-1.5 h-4 w-4 lg:hidden" />
                      <ChevronRight className="-ml-1.5 hidden h-4 w-4 lg:block" />
                    </span>
                  )}
                </li>
              ))}
            </ol>
            <span aria-hidden className="flow-y mx-auto block h-6 w-0.5 text-brand-leaf-deep lg:hidden" />
            <a href="#platform" className="flex items-center justify-center gap-3 rounded-2xl bg-brand-navy px-4 py-4 text-center text-white transition hover:bg-brand-navy-2">
              <Database className="h-5 w-5 shrink-0 text-brand-leaf" />
              <span className="text-sm font-semibold sm:text-base">{PLATFORM_OFFER.title}</span>
            </a>
            <div className="mt-2 flex items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-brand-leaf px-4 py-2.5 text-center text-sm text-brand-navy">
              <Wrench className="h-5 w-5 shrink-0 text-brand-leaf-deep" />
              <span className="font-semibold">{ONSITE_SERVICE.name}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Nền tảng xuyên suốt */}
      <section id="platform" className="scroll-mt-20 bg-white py-14 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[300px_1fr] lg:px-8">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-navy">
                <Database className="h-5 w-5 text-brand-leaf" />
              </span>
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-brand-leaf-deep">Nền tảng xuyên suốt</span>
            </div>
            <h2 className="mt-4 text-2xl font-bold leading-tight text-brand-navy sm:text-3xl">{PLATFORM_OFFER.title}</h2>
            <p className="mt-3 text-muted-foreground">{rich(PLATFORM_OFFER.goal)}</p>
            <Link to="/platform" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-leaf-deep hover:gap-2">
              Tổng quan SutaGrow OS <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {PLATFORM_OFFER.items.map((it) => (
              <ItemCard key={it.name} it={it} bordered />
            ))}
          </div>
        </div>
      </section>

      {/* 4 chặng */}
      {OFFER_JOURNEY.map((st, i) => (
        <section key={st.key} id={st.key} className={cn("scroll-mt-20 py-14 lg:py-20", i % 2 === 0 ? "bg-brand-sand" : "bg-white")}>
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[300px_1fr] lg:px-8">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-leaf text-lg font-extrabold text-brand-navy">{i + 1}</span>
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-brand-leaf-deep">Chặng {i + 1}</span>
              </div>
              <h2 className="mt-4 text-2xl font-bold leading-tight text-brand-navy sm:text-3xl">{st.title}</h2>
              <p className="mt-3 text-muted-foreground">{rich(st.goal)}</p>
              {st.note && (
                <p className="mt-4 flex gap-2 rounded-xl bg-brand-leaf/15 p-3 text-sm text-brand-navy">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand-leaf-deep" />
                  <span>{rich(st.note)}</span>
                </p>
              )}
              <p className="mt-4 flex gap-2 rounded-xl bg-brand-navy p-3 text-sm text-white/90">
                <Database className="mt-0.5 h-4 w-4 shrink-0 text-brand-leaf" />
                <span>
                  <span className="font-semibold text-white">Trên SutaGrow OS: </span>
                  {rich(st.osNote, "font-semibold text-brand-leaf")}
                </span>
              </p>
              {st.link && (
                <Link to={st.link.path} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-leaf-deep hover:gap-2">
                  {st.link.label} <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {st.items.map((it) => (
                <ItemCard key={it.name} it={it} bordered={i % 2 === 1} />
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Triển khai + CTA */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 rounded-3xl border-2 border-dashed border-brand-leaf p-6 sm:flex-row sm:items-center">
            <Wrench className="h-8 w-8 shrink-0 text-brand-leaf-deep" />
            <div>
              <div className="font-bold text-brand-navy">{ONSITE_SERVICE.name}</div>
              <p className="text-sm text-muted-foreground">{rich(ONSITE_SERVICE.d)}</p>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-start justify-between gap-6 rounded-3xl bg-brand-leaf/30 px-6 py-10 sm:px-10 md:flex-row md:items-center">
            <div>
              <h2 className="text-3xl font-bold text-brand-navy">Nhận báo giá cho trang trại của bạn</h2>
              <p className="mt-2 text-brand-navy/75">{rich("Gửi **cây trồng, diện tích** và việc muốn làm trước, chúng tôi gửi phương án và báo giá.")}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/contact?need=quote" className="inline-flex items-center gap-2 rounded-full bg-brand-navy px-6 py-3 font-semibold text-white hover:bg-brand-navy-2">
                Nhận báo giá <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/tools/roi-calculator" className="inline-flex items-center rounded-full border border-brand-navy/30 px-6 py-3 font-semibold text-brand-navy hover:bg-white">
                Tính hiệu quả đầu tư
              </Link>
              <a href={BRAND.appUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-full px-4 py-3 font-semibold text-brand-navy/80 hover:text-brand-navy">
                Dùng thử SutaGrow
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Pricing;
