import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Handshake, MapPin, Ruler, Sprout, Wrench } from "lucide-react";
import CustomerMarquee from "@/components/revamp/CustomerMarquee";
import { BRAND, PARTNERS } from "@/content/site";
import { rich } from "@/lib/rich";
import heroImg from "@/assets/field/hero-farm-poster.jpg";
import monrtk from "@/assets/products/monrtk-rover.jpg";
import station from "@/assets/products/station-multi.jpg";
import monsky from "@/assets/products/monsky-uav.jpg";
import dubiro from "@/assets/products/dubiro-robot.jpg";

/** Cách chúng tôi đi cùng trang trại: từng bước, không nhảy cóc. */
const STEPS = [
  { t: "Hiểu đất", d: "Xét nghiệm đất, nước **trước khi trồng**." },
  { t: "Có bản đồ", d: "Đo ranh giới, chia khu, **đánh mã từng cây**." },
  { t: "Ghi chép đủ", d: "Việc, người, vật tư, chi phí **mỗi ngày**." },
  { t: "Để máy làm", d: "Tưới, phun, bay khảo sát **theo dữ liệu**." },
  { t: "Dùng AI", d: "Khi dữ liệu **đã đủ và chuẩn**." },
];

const VALUES = [
  { icon: Sprout, t: "Thực tế", d: "Làm thứ trang trại **dùng được ngay**. Chưa làm được thì nói chưa." },
  { icon: Ruler, t: "Chính xác", d: "Mỗi số liệu gắn với **vị trí, thời gian** và người làm." },
  { icon: Wrench, t: "Có mặt tại vườn", d: "**Lắp đặt, hướng dẫn tận nơi**, sửa sản phẩm theo phản hồi thật." },
  { icon: Handshake, t: "Làm cùng chuyên gia", d: "Kiến thức nông học từ **viện nghiên cứu, trường đại học**." },
];

const PRODUCTS = [
  { name: "MONRTK", d: "Đo đạc RTK", img: monrtk, path: "/devices/rtk" },
  { name: "Trạm VY", d: "Đo đất, nước, thời tiết", img: station, path: "/devices/aiot" },
  { name: "MONSKY", d: "UAV khảo sát", img: monsky, path: "/devices/uav" },
  { name: "DUBIRO", d: "Robot đa tác vụ", img: dubiro, path: "/devices/robot" },
];

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-brand-leaf-deep">{children}</div>
);

