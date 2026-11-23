import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useEffect } from "react";
import CustomerMarquee from "@/components/revamp/CustomerMarquee";
import { BRAND } from "@/content/site";

const Customers = () => {
  useEffect(() => {
    document.title = `Khách hàng – Farm đang vận hành bằng ${BRAND.os} | AgriBeacon`;
  }, []);

  return (
    <main>
      <section className="bg-brand-sand pb-16 pt-28 lg:pt-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-brand-leaf-deep">Khách hàng</div>
          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight text-brand-navy sm:text-6xl">Khách hàng đang sử dụng {BRAND.os}</h1>
          <p className="mt-6 max-w-2xl text-lg text-brand-navy/75">Trang trại cacao, cà phê, bơ, ổi, nho ở Việt Nam và Campuchia, từ vườn nửa hecta đến trang trại 80 ha.</p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <CustomerMarquee tone="sand" />
        </div>
      </section>

      <section className="bg-brand-navy py-16 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 sm:px-6 md:flex-row md:items-center lg:px-8">
          <h2 className="text-3xl font-bold">Bắt đầu số hóa trang trại của bạn</h2>
          <Link to={BRAND.surveyPath} className="inline-flex items-center gap-2 rounded-full bg-brand-leaf px-6 py-3 font-semibold text-brand-navy">
            Đặt lịch khảo sát <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Customers;
