// Danh mục video của AgriBeacon (Google Drive, chia sẻ bằng link).
// Phát qua trình phát nhúng của Google Drive. Khi chuyển sang CDN/S3, chỉ cần thêm `mp4` cho từng video.

export interface Video {
  driveId: string;
  title: string;
  mp4?: string; // URL mp4 (CDN/S3) – nếu có sẽ dùng thay cho Drive
}

export const VIDEOS = {
  fieldIntro: { driveId: "1Mk-Pk_BnR3_yxwqfWML4ppia_OSmQ8eg", title: "AgriBeacon tại thực địa: Hệ điều hành AIoT cho nông nghiệp thế hệ mới" },
  sutagrowOverview: { driveId: "1jXDG4G8mgTgNthS7dalz0lPSDMzCY9xd", title: "SutaGrow OS: một vòng vận hành tại vườn sầu riêng" },
  ecosystem: { driveId: "17WgCAppDz9lWIa2RejHo1tj1uCVliqkB", title: "Hệ sinh thái AIoT của AgriBeacon" },
  soilWater: { driveId: "1A4D643WajVR5G6b193VCZFvrbrzxOcMj", title: "Giám sát đất và nước bằng trạm đo đa cảm biến" },
  vySo: { driveId: "1KN2cUU5XRF-XzicKfSLOZ00Y5Tb0AO3b", title: "VY-SO: đo dinh dưỡng đất tại vườn" },
  rtkMap: { driveId: "1tbpzDrWW4K8M9nbGoij2bUHjvzjE0Bux", title: "Lập bản đồ cây trồng bằng công nghệ RTK" },
  rtkRobotUav: { driveId: "1UVj_E28ax96ULCj7fcMVlmKXkAkIfNsd", title: "RTK, robot và UAV trong một quy trình" },
  uav: { driveId: "1MhamU2X02saY6sMa9Or5funTwQwvvqGq", title: "MONSKY UAV: khảo sát và giám sát" },
  robot: { driveId: "15DYGdARk5KPdv69WKVka1pI6XHlsXDDx", title: "Robot DUBIRO phun thuốc" },
  ai: { driveId: "16NRZmP5-H7DDTVJuNzbJMeYvTUQ8kxiw", title: "Trợ lý AI Tiểu Thần Nông" },
  // Video mô phỏng quy hoạch (không phải dự án đã triển khai)
  planning3d: { driveId: "1_fpyUR8VrRrGCsN-hkpF1520rb8_aYx8", title: "Mô phỏng 3D: từ mảnh đất đến trang trại số" },
  planGuava: { driveId: "1UJ57c7lfXWxlGg81GrGISBUvMA-X2Ate", title: "Mô phỏng quy hoạch vườn ổi" },
  planCoffeePineapple: { driveId: "1LgL4quQWAcgyhViyRcRHPl4sUZnfz3Pa", title: "Mô phỏng quy hoạch vườn cà phê xen dứa" },
} satisfies Record<string, Video>;

export type VideoKey = keyof typeof VIDEOS;

export const driveEmbedUrl = (v: Video) => `https://drive.google.com/file/d/${v.driveId}/preview`;
