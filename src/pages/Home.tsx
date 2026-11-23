import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowDown, Check, X, Droplets, CloudSun, Sprout, Cpu, Power, ScrollText, ShieldCheck, Footprints, Smartphone, Users } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import VideoSlot from "@/components/revamp/VideoSlot";
import { VideoButton } from "@/components/revamp/VideoPlayer";
import FarmIllustration from "@/components/revamp/FarmIllustration";
import { PRECISION_PRINCIPLES } from "@/content/precision";
import ProblemSection from "@/components/revamp/ProblemSection";
import VisionSection from "@/components/revamp/VisionSection";
import { BRAND, DEPLOY_STEPS, DEVICES, JOURNEY, PARTNERS } from "@/content/site";
import CustomerMarquee from "@/components/revamp/CustomerMarquee";
import { cn } from "@/lib/utils";
import { rich } from "@/lib/rich";
import heroPoster from "@/assets/field/hero-farm-poster.jpg";
import sensorPoster from "@/assets/products/station-multi.jpg";
import dayPoster from "@/assets/field/team-vineyard-sensor.jpg";
import teamDrone from "@/assets/field/team-drone.jpg";
import teamSensor from "@/assets/field/team-vineyard-sensor.jpg";
import teamWater from "@/assets/field/team-water-station.jpg";
import appStoreBadge from "@/assets/badge-appstore.svg";
import googlePlayBadge from "@/assets/badge-googleplay.png";

const APP_STORE_URL = "https://apps.apple.com/us/app/agribeacon-farm-management/id6754689259?l=vi";
const GOOGLE_PLAY_URL = "https://play.google.com/store/apps/details?id=com.farmmanagement.mobile";

const Eyebrow = ({ children, light }: { children: React.ReactNode; light?: boolean }) => (
  <div className={cn("mb-4 text-xs font-bold uppercase tracking-[0.18em]", light ? "text-brand-leaf" : "text-brand-leaf-deep")}>{children}</div>
);

