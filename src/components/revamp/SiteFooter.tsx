import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";
import logoLight from "@/assets/brand/agribeacon-logo-light.svg";
import { BRAND, DEVICES, JOURNEY, PARTNERS, SERVICES } from "@/content/site";

const Col = ({ title, links }: { title: string; links: { name: string; path: string }[] }) => (
  <div>
    <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-brand-leaf">{title}</h3>
    <ul className="space-y-2">
      {links.map((l) => (
        <li key={l.path + l.name}>
          {l.path.startsWith("/brochure") ? (
            <a href={l.path} className="text-sm text-white/70 hover:text-white">
              {l.name}
            </a>
          ) : (
            <Link to={l.path} className="text-sm text-white/70 hover:text-white">
              {l.name}
            </Link>
          )}
        </li>
      ))}
    </ul>
  </div>
);

const SiteFooter = () => (
  <footer className="bg-brand-navy pb-20 text-white md:pb-0">
    {/* Dải đối tác chuyên môn */}
    <div className="border-b border-white/10">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 sm:px-6 md:flex-row md:items-center md:gap-8 lg:px-8">
        <span className="shrink-0 text-xs font-semibold uppercase tracking-wider text-white/50">Đồng hành chuyên môn cùng</span>
        <div className="flex flex-wrap gap-x-8 gap-y-2">
          {PARTNERS.map((p) => (
            <Link key={p.name} to="/partners" className="flex items-center gap-2.5 text-sm font-semibold text-white/85 hover:text-brand-leaf">
              <img src={p.logo} alt="" className="h-9 w-9 rounded-full bg-white object-cover" loading="lazy" />
              {p.name}
            </Link>
          ))}
        </div>
      </div>
    </div>

    <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-6 lg:px-8">
      <div className="lg:col-span-2">
        <img src={logoLight} alt="AgriBeacon" className="mb-4 h-8 w-auto" />
        <p className="mb-5 max-w-sm text-sm text-white/70">
          {BRAND.os}: hệ điều hành AIoT cho trang trại cây lâu năm và cây công nghiệp.
        </p>
        <ul className="space-y-2 text-sm text-white/70">
          <li className="flex items-center gap-2">
            <Mail className="h-4 w-4 shrink-0" />
            <a href="mailto:info@agribeacon.tech" className="hover:text-white">
              info@agribeacon.tech
            </a>
          </li>
          <li className="flex items-start gap-2">
            <Phone className="mt-0.5 h-4 w-4 shrink-0" />
            <span>
              <a href="tel:+84962709987" className="hover:text-white">
                +84 962 709 987
              </a>
              <br />
              <a href="tel:+84964898597" className="hover:text-white">
                +84 964 898 597
              </a>
            </span>
          </li>
          <li className="flex items-center gap-2">
            <MapPin className="h-4 w-4 shrink-0" /> KĐT Geleximco, Hoài Đức, Hà Nội
          </li>
        </ul>
      </div>
      <Col title={BRAND.os} links={[{ name: "Tổng quan", path: "/platform" }, ...JOURNEY.map((s) => ({ name: `${s.n}. ${s.short}`, path: s.path }))]} />
      <Col title="Thiết bị & Dịch vụ" links={[...DEVICES, ...SERVICES]} />
      <Col
        title="Tài nguyên"
        links={[
          { name: "Nông nghiệp chính xác", path: "/precision-agriculture" },
          { name: "Tính hiệu quả đầu tư (ROI)", path: "/tools/roi-calculator" },
          { name: "Ước tính chi phí", path: "/tools/cost-estimator" },
          { name: "Brochure", path: "/brochure" },
          { name: "Trợ giúp", path: "/help" },
          { name: "Gói & báo giá", path: "/pricing" },
        ]}
      />
      <Col
        title="Công ty"
        links={[
          { name: "Về chúng tôi", path: "/about" },
          { name: "Khách hàng", path: "/customers" },
          { name: "Đối tác", path: "/partners" },
          { name: "Tuyển dụng", path: "/careers" },
          { name: "Liên hệ", path: "/contact" },
        ]}
      />
    </div>

    <div className="border-t border-white/10">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-white/50 sm:px-6 md:flex-row md:justify-between lg:px-8">
        <span>© {new Date().getFullYear()} AgriBeacon. {BRAND.os}, Tiểu Thần Nông và các thiết bị là sản phẩm trong hệ sinh thái AgriBeacon.</span>
        <span>Dữ liệu trang trại thuộc quyền sở hữu của khách hàng.</span>
      </div>
    </div>
  </footer>
);

export default SiteFooter;
