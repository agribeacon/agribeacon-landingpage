import { MapPin } from "lucide-react";
import { FARMS } from "@/content/site";
import { cn } from "@/lib/utils";
import CropTree from "./CropTree";

/** Dải khách hàng chạy ngang chậm, mỗi trang trại kèm minh họa cây trồng. */
const CustomerMarquee = ({ className, tone = "white" }: { className?: string; tone?: "white" | "sand" }) => {
  // Lặp danh sách để dải chạy liền mạch
  const loop = [...FARMS, ...FARMS, ...FARMS, ...FARMS];
  return (
    <div
      className={cn("relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]", className)}
      aria-label="Trang trại đang dùng SutaGrow OS"
    >
      <ul className="marquee flex w-max gap-3">
        {loop.map((f, i) => (
          <li
            key={`${f.name}-${i}`}
            aria-hidden={i >= FARMS.length}
            className={cn("flex w-56 shrink-0 flex-col items-center rounded-3xl px-5 pb-5 pt-4 text-center", tone === "white" ? "bg-white" : "bg-brand-sand")}
          >
            <CropTree crop={f.crop} className="h-28 w-28" />
            <span className="mt-2 font-semibold text-brand-navy">{f.name}</span>
            <span className="mt-0.5 text-sm text-brand-navy/70">
              {f.crop} · {f.area}
            </span>
            <span className="mt-1 flex items-center gap-1 text-xs text-brand-navy/55">
              <MapPin className="h-3.5 w-3.5" />
              {f.location}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerMarquee;
