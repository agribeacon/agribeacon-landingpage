import { Award, BadgeCheck, ExternalLink, Info, Landmark, Leaf, ShieldCheck } from "lucide-react";
import { rich } from "@/lib/rich";
import { CARBON_FACT, VISION_NOTE, VISION_PILLARS } from "@/content/vision";

const ICONS: Record<string, typeof Award> = {
  cert: Award,
  market: BadgeCheck,
  carbon: Leaf,
  finance: Landmark,
  insurance: ShieldCheck,
};

/** Tầm nhìn: khi trang trại vận hành bằng dữ liệu. */
const VisionSection = () => (
  <section className="bg-white py-20 lg:py-28">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end">
        <div>
          <div className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-brand-leaf-deep">Tầm nhìn</div>
          <h2 className="text-3xl font-bold leading-tight text-brand-navy sm:text-4xl">Dữ liệu mở ra giá trị vượt ngoài tối ưu chi phí</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {rich("Dữ liệu vận hành hằng ngày cũng là **hồ sơ** mà tổ chức chứng nhận, người mua, ngân hàng và bảo hiểm cần.")}
          </p>
        </div>
        <a href={CARBON_FACT.url} target="_blank" rel="noopener noreferrer" className="rounded-2xl bg-brand-sand p-5 hover:ring-1 hover:ring-brand-leaf">
          <div className="text-3xl font-extrabold text-brand-navy">{CARBON_FACT.value}</div>
          <p className="mt-1 text-sm text-brand-navy/80">{rich(CARBON_FACT.label)}</p>
          <span className="mt-2 inline-flex items-center gap-1 text-xs text-muted-foreground">
            Nguồn: {CARBON_FACT.source} <ExternalLink className="h-3 w-3" />
          </span>
        </a>
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {VISION_PILLARS.map((p) => {
          const Icon = ICONS[p.key];
          return (
            <article key={p.key} className="flex flex-col rounded-3xl border border-border p-6">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-leaf/20">
                <Icon className="h-6 w-6 text-brand-leaf-deep" />
              </span>
              <h3 className="mt-4 text-lg font-bold text-brand-navy">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{rich(p.short)}</p>
            </article>
          );
        })}
        <div className="flex items-start gap-3 rounded-3xl bg-brand-sand p-6 text-sm text-brand-navy/80">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-brand-leaf-deep" />
          <p>{rich(VISION_NOTE)}</p>
        </div>
      </div>
    </div>
  </section>
);

export default VisionSection;
