import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useEffect } from "react";
import FarmIllustration from "@/components/revamp/FarmIllustration";
import { BRAND, DEVICES, JOURNEY } from "@/content/site";
import { cn } from "@/lib/utils";

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

  return (
    <main>
      <section className="bg-brand-sand pb-16 pt-28 lg:pt-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-brand-leaf-deep">{BRAND.os} by AgriBeacon</div>
            <h1 className="text-4xl font-extrabold leading-tight text-brand-navy sm:text-6xl">Mọi thứ diễn ra trên farm, ở một nơi.</h1>
            <p className="mt-6 text-lg text-brand-navy/75">
              Điện thoại có hệ điều hành để mọi ứng dụng dùng chung một dữ liệu. Trang trại cũng cần một lớp như vậy – để bản đồ, cảm biến, nhân công, kho và chi phí nói chuyện với nhau. Điều hành mỗi ngày. Truy xuất đến từng cây.
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
              Mô hình dữ liệu xoay quanh cái cây: Farm → Khu → Lô → Cây. Mỗi cây một mã, mỗi việc làm, mỗi bao phân, mỗi lần thu hoạch đều gắn về đúng cây đó – quét QR là thấy toàn bộ lịch sử.
            </p>
            <ol className="mt-6 flex flex-wrap items-center gap-2 text-sm font-semibold text-brand-navy">
              {["Cây SG-L03-087", "Nhật ký chăm sóc", "Vật tư & người làm", "Lô thu hoạch", "QR / báo cáo"].map((x, i, a) => (
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

      <section className="bg-brand-sand py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-brand-navy">Hành trình 6 bước</h2>
          <p className="mt-2 text-muted-foreground">Bắt đầu ở bước farm bạn đang cần – không bắt buộc đi đủ cả sáu.</p>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {JOURNEY.map((s) => (
              <Link key={s.n} to={s.path} className={cn("group flex flex-col rounded-3xl bg-white p-5 transition hover:-translate-y-1", s.highlight && "ring-2 ring-brand-leaf")}>
                <FarmIllustration step={s.n} className="w-full rounded-2xl bg-brand-sand/60" />
                <div className="mt-4 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-navy text-sm font-bold text-white">{s.n}</span>
                  <span className="font-bold text-brand-navy">{s.title}</span>
                </div>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{s.answer}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-leaf-deep group-hover:gap-2">
                  Xem chi tiết <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-brand-navy">Thiết bị trong hệ sinh thái – dữ liệu tự động về {BRAND.os}</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {DEVICES.map((d) => (
              <Link key={d.path} to={d.path} className="rounded-2xl border border-border p-5 hover:border-brand-leaf">
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
