import { rich } from "@/lib/rich";
import { Link } from "react-router-dom";
import { ArrowRight, Check, X } from "lucide-react";
import { useEffect } from "react";
import { BRAND, JOURNEY } from "@/content/site";
import { PRECISION_COMPARE, PRECISION_FAQ, PRECISION_LOOP, PRECISION_PRINCIPLES, PRECISION_TECH, PRECISION_WHY } from "@/content/precision";
import poster from "@/assets/field/drone-cacao.jpg";
import ProblemSection from "@/components/revamp/ProblemSection";

const Eyebrow = ({ children, light }: { children: React.ReactNode; light?: boolean }) => (
  <div className={light ? "mb-4 text-xs font-bold uppercase tracking-[0.18em] text-brand-leaf" : "mb-4 text-xs font-bold uppercase tracking-[0.18em] text-brand-leaf-deep"}>{children}</div>
);

const PrecisionAgriculture = () => {
  useEffect(() => {
    document.title = "Nông nghiệp chính xác là gì? Vì sao quan trọng | AgriBeacon";
  }, []);

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-navy pb-20 pt-32 text-white lg:pb-28 lg:pt-40">
        <img src={poster} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Eyebrow light>Kiến thức nền tảng</Eyebrow>
          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight sm:text-6xl">Nông nghiệp chính xác là gì?</h1>
          <p className="mt-6 max-w-2xl text-lg text-white/85">
            Nông nghiệp chính xác (Precision Agriculture) là phương pháp quản lý trang trại dựa trên dữ liệu đo đạc thực tế, để mỗi khu đất, mỗi cây trồng được chăm sóc đúng với nhu cầu của nó.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#vi-sao" className="inline-flex items-center gap-2 rounded-full bg-brand-leaf px-5 py-3 font-semibold text-brand-navy">
              Vì sao quan trọng <ArrowRight className="h-4 w-4" />
            </a>
            <Link to={BRAND.surveyPath} className="inline-flex items-center rounded-full border border-white/40 px-5 py-3 font-semibold text-white hover:bg-white/10">
              Đặt lịch khảo sát
            </Link>
          </div>
        </div>
      </section>

      {/* Định nghĩa + 4 nguyên tắc */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:px-8">
          <div>
            <Eyebrow>Định nghĩa</Eyebrow>
            <h2 className="text-3xl font-bold leading-tight text-brand-navy">Từ “chăm cả vườn như nhau” sang “chăm từng khu, từng cây theo nhu cầu”</h2>
            <p className="mt-4 text-muted-foreground">
              Trong canh tác truyền thống, cả vườn thường được tưới, bón, phun thuốc theo cùng một định mức. Thực tế, đất và cây ở mỗi khu rất khác nhau. Nông nghiệp chính xác dùng bản đồ, cảm biến và dữ liệu vận hành để nhận biết sự khác biệt đó và xử lý tương ứng.
            </p>
            <p className="mt-4 text-muted-foreground">
              Đây không phải là một thiết bị hay một phần mềm riêng lẻ, mà là cách vận hành trang trại: đo lường, phân tích, hành động và đánh giá lại liên tục.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {PRECISION_PRINCIPLES.map((p, i) => (
              <div key={p.t} className="rounded-2xl bg-brand-sand p-6">
                <span className="text-xs font-bold text-brand-leaf-deep">0{i + 1}</span>
                <div className="mt-1 text-xl font-bold text-brand-navy">{p.t}</div>
                <p className="mt-2 text-sm text-muted-foreground">{rich(p.d)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vì sao quan trọng */}
      <section id="vi-sao" className="scroll-mt-20 border-t border-border bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Eyebrow>Vì sao quan trọng</Eyebrow>
          <h2 className="max-w-3xl text-3xl font-bold leading-tight text-brand-navy">Nền tảng của nông nghiệp bền vững và hiệu quả kinh tế</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {PRECISION_WHY.map((w) => (
              <div key={w.t} className="rounded-2xl bg-brand-sand p-6">
                <div className="font-bold text-brand-navy">{w.t}</div>
                <p className="mt-2 text-sm text-muted-foreground">{w.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProblemSection />

      {/* So sánh */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Eyebrow>So sánh</Eyebrow>
          <h2 className="text-3xl font-bold text-brand-navy">Canh tác truyền thống và nông nghiệp chính xác</h2>
          <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-white">
            <div className="hidden grid-cols-[1fr_2fr_2fr] bg-brand-navy px-5 py-3 text-sm font-semibold text-white md:grid">
              <span>Hạng mục</span>
              <span>Canh tác truyền thống</span>
              <span>Nông nghiệp chính xác</span>
            </div>
            {PRECISION_COMPARE.map((r) => (
              <div key={r.k} className="grid gap-2 border-t border-border px-5 py-4 text-sm md:grid-cols-[1fr_2fr_2fr] md:gap-4">
                <span className="font-semibold text-brand-navy">{r.k}</span>
                <span className="flex items-start gap-2 text-muted-foreground">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-brand-amber" /> {r.old}
                </span>
                <span className="flex items-start gap-2 text-brand-navy">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-leaf-deep" /> {r.neu}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vòng lặp + công nghệ */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Eyebrow>Cách vận hành</Eyebrow>
          <h2 className="text-3xl font-bold text-brand-navy">Một vòng lặp liên tục</h2>
          <ol className="mt-8 grid gap-3 md:grid-cols-4">
            {PRECISION_LOOP.map((s, i) => (
              <li key={s.t} className="relative rounded-2xl bg-brand-sand p-5">
                <span className="text-xs font-bold text-brand-leaf-deep">0{i + 1}</span>
                <div className="mt-1 text-lg font-bold text-brand-navy">{s.t}</div>
                <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
                {i < PRECISION_LOOP.length - 1 && <ArrowRight className="absolute -right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-brand-leaf-deep md:block" />}
              </li>
            ))}
          </ol>

          <h3 className="mt-16 text-2xl font-bold text-brand-navy">Các công nghệ thành phần</h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PRECISION_TECH.map((t) => (
              <Link key={t.t} to={t.path} className="group rounded-2xl border border-border p-5 hover:border-brand-leaf">
                <div className="font-semibold text-brand-navy">{t.t}</div>
                <p className="mt-1 text-sm text-muted-foreground">{t.d}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-leaf-deep group-hover:gap-2">
                  Xem chi tiết <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bắt đầu từ đâu */}
      <section className="bg-brand-navy py-16 text-white lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Eyebrow light>Bắt đầu từ đâu</Eyebrow>
          <h2 className="max-w-3xl text-3xl font-bold leading-tight">Áp dụng nông nghiệp chính xác theo lộ trình 6 bước cùng {BRAND.os}</h2>
          <p className="mt-4 max-w-2xl text-white/75">Không cần đầu tư tất cả ngay từ đầu. Mỗi bước tạo ra dữ liệu và hiệu quả cho bước tiếp theo.</p>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {JOURNEY.map((s) => (
              <Link key={s.n} to={s.path} className="flex items-start gap-3 rounded-2xl bg-white/5 p-5 hover:bg-white/10">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-leaf text-sm font-bold text-brand-navy">{s.n}</span>
                <span>
                  <span className="block font-semibold">{s.title}</span>
                  <span className="block text-sm text-white/60">{s.menuHint}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Eyebrow>Câu hỏi thường gặp</Eyebrow>
          <div className="divide-y divide-border">
            {PRECISION_FAQ.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-brand-navy">
                  {f.q}
                  <span className="text-brand-leaf-deep transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
          <div className="mt-12 rounded-3xl bg-brand-sand p-8 text-center">
            <h2 className="text-2xl font-bold text-brand-navy">Trang trại của bạn nên bắt đầu từ đâu?</h2>
            <p className="mt-2 text-muted-foreground">Đội ngũ AgriBeacon sẽ khảo sát hiện trạng và đề xuất lộ trình phù hợp.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link to={BRAND.surveyPath} className="inline-flex items-center gap-2 rounded-full bg-brand-navy px-6 py-3 font-semibold text-white">
                Đặt lịch khảo sát trang trại <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/tools/roi-calculator" className="inline-flex items-center rounded-full border border-brand-navy/30 px-6 py-3 font-semibold text-brand-navy hover:bg-white">
                Tính hiệu quả đầu tư (ROI)
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PrecisionAgriculture;