/* ---------- Hành trình 6 bước: cuộn kể chuyện ---------- */
const Journey = () => {
  const [active, setActive] = useState(1);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.step));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="hanh-trinh" className="border-t border-border bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>Hành trình 6 bước</Eyebrow>
          <h2 className="text-3xl font-bold leading-tight text-brand-navy sm:text-4xl lg:text-5xl">Từ một mảnh đất trống đến một trang trại vận hành bằng dữ liệu.</h2>
          <VideoButton video="planning3d" label="Xem mô phỏng 3D hành trình" className="mt-6" />
          <p className="mt-5 text-lg text-muted-foreground">
            {rich("Mỗi bước xây nền dữ liệu cho bước tiếp theo, để AI phát huy hiệu quả trên **dữ liệu thực tế** của trang trại.")}
          </p>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          {/* Cột chữ */}
          <div>
            {JOURNEY.map((s, i) => (
              <div
                key={s.n}
                ref={(el) => (refs.current[i] = el)}
                data-step={s.n}
                className={cn("flex min-h-[70vh] flex-col justify-center border-l-2 py-10 pl-6 transition-colors lg:pl-10", active === s.n ? "border-brand-leaf" : "border-border")}
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className={cn("flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold", s.highlight ? "bg-brand-leaf text-brand-navy" : "bg-brand-navy text-white")}>{s.n}</span>
                  {s.highlight && <span className="rounded-full bg-brand-leaf/20 px-3 py-1 text-xs font-bold text-brand-leaf-deep">Nền tảng dữ liệu cốt lõi</span>}
                </div>
                <h3 className="text-2xl font-bold text-brand-navy sm:text-3xl">{s.title}</h3>
                <p className="mt-3 text-lg italic text-brand-navy/70">“{s.question}”</p>
                <ul className="mt-5 space-y-2 text-[15px]">
                  <li className="flex items-start gap-2.5 text-muted-foreground">
                    <X className="mt-1 h-4 w-4 shrink-0 text-brand-amber" />
                    <span>{rich(s.pain)}</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-muted-foreground">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-brand-leaf-deep" />
                    <span>{rich(s.gain)}</span>
                  </li>
                </ul>
                <div className="mt-5 rounded-xl bg-brand-sand p-4">
                  <div className="mb-2 text-xs font-bold uppercase tracking-wider text-brand-leaf-deep">Kết quả đạt được</div>
                  <ul className="flex flex-wrap gap-2">
                    {s.dataOut.map((d) => (
                      <li key={d} className="rounded-full bg-white px-3 py-1 text-sm text-brand-navy">
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Mobile: minh họa nằm trong từng bước */}
                <FarmIllustration step={s.n} className="mt-6 w-full rounded-2xl bg-brand-sand/60 p-2 lg:hidden" />
                {s.n === 6 && (
                  <p className="mt-8 border-l-4 border-brand-leaf pl-4 text-xl font-semibold text-brand-navy">AI chỉ hiệu quả khi có dữ liệu thực tế. Vì vậy, chúng tôi giúp trang trại xây dựng dữ liệu trước.</p>
                )}
              </div>
            ))}
          </div>

          {/* Cột minh họa ghim */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <div className="rounded-3xl bg-brand-sand p-6">
                <FarmIllustration step={active} className="w-full" />
                <div className="mt-4 flex items-center justify-between">
                  {JOURNEY.map((s) => (
                    <div key={s.n} className="flex flex-1 flex-col items-center gap-1">
                      <div className={cn("h-1.5 w-full rounded-full transition-colors", s.n <= active ? "bg-brand-leaf" : "bg-brand-navy/10")} />
                      <span className={cn("text-[11px] font-semibold", s.n === active ? "text-brand-navy" : "text-brand-navy/40")}>{s.n}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-center text-sm font-semibold text-brand-navy">
                  Bước {active}: {JOURNEY[active - 1].short}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------- Điểm nhấn: trạm đo đa cảm biến + tưới tự động ---------- */
const SENSOR_CLUSTERS = [
  { icon: Sprout, name: "VY-SO · Đất", tag: "9in1", desc: "pH, EC, N, P, K, nhiệt độ, độ ẩm, độ mặn và chỉ số sức khỏe đất SHI" },
  { icon: Droplets, name: "VY-WA · Nước", tag: "5in1", desc: "pH, nhiệt độ, EC, TDS, độ mặn của nguồn nước tưới" },
  { icon: CloudSun, name: "VY-AIR · Khí hậu", tag: "8in1", desc: "Nhiệt độ, độ ẩm, gió, áp suất, mưa, ánh sáng, bức xạ" },
];
const RULES = [
  { when: "Độ ẩm đất khu 4 xuống dưới ngưỡng", then: "Tự bật van khu 4" },
  { when: "Đất đã đủ ẩm", then: "Tự dừng tưới, tránh lãng phí nước và phân bón" },
  { when: "Trạm khí hậu ghi nhận đang mưa", then: "Hoãn lịch tưới" },
  { when: "Chất lượng nước không đạt", then: "Ngừng bơm và cảnh báo quản lý" },
];

const SmartIrrigation = () => (
  <section className="bg-brand-sand py-20 lg:py-28">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <Eyebrow>Trạm đo đa cảm biến · Bước ③ → ⑤</Eyebrow>
          <h2 className="text-3xl font-bold leading-tight text-brand-navy sm:text-4xl lg:text-5xl">Trạm đo đa cảm biến kết nối trực tiếp hệ thống tưới</h2>
          <p className="mt-5 text-lg text-muted-foreground">
            {rich("**5 cảm biến** mỗi trạm, mở rộng bằng **mesh**, **tự bật/dừng tưới** theo dữ liệu thay vì theo giờ.")}
          </p>
          <div className="mt-8 grid gap-3">
            {SENSOR_CLUSTERS.map((c) => (
              <div key={c.name} className="flex items-start gap-4 rounded-2xl bg-white p-4">
                <c.icon className="mt-0.5 h-6 w-6 shrink-0 text-brand-leaf-deep" />
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-semibold text-brand-navy">{c.name}</span>
                    <span className="rounded bg-brand-leaf px-1.5 text-xs font-bold text-brand-navy">{c.tag}</span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex aspect-[4/3] items-center justify-center rounded-3xl bg-white p-6">
          <img src={sensorPoster} alt="Trạm đo đa cảm biến AIoT" className="h-full w-auto object-contain" loading="lazy" />
        </div>
      </div>

      {/* Luồng: trạm → bộ điều khiển → van/bơm → nhật ký */}
      <div className="mt-16 grid gap-3 md:grid-cols-4">
        {[
          { icon: Cpu, t: "Trạm đo đa cảm biến", d: "Đất 9in1 · nước 5in1 · khí hậu 8in1" },
          { icon: Power, t: "Trung tâm điều khiển VY-STA", d: "So dữ liệu thực tế với ngưỡng của từng khu" },
          { icon: Droplets, t: "Van & bơm", d: "Tự động bật/dừng, có thể điều khiển thủ công trên app" },
          { icon: ScrollText, t: "Nhật ký tưới", d: "Ghi lại thời điểm và lý do mỗi lần bật/dừng trên SutaGrow OS" },
        ].map((s, i) => (
          <div key={s.t} className="relative rounded-2xl bg-white p-5">
            <span className="text-xs font-bold text-brand-leaf-deep">0{i + 1}</span>
            <s.icon className="mt-2 h-6 w-6 text-brand-navy" />
            <div className="mt-3 font-semibold text-brand-navy">{s.t}</div>
            <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
            {i < 3 && <ArrowRight className="absolute -right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-brand-leaf-deep md:block" />}
          </div>
        ))}
      </div>

      <div className="mt-10 overflow-hidden rounded-2xl bg-white">
        <div className="grid grid-cols-2 bg-brand-navy px-5 py-3 text-xs font-bold uppercase tracking-wider text-white/80">
          <span>Điều kiện</span>
          <span>Hệ thống xử lý</span>
        </div>
        {RULES.map((r) => (
          <div key={r.when} className="grid grid-cols-2 gap-4 border-t border-border px-5 py-3 text-sm">
            <span className="text-brand-navy/80">{r.when}</span>
            <span className="font-semibold text-brand-leaf-deep">{r.then}</span>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <Link to="/devices/aiot" className="inline-flex items-center gap-2 rounded-full bg-brand-navy px-5 py-3 font-semibold text-white hover:bg-brand-navy-2">
          Xem trạm đo đa cảm biến <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  </section>
);

/* ---------- Một ngày trên farm ---------- */
const DAY = [
  { t: "05:30", who: "Quản lý farm", what: "Đọc tóm tắt 3 dòng của Tiểu Thần Nông, giao việc cho 3 tổ trên app." },
  { t: "06:00", who: "Tổ trưởng", what: "Chấm công đầu ca. Công nhật tự tính theo đơn giá." },
  { t: "07:15", who: "Trạm đo đa cảm biến", what: "Độ ẩm đất khu 4 xuống dưới ngưỡng, van khu 4 tự mở và tự đóng sau 45 phút." },
  { t: "09:10", who: "Công nhân", what: "Báo cáo bằng giọng nói: “Tỉa cành khu 2 xong”, kèm 2 ảnh hiện trường." },
  { t: "10:30", who: "Thủ kho", what: "Xuất 2 bao NPK cho khu 3, tồn kho cập nhật tự động." },
  { t: "14:00", who: "Kế toán", what: "Duyệt đề xuất mua thuốc BVTV, đơn mua gửi nhà cung cấp." },
  { t: "18:00", who: "Chủ farm", what: "Theo dõi chi phí trong ngày của từng khu, kể cả khi không có mặt tại trang trại." },
];

const ADayOnFarm = () => (
  <section className="bg-white py-20 lg:py-28">
    <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
      <div>
        <Eyebrow>Một ngày trên farm với {BRAND.os}</Eyebrow>
        <h2 className="text-3xl font-bold leading-tight text-brand-navy sm:text-4xl">Mọi công việc trong ngày đều được ghi nhận</h2>
        <VideoSlot video="sutagrowOverview" poster={dayPoster} brief="Một ngày vận hành thật trên farm" className="mt-8 aspect-video rounded-3xl" mediaClassName="object-[50%_60%]" />
      </div>
      <ol className="relative space-y-1 border-l-2 border-brand-navy/10 pl-6">
        {DAY.map((d) => (
          <li key={d.t} className="relative rounded-xl p-3 hover:bg-brand-sand/60">
            <span className="absolute -left-[33px] top-4 h-4 w-4 rounded-full border-4 border-white bg-brand-leaf" />
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-sm font-bold text-brand-navy">{d.t}</span>
              <span className="text-xs font-semibold uppercase tracking-wide text-brand-leaf-deep">{d.who}</span>
            </div>
            <p className="mt-1 text-brand-navy/80">{d.what}</p>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

/* ---------- Hệ sinh thái ---------- */
const Ecosystem = () => (
  <section className="bg-brand-sand py-20 lg:py-28">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <Eyebrow>Hệ sinh thái AgriBeacon</Eyebrow>
        <h2 className="text-3xl font-bold leading-tight text-brand-navy sm:text-4xl">Thiết bị và công việc cùng kết nối về một nền tảng</h2>
        <p className="mt-4 text-lg text-muted-foreground">{rich(`Thiết bị **thu thập**, ${BRAND.os} **điều phối**, Tiểu Thần Nông **gợi ý**.`)}</p>
        <VideoButton video="fieldIntro" label="Xem AgriBeacon tại thực địa" className="mt-6" />
      </div>
      <div className="relative mx-auto mt-14 max-w-4xl">
        <div className="grid items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
          <div className="space-y-3">
            {DEVICES.slice(0, 2).map((d) => (
              <Link key={d.path} to={d.path} className="block rounded-2xl bg-white p-4 ring-1 ring-transparent hover:ring-brand-leaf">
                <div className="font-semibold text-brand-navy">{d.name}</div>
                <div className="text-xs font-medium text-brand-leaf-deep">{d.model}</div>
                <div className="text-sm text-muted-foreground">{d.hint}</div>
              </Link>
            ))}
          </div>
          <div className="mx-auto flex h-56 w-56 flex-col items-center justify-center rounded-full bg-brand-navy text-center text-white shadow-[0_30px_80px_-30px_rgba(9,40,51,0.7)] ring-8 ring-brand-leaf/30">
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-leaf">✦ Tiểu Thần Nông</span>
            <span className="mt-2 text-2xl font-extrabold">{BRAND.os}</span>
            <span className="mt-1 px-6 text-xs text-white/60">Bản đồ · Công việc · Nhân công · Kho · Chi phí</span>
          </div>
          <div className="space-y-3">
            {DEVICES.slice(2).map((d) => (
              <Link key={d.path} to={d.path} className="block rounded-2xl bg-white p-4 ring-1 ring-transparent hover:ring-brand-leaf">
                <div className="font-semibold text-brand-navy">{d.name}</div>
                <div className="text-xs font-medium text-brand-leaf-deep">{d.model}</div>
                <div className="text-sm text-muted-foreground">{d.hint}</div>
              </Link>
            ))}
            <a href="#app" className="block rounded-2xl bg-white p-4 ring-1 ring-transparent hover:ring-brand-leaf">
              <div className="font-semibold text-brand-navy">App SutaGrow</div>
              <div className="text-sm text-muted-foreground">Ứng dụng cho người làm vườn, iOS & Android</div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ---------- Cách chúng tôi triển khai ---------- */
const Deploy = () => (
  <section className="bg-brand-sand py-20 lg:py-28">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <Eyebrow>Quy trình triển khai</Eyebrow>
          <h2 className="text-3xl font-bold leading-tight text-brand-navy sm:text-4xl">Đồng hành triển khai trực tiếp tại trang trại</h2>
          <p className="mt-4 text-lg text-muted-foreground">{rich("Khảo sát, lắp đặt, đào tạo và **đồng hành đến khi vận hành ổn định**.")}</p>
          <div className="mt-8 grid grid-cols-3 gap-3">
            {[teamSensor, teamDrone, teamWater].map((src, i) => (
              <img key={i} src={src} alt="Đội ngũ AgriBeacon triển khai tại trang trại" className="aspect-[3/5] w-full rounded-2xl object-cover" loading="lazy" />
            ))}
          </div>
        </div>
        <ol className="grid gap-3 sm:grid-cols-2">
          {DEPLOY_STEPS.map((d, i) => (
            <li key={d.t} className={cn("flex items-center gap-4 rounded-2xl bg-white p-4", i === DEPLOY_STEPS.length - 1 && "sm:col-span-2 bg-brand-leaf/25")}>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-navy text-sm font-bold text-white">{i + 1}</span>
              <span className="font-semibold text-brand-navy">{d.t}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  </section>
);

/* ---------- Bằng chứng: farm thật & đối tác ---------- */
const Proof = () => (
  <section className="bg-brand-sand py-20 lg:py-28">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <Eyebrow>Khách hàng</Eyebrow>
          <h2 className="text-3xl font-bold leading-tight text-brand-navy sm:text-4xl">Áp dụng cho mọi quy mô, từ vườn gia đình đến vùng trồng hàng nghìn ha</h2>
          <p className="mt-4 text-lg text-muted-foreground">Diện tích càng lớn, chi phí công nghệ trên mỗi hecta càng thấp và hiệu quả tối ưu càng rõ rệt.</p>
        </div>
        <Link to="/customers" className="inline-flex items-center gap-1 font-semibold text-brand-leaf-deep hover:gap-2">
          Xem tất cả khách hàng <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <CustomerMarquee className="mt-10" />

      <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <Eyebrow>Đối tác chuyên môn</Eyebrow>
          <h3 className="text-2xl font-bold text-brand-navy">Kết hợp công nghệ với chuyên môn nông nghiệp từ các viện, trường</h3>
          <Link to="/partners" className="mt-4 inline-flex items-center gap-1 font-semibold text-brand-leaf-deep hover:gap-2">
            Xem đối tác <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {PARTNERS.slice(0, 2).map((p) => (
            <div key={p.name} className="flex gap-4 rounded-2xl border border-brand-navy/10 bg-white p-5">
              <img src={p.logo} alt={`Logo ${p.name}`} className="h-14 w-14 shrink-0 rounded-full bg-white object-cover" loading="lazy" />
              <div>
                <div className="font-bold text-brand-navy">{p.name}</div>
                <div className="mt-1 text-sm font-medium text-brand-leaf-deep">{p.role}</div>
                <p className="mt-2 text-sm text-muted-foreground">{rich(p.desc)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* ---------- Farm bạn đang ở bước nào? ---------- */
const STAGES = [
  { label: "Chưa có bản đồ farm chính xác", step: 1 },
  { label: "Có bản đồ, chưa quản lý tới từng khu/cây", step: 2 },
  { label: "Tưới, bón theo kinh nghiệm, chưa đo", step: 3 },
  { label: "Ghi chép bằng sổ tay, Zalo, Excel", step: 4 },
  { label: "Đã có dữ liệu, chưa so sánh, chưa tự động", step: 5 },
  { label: "Dữ liệu đầy đủ, muốn AI hỗ trợ", step: 6 },
];

const Readiness = () => {
  const [pick, setPick] = useState<number | null>(null);
  const step = pick ? JOURNEY[pick - 1] : null;
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <Eyebrow>Tự đánh giá</Eyebrow>
          <h2 className="text-3xl font-bold text-brand-navy sm:text-4xl">Trang trại của bạn đang ở giai đoạn nào?</h2>
          <p className="mt-3 text-muted-foreground">Chọn mô tả phù hợp nhất với hiện trạng trang trại.</p>
        </div>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {STAGES.map((s) => (
            <button
              key={s.step}
              onClick={() => setPick(s.step)}
              className={cn(
                "rounded-2xl border p-4 text-left transition",
                pick === s.step ? "border-brand-navy bg-brand-navy text-white" : "border-border hover:border-brand-leaf",
              )}
            >
              {s.label}
            </button>
          ))}
        </div>
        {step && (
          <div className="mt-8 flex flex-col gap-4 rounded-3xl bg-brand-sand p-6 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-sm font-semibold text-brand-leaf-deep">Gợi ý bắt đầu từ bước {step.n}</div>
              <div className="text-xl font-bold text-brand-navy">{step.title}</div>
              <p className="mt-1 text-muted-foreground">{rich(step.gain)}</p>
            </div>
            <div className="flex shrink-0 gap-2">
              <Link to={step.path} className="rounded-full border border-brand-navy px-4 py-2.5 text-sm font-semibold text-brand-navy">
                Xem bước {step.n}
              </Link>
              <Link to={`${BRAND.surveyPath}&step=${step.n}`} className="rounded-full bg-brand-navy px-4 py-2.5 text-sm font-semibold text-white">
                Đặt lịch khảo sát
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

/* ---------- Cam kết + tải app ---------- */
const Commitments = () => (
  <section id="app" className="bg-white py-20">
    <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
      <div>
        <Eyebrow>Cam kết</Eyebrow>
        <h2 className="text-3xl font-bold text-brand-navy">Cam kết của AgriBeacon</h2>
        <ul className="mt-8 space-y-5">
          {[
            { icon: ShieldCheck, t: "Dữ liệu farm thuộc về bạn", d: "Xuất dữ liệu bất cứ lúc nào, **không chia sẻ** khi chưa đồng ý." },
            { icon: Footprints, t: "Triển khai linh hoạt từng bước", d: "**Không bắt buộc trọn gói**, triển khai theo nhu cầu." },
            { icon: Users, t: "Đội ngũ hỗ trợ tại chỗ", d: "Khảo sát, lắp đặt, **đào tạo tại chỗ** 30 ngày đầu." },
            { icon: Smartphone, t: "Dễ dùng cho người làm vườn", d: "Giao diện đơn giản, **nhập liệu bằng giọng nói**." },
          ].map((c) => (
            <li key={c.t} className="flex gap-4">
              <c.icon className="mt-1 h-6 w-6 shrink-0 text-brand-leaf-deep" />
              <div>
                <div className="font-semibold text-brand-navy">{c.t}</div>
                <p className="text-sm text-muted-foreground">{rich(c.d)}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-3xl bg-brand-sand p-8">
        <h3 className="text-2xl font-bold text-brand-navy">Tải app SutaGrow</h3>
        <p className="mt-2 text-muted-foreground">Quản lý trang trại ngay trên điện thoại, iOS và Android.</p>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {[
            { name: "App Store", url: APP_STORE_URL, badge: appStoreBadge, cls: "h-11" },
            { name: "Google Play", url: GOOGLE_PLAY_URL, badge: googlePlayBadge, cls: "h-16 -my-2.5" },
          ].map((s) => (
            <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 rounded-2xl bg-white p-4 ring-1 ring-transparent hover:ring-brand-leaf">
              <QRCodeSVG value={s.url} size={112} fgColor="#092833" />
              <img src={s.badge} alt={s.name} className={cn("w-auto", s.cls)} />
            </a>
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* ---------- Trang chủ ---------- */
const Home = () => {
  return (
    <main className="font-sans">
      {/* Hero */}
      <section className="relative flex min-h-[92vh] items-end overflow-hidden pt-16">
        <VideoSlot src="/videos/hero-farm.mp4" poster={heroPoster} brief="Trang trại nhìn từ xa" className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-14 pt-24 sm:px-6 lg:px-8 lg:pb-20">
          <div className="max-w-3xl text-white">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-brand-leaf" /> {BRAND.os} by AgriBeacon
            </div>
            <h1 className="text-4xl font-extrabold leading-[1.08] sm:text-5xl lg:text-7xl">
              Hệ điều hành <span className="text-brand-leaf">AIoT</span> cho trang trại
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/85 sm:text-xl">
              Hợp nhất dữ liệu thực địa và vận hành trên một nền tảng, giúp trang trại canh tác chính xác, kiểm soát chi phí và đạt chuẩn xuất khẩu.
            </p>
            <div className="mt-8 flex flex-col flex-wrap gap-3 sm:flex-row">
              <Link to={BRAND.surveyPath} className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-brand-leaf px-6 py-3.5 font-semibold text-brand-navy hover:brightness-105">
                Đặt lịch khảo sát trang trại <ArrowRight className="h-4 w-4" />
              </Link>
              <VideoButton video="ecosystem" label="Xem video giới thiệu" light className="justify-center whitespace-nowrap py-3.5" />
              <a href="#hanh-trinh" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-4 py-3.5 font-semibold text-white/90 hover:text-white">
                Xem hành trình 6 bước <ArrowDown className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <ProblemSection />

      {/* Nông nghiệp chính xác – giới thiệu ngắn */}
      <section className="bg-white py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:px-8">
          <div>
            <Eyebrow>Hướng đi</Eyebrow>
            <h2 className="text-3xl font-bold leading-tight text-brand-navy sm:text-4xl">Nông nghiệp chính xác: canh tác dựa trên dữ liệu thay vì cảm tính</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {rich("Quản lý theo **dữ liệu từng khu, từng cây**: dùng **ít vật tư hơn**, năng suất **ổn định hơn**, **minh bạch** hơn với thị trường.")}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link to="/precision-agriculture" className="inline-flex items-center gap-1 font-semibold text-brand-leaf-deep hover:gap-2">
                Tìm hiểu về nông nghiệp chính xác <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/tools/roi-calculator" className="inline-flex items-center gap-2 rounded-full bg-brand-navy px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-navy-2">
                Tính hiệu quả đầu tư cho trang trại <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {PRECISION_PRINCIPLES.map((p, i) => (
              <div key={p.t} className="rounded-2xl bg-brand-sand p-5">
                <span className="text-xs font-bold text-brand-leaf-deep">0{i + 1}</span>
                <div className="mt-1 text-lg font-bold text-brand-navy">{p.t}</div>
                <p className="mt-1 text-sm text-muted-foreground">{rich(p.d)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Journey />
      <SmartIrrigation />
      <ADayOnFarm />
      <Ecosystem />
      <VisionSection />
      <Proof />
      <Readiness />
      <Deploy />
      <Commitments />

      {/* CTA cuối */}
      <section className="bg-brand-leaf/30 py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-4 sm:px-6 md:flex-row md:items-center lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold text-brand-navy sm:text-4xl">Bắt đầu với một buổi khảo sát trang trại</h2>
            <p className="mt-3 text-lg text-brand-navy/75">{rich("Đánh giá hiện trạng tại chỗ, đề xuất **lộ trình phù hợp**.")}</p>
          </div>
          <Link to={BRAND.surveyPath} className="inline-flex shrink-0 items-center gap-2 rounded-full bg-brand-navy px-6 py-3.5 font-semibold text-white hover:bg-brand-navy-2">
            Đặt lịch khảo sát trang trại <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Home;
