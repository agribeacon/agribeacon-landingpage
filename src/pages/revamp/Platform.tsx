import { Link, useLocation } from "react-router-dom";
import { ArrowRight, BarChart3, Building2, Globe2, ListChecks, Map, Radio } from "lucide-react";
import { useEffect } from "react";
import FarmIllustration from "@/components/revamp/FarmIllustration";
import { VideoGallery } from "@/components/revamp/VideoPlayer";
import multiDashboard from "@/assets/field/multifarm-dashboard.jpg";
import multiGis from "@/assets/field/multifarm-gis.jpg";
import { BRAND, DEVICES, JOURNEY } from "@/content/site";
import { cn } from "@/lib/utils";
import { rich } from "@/lib/rich";

const LAYERS = [
  { t: "Lớp trí tuệ", d: "Báo cáo, định mức, cảnh báo, Tiểu Thần Nông", tone: "bg-brand-navy text-white" },
  { t: "Lớp vận hành", d: "Bản đồ, công việc, nhân công, kho, chi phí, phê duyệt", tone: "bg-brand-leaf text-brand-navy" },
  { t: "Lớp thu thập", d: "MONRTK, MONSKY, trạm đo VY-SO/VY-WA/VY-AIR, app, giọng nói", tone: "bg-brand-leaf/40 text-brand-navy" },
  { t: "Lớp vật lý", d: "Đất, cây, nước, con người, máy móc", tone: "bg-brand-sand text-brand-navy" },
];

