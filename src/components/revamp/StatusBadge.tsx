import type { FeatureStatus } from "@/content/site";

/** Chỉ hiện nhãn "Đang thí điểm"; các trạng thái khác không hiện nhãn. */
const StatusBadge = ({ status }: { status: FeatureStatus }) => {
  if (status === "pilot") {
    return (
      <span className="inline-flex items-center rounded-full bg-brand-amber/15 px-2 py-0.5 text-[11px] font-semibold text-[#8a5a0b]">
        Đang thí điểm
      </span>
    );
  }
  return null;
};

export default StatusBadge;
