import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { PARTNERS, PROJECTS } from "@/content/site";

const Partners = () => {
  useEffect(() => {
    document.title = "Đối tác chuyên môn & dự án hợp tác | AgriBeacon";
  }, []);

  return (
    <main>
      <section className="bg-brand-sand pb-16 pt-28 lg:pt-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-brand-leaf-deep">Đối tác</div>
          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight text-brand-navy sm:text-6xl">Đi cùng các nhà khoa học, từ phòng thí nghiệm ra tận vườn.</h1>
          <p className="mt-6 max-w-2xl text-lg text-brand-navy/75">Công nghệ của chúng tôi, chuyên môn của những người hiểu cây trồng nhất.</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-brand-navy">Đối tác chuyên môn</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {PARTNERS.map((p) => (
              <div key={p.name} className="rounded-2xl border border-border p-6">
                <div className="flex h-16 items-center rounded-xl bg-brand-sand px-4 text-sm font-semibold text-brand-navy/50">Logo {p.short}</div>
                <h3 className="mt-4 text-lg font-bold text-brand-navy">{p.name}</h3>
                <div className="text-sm font-medium text-brand-leaf-deep">{p.role}</div>
                <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
              </div>
            ))}
          </div>

          <h2 className="mt-16 text-2xl font-bold text-brand-navy">Dự án hợp tác</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {PROJECTS.map((p) => (
              <div key={p.name} className="rounded-2xl bg-brand-sand p-6">
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{p.place} · cùng {p.with}</div>
                <h3 className="mt-2 text-xl font-bold text-brand-navy">{p.name}</h3>
                <p className="mt-2 text-muted-foreground">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-navy py-16 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 sm:px-6 md:flex-row md:items-center lg:px-8">
          <div>
            <h2 className="text-3xl font-bold">Trở thành đối tác</h2>
            <p className="mt-2 text-white/70">Đại lý, nhà phân phối thiết bị, viện – trường, hợp tác xã.</p>
          </div>
          <Link to="/contact?need=partner" className="inline-flex items-center gap-2 rounded-full bg-brand-leaf px-6 py-3 font-semibold text-brand-navy">
            Liên hệ hợp tác <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Partners;
