import type { FeatureStatus } from "@/content/site";

/** "pilot" luôn hiện công khai; "verify" chỉ hiện ở dev để team xác nhận trước khi phát hành. */
const StatusBadge = ({ status }: { status: FeatureStatus }) => {
  if (status === "pilot") {
    return (
      <span className="inline-flex items-center rounded-full bg-brand-amber/15 px-2 py-0.5 text-[11px] font-semibold text-[#8a5a0b]">
        Đang thí điểm
      </span>
    );
  }
  if (status === "verify" && import.meta.env.DEV) {
    return (
      <span className="inline-flex items-center rounded-full border border-dashed border-brand-amber px-2 py-0.5 text-[11px] font-medium text-[#8a5a0b]">
        cần xác nhận
      </span>
    );
  }
  return null;
};

export default StatusBadge;