const About = () => {
  useEffect(() => {
    document.title = "Về AgriBeacon | SutaGrow OS";
  }, []);

  return (
    <main>
      {/* Hero */}
      <section className="bg-brand-sand pb-16 pt-28 lg:pt-36">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:px-8">
          <div>
            <Eyebrow>Về AgriBeacon</Eyebrow>
            <h1 className="text-4xl font-extrabold leading-tight text-brand-navy sm:text-5xl">Chúng tôi làm công nghệ cho trang trại cây lâu năm</h1>
            <p className="mt-6 max-w-xl text-lg text-brand-navy/75">
              {rich(
                `AgriBeacon phát triển **${BRAND.os}**, trợ lý AI **${BRAND.ai}** và các thiết bị đo đạc, cảm biến, UAV, robot. Tất cả để chủ trang trại biết **vườn mình đang cần gì, ai đang làm gì, tốn bao nhiêu**.`,
              )}
            </p>
          </div>
          <div className="overflow-hidden rounded-3xl">
            <img src={heroImg} alt="Trang trại cây lâu năm" className="aspect-[4/3] w-full object-cover" />
          </div>
        </div>
      </section>

      {/* Tên gọi */}
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.4fr] lg:px-8">
          <div>
            <Eyebrow>Tên gọi</Eyebrow>
            <h2 className="text-3xl font-bold leading-tight text-brand-navy">Vì sao là AgriBeacon?</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-brand-sand p-6">
              <div className="text-3xl font-extrabold text-brand-leaf-deep">Agri</div>
              <p className="mt-2 text-brand-navy/80">Nông nghiệp. Mọi sản phẩm bắt đầu từ việc thật ngoài vườn.</p>
            </div>
            <div className="rounded-3xl bg-brand-navy p-6 text-white">
              <div className="text-3xl font-extrabold text-brand-leaf">Beacon</div>
              <p className="mt-2 text-white/80">Ngọn hải đăng. Không lái thay người đi biển, chỉ giúp họ thấy rõ đường.</p>
            </div>
            <p className="text-muted-foreground sm:col-span-2">
              {rich("Công nghệ của chúng tôi cũng vậy: **người quyết định vẫn là chủ trang trại**, chúng tôi đưa ra số liệu đủ rõ để quyết định đúng.")}
            </p>
          </div>
        </div>
      </section>

      {/* Cách làm */}
      <section className="bg-brand-sand py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Eyebrow>Cách chúng tôi làm</Eyebrow>
          <h2 className="max-w-2xl text-3xl font-bold leading-tight text-brand-navy">Đi từng bước, không nhảy cóc</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">Không có AI tốt nếu chưa có dữ liệu tốt. Nên chúng tôi bắt đầu từ mảnh đất.</p>
          <ol className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {STEPS.map((s, i) => (
              <li key={s.t} className="rounded-2xl bg-white p-5">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-leaf text-sm font-bold text-brand-navy">{i + 1}</span>
                <div className="mt-3 font-bold text-brand-navy">{s.t}</div>
                <p className="mt-1 text-sm text-muted-foreground">{rich(s.d)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Sứ mệnh & tầm nhìn */}
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          <div className="rounded-3xl border border-border p-8">
            <Eyebrow>Sứ mệnh</Eyebrow>
            <p className="text-2xl font-bold leading-snug text-brand-navy">
              Giúp trang trại biết rõ mình đang làm gì, tốn bao nhiêu, và làm tốt hơn qua mỗi mùa vụ.
            </p>
          </div>
          <div className="rounded-3xl bg-brand-navy p-8 text-white">
            <div className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-brand-leaf">Tầm nhìn</div>
            <p className="text-2xl font-bold leading-snug">
              Trở thành hệ điều hành cho trang trại cây lâu năm ở Đông Nam Á, nơi dữ liệu canh tác đủ tin cậy để đạt chứng nhận, xuất khẩu và vay vốn xanh.
            </p>
          </div>
        </div>
      </section>

      {/* Giá trị */}
      <section className="bg-brand-sand py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Eyebrow>Điều chúng tôi giữ</Eyebrow>
          <h2 className="text-3xl font-bold text-brand-navy">Bốn nguyên tắc làm việc</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <div key={v.t} className="rounded-3xl bg-white p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-leaf/20">
                  <v.icon className="h-5 w-5 text-brand-leaf-deep" />
                </span>
                <div className="mt-4 text-lg font-bold text-brand-navy">{v.t}</div>
                <p className="mt-1 text-sm text-muted-foreground">{rich(v.d)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sản phẩm */}
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Eyebrow>Chúng tôi làm ra</Eyebrow>
          <h2 className="max-w-2xl text-3xl font-bold leading-tight text-brand-navy">Một nền tảng, nhiều thiết bị, cùng một nguồn dữ liệu</h2>
          <div className="mt-10 grid gap-4 lg:grid-cols-[1.2fr_2fr]">
            <Link to="/platform" className="flex flex-col justify-between rounded-3xl bg-brand-navy p-7 text-white transition hover:bg-brand-navy-2">
              <div>
                <div className="text-sm font-semibold text-brand-leaf">Nền tảng</div>
                <div className="mt-2 text-2xl font-bold">{BRAND.os}</div>
                <p className="mt-2 text-white/75">{rich(`Quản lý trang trại trên bản đồ, kèm trợ lý AI **${BRAND.ai}** nhập liệu bằng lời nói.`)}</p>
              </div>
              <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-brand-leaf">
                Xem {BRAND.os} <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {PRODUCTS.map((p) => (
                <Link key={p.name} to={p.path} className="flex flex-col rounded-3xl border border-border p-4 transition hover:border-brand-leaf">
                  <img src={p.img} alt={p.name} className="h-32 w-full object-contain" loading="lazy" />
                  <div className="mt-3 font-bold text-brand-navy">{p.name}</div>
                  <div className="text-sm text-muted-foreground">{p.d}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Khách hàng & đối tác */}
      <section className="bg-brand-sand py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Eyebrow>Đang làm cùng</Eyebrow>
          <h2 className="text-3xl font-bold text-brand-navy">Trang trại ở Việt Nam và Campuchia</h2>
        </div>
        <div className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
          <CustomerMarquee />
          <div className="mt-8 grid gap-3 md:grid-cols-2">
            {PARTNERS.map((p) => (
              <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 rounded-2xl bg-white p-4 transition hover:ring-1 hover:ring-brand-leaf">
                <img src={p.logo} alt={`Logo ${p.name}`} className="h-12 w-12 shrink-0 rounded-full object-cover" loading="lazy" />
                <div>
                  <div className="font-semibold text-brand-navy">{p.name}</div>
                  <div className="text-sm text-muted-foreground">{p.role}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-navy py-16 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 sm:px-6 md:flex-row md:items-center lg:px-8">
          <div>
            <h2 className="text-3xl font-bold">Ghé vườn của bạn, hoặc ghé văn phòng chúng tôi</h2>
            <p className="mt-2 flex items-center gap-1.5 text-white/70">
              <MapPin className="h-4 w-4" /> KĐT Geleximco, Hoài Đức, Hà Nội
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to={BRAND.surveyPath} className="inline-flex items-center gap-2 rounded-full bg-brand-leaf px-6 py-3 font-semibold text-brand-navy">
              Đặt lịch khảo sát <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/careers" className="inline-flex items-center rounded-full border border-white/30 px-6 py-3 font-semibold text-white hover:bg-white/10">
              Tuyển dụng
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
