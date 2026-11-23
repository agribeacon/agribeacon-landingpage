import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, ShieldAlert, Sprout, PackageX } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { FACTS, PAIN_GROUPS } from "@/content/precision";
import { cn } from "@/lib/utils";
import { rich } from "@/lib/rich";

const ICONS = { quality: ShieldAlert, traditional: Sprout, fragmented: PackageX } as const;
const SHORT: Record<string, string> = { quality: "Chất lượng & xuất khẩu", traditional: "Canh tác truyền thống", fragmented: "Công nghệ rời rạc" };
const TONE: Record<string, { bar: string; chip: string }> = {
  quality: { bar: "bg-brand-amber", chip: "bg-brand-amber/15 text-[#8a5a0b]" },
  traditional: { bar: "bg-brand-leaf", chip: "bg-brand-leaf/20 text-brand-leaf-deep" },
  fragmented: { bar: "bg-brand-navy/40", chip: "bg-brand-navy/10 text-brand-navy/80" },
};

/** Phần "Thực trạng": số liệu có nguồn + băng thẻ trượt ngang theo 3 nhóm vấn đề. */
const ProblemSection = ({ className }: { className?: string }) => {
  const cards = useMemo(
    () => PAIN_GROUPS.flatMap((g) => g.pains.map((p) => ({ ...p, group: g.key, label: g.label }))),
    [],
  );
  const groupStart = useMemo(() => {
    const m: Record<string, number> = {};
    cards.forEach((c, i) => (m[c.group] ??= i));
    return m;
  }, [cards]);

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  useEffect(() => {
    if (!api) return;
    const update = () => {
      setCurrent(api.selectedScrollSnap());
      setCanPrev(api.canScrollPrev());
      setCanNext(api.canScrollNext());
    };
    update();
    api.on("select", update);
    api.on("reInit", update);
    return () => {
      api.off("select", update);
      api.off("reInit", update);
    };
  }, [api]);

  const activeGroup = cards[Math.min(current, cards.length - 1)]?.group;

  return (
    <section className={cn("bg-brand-sand py-20 lg:py-24", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-brand-leaf-deep">Thực trạng</div>
          <h2 className="text-3xl font-bold leading-tight text-brand-navy sm:text-4xl">Thị trường đòi hỏi bằng chứng, trang trại vẫn canh tác theo kinh nghiệm</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {rich("Nông nghiệp sử dụng **~27% lao động Đông Nam Á**, khoảng 96 triệu người, trong khi tiêu chuẩn nhập khẩu **ngày càng chặt**.")}{" "}
            <a href="https://www.oecd.org/en/publications/towards-greener-and-more-inclusive-societies-in-southeast-asia_294ce081-en/full-report/component-10.html" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground underline-offset-2 hover:underline">(OECD, theo FAO 2023)</a>
          </p>
        </div>

        {/* Số liệu có nguồn: lưới trên desktop, cuộn ngang trên mobile */}
        <div className="-mx-4 mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4">
          {FACTS.map((f) => (
            <div key={f.value} className="flex w-[78%] shrink-0 snap-start flex-col rounded-2xl bg-white p-5 sm:w-auto">
              <div className="text-3xl font-extrabold text-brand-navy">{f.value}</div>
              <p className="mt-2 flex-1 text-sm text-brand-navy/80">{rich(f.label)}</p>
              <a href={f.url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-brand-leaf-deep">
                Nguồn: {f.source} <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          ))}
        </div>

        {/* Tab nhóm + điều hướng */}
        <div className="mt-12 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-wrap md:px-0 md:pb-0" role="tablist" aria-label="Nhóm vấn đề">
            {PAIN_GROUPS.map((g) => {
              const Icon = ICONS[g.key as keyof typeof ICONS];
              const active = activeGroup === g.key;
              return (
                <button
                  key={g.key}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => api?.scrollTo(groupStart[g.key])}
                  className={cn(
                    "inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition",
                    active ? "border-brand-navy bg-brand-navy text-white" : "border-brand-navy/15 bg-white text-brand-navy hover:border-brand-navy/40",
                  )}
                >
                  <Icon className="h-4 w-4" /> {g.label}
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm tabular-nums text-muted-foreground">
              {current + 1} / {cards.length}
            </span>
            <button
              type="button"
              onClick={() => api?.scrollPrev()}
              disabled={!canPrev}
              aria-label="Thẻ trước"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-navy/20 bg-white text-brand-navy transition hover:bg-brand-navy hover:text-white disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-brand-navy"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => api?.scrollNext()}
              disabled={!canNext}
              aria-label="Thẻ tiếp theo"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-navy/20 bg-white text-brand-navy transition hover:bg-brand-navy hover:text-white disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-brand-navy"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <p className="mt-4 text-base text-brand-navy/80">{rich(PAIN_GROUPS.find((g) => g.key === activeGroup)?.title ?? "")}</p>

        {/* Băng thẻ trượt */}
        <Carousel setApi={setApi} opts={{ align: "start", containScroll: "trimSnaps" }} className="mt-6">
          <CarouselContent className="-ml-4">
            {cards.map((c, i) => {
              const tone = TONE[c.group];
              const Icon = ICONS[c.group as keyof typeof ICONS];
              return (
                <CarouselItem key={c.t} className="basis-[85%] pl-4 sm:basis-1/2 lg:basis-1/3">
                  <article className="relative flex h-full flex-col overflow-hidden rounded-3xl bg-white p-6">
                    <span className={cn("absolute inset-x-0 top-0 h-1.5", tone.bar)} />
                    <div className="flex items-center justify-between">
                      <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold", tone.chip)}>
                        <Icon className="h-3.5 w-3.5" /> {SHORT[c.group]}
                      </span>
                      <span className="text-xs font-bold tabular-nums text-brand-navy/30">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-brand-navy">{c.t}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{rich(c.d)}</p>
                  </article>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default ProblemSection;
