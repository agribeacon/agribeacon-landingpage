import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useEffect } from "react";
import FarmIllustration from "@/components/revamp/FarmIllustration";
import VideoSlot from "@/components/revamp/VideoSlot";
import type { VideoKey } from "@/content/videos";
import { VideoGallery } from "@/components/revamp/VideoPlayer";
import AiEntryDemo from "@/components/revamp/AiEntryDemo";
import StatusBadge from "@/components/revamp/StatusBadge";
import { BRAND, DEVICES, JOURNEY } from "@/content/site";
import { cn } from "@/lib/utils";
import { rich } from "@/lib/rich";
import poster1 from "@/assets/digital-farm-map-hero.jpg";
import poster2 from "@/assets/digital-farm-map-sample.jpg";
import poster3 from "@/assets/products/station-multi.jpg";
import poster4 from "@/assets/field/team-vineyard-sensor.jpg";
import poster5 from "@/assets/field/robot-vineyard.jpg";
import poster6 from "@/assets/ai-assistant-hero.jpg";

const STEP_VIDEOS: Partial<Record<number, VideoKey>> = { 1: "rtkMap", 2: "planning3d", 4: "sutagrowOverview", 5: "rtkRobotUav", 6: "ai" };

const POSTERS: Record<number, { src: string; pos?: string }> = {
  1: { src: poster1 },
  2: { src: poster2 },
  3: { src: poster3 },
  4: { src: poster4, pos: "object-[50%_60%]" },
  5: { src: poster5 },
  6: { src: poster6 },
};

