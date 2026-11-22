import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, LogIn, Menu, X, ArrowRight } from "lucide-react";
import logo from "@/assets/brand/agribeacon-logo.svg";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { BRAND, CROPS, DEVICES, FARMS, JOURNEY, SERVICES, PARTNERS } from "@/content/site";
import { cn } from "@/lib/utils";

type SimpleLink = { name: string; path: string; hint?: string };

const solutionsByScale: SimpleLink[] = [
  { name: "Farm gia đình (< 10 ha)", path: "/solutions#family-farm" },
  { name: "Trang trại doanh nghiệp (10–50 ha)", path: "/solutions#commercial-farm" },
  { name: "Farm lớn, HTX, nhiều farm", path: "/solutions#multi-farm" },
];
const solutionsByGoal: SimpleLink[] = [
  { name: "Xuất khẩu & truy xuất", path: "/solutions#export-traceability" },
  { name: "Bền vững & ESG", path: "/solutions#sustainability" },
];
const resources: SimpleLink[] = [
  { name: "Hướng dẫn thực hành", path: "/guides", hint: "Theo 6 bước của hành trình" },
  { name: "Ước tính chi phí", path: "/tools/cost-estimator", hint: "Tính nhanh chi phí đầu tư" },
  { name: "Brochure", path: "/brochure", hint: "Tải hoặc xem lật trang" },
  { name: "Trung tâm trợ giúp", path: "/help", hint: "Hướng dẫn dùng SutaGrow OS" },
];
const about: SimpleLink[] = [
  { name: "Câu chuyện & triết lý", path: "/about" },
  { name: "Tuyển dụng", path: "/careers" },
  { name: "Liên hệ", path: "/contact" },
];

const isExternal = (p: string) => p.startsWith("/brochure") || p.startsWith("http");

const NavLink = ({ to, className, children, onClick }: { to: string; className?: string; children: React.ReactNode; onClick?: () => void }) =>
  isExternal(to) ? (
    <a href={to} className={className} onClick={onClick}>
      {children}
    </a>
  ) : (
    <Link to={to} className={className} onClick={onClick}>
      {children}
    </Link>
  );

const Dropdown = ({ label, children, wide }: { label: string; children: React.ReactNode; wide?: boolean }) => (
  <div className="group relative">
    <button className="flex items-center gap-1 whitespace-nowrap rounded-md px-2.5 py-2 text-[15px] font-medium text-brand-navy/85 hover:text-brand-navy group-focus-within:text-brand-navy">
      {label}
      <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
    </button>
    <div
      className={cn(
        "invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100",
      )}
    >
      <div className={cn("rounded-2xl border border-border bg-white p-5 shadow-[0_24px_60px_-20px_rgba(9,40,51,0.35)]", wide ? "w-[720px]" : "w-[340px]")}>
        {children}
      </div>
    </div>
  </div>
);

const ItemLink = ({ item }: { item: SimpleLink }) => (
  <NavLink to={item.path} className="block rounded-lg px-3 py-2 hover:bg-muted">
    <div className="text-sm font-semibold text-brand-navy">{item.name}</div>
    {item.hint && <div className="text-xs text-muted-foreground">{item.hint}</div>}
  </NavLink>
);

