import {
  Rocket,
  Map,
  Activity,
  Gauge,
  Cpu,
  ClipboardList,
  Users,
  Boxes,
  Warehouse,
  Wallet,
  Store,
  BarChart3,
  Sparkles,
  BookOpen,
  HelpCircle,
  Leaf,
  Sprout,
  FileText,
  Video,
  LifeBuoy,
  type LucideIcon,
} from "lucide-react";

// Bảng icon danh mục — key trùng tên lucide lưu ở admin CMS.
export const HELP_ICONS: Record<string, LucideIcon> = {
  Rocket, Map, Activity, Gauge, Cpu, ClipboardList, Users, Boxes, Warehouse,
  Wallet, Store, BarChart3, Sparkles, BookOpen, HelpCircle, Leaf, Sprout,
  FileText, Video, LifeBuoy,
};

// Trả về icon theo tên; fallback BookOpen nếu không khớp.
export function iconFor(name?: string): LucideIcon {
  return (name && HELP_ICONS[name]) || BookOpen;
}