const StepPage = () => {
  const { slug } = useParams();
  const idx = JOURNEY.findIndex((s) => s.slug === slug);
  const step = JOURNEY[idx];

  useEffect(() => {
    if (step) document.title = `${step.n}. ${step.short} – ${BRAND.os} | AgriBeacon`;
  }, [step]);

  if (!step) return <Navigate to="/platform" replace />;
  const prev = JOURNEY[idx - 1];
  const next = JOURNEY[idx + 1];
  const devices = DEVICES.filter((d) => d.steps.includes(step.n));
  const poster = POSTERS[step.n];

  return (
    <main>
      {/* Hero */}
      <section className="bg-brand-sand pb-16 pt-28 lg:pb-24 lg:pt-32">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <Link to="/platform" className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-brand-navy/70 hover:text-brand-navy">
              <ArrowLeft className="h-4 w-4" /> {BRAND.os} · Hành trình 6 bước
            </Link>
            <div className="mb-4 flex items-center gap-3">
              <span className={cn("flex h-10 w-10 items-center justify-center rounded-full font-bold", step.highlight ? "bg-brand-leaf text-brand-navy" : "bg-brand-navy text-white")}>{step.n}</span>
              <span className="text-sm font-bold uppercase tracking-[0.18em] text-brand-leaf-deep">{step.title}</span>
            </div>
            <h1 className="text-4xl font-extrabold leading-tight text-brand-navy sm:text-5xl">{step.heroTitle}</h1>
            <p className="mt-5 text-lg text-brand-navy/75">{rich(step.heroSub)}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to={`${BRAND.surveyPath}&step=${step.n}`} className="inline-flex items-center gap-2 rounded-full bg-brand-navy px-5 py-3 font-semibold text-white hover:bg-brand-navy-2">
                Đặt lịch khảo sát <ArrowRight className="h-4 w-4" />
              </Link>
              <a href={BRAND.appUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-full border border-brand-navy/30 px-5 py-3 font-semibold text-brand-navy hover:bg-white">
                Dùng thử miễn phí
              </a>
            </div>
          </div>
          <div className="rounded-3xl bg-white p-5 shadow-[0_30px_80px_-40px_rgba(9,40,51,0.5)]">
            <FarmIllustration step={step.n} className="w-full" />
          </div>
        </div>
      </section>

      {/* Câu hỏi – thực tế – cách làm */}
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
          <div className="rounded-2xl bg-brand-navy p-6 text-white">
            <div className="text-xs font-bold uppercase tracking-wider text-brand-leaf">Câu hỏi của chủ trang trại</div>
            <p className="mt-3 text-xl font-semibold">“{step.question}”</p>
          </div>
          <div className="rounded-2xl border border-border p-6">
            <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Hiện trạng</div>
            <p className="mt-3 text-brand-navy/80">{rich(step.pain)}</p>
          </div>
          <div className="rounded-2xl border border-brand-leaf/60 bg-brand-leaf/10 p-6">
            <div className="text-xs font-bold uppercase tracking-wider text-brand-leaf-deep">Giải pháp</div>
            <p className="mt-3 text-brand-navy/80">{rich(step.gain)}</p>
          </div>
        </div>
      </section>

      {step.n === 6 && <AiEntryDemo />}

      {/* Tính năng */}
      <section className="bg-white pb-16 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-brand-navy">Tính năng trên {BRAND.os}</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {step.features.map((f) => (
              <div key={f.title} className="rounded-2xl border border-border p-6 transition hover:border-brand-leaf">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-semibold text-brand-navy">{f.title}</h3>
                  <StatusBadge status={f.status} />
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{rich(f.desc)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video + dữ liệu bạn có được */}
      <section className="bg-brand-sand py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.3fr_1fr] lg:px-8">
          {STEP_VIDEOS[step.n] ? (
            <VideoSlot video={STEP_VIDEOS[step.n]} poster={poster.src} mediaClassName={poster.pos} brief={step.video} className="aspect-video rounded-3xl" />
          ) : (
            <div className="flex aspect-video items-center justify-center rounded-3xl bg-white p-6">
              <img src={poster.src} alt={step.title} className={cn("h-full w-auto object-contain", poster.pos)} loading="lazy" />
            </div>
          )}
          <div>
            <h2 className="text-2xl font-bold text-brand-navy">Kết quả đạt được sau bước này</h2>
            <ul className="mt-6 space-y-3">
              {step.dataOut.map((d) => (
                <li key={d} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand-leaf-deep" />
                  <span className="text-brand-navy">{d}</span>
                </li>
              ))}
            </ul>
            {next && (
              <p className="mt-6 text-sm text-muted-foreground">
                Dữ liệu này là đầu vào cho bước {next.n}: <span className="font-semibold text-brand-navy">{next.short}</span>.
              </p>
            )}
            {devices.length > 0 && (
              <div className="mt-8">
                <div className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Thiết bị dùng ở bước này</div>
                <div className="flex flex-wrap gap-2">
                  {devices.map((d) => (
                    <Link key={d.path} to={d.path} className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-navy hover:ring-1 hover:ring-brand-leaf">
                      {d.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {step.n === 2 && (
        <section className="bg-white py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-brand-leaf-deep">Mô phỏng quy hoạch</div>
            <h2 className="text-3xl font-bold text-brand-navy">Hình dung trang trại trước khi đầu tư</h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">AgriBeacon dựng mô hình 3D quy hoạch khu, luống, hàng cây và hệ thống tưới dựa trên số liệu khảo sát RTK, giúp chủ trang trại so sánh phương án trước khi triển khai ngoài thực địa.</p>
            <div className="mt-8">
              <VideoGallery videos={["planGuava", "planCoffeePineapple"]} />
            </div>
          </div>
        </section>
      )}

      {/* Điều hướng bước */}
      <nav className="border-t border-border bg-white" aria-label="Các bước khác">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-10 sm:px-6 md:grid-cols-2 lg:px-8">
          {prev ? (
            <Link to={prev.path} className="group rounded-2xl border border-border p-5 hover:border-brand-leaf">
              <div className="text-xs font-semibold text-muted-foreground">← Bước {prev.n}</div>
              <div className="mt-1 font-bold text-brand-navy">{prev.title}</div>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link to={next.path} className="group rounded-2xl bg-brand-navy p-5 text-right text-white">
              <div className="text-xs font-semibold text-brand-leaf">Bước {next.n} →</div>
              <div className="mt-1 font-bold">{next.title}</div>
            </Link>
          )}
        </div>
      </nav>
    </main>
  );
};

export default StepPage;
