import { useState } from "react";
import { Check, ClipboardList, Mic, PackageMinus, Sparkles, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { rich } from "@/lib/rich";

const RECORDS = [
  { icon: ClipboardList, type: "Công việc", lines: ["Làm cỏ · Khu 3", "Tổ A · hôm nay, ca sáng"] },
  { icon: Users, type: "Công nhật", lines: ["Tổ A · 6 công", "Đơn giá theo bảng công nhật"] },
  { icon: PackageMinus, type: "Xuất kho", lines: ["NPK 16-16-8 · 2 bao", "Kho chính → Khu 3"] },
];

const STEPS = [
  { t: "Nói hoặc nhắn", d: "Như khi báo cáo với quản lý, không cần chọn biểu mẫu." },
  { t: "AI hiểu và điền sẵn", d: "Tách đúng loại bản ghi: công việc, công nhật, xuất kho, mua hàng." },
  { t: "Bấm xác nhận", d: "Kiểm tra lại thông tin, một cú bấm là hoàn tất." },
  { t: "Gợi ý bước tiếp theo", d: "AI nhắc việc liên quan dựa trên dữ liệu của trang trại." },
];

/** Minh họa: một câu nói → 3 bản ghi điền sẵn → xác nhận → gợi ý tiếp theo. */
const AiEntryDemo = () => {
  const [confirmed, setConfirmed] = useState(false);

  return (
    <section className="bg-brand-sand py-16 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:px-8">
        <div>
          <div className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-brand-leaf-deep">Nhập liệu cùng Tiểu Thần Nông</div>
          <h2 className="text-3xl font-bold leading-tight text-brand-navy sm:text-4xl">Một câu nói, ba bản ghi, một cú bấm</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {rich("Rào cản lớn nhất là **nhập liệu mỗi ngày**. Tiểu Thần Nông biến nó thành **một câu nói**.")}
          </p>
          <ol className="mt-8 space-y-4">
            {STEPS.map((s, i) => (
              <li key={s.t} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-navy text-sm font-bold text-white">{i + 1}</span>
                <div>
                  <div className="font-semibold text-brand-navy">{s.t}</div>
                  <p className="text-sm text-muted-foreground">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Khung chat minh họa */}
        <div className="rounded-3xl bg-white p-4 shadow-[0_30px_80px_-40px_rgba(9,40,51,0.45)] sm:p-6">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-brand-navy">
            <Sparkles className="h-4 w-4 text-brand-leaf-deep" /> Tiểu Thần Nông
            <span className="ml-auto text-xs font-normal text-muted-foreground">Minh họa</span>
          </div>

          {/* Người dùng */}
          <div className="ml-auto flex max-w-[85%] items-start gap-2 rounded-2xl rounded-tr-sm bg-brand-navy px-4 py-3 text-sm text-white">
            <Mic className="mt-0.5 h-4 w-4 shrink-0 text-brand-leaf" />
            <span>“Sáng nay tổ A 6 người làm cỏ khu 3, xuất 2 bao NPK cho khu 3.”</span>
          </div>

          {/* AI điền sẵn */}
          <div className="mt-4 max-w-[95%] rounded-2xl rounded-tl-sm bg-brand-sand p-4 text-sm">
            <p className="text-brand-navy">Tôi đã chuẩn bị 3 bản ghi, bạn kiểm tra và xác nhận nhé:</p>
            <div className="mt-3 grid gap-2">
              {RECORDS.map((r) => (
                <div key={r.type} className={cn("flex items-start gap-3 rounded-xl border p-3 transition", confirmed ? "border-brand-leaf bg-brand-leaf/15" : "border-transparent bg-white")}>
                  <r.icon className="mt-0.5 h-4 w-4 shrink-0 text-brand-leaf-deep" />
                  <div className="flex-1">
                    <div className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{r.type}</div>
                    <div className="font-semibold text-brand-navy">{r.lines[0]}</div>
                    <div className="text-xs text-muted-foreground">{r.lines[1]}</div>
                  </div>
                  {confirmed && <Check className="h-4 w-4 text-brand-leaf-deep" />}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setConfirmed((v) => !v)}
              className={cn(
                "mt-3 w-full rounded-full py-2.5 text-sm font-semibold transition",
                confirmed ? "bg-brand-leaf text-brand-navy" : "bg-brand-navy text-white hover:bg-brand-navy-2",
              )}
            >
              {confirmed ? "Đã ghi nhận 3 bản ghi ✓" : "Xác nhận cả 3"}
            </button>
          </div>

          {/* Gợi ý tiếp theo */}
          <div className={cn("mt-4 max-w-[95%] rounded-2xl rounded-tl-sm bg-brand-sand p-4 text-sm transition-all duration-500", confirmed ? "opacity-100" : "pointer-events-none opacity-0")}>
            <p className="text-brand-navy">
              Khu 3 đến lịch bón thúc vào tuần sau. Tồn kho NPK còn 3 bao, chưa đủ cho khu 3. Bạn có muốn tạo sẵn công việc bón thúc và đề xuất mua thêm 4 bao không?
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full border border-brand-navy/20 px-3 py-1 text-xs font-semibold text-brand-navy">Tạo công việc</span>
              <span className="rounded-full border border-brand-navy/20 px-3 py-1 text-xs font-semibold text-brand-navy">Tạo đề xuất mua</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiEntryDemo;
