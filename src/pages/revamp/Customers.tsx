import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import { useEffect } from "react";
import VideoSlot from "@/components/revamp/VideoSlot";
import { BRAND, FARMS, JOURNEY } from "@/content/site";
import { cn } from "@/lib/utils";
import poster from "@/assets/field/drone-cacao.jpg";

const Customers = () => {
  useEffect(() => {
    document.title = `Khách hàng – Farm đang vận hành bằng ${BRAND.os} | AgriBeacon`;
  }, []);
  const featured = FARMS.filter((f) => f.featured);

  return (
    <main>
      <section className="bg-brand-sand pb-16 pt-28 lg:pt-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-brand-leaf-deep">Khách hàng</div>
          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight text-brand-navy sm:text-6xl">Từ 0,5 ha đến 80 ha. Từ Bắc Giang đến Campuchia.</h1>
          <p className="mt-6 max-w-2xl text-lg text-brand-navy/75">Những farm cây lâu năm và cây công nghiệp đang ghi lại công việc mỗi ngày bằng {BRAND.os}. Bắt đầu nhỏ cũng được.</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {FARMS.map((f) => (
              <div key={f.name} className={cn("flex flex-col rounded-2xl border p-5", f.featured ? "border-brand-leaf" : "border-border")}>
                <div className="text-xs font-bold uppercase tracking-wider text-brand-leaf-deep">{f.crop}</div>
                <div className="mt-1 text-3xl font-extrabold text-brand-navy">{f.area}</div>
                <div className="mt-2 font-semibold text-brand-navy">{f.name}</div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" /> {f.location}
                </div>
                <p className="mt-3 flex-1 text-sm text-brand-navy/70">{f.note}</p>
                <div className="mt-4 text-xs font-semibold text-brand-navy/60">
                  Đang ở bước {f.step}: {JOURNEY[f.step - 1].short}
                  {import.meta.env.DEV && <span className="ml-1 text-[#8a5a0b]">(cần xác nhận)</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {featured.map((f, i) => (
        <section key={f.name} className={cn("py-16 lg:py-24", i % 2 ? "bg-white" : "bg-brand-sand")}>
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            <VideoSlot poster={poster} brief={`Phỏng vấn ${f.name}`} ambient={false} className={cn("aspect-video rounded-3xl", i % 2 && "lg:order-2")} />
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-brand-leaf-deep">
                Câu chuyện · {f.crop} {f.area} · {f.location}
              </div>
              <h2 className="mt-3 text-3xl font-bold text-brand-navy">{f.name}</h2>
              <p className="mt-4 text-muted-foreground">{f.note}</p>
              <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
                {["Trước khi dùng", "Đã triển khai", "Một ngày bây giờ", "Bước tiếp theo"].map((k) => (
                  <div key={k} className="rounded-xl bg-white/70 p-4">
                    <dt className="font-semibold text-brand-navy">{k}</dt>
                    <dd className="mt-1 text-muted-foreground">Đang cập nhật từ phỏng vấn farm.</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>
      ))}

      <section className="bg-brand-navy py-16 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 sm:px-6 md:flex-row md:items-center lg:px-8">
          <h2 className="text-3xl font-bold">Farm của bạn có thể là câu chuyện tiếp theo.</h2>
          <Link to={BRAND.surveyPath} className="inline-flex items-center gap-2 rounded-full bg-brand-leaf px-6 py-3 font-semibold text-brand-navy">
            Đặt lịch khảo sát <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Customers;
