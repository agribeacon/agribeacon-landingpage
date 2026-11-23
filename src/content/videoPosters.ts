// Ảnh đại diện (thumbnail) thiết kế riêng cho từng video, khớp với nội dung video.
import type { VideoKey } from "./videos";
import heroFarm from "@/assets/field/hero-farm-poster.jpg";
import droneCacao from "@/assets/field/drone-cacao.jpg";
import robotVineyard from "@/assets/field/robot-vineyard.jpg";
import dashboard from "@/assets/field/multifarm-dashboard.jpg";
import monrtkBase from "@/assets/products/monrtk-base.jpg";
import monrtkRover from "@/assets/products/monrtk-rover.jpg";
import monsky from "@/assets/products/monsky-uav.jpg";
import dubiro from "@/assets/products/dubiro-robot.jpg";
import stationMulti from "@/assets/products/station-multi.jpg";
import vySo from "@/assets/products/vy-so-handheld.jpg";

export interface VideoPosterSpec {
  /** Nhãn ngắn phía trên tiêu đề */
  tag: string;
  /** Ảnh nền (mờ dần sang trái) */
  bg?: string;
  /** Ảnh sản phẩm hiển thị dạng thẻ trắng bên phải */
  items?: string[];
  /** Ảnh màn hình ứng dụng */
  screen?: string;
  /** Minh họa đặc biệt */
  art?: "chat" | "plan";
  /** Nhãn phụ cho video mô phỏng */
  sub?: string;
}

export const VIDEO_POSTERS: Record<VideoKey, VideoPosterSpec> = {
  fieldIntro: { tag: "AgriBeacon tại thực địa", bg: heroFarm },
  sutagrowOverview: { tag: "SutaGrow OS", bg: heroFarm, screen: dashboard },
  ecosystem: { tag: "Hệ sinh thái AIoT", bg: droneCacao, items: [monrtkRover, stationMulti, monsky] },
  soilWater: { tag: "Trạm đo & tưới", bg: heroFarm, items: [stationMulti] },
  vySo: { tag: "Đo đất tại vườn", bg: heroFarm, items: [vySo] },
  rtkMap: { tag: "Quy hoạch · RTK", bg: heroFarm, items: [monrtkBase, monrtkRover] },
  rtkRobotUav: { tag: "RTK · Robot · UAV", bg: robotVineyard, items: [monrtkRover, dubiro, monsky] },
  uav: { tag: "Bay khảo sát", bg: droneCacao, items: [monsky] },
  robot: { tag: "Robot đa tác vụ", bg: robotVineyard, items: [dubiro] },
  ai: { tag: "Trợ lý AI", art: "chat" },
  planning3d: { tag: "Mô phỏng 3D", art: "plan", sub: "Quy hoạch trang trại" },
  planGuava: { tag: "Mô phỏng 3D", art: "plan", sub: "Vườn ổi" },
  planCoffeePineapple: { tag: "Mô phỏng 3D", art: "plan", sub: "Cà phê xen dứa" },
};
