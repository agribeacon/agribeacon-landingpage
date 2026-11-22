import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { useEffect } from "react";
import { BRAND } from "@/content/site";
import { DEVICE_LINES, PLAN_ADDONS, SERVICE_LIST, SOFTWARE_PLANS } from "@/content/products";

/** Gói & báo giá – không công khai giá: mỗi farm một giải pháp. */
const Pricing = () => {
  useEffect(() => {
    document.title = "Gói giải pháp & báo giá | AgriBeacon";
  }, []);

  return (
    <main>
      <section className="bg-brand-sand pb-16 pt-28 lg:pt-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-brand-leaf-deep">Gói giải pháp</div>
          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight text-brand-navy sm:text-6xl">Bắt đầu nhỏ, mở rộng theo hành trình.</h1>
          <p className="mt-6 max-w-2xl text-lg text-brand-navy/75">
            Mỗi farm một hiện trạng, nên mỗi farm một báo giá. Chúng tôi khảo sát trước, đề xuất cấu hình vừa đủ – phần mềm, thiết bị và dịch vụ – rồi mới báo giá.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contact?need=quote" className="inline-flex items-center gap-2 rounded-full bg-brand-navy px-6 py-3 font-semibold text-white">
              Nhận báo giá <ArrowRight className="h-4 w-4" />
            </Link>
            <a href={BRAND.appUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-full border border-brand-navy/30 px-6 py-3 font-semibold text-brand-navy hover:bg-white">
              Dùng thử SutaGrow
            </a>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-brand-navy">Gói phần mềm {BRAND.os}</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {SOFTWARE_PLANS.map((p, i) => (
              <div key={p.name} className={i === 1 ? "rounded-3xl bg-brand-navy p-6 text-white" : "rounded-3xl border border-border p-6"}>
                <div className={i === 1 ? "text-xs font-bold uppercase tracking-wider text-brand-leaf" : "text-xs font-bold uppercase tracking-wider text-brand-leaf-deep"}>{p.for}</div>
                <h3 className="mt-2 text-xl font-bold">{p.name}</h3>
                <p className={i === 1 ? "mt-3 text-sm text-white/75" : "mt-3 text-sm text-muted-foreground"}>{p.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl bg-brand-sand p-5">
            <div className="text-sm font-semibold text-brand-navy">Mở rộng khi cần</div>
            <ul className="mt-2 flex flex-wrap gap-x-6 gap-y-2 text-sm text-brand-navy/80">
              {PLAN_ADDONS.map((a) => (
                <li key={a} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-brand-leaf-deep" /> {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-brand-sand py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-brand-navy">Thiết bị AIoT</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {DEVICE_LINES.map((d) => (
              <Link key={d.slug} to={`/devices/${d.slug}`} className="group flex flex-col overflow-hidden rounded-2xl bg-white">
                <div className="flex h-44 items-center justify-center p-5">
                  <img src={d.hero} alt={d.name} className="max-h-full w-auto object-contain" loading="lazy" />
                </div>
                <div className="flex flex-1 flex-col border-t border-border p-5">
                  <div className="font-semibold text-brand-navy">{d.name}</div>
                  <p className="mt-1 flex-1 text-sm text-muted-foreground">{d.tagline}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-leaf-deep group-hover:gap-2">
                    Xem thiết bị <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="dich-vu" className="scroll-mt-20 bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-brand-navy">Dịch vụ</h2>
          <div className="mt-8 grid gap-10 lg:grid-cols-2">
            {SERVICE_LIST.map((g) => (
              <div key={g.group}>
                <h3 className="text-sm font-bold uppercase tracking-wider text-brand-leaf-deep">{g.group}</h3>
                <ul className="mt-4 space-y-3">
                  {g.items.map((s) => (
                    <li key={s.name} className="rounded-2xl border border-border p-5">
                      <div className="font-semibold text-brand-navy">{s.name}</div>
                      <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-navy py-16 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 sm:px-6 md:flex-row md:items-center lg:px-8">
          <div>
            <h2 className="text-3xl font-bold">Nhận báo giá theo farm của bạn</h2>
            <p className="mt-2 text-white/70">Cho chúng tôi biết cây trồng, diện tích và điều bạn muốn giải quyết trước.</p>
          </div>
          <Link to="/contact?need=quote" className="inline-flex items-center gap-2 rounded-full bg-brand-leaf px-6 py-3 font-semibold text-brand-navy">
            Nhận báo giá <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Pricing;
