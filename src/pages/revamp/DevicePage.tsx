import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { VideoGallery } from "@/components/revamp/VideoPlayer";
import { BRAND, JOURNEY } from "@/content/site";
import { DEVICE_LINES } from "@/content/products";

const DevicePage = () => {
  const { slug } = useParams();
  const line = DEVICE_LINES.find((d) => d.slug === slug);

  useEffect(() => {
    if (line) document.title = `${line.name} | AgriBeacon`;
  }, [line]);

  if (!line) return <Navigate to="/platform" replace />;

  return (
    <main>
      <section className="bg-brand-sand pb-16 pt-28 lg:pt-32">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <Link to="/platform" className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-brand-navy/70 hover:text-brand-navy">
              <ArrowLeft className="h-4 w-4" /> Thiết bị trong hệ sinh thái AgriBeacon
            </Link>
            <div className="mb-3 flex flex-wrap gap-2">
              {line.steps.map((n) => (
                <Link key={n} to={JOURNEY[n - 1].path} className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-brand-navy hover:ring-1 hover:ring-brand-leaf">
                  Bước {n}: {JOURNEY[n - 1].short}
                </Link>
              ))}
            </div>
            <h1 className="text-4xl font-extrabold leading-tight text-brand-navy sm:text-5xl">{line.name}</h1>
            <p className="mt-4 text-xl font-medium text-brand-navy/85">{line.tagline}</p>
            <p className="mt-4 text-brand-navy/70">{line.intro}</p>
            <p className="mt-4 text-sm font-semibold text-brand-leaf-deep">Dữ liệu đồng bộ tự động về {BRAND.os}.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to={`/contact?need=quote&device=${line.slug}`} className="inline-flex items-center gap-2 rounded-full bg-brand-navy px-5 py-3 font-semibold text-white hover:bg-brand-navy-2">
                Nhận tư vấn & báo giá <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to={BRAND.surveyPath} className="inline-flex items-center rounded-full border border-brand-navy/30 px-5 py-3 font-semibold text-brand-navy hover:bg-white">
                Đặt lịch khảo sát
              </Link>
            </div>
          </div>
          <div className="flex aspect-square items-center justify-center rounded-3xl bg-white p-8">
            <img src={line.hero} alt={line.name} className="max-h-full w-auto object-contain" />
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className={`mx-auto grid max-w-7xl gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:px-8 ${line.highlights.length === 5 ? "lg:grid-cols-5" : line.highlights.length === 6 ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}>
          {line.highlights.map((h) => (
            <div key={h.t} className="rounded-2xl border border-border p-5">
              <div className="font-semibold text-brand-navy">{h.t}</div>
              <p className="mt-1 text-sm text-muted-foreground">{h.d}</p>
            </div>
          ))}
        </div>
      </section>

      {line.videos.length > 0 && (
        <section className="bg-brand-sand py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-6 text-2xl font-bold text-brand-navy">Video</h2>
            <VideoGallery videos={line.videos} />
          </div>
        </section>
      )}

      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-brand-navy">{line.products.length > 1 ? "Danh mục thiết bị" : "Thiết bị"}</h2>
          <p className="mt-2 text-muted-foreground">Báo giá theo giải pháp cho từng trang trại. Liên hệ để được tư vấn cấu hình phù hợp.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {line.products.map((p) => (
              <article key={p.name} className="flex flex-col overflow-hidden rounded-2xl border border-border">
                <div className="flex h-56 items-center justify-center bg-white p-6">
                  <img src={p.img} alt={p.name} className="max-h-full w-auto object-contain" loading="lazy" />
                </div>
                <div className="flex flex-1 flex-col border-t border-border p-5">
                  {p.code && <div className="text-xs font-bold uppercase tracking-wider text-brand-leaf-deep">{p.code}</div>}
                  <h3 className="mt-1 font-semibold text-brand-navy">{p.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.summary}</p>
                  {p.specs && (
                    <ul className="mt-3 space-y-1 text-xs text-brand-navy/70">
                      {p.specs.map((s) => (
                        <li key={s}>• {s}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-navy py-16 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 sm:px-6 md:flex-row md:items-center lg:px-8">
          <div>
            <h2 className="text-3xl font-bold">Cần tư vấn lựa chọn thiết bị?</h2>
            <p className="mt-2 text-white/70">Đội ngũ AgriBeacon sẽ khảo sát và đề xuất cấu hình phù hợp với trang trại của bạn.</p>
          </div>
          <Link to={BRAND.surveyPath} className="inline-flex items-center gap-2 rounded-full bg-brand-leaf px-6 py-3 font-semibold text-brand-navy">
            Đặt lịch khảo sát <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default DevicePage;
