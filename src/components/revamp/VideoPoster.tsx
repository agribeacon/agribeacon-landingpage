import { Mic, Play } from "lucide-react";
import { VIDEOS, type VideoKey } from "@/content/videos";
import { VIDEO_POSTERS } from "@/content/videoPosters";
import { cn } from "@/lib/utils";

/** Minh họa trợ lý AI: lời nói → bản ghi đã điền sẵn. */
const ChatArt = () => (
  <div className="flex w-full flex-col gap-[2.5cqw]">
    <div className="ml-auto flex max-w-[95%] items-start gap-[1.5cqw] rounded-[2cqw] rounded-br-none bg-brand-leaf px-[2.5cqw] py-[1.8cqw] text-[2.3cqw] font-medium leading-snug text-brand-navy">
      <Mic className="mt-[0.3cqw] h-[2.6cqw] w-[2.6cqw] shrink-0" />
      “Tổ A làm cỏ khu 3, xuất 2 bao NPK”
    </div>
    <div className="max-w-[95%] rounded-[2cqw] rounded-bl-none bg-white px-[2.5cqw] py-[1.8cqw] text-[2.1cqw] leading-snug text-brand-navy shadow-lg">
      <div className="font-bold text-brand-leaf-deep">Đã điền sẵn</div>
      <div>Công việc · Làm cỏ · Khu 3</div>
      <div>Xuất kho · NPK · 2 bao</div>
      <div className="mt-[1cqw] inline-block rounded-full bg-brand-navy px-[2cqw] py-[0.5cqw] text-[1.8cqw] font-semibold text-white">Xác nhận</div>
    </div>
  </div>
);

/** Minh họa mô phỏng quy hoạch: khu, luống, cây. */
const PlanArt = ({ mix }: { mix?: boolean }) => (
  <svg viewBox="0 0 200 140" className="w-full drop-shadow-xl" aria-hidden>
    <g transform="translate(100 18) skewX(-28) scale(1 0.62) translate(-60 0)">
      <rect x="0" y="0" width="150" height="170" rx="6" fill="#B5643C" />
      {[0, 1].map((col) =>
        [0, 1].map((row) => (
          <g key={`${col}-${row}`} transform={`translate(${8 + col * 72} ${8 + row * 80})`}>
            <rect width="64" height="74" rx="3" fill="#A0532F" />
            {Array.from({ length: 5 }).map((_, r) =>
              Array.from({ length: 6 }).map((_, c) => <circle key={`${r}-${c}`} cx={8 + c * 10} cy={10 + r * 13} r={mix && r % 2 ? 2.6 : 3.6} fill={mix && r % 2 ? "#E0A43A" : "#7FB24A"} />),
            )}
          </g>
        )),
      )}
      <line x1="75" y1="0" x2="75" y2="170" stroke="#E9DFC8" strokeWidth="2" />
      <line x1="0" y1="85" x2="150" y2="85" stroke="#E9DFC8" strokeWidth="2" />
    </g>
    <ellipse cx="38" cy="112" rx="14" ry="6" fill="#4E9CC2" />
  </svg>
);

/** Ảnh đại diện thiết kế cho video: nhãn, tiêu đề và hình minh họa đúng nội dung. */
const VideoPoster = ({ video, className }: { video: VideoKey; className?: string }) => {
  const p = VIDEO_POSTERS[video];
  const items = p.items ?? [];
  return (
    <div className={cn("absolute inset-0 overflow-hidden bg-brand-navy [container-type:inline-size]", className)}>
      {p.bg && <img src={p.bg} alt="" className="absolute inset-0 h-full w-full object-cover opacity-60" loading="lazy" />}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/85 to-brand-navy/10" />
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "18px 18px" }}
      />

      {/* Minh họa bên phải */}
      <div className="absolute inset-y-0 right-[4%] flex w-[44%] items-center justify-center">
        {p.screen && (
          <div className="w-full rotate-[-3deg] rounded-[1.5cqw] bg-white p-[0.8cqw] shadow-2xl">
            <img src={p.screen} alt="" className="w-full rounded-[1cqw]" loading="lazy" />
          </div>
        )}
        {items.length > 0 && (
          <div className="flex w-full items-center justify-center">
            {items.map((src, i) => (
              <div
                key={src}
                className={cn(
                  "aspect-[3/4] rounded-[2cqw] bg-white p-[1cqw] shadow-2xl",
                  items.length === 1 ? "w-[62%]" : items.length === 2 ? "w-[48%]" : "w-[38%]",
                  i > 0 && "-ml-[6%]",
                  i % 2 ? "translate-y-[8%] rotate-[4deg]" : "-rotate-[3deg]",
                )}
              >
                <img src={src} alt="" className="h-full w-full object-contain" loading="lazy" />
              </div>
            ))}
          </div>
        )}
        {p.art === "chat" && <ChatArt />}
        {p.art === "plan" && <PlanArt mix={video === "planCoffeePineapple"} />}
      </div>

      {/* Nhãn + tiêu đề */}
      <div className="absolute inset-y-0 left-0 flex w-[54%] flex-col justify-center gap-[2cqw] p-[5%]">
        <span className="flex h-[9cqw] w-[9cqw] items-center justify-center rounded-full bg-brand-leaf text-brand-navy shadow-lg transition group-hover:scale-110">
          <Play className="ml-[0.6cqw] h-[4cqw] w-[4cqw] fill-current" />
        </span>
        <span className="text-[2.2cqw] font-bold uppercase tracking-[0.14em] text-brand-leaf">{p.tag}</span>
        <span className="text-[4.2cqw] font-bold leading-tight text-white">{p.sub ?? VIDEOS[video].title}</span>
      </div>
    </div>
  );
};

export default VideoPoster;