const Platform = () => {
  useEffect(() => {
    document.title = `${BRAND.os} – Hệ điều hành AIoT cho trang trại | AgriBeacon`;
  }, []);

  // Cuộn tới mục theo hash (ví dụ /platform#multi-farm)
  const { hash } = useLocation();
  useEffect(() => {
    if (!hash) return;
    const t = setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" }), 100);
    return () => clearTimeout(t);
  }, [hash]);

  return (
    <main>
      <section className="bg-brand-sand pb-16 pt-28 lg:pt-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-brand-leaf-deep">{BRAND.os} by AgriBeacon</div>
            <h1 className="text-4xl font-extrabold leading-tight text-brand-navy sm:text-6xl">Quản lý toàn bộ hoạt động trang trại trên một nền tảng</h1>
            <p className="mt-6 text-lg text-brand-navy/75">
              Giống như hệ điều hành trên điện thoại giúp các ứng dụng dùng chung dữ liệu, {BRAND.os} kết nối bản đồ, cảm biến, nhân công, kho và chi phí của trang trại. Điều hành mỗi ngày, truy xuất đến từng cây.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="space-y-2">
            {LAYERS.map((l) => (
              <div key={l.t} className={cn("rounded-2xl p-5", l.tone)}>
                <div className="font-bold">{l.t}</div>
                <div className="text-sm opacity-80">{l.d}</div>
              </div>
            ))}
          </div>
          <div>
            <h2 className="text-3xl font-bold text-brand-navy">Một cây, một hồ sơ xuyên suốt.</h2>
            <p className="mt-4 text-muted-foreground">
              Mô hình dữ liệu xoay quanh cái cây: Trang trại → Khu → Luống → Cây. Mỗi cây một mã, mỗi việc làm, mỗi bao phân, mỗi lần thu hoạch đều gắn với đúng cây đó; quét mã QR để xem toàn bộ lịch sử.
            </p>
            <ol className="mt-6 flex flex-wrap items-center gap-2 text-sm font-semibold text-brand-navy">
              {["Cây SG-K03-087", "Nhật ký chăm sóc", "Vật tư & người làm", "Lô thu hoạch", "QR / báo cáo"].map((x, i, a) => (
                <li key={x} className="flex items-center gap-2">
                  <span className="rounded-full bg-brand-sand px-3 py-1.5">{x}</span>
                  {i < a.length - 1 && <ArrowRight className="h-4 w-4 text-brand-leaf-deep" />}
                </li>
              ))}
            </ol>
            <p className="mt-6 text-sm text-muted-foreground">Web cho văn phòng · App iOS & Android cho ngoài vườn · Quản lý nhiều farm trên một bản đồ.</p>
          </div>
        </div>
      </section>

      <section className="bg-white pb-16 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <VideoGallery videos={["sutagrowOverview"]} />
        </div>
      </section>

      <section className="bg-brand-sand py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-brand-navy">Hành trình 6 bước</h2>
          <p className="mt-2 text-muted-foreground">Có thể bắt đầu từ bước phù hợp với nhu cầu, không bắt buộc triển khai đủ 6 bước.</p>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {JOURNEY.map((s) => (
              <Link key={s.n} to={s.path} className={cn("group flex flex-col rounded-3xl bg-white p-5 transition hover:-translate-y-1", s.highlight && "ring-2 ring-brand-leaf")}>
                <FarmIllustration step={s.n} className="w-full rounded-2xl bg-brand-sand/60" />
                <div className="mt-4 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-navy text-sm font-bold text-white">{s.n}</span>
                  <span className="font-bold text-brand-navy">{s.title}</span>
                </div>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{rich(s.gain)}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-leaf-deep group-hover:gap-2">
                  Xem chi tiết <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quản lý đa trang trại */}
      <section id="multi-farm" className="scroll-mt-20 bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <div>
              <div className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-brand-leaf-deep">Quản lý đa trang trại</div>
              <h2 className="text-3xl font-bold leading-tight text-brand-navy sm:text-4xl">Nhiều trang trại, nhiều quốc gia, một bản đồ vận hành</h2>
              <p className="mt-4 text-lg text-muted-foreground">{rich("Dành cho doanh nghiệp và HTX quản lý **nhiều trang trại, vùng trồng**: chuẩn hóa một lần, áp dụng cho tất cả.")}</p>
              <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  { icon: Map, t: "Một bản đồ GIS/RTK", d: "Mọi **trang trại, vùng trồng, thửa đất** trên một màn hình." },
                  { icon: BarChart3, t: "KPI liên địa điểm", d: "So sánh **năng suất, chi phí, giá thành** giữa các trang trại." },
                  { icon: ListChecks, t: "Quy trình chuẩn chung", d: "Một **SOP** áp dụng cho mọi nơi." },
                  { icon: Building2, t: "Phân quyền theo tổ chức", d: "**Chủ, quản lý vùng, quản lý trang trại**, kỹ thuật, kế toán." },
                  { icon: Radio, t: "Giám sát tập trung", d: "Trạm đo và **cảnh báo toàn hệ thống**." },
                  { icon: Globe2, t: "Quản lý từ xa", d: "Theo dõi trang trại **ở quốc gia khác** theo thời gian thực." },
                ].map((f) => (
                  <li key={f.t} className="flex gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-leaf/20">
                      <f.icon className="h-5 w-5 text-brand-leaf-deep" />
                    </span>
                    <div>
                      <div className="font-semibold text-brand-navy">{f.t}</div>
                      <p className="text-sm text-muted-foreground">{rich(f.d)}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <Link to="/contact?need=quote&plan=multi-farm" className="inline-flex items-center gap-2 rounded-full bg-brand-navy px-5 py-3 font-semibold text-white hover:bg-brand-navy-2">
                  Tư vấn giải pháp đa trang trại <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/tools/roi-calculator" className="inline-flex items-center gap-1 font-semibold text-brand-leaf-deep hover:gap-2">
                  Diện tích lớn hơn, chi phí/ha thấp hơn: tính ROI <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="relative">
              <img src={multiGis} alt="Bản đồ GIS nhiều khu trồng với lớp nhiệt độ pH đất trên SutaGrow OS" className="w-full rounded-3xl shadow-[0_30px_80px_-40px_rgba(9,40,51,0.5)]" loading="lazy" />
              <img src={multiDashboard} alt="Màn hình chọn trang trại để làm việc trên SutaGrow OS" className="mt-4 w-full rounded-2xl shadow-[0_30px_80px_-40px_rgba(9,40,51,0.5)] lg:absolute lg:-bottom-10 lg:-left-10 lg:mt-0 lg:w-3/5" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-brand-sand py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-brand-navy">Thiết bị trong hệ sinh thái, đồng bộ dữ liệu tự động về {BRAND.os}</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {DEVICES.map((d) => (
              <Link key={d.path} to={d.path} className="rounded-2xl bg-white p-5 ring-1 ring-transparent hover:ring-brand-leaf">
                <div className="font-semibold text-brand-navy">{d.name}</div>
                <div className="text-xs font-medium text-brand-leaf-deep">{d.model}</div>
                <p className="mt-2 text-sm text-muted-foreground">{d.hint}</p>
                <p className="mt-3 text-xs text-muted-foreground">Bước {d.steps.join(", ")}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Platform;