const SiteNav = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 border-b transition-colors", scrolled || open ? "border-border bg-white/95 backdrop-blur" : "border-transparent bg-white/80 backdrop-blur")}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="shrink-0" aria-label="AgriBeacon – trang chủ">
          <img src={logo} alt="AgriBeacon" className="h-7 w-auto sm:h-8" />
        </Link>

        <nav className="hidden items-center xl:flex" aria-label="Menu chính">
          <Dropdown label={BRAND.os} wide>
            <div className="grid grid-cols-[1.4fr_1fr] gap-6">
              <div>
                <div className="mb-2 px-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Hành trình 6 bước</div>
                {JOURNEY.map((s) => (
                  <Link key={s.n} to={s.path} className="flex items-start gap-3 rounded-lg px-3 py-2 hover:bg-muted">
                    <span className={cn("mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold", s.highlight ? "bg-brand-leaf text-brand-navy" : "bg-brand-navy text-white")}>
                      {s.n}
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-brand-navy">{s.short}</span>
                      <span className="block text-xs text-muted-foreground">{s.menuHint}</span>
                    </span>
                  </Link>
                ))}
              </div>
              <div className="rounded-xl bg-brand-sand p-4">
                <div className="mb-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Bắt đầu</div>
                <ItemLink item={{ name: `Tổng quan ${BRAND.os}`, path: "/platform", hint: "Hệ điều hành AIoT của farm" }} />
                <ItemLink item={{ name: "Tải app SutaGrow", path: "/#app", hint: "iOS & Android" }} />
                <Link to={BRAND.surveyPath} className="mt-3 flex items-center justify-between rounded-lg bg-brand-navy px-3 py-2.5 text-sm font-semibold text-white">
                  Đặt lịch khảo sát farm <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </Dropdown>

          <Dropdown label="Thiết bị & Dịch vụ" wide>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="mb-2 px-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Thiết bị</div>
                {DEVICES.map((d) => (
                  <ItemLink key={d.path} item={{ name: d.name, path: d.path, hint: `${d.hint} · bước ${d.steps.join(", ")}` }} />
                ))}
              </div>
              <div>
                <div className="mb-2 px-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Dịch vụ</div>
                {SERVICES.map((s) => (
                  <ItemLink key={s.path} item={{ name: s.name, path: s.path, hint: s.hint }} />
                ))}
                <p className="mt-3 px-3 text-xs text-muted-foreground">Mọi thiết bị đều đẩy dữ liệu tự động về {BRAND.os}.</p>
              </div>
            </div>
          </Dropdown>

          <Dropdown label="Giải pháp" wide>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="mb-2 px-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Theo cây trồng</div>
                {CROPS.map((c) => (
                  <ItemLink key={c} item={{ name: c, path: "/solutions#crops" }} />
                ))}
              </div>
              <div>
                <div className="mb-2 px-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Theo quy mô</div>
                {solutionsByScale.map((i) => (
                  <ItemLink key={i.path} item={i} />
                ))}
              </div>
              <div>
                <div className="mb-2 px-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Theo mục tiêu</div>
                {solutionsByGoal.map((i) => (
                  <ItemLink key={i.path} item={i} />
                ))}
              </div>
            </div>
          </Dropdown>

          <Dropdown label="Khách hàng & Đối tác">
            <div className="mb-2 px-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Farm đang dùng</div>
            {FARMS.filter((f) => f.featured).map((f) => (
              <ItemLink key={f.name} item={{ name: f.name, path: "/customers", hint: `${f.crop} · ${f.area} · ${f.location}` }} />
            ))}
            <ItemLink item={{ name: "Xem tất cả farm →", path: "/customers" }} />
            <div className="my-2 border-t border-border" />
            <div className="mb-2 px-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Đối tác chuyên môn</div>
            {PARTNERS.slice(0, 2).map((p) => (
              <ItemLink key={p.name} item={{ name: p.name, path: "/partners", hint: p.role }} />
            ))}
          </Dropdown>

          <Link to="/pricing" className="whitespace-nowrap rounded-md px-2.5 py-2 text-[15px] font-medium text-brand-navy/85 hover:text-brand-navy">
            Gói & báo giá
          </Link>

          <Dropdown label="Tài nguyên">
            {resources.map((i) => (
              <ItemLink key={i.path} item={i} />
            ))}
          </Dropdown>

          <Dropdown label="Về chúng tôi">
            {about.map((i) => (
              <ItemLink key={i.path} item={i} />
            ))}
          </Dropdown>
        </nav>

        <div className="flex items-center gap-1">
          <div className="hidden sm:block">
            <LanguageSwitcher />
          </div>
          <a href={BRAND.appUrl} target="_blank" rel="noopener noreferrer" className="hidden items-center gap-1 whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium text-brand-navy/80 hover:text-brand-navy 2xl:flex">
            <LogIn className="h-4 w-4" /> Đăng nhập
          </a>
          <Link to={BRAND.surveyPath} className="hidden whitespace-nowrap rounded-full bg-brand-navy px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-navy-2 md:inline-flex">
            Đặt lịch khảo sát
          </Link>
          <button className="rounded-md p-2 text-brand-navy xl:hidden" onClick={() => setOpen((v) => !v)} aria-label="Mở menu" aria-expanded={open}>
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-border bg-white px-4 pb-28 pt-2 xl:hidden">
          <MobileGroup title={BRAND.os} items={[{ name: `Tổng quan ${BRAND.os}`, path: "/platform" }, ...JOURNEY.map((s) => ({ name: `${s.n}. ${s.short}`, path: s.path }))]} defaultOpen />
          <MobileGroup title="Thiết bị & Dịch vụ" items={[...DEVICES, ...SERVICES]} />
          <MobileGroup title="Giải pháp" items={[{ name: "Theo cây trồng", path: "/solutions#crops" }, ...solutionsByScale, ...solutionsByGoal]} />
          <MobileGroup title="Khách hàng & Đối tác" items={[{ name: "Farm đang dùng", path: "/customers" }, { name: "Đối tác chuyên môn", path: "/partners" }]} />
          <Link to="/pricing" className="block border-b border-border py-3 font-semibold text-brand-navy">
            Gói & báo giá
          </Link>
          <MobileGroup title="Tài nguyên" items={resources} />
          <MobileGroup title="Về chúng tôi" items={about} />
          <div className="flex items-center justify-between py-3">
            <a href={BRAND.appUrl} className="flex items-center gap-1 text-sm font-medium text-brand-navy">
              <LogIn className="h-4 w-4" /> Đăng nhập SutaGrow
            </a>
            <LanguageSwitcher />
          </div>
        </div>
      )}

    </header>
  );
};

/** CTA ghim đáy màn hình trên mobile (đặt ngoài header vì header có backdrop-blur). */
export const MobileCta = () => (
  <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white/95 p-3 pr-20 backdrop-blur md:hidden">
    <Link to={BRAND.surveyPath} className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-navy py-3 text-sm font-semibold text-white">
      Đặt lịch khảo sát farm <ArrowRight className="h-4 w-4" />
    </Link>
  </div>
);

const MobileGroup = ({ title, items, defaultOpen }: { title: string; items: SimpleLink[]; defaultOpen?: boolean }) => {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div className="border-b border-border">
      <button className="flex w-full items-center justify-between py-3 font-semibold text-brand-navy" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        {title}
        <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="pb-2">
          {items.map((i) => (
            <NavLink key={i.path + i.name} to={i.path} className="block rounded-md px-3 py-2 text-sm text-brand-navy/80 hover:bg-muted">
              {i.name}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
};

export default SiteNav;
