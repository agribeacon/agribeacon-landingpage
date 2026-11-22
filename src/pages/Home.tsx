import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowDown, NotebookPen, Wallet, PackageX, Droplets, CloudSun, Sprout, Cpu, Power, ScrollText, ShieldCheck, Footprints, Smartphone, Users } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import VideoSlot from "@/components/revamp/VideoSlot";
import FarmIllustration from "@/components/revamp/FarmIllustration";
import { BRAND, DEPLOY_STEPS, DEVICES, FARMS, JOURNEY, MARKET, PARTNERS, PROJECTS, PROOF_LINE } from "@/content/site";
import { cn } from "@/lib/utils";
import heroPoster from "@/assets/field/drone-cacao.jpg";
import sensorPoster from "@/assets/field/team-water-station.jpg";
import dayPoster from "@/assets/field/team-vineyard-sensor.jpg";
import teamDrone from "@/assets/field/team-drone.jpg";
import teamSensor from "@/assets/field/team-vineyard-sensor.jpg";
import teamWater from "@/assets/field/team-water-station.jpg";
import robotPoster from "@/assets/field/robot-vineyard.jpg";
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
    <section id="hanh-trinh" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>Hành trình 6 bước</Eyebrow>
          <h2 className="text-3xl font-bold leading-tight text-brand-navy sm:text-4xl lg:text-5xl">Từ một mảnh đất trống đến một trang trại vận hành bằng dữ liệu.</h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Không nhảy cóc. Mỗi bước tạo ra dữ liệu cho bước sau – và AI chỉ xuất hiện khi dữ liệu đã đủ.
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
                  {s.highlight && <span className="rounded-full bg-brand-leaf/20 px-3 py-1 text-xs font-bold text-brand-leaf-deep">Trái tim của hệ thống</span>}
                </div>
                <h3 className="text-2xl font-bold text-brand-navy sm:text-3xl">{s.title}</h3>
                <p className="mt-3 text-lg italic text-brand-navy/70">“{s.question}”</p>
                <p className="mt-5 text-muted-foreground">
                  <span className="font-semibold text-brand-navy">Thực tế: </span>
                  {s.problem}
                </p>
                <p className="mt-3 text-muted-foreground">
                  <span className="font-semibold text-brand-navy">Chúng tôi làm: </span>
                  {s.answer}
                </p>
                <div className="mt-5 rounded-xl bg-brand-sand p-4">
                  <div className="mb-2 text-xs font-bold uppercase tracking-wider text-brand-leaf-deep">Dữ liệu bạn có được</div>
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
                <Link to={s.path} className="mt-6 inline-flex items-center gap-1 font-semibold text-brand-leaf-deep hover:gap-2">
                  Tìm hiểu bước này <ArrowRight className="h-4 w-4" />
                </Link>
                {s.n === 6 && (
                  <p className="mt-8 border-l-4 border-brand-leaf pl-4 text-xl font-semibold text-brand-navy">AI chỉ tốt bằng dữ liệu bạn có. Chúng tôi giúp bạn có dữ liệu đó trước.</p>
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
  { icon: Sprout, name: "VY-SO · Đất", tag: "9in1", desc: "N, P, K, pH, EC, độ ẩm, nhiệt độ, độ mặn…" },
  { icon: Droplets, name: "VY-WA · Nước", tag: "5in1", desc: "pH, nhiệt độ, EC, TDS, độ mặn – nước tưới có an toàn không" },
  { icon: CloudSun, name: "VY-AIR · Khí hậu", tag: "8in1", desc: "Nhiệt độ, độ ẩm, gió, áp suất, mưa, ánh sáng, bức xạ" },
];
const RULES = [
  { when: "Độ ẩm đất lô 4 xuống dưới ngưỡng", then: "Tự bật van lô 4" },
  { when: "Đất đã đủ ẩm", then: "Tự dừng tưới – không lãng phí nước, phân" },
  { when: "Trạm khí hậu ghi nhận đang mưa", then: "Hoãn lịch tưới" },
  { when: "Chất lượng nước không đạt", then: "Không bơm, báo quản lý" },
];

const SmartIrrigation = () => (
  <section className="bg-brand-navy py-20 text-white lg:py-28">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <Eyebrow light>Trạm đo đa cảm biến · Bước ③ → ⑤</Eyebrow>
          <h2 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">Một trạm đo. Ba lớp dữ liệu. Tự bật, tự dừng tưới.</h2>
          <p className="mt-5 text-lg text-white/75">
            Đất, nước và khí hậu được đo trên cùng một trạm – cắm là chạy, tới 5 cảm biến mỗi trạm, nối mesh khi farm lớn. Và trạm nối thẳng vào hệ thống điều khiển tưới: tưới khi cây cần, dừng khi đất đủ, chứ không theo giờ cố định.
          </p>
          <div className="mt-8 grid gap-3">
            {SENSOR_CLUSTERS.map((c) => (
              <div key={c.name} className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                <c.icon className="mt-0.5 h-6 w-6 shrink-0 text-brand-leaf" />
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-semibold">{c.name}</span>
                    <span className="rounded bg-brand-leaf px-1.5 text-xs font-bold text-brand-navy">{c.tag}</span>
                  </div>
                  <p className="mt-1 text-sm text-white/60">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <VideoSlot poster={sensorPoster} brief="Trạm đo ngoài farm + van tưới tự mở" className="aspect-[4/3] rounded-3xl" mediaClassName="object-[50%_75%]" />
      </div>

      {/* Luồng: trạm → bộ điều khiển → van/bơm → nhật ký */}
      <div className="mt-16 grid gap-3 md:grid-cols-4">
        {[
          { icon: Cpu, t: "Trạm đo đa cảm biến", d: "Đất 9in1 · nước 5in1 · khí hậu 8in1" },
          { icon: Power, t: "Trung tâm điều khiển VY-STA", d: "So dữ liệu thực tế với ngưỡng của từng lô" },
          { icon: Droplets, t: "Van & bơm", d: "Tự bật / tự dừng – vẫn bấm tay được từ app" },
          { icon: ScrollText, t: "Nhật ký tưới", d: "Bật lúc nào, dừng lúc nào, vì sao – lưu vào SutaGrow OS" },
        ].map((s, i) => (
          <div key={s.t} className="relative rounded-2xl bg-white/5 p-5">
            <span className="text-xs font-bold text-brand-leaf">0{i + 1}</span>
            <s.icon className="mt-2 h-6 w-6 text-white" />
            <div className="mt-3 font-semibold">{s.t}</div>
            <p className="mt-1 text-sm text-white/60">{s.d}</p>
            {i < 3 && <ArrowRight className="absolute -right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-brand-leaf md:block" />}
          </div>
        ))}
      </div>

      <div className="mt-10 overflow-hidden rounded-2xl border border-white/10">
        <div className="grid grid-cols-2 bg-white/5 px-5 py-3 text-xs font-bold uppercase tracking-wider text-white/50">
          <span>Khi dữ liệu cho thấy…</span>
          <span>Hệ thống tự…</span>
        </div>
        {RULES.map((r) => (
          <div key={r.when} className="grid grid-cols-2 gap-4 border-t border-white/10 px-5 py-3 text-sm">
            <span className="text-white/80">{r.when}</span>
            <span className="font-semibold text-brand-leaf">{r.then}</span>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <Link to="/devices/aiot" className="inline-flex items-center gap-2 rounded-full bg-brand-leaf px-5 py-3 font-semibold text-brand-navy hover:brightness-105">
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
  { t: "07:15", who: "Trạm đo đa cảm biến", what: "Đất lô 4 xuống dưới ngưỡng ẩm → van lô 4 tự mở, 45 phút sau tự đóng." },
  { t: "09:10", who: "Công nhân", what: "Nói vào app: “Tỉa cành lô 2 xong” – kèm 2 ảnh." },
  { t: "10:30", who: "Thủ kho", what: "Xuất 2 bao NPK cho lô 3 – tồn kho cập nhật ngay." },
  { t: "14:00", who: "Kế toán", what: "Duyệt đề xuất mua thuốc BVTV, đơn mua gửi nhà cung cấp." },
  { t: "18:00", who: "Chủ farm", what: "Xem chi phí hôm nay theo từng lô – ở bất kỳ đâu." },
];

const ADayOnFarm = () => (
  <section className="bg-brand-sand py-20 lg:py-28">
    <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
      <div>
        <Eyebrow>Một ngày trên farm với {BRAND.os}</Eyebrow>
        <h2 className="text-3xl font-bold leading-tight text-brand-navy sm:text-4xl">Không phải demo. Là một ngày làm vườn bình thường – được ghi lại.</h2>
        <VideoSlot poster={dayPoster} brief="Một ngày vận hành thật trên farm" className="mt-8 aspect-video rounded-3xl" mediaClassName="object-[50%_60%]" />
      </div>
      <ol className="relative space-y-1 border-l-2 border-brand-navy/10 pl-6">
        {DAY.map((d) => (
          <li key={d.t} className="relative rounded-xl p-3 hover:bg-white/60">
            <span className="absolute -left-[33px] top-4 h-4 w-4 rounded-full border-4 border-brand-sand bg-brand-leaf" />
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
  <section className="bg-white py-20 lg:py-28">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <Eyebrow>Hệ sinh thái AgriBeacon</Eyebrow>
        <h2 className="text-3xl font-bold leading-tight text-brand-navy sm:text-4xl">Mọi thiết bị, mọi công việc, một nơi hội tụ dữ liệu.</h2>
        <p className="mt-4 text-lg text-muted-foreground">Thiết bị thu thập và thực thi. {BRAND.os} ghi nhận và điều phối. Tiểu Thần Nông đọc và gợi ý.</p>
      </div>
      <div className="relative mx-auto mt-14 max-w-4xl">
        <div className="grid items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
          <div className="space-y-3">
            {DEVICES.slice(0, 2).map((d) => (
              <Link key={d.path} to={d.path} className="block rounded-2xl border border-border p-4 hover:border-brand-leaf">
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
              <Link key={d.path} to={d.path} className="block rounded-2xl border border-border p-4 hover:border-brand-leaf">
                <div className="font-semibold text-brand-navy">{d.name}</div>
                <div className="text-xs font-medium text-brand-leaf-deep">{d.model}</div>
                <div className="text-sm text-muted-foreground">{d.hint}</div>
              </Link>
            ))}
            <a href="#app" className="block rounded-2xl border border-border p-4 hover:border-brand-leaf">
              <div className="font-semibold text-brand-navy">App SutaGrow</div>
              <div className="text-sm text-muted-foreground">Cho người làm vườn – iOS & Android</div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ---------- Sau bước 6: kết nối thương mại ---------- */
const Market = () => (
  <section className="relative overflow-hidden bg-brand-navy text-white">
    <img src={robotPoster} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" loading="lazy" />
    <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="max-w-3xl">
        <Eyebrow light>Và rồi: dữ liệu thành giá trị</Eyebrow>
        <h2 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">Khi mỗi cây có một hồ sơ, nông sản có bằng chứng.</h2>
        <p className="mt-5 text-lg text-white/80">
          {MARKET.name} – {MARKET.desc}
        </p>
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {MARKET.points.map((p) => (
          <div key={p.t} className="rounded-2xl border border-white/15 bg-brand-navy/70 p-5 backdrop-blur">
            <div className="font-semibold text-brand-leaf">{p.t}</div>
            <p className="mt-2 text-sm text-white/75">{p.d}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ---------- Cách chúng tôi triển khai ---------- */
const Deploy = () => (
  <section className="bg-white py-20 lg:py-28">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <Eyebrow>Cách chúng tôi làm việc</Eyebrow>
          <h2 className="text-3xl font-bold leading-tight text-brand-navy sm:text-4xl">Không bán phần mềm rồi để đó. Đội ngũ ra tận farm.</h2>
          <p className="mt-4 text-lg text-muted-foreground">Mỗi farm, mỗi HTX một hiện trạng khác. Chúng tôi triển khai hệ thống vận hành vừa với thực tế của bạn – từ khảo sát đến khi tự chạy được.</p>
          <div className="mt-8 grid grid-cols-3 gap-3">
            {[teamSensor, teamDrone, teamWater].map((src, i) => (
              <img key={i} src={src} alt="Đội AgriBeacon triển khai tại farm" className="aspect-[3/5] w-full rounded-2xl object-cover" loading="lazy" />
            ))}
          </div>
        </div>
        <ol className="grid gap-3 sm:grid-cols-2">
          {DEPLOY_STEPS.map((d, i) => (
            <li key={d.t} className={cn("rounded-2xl border border-border p-5", i === DEPLOY_STEPS.length - 1 && "sm:col-span-2 bg-brand-sand border-transparent")}>
              <span className="text-xs font-bold text-brand-leaf-deep">BƯỚC {i + 1}</span>
              <div className="mt-1 font-semibold text-brand-navy">{d.t}</div>
              <p className="mt-1 text-sm text-muted-foreground">{d.d}</p>
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
          <h2 className="text-3xl font-bold leading-tight text-brand-navy sm:text-4xl">Từ 0,5 ha đến 80 ha. Bắt đầu nhỏ cũng được.</h2>
        </div>
        <Link to="/customers" className="inline-flex items-center gap-1 font-semibold text-brand-leaf-deep hover:gap-2">
          Xem tất cả farm <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {FARMS.map((f) => (
          <div key={f.name} className={cn("flex flex-col rounded-2xl bg-white p-5", f.featured && "lg:col-span-1 ring-1 ring-brand-leaf/50")}>
            <div className="text-xs font-bold uppercase tracking-wider text-brand-leaf-deep">{f.crop}</div>
            <div className="mt-1 text-3xl font-extrabold text-brand-navy">{f.area}</div>
            <div className="mt-2 font-semibold text-brand-navy">{f.name}</div>
            <div className="text-sm text-muted-foreground">{f.location}</div>
            <p className="mt-3 flex-1 text-sm text-brand-navy/70">{f.note}</p>
          </div>
        ))}
      </div>

      <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <Eyebrow>Đối tác chuyên môn</Eyebrow>
          <h3 className="text-2xl font-bold text-brand-navy">Công nghệ của chúng tôi, chuyên môn của những người hiểu cây trồng nhất.</h3>
          <Link to="/partners" className="mt-4 inline-flex items-center gap-1 font-semibold text-brand-leaf-deep hover:gap-2">
            Đối tác & dự án <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {PARTNERS.slice(0, 2).map((p) => (
            <div key={p.name} className="rounded-2xl border border-brand-navy/10 bg-white p-5">
              <div className="font-bold text-brand-navy">{p.name}</div>
              <div className="mt-1 text-sm font-medium text-brand-leaf-deep">{p.role}</div>
              <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
            </div>
          ))}
          {PROJECTS.map((p) => (
            <div key={p.name} className="rounded-2xl border border-dashed border-brand-navy/20 p-5">
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Dự án · {p.place}</div>
              <div className="mt-1 font-bold text-brand-navy">{p.name}</div>
              <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
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
  { label: "Có bản đồ, chưa quản lý tới từng lô/cây", step: 2 },
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
          <h2 className="text-3xl font-bold text-brand-navy sm:text-4xl">Farm của bạn đang ở bước nào?</h2>
          <p className="mt-3 text-muted-foreground">Chọn câu đúng nhất với farm của bạn hôm nay.</p>
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
              <div className="text-sm font-semibold text-brand-leaf-deep">Bước nên bắt đầu: {step.n}</div>
              <div className="text-xl font-bold text-brand-navy">{step.title}</div>
              <p className="mt-1 text-muted-foreground">{step.answer}</p>
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
  <section id="app" className="bg-brand-sand py-20">
    <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
      <div>
        <Eyebrow>Cam kết</Eyebrow>
        <h2 className="text-3xl font-bold text-brand-navy">Những điều chúng tôi hứa – và giữ.</h2>
        <ul className="mt-8 space-y-5">
          {[
            { icon: ShieldCheck, t: "Dữ liệu farm thuộc về bạn", d: "Xuất ra bất cứ lúc nào. Không bán, không chia sẻ khi chưa được phép." },
            { icon: Footprints, t: "Bắt đầu nhỏ, đi từng bước", d: "Không bắt mua trọn gói. Bắt đầu từ bước farm bạn đang cần." },
            { icon: Users, t: "Đội ngũ ra tận farm", d: "Khảo sát, lắp đặt, đào tạo tại chỗ trong 30 ngày đầu." },
            { icon: Smartphone, t: "Làm cho người cầm cuốc", d: "App đơn giản, nói thay gõ, dùng được ngay ngoài vườn." },
          ].map((c) => (
            <li key={c.t} className="flex gap-4">
              <c.icon className="mt-1 h-6 w-6 shrink-0 text-brand-leaf-deep" />
              <div>
                <div className="font-semibold text-brand-navy">{c.t}</div>
                <p className="text-sm text-muted-foreground">{c.d}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-3xl bg-white p-8">
        <h3 className="text-2xl font-bold text-brand-navy">Tải app SutaGrow</h3>
        <p className="mt-2 text-muted-foreground">Gói Starter miễn phí cho farm dưới 1 ha – tự vẽ bản đồ và ghi công việc ngay hôm nay.</p>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {[
            { name: "App Store", url: APP_STORE_URL, badge: appStoreBadge, cls: "h-11" },
            { name: "Google Play", url: GOOGLE_PLAY_URL, badge: googlePlayBadge, cls: "h-16 -my-2.5" },
          ].map((s) => (
            <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 rounded-2xl border border-border p-4 hover:border-brand-leaf">
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
  const [heroVideoUrl, setHeroVideoUrl] = useState<string>("");

  useEffect(() => {
    fetch("/api/hero-video")
      .then((r) => r.json())
      .then((data) => data?.url && setHeroVideoUrl(data.url))
      .catch(() => undefined);
  }, []);

  return (
    <main className="font-sans">
      {/* Hero */}
      <section className="relative flex min-h-[92vh] items-end overflow-hidden pt-16">
        <VideoSlot src={heroVideoUrl || undefined} poster={heroPoster} brief="Flycam mảnh đất: từ đất trống đến vườn cây" className="absolute inset-0" overlay />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-14 pt-24 sm:px-6 lg:px-8 lg:pb-20">
          <div className="max-w-3xl text-white">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-brand-leaf" /> {BRAND.os} by AgriBeacon
            </div>
            <h1 className="text-4xl font-extrabold leading-[1.08] sm:text-5xl lg:text-7xl">
              Hệ điều hành AIoT cho trang trại,
              <span className="text-brand-leaf"> bắt đầu từ mảnh đất.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/85 sm:text-xl">
              Từ đo đạc, quy hoạch, trạm cảm biến đến ghi nhận từng công việc mỗi ngày – {BRAND.os} giúp farm của bạn có dữ liệu thật trước. Rồi mới tối ưu, tự động hóa và để AI làm phần việc lặp lại.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to={BRAND.surveyPath} className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-leaf px-6 py-3.5 font-semibold text-brand-navy hover:brightness-105">
                Đặt lịch khảo sát farm <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#hanh-trinh" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-6 py-3.5 font-semibold text-white hover:bg-white/10">
                Xem hành trình 6 bước <ArrowDown className="h-4 w-4" />
              </a>
            </div>
          </div>
          <p className="mt-12 border-t border-white/20 pt-5 text-sm text-white/75">{PROOF_LINE}</p>
        </div>
      </section>

      {/* Vấn đề */}
      <section className="bg-brand-sand py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Eyebrow>Nói thẳng</Eyebrow>
            <h2 className="text-3xl font-bold leading-tight text-brand-navy sm:text-4xl">Phần lớn trang trại không thiếu công nghệ. Họ thiếu dữ liệu đáng tin.</h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              { icon: NotebookPen, t: "Sổ tay, Zalo, Excel rời rạc", d: "Thông tin nằm ở nhiều nơi, mỗi người giữ một phần. Người nghỉ việc là dữ liệu đi theo." },
              { icon: Wallet, t: "Không biết chi phí thật của từng lô", d: "Cuối vụ mới cộng sổ – và vẫn không biết lô nào lời, lô nào lỗ." },
              { icon: PackageX, t: "Mua thiết bị rồi để đó", d: "Drone, cảm biến được mua trước khi có quy trình. Máy chạy, nhưng không ai biết có hiệu quả hơn không." },
            ].map((c) => (
              <div key={c.t} className="rounded-2xl bg-white p-6">
                <c.icon className="h-7 w-7 text-brand-leaf-deep" />
                <h3 className="mt-4 text-lg font-bold text-brand-navy">{c.t}</h3>
                <p className="mt-2 text-muted-foreground">{c.d}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 max-w-3xl text-xl font-semibold text-brand-navy">
            Vì vậy chúng tôi không bắt đầu từ AI. Chúng tôi bắt đầu từ mảnh đất – và đi từng bước.
          </p>
        </div>
      </section>

      <Journey />
      <SmartIrrigation />
      <ADayOnFarm />
      <Ecosystem />
      <Market />
      <Proof />
      <Readiness />
      <Deploy />
      <Commitments />

      {/* CTA cuối */}
      <section className="bg-brand-navy py-20 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-4 sm:px-6 md:flex-row md:items-center lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold sm:text-4xl">Bắt đầu bằng một buổi khảo sát.</h2>
            <p className="mt-3 text-lg text-white/70">Đội AgriBeacon ra tận farm, cùng bạn xem mảnh đất, và đề xuất bước đầu tiên phù hợp – không bắt mua cả gói.</p>
          </div>
          <Link to={BRAND.surveyPath} className="inline-flex shrink-0 items-center gap-2 rounded-full bg-brand-leaf px-6 py-3.5 font-semibold text-brand-navy hover:brightness-105">
            Đặt lịch khảo sát farm <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Home;
