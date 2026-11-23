// Danh mục sản phẩm & dịch vụ – theo "AgriBeacon_Bảng giá 2026" (KHÔNG công khai giá: báo giá theo giải pháp từng khách).
import stationMulti from "@/assets/products/station-multi.jpg";
import stationSoil from "@/assets/products/station-soil.jpg";
import stationWeatherWater from "@/assets/products/station-weather-water.jpg";
import gateway from "@/assets/products/vy-sta-gateway.jpg";
import vyLink from "@/assets/products/vy-link.jpg";
import vySoUp from "@/assets/products/vy-so-up.jpg";
import vyPhUp from "@/assets/products/vy-ph-up.jpg";
import vySoHandheld from "@/assets/products/vy-so-handheld.jpg";
import vyWa from "@/assets/products/vy-wa.jpg";
import vyAir from "@/assets/products/vy-air.jpg";
import monsky from "@/assets/products/monsky-uav.jpg";
import rtkBase from "@/assets/products/monrtk-base.jpg";
import rtkRover from "@/assets/products/monrtk-rover.jpg";
import dubiro from "@/assets/products/dubiro-robot.jpg";
import robotField from "@/assets/field/robot-vineyard.jpg";
import droneField from "@/assets/field/drone-cacao.jpg";
import type { VideoKey } from "@/content/videos";
import waterField from "@/assets/field/team-water-station.jpg";

export interface Product {
  name: string;
  code?: string;
  img: string;
  summary: string;
  specs?: string[];
}

export interface DeviceLine {
  slug: string;
  name: string;
  tagline: string;
  intro: string;
  steps: number[];
  hero: string;
  heroField?: string;
  heroFieldPos?: string;
  highlights: { t: string; d: string }[];
  products: Product[];
  video: string;
  videos: VideoKey[];
  note?: string;
}

const STATION_BASE =
  "Trụ trạm 2–3,5 m, móng bê tông · 4G + GPS · pin mặt trời 12V + bộ lưu điện (UPS) · tủ điện, bộ điều khiển trạm · 5 cổng cắm tối đa 5 loại cảm biến";

export const DEVICE_LINES: DeviceLine[] = [
  {
    slug: "rtk",
    name: "MONRTK – định vị & lập bản đồ RTK",
    tagline: "Định vị chính xác đến centimet, lập bản đồ đến từng cây.",
    intro:
      "Đặt trạm Base, khảo sát bằng Rover quanh trang trại để lấy ranh giới, diện tích, vị trí từng cây và tuyến di chuyển cho máy móc. Dữ liệu đẩy về SutaGrow OS qua 4G/MQTT, xử lý thành bản đồ 2D/3D.",
    steps: [1, 2, 5],
    hero: rtkRover,
    highlights: [
      { t: "Bản đồ ranh giới", d: "Diện tích, chu vi, tọa độ WGS84 của từng thửa." },
      { t: "Bản đồ cây trồng", d: "Mỗi cây một ID/QR: giống, ngày trồng, tình trạng, lịch sử chăm sóc." },
      { t: "Tuyến cho máy móc", d: "Waypoint cho robot DUBIRO, máy phun và thiết bị tự hành." },
      { t: "Có kỹ sư đi cùng", d: "Dịch vụ kỹ sư quy hoạch & lập bản đồ tính theo diện tích." },
    ],
    products: [
      { name: "MONRTK Base", code: "MONRTK-B", img: rtkBase, summary: "Trạm mốc định vị tọa độ chính xác." },
      { name: "MONRTK Rover", code: "MONRTK-R", img: rtkRover, summary: "Thiết bị cầm tay khảo sát, lập bản đồ cây trồng & trang trại." },
    ],
    video: "Kỹ sư đi rover lấy tọa độ từng cây",
    videos: ["rtkMap"],
  },
  {
    slug: "aiot",
    name: "Trạm đo đa cảm biến AIoT",
    tagline: "Giám sát đất, nước, khí hậu trên một trạm đo, kết nối trực tiếp hệ thống tưới.",
    intro:
      "Trạm đo cố định gắn tới 5 cảm biến, tự nhận diện, gửi dữ liệu qua 4G. Trung tâm điều khiển VY-STA dùng chính dữ liệu đó để tự bật, tự dừng tưới. Mọi cảm biến của trạm cũng dùng độc lập như thiết bị đo cầm tay khi cần.",
    steps: [3, 5],
    hero: stationWeatherWater,
    heroField: waterField,
    heroFieldPos: "object-[50%_80%]",
    highlights: [
      { t: "Chỉ số sức khỏe đất SHI", d: "Tổng hợp EC, độ ẩm, nhiệt độ theo nguyên tắc Goldilocks thành một chỉ số dễ theo dõi." },
      { t: "Dùng tại trạm hoặc cầm tay", d: "Cùng một cảm biến: gắn cố định vào trạm, hoặc cắm vào VY-LINK để đo nhanh tại bất kỳ khu nào." },
      { t: "Lắp đặt nhanh", d: "Trạm tự nhận cảm biến. Trang trại nhỏ dùng 1 trạm độc lập; trang trại lớn nối mesh về gateway." },
      { t: "Tự bật/dừng tưới", d: "VY-STA điều khiển van, bơm theo độ ẩm đất, chất lượng nước và thời tiết thực tế." },
      { t: "Cảnh báo ngay tại trạm", d: "Còi báo tại trạm, cảnh báo quản lý trên app, cấu hình giờ hoạt động từ xa." },
      { t: "Bền ngoài trời", d: "Năng lượng mặt trời, có lưu điện; đầu đo nước chuẩn IP68." },
    ],
    products: [
      { name: "Trạm đo đa cảm biến cố định", code: "VY-NO", img: stationMulti, summary: "Khung trạm để tự chọn cảm biến theo vị trí.", specs: [STATION_BASE, "Không bao gồm SIM 4G"] },
      { name: "Trạm đo đất", code: "VY-NO + VY-SO-UP + VY-PH-UP", img: stationSoil, summary: "Trạm cố định giám sát dinh dưỡng đất liên tục.", specs: [STATION_BASE, "VY-SO-UP: EC, N, P, K, nhiệt độ, độ ẩm đất", "VY-PH-UP: pH đất"] },
      { name: "Trạm khí hậu & nước", code: "VY-NO + VY-AIR + VY-WA", img: stationWeatherWater, summary: "Vi khí hậu tại trang trại và chất lượng nguồn nước tưới.", specs: [STATION_BASE, "VY-AIR: 8 thông số khí hậu", "VY-WA: 5 thông số chất lượng nước"] },
      { name: "Trung tâm điều khiển thiết bị (Gateway)", code: "VY-STA", img: gateway, summary: "Gom dữ liệu các trạm và điều khiển thiết bị tưới tự động bật/dừng." },
      { name: "Bộ đo cầm tay & data logger", code: "VY-LINK", img: vyLink, summary: "Biến mọi đầu đo VY-SO, VY-WA, VY-AIR thành thiết bị cầm tay: tự nhận diện, đo và hiển thị chỉ số ngay tại vườn." },
      { name: "Cảm biến dinh dưỡng đất (trạm, cao cấp)", code: "VY-SO-UP", img: vySoUp, summary: "EC, N, P, K, nhiệt độ, độ ẩm đất. Dùng tại trạm hoặc cầm tay." },
      { name: "Cảm biến pH đất (trạm, cao cấp)", code: "VY-PH-UP", img: vyPhUp, summary: "pH đất. Dùng tại trạm hoặc cầm tay." },
      { name: "Cảm biến dinh dưỡng đất cầm tay 9in1", code: "VY-SO", img: vySoHandheld, summary: "9 chỉ số: pH, EC, N, P, K, nhiệt độ, độ ẩm, độ mặn và chỉ số sức khỏe đất SHI. BLE 5.0, màn OLED, đọc số ngay tại ruộng." },
      { name: "Cảm biến chất lượng nước 5in1", code: "VY-WA", img: vyWa, summary: "pH, nhiệt độ, TDS, độ mặn, EC. Dùng tại trạm hoặc cầm tay." },
      { name: "Cảm biến thời tiết 8in1", code: "VY-AIR", img: vyAir, summary: "Nhiệt độ & độ ẩm không khí, tốc độ & hướng gió, áp suất, lượng mưa, độ chiếu sáng, tổng bức xạ. Dùng tại trạm hoặc cầm tay." },
    ],
    video: "Trạm đo ngoài farm và van tưới tự bật/dừng",
    videos: [],
  },
  {
    slug: "uav",
    name: "MONSKY UAV – khảo sát & giám sát",
    tagline: "Khảo sát và giám sát sức khỏe cây trồng định kỳ từ trên cao.",
    intro:
      "Drone khảo sát và giám sát nông nghiệp: ảnh đa phổ, bản đồ sức khỏe cây (NDVI, NDRE, SAVI…), phát hiện sớm stress và sâu bệnh bằng AI, lưu lịch sử bay về SutaGrow OS.",
    steps: [1, 5],
    hero: monsky,
    heroField: droneField,
    highlights: [
      { t: "Bay tối đa 72 phút", d: "Bao phủ diện rộng trong một lần bay (theo thông số nhà sản xuất)." },
      { t: "Bản đồ đa phổ", d: "Chỉ số sức khỏe cây theo từng vùng, từng cây." },
      { t: "Phát hiện bất thường", d: "AI nhận diện sớm sâu bệnh, thiếu dinh dưỡng, stress." },
      { t: "Dòng thời gian sinh trưởng", d: "So sánh các lần bay để thấy cây thay đổi thế nào." },
    ],
    products: [{ name: "MONSKY UAV", code: "MONSKY", img: monsky, summary: "UAV tự hành khảo sát và giám sát nông nghiệp. Thời gian bay tối đa 72 phút." }],
    video: "MONSKY bay khảo sát vườn cây",
    videos: ["uav"],
  },
  {
    slug: "robot",
    name: "DUBIRO – robot phun thuốc",
    tagline: "Phun thuốc đúng tuyến, đều liều, giảm tiếp xúc hóa chất cho người vận hành.",
    intro:
      "Robot phun thuốc tự hành / bán tự hành cho trang trại cây lâu năm. Điều khiển từ xa qua 4G với camera 360°, chạy theo tuyến RTK, lưu nhật ký tuyến đi, lưu lượng và thời gian phun sau mỗi lượt.",
    steps: [5],
    hero: dubiro,
    heroField: robotField,
    highlights: [
      { t: "An toàn hơn", d: "Giảm tiếp xúc trực tiếp với hóa chất." },
      { t: "Đều hơn", d: "Phun ổn định theo tuyến, nhiều loại đầu phun theo cây trồng." },
      { t: "Điều khiển linh hoạt", d: "Từ xa bằng tay cầm hoặc bán tự hành, video trực tiếp." },
      { t: "Có dữ liệu truy vết", d: "Mỗi lượt phun thành một bản ghi trong SutaGrow OS." },
    ],
    products: [{ name: "Robot DUBIRO", code: "DUBIRO", img: dubiro, summary: "Robot phun thuốc tự hành / bán tự hành. Có dịch vụ thuê theo buổi hoặc mùa vụ." }],
    video: "DUBIRO phun giữa hàng cây",
    videos: ["robot"],
  },
];

// ---------------------------------------------------------------------------
// Gói & báo giá theo hành trình (không công khai giá)
export type OfferKind = "service" | "device" | "software" | "ai";

export interface OfferItem {
  kind: OfferKind;
  name: string;
  d: string; // 1 dòng, **từ khóa**
  img?: string;
  code?: string;
}

export interface OfferStage {
  key: string;
  short: string;
  title: string;
  goal: string;
  link?: { label: string; path: string };
  note?: string;
  osNote: string; // dữ liệu chặng này đi vào SutaGrow OS thế nào
  items: OfferItem[];
}

export const OFFER_JOURNEY: OfferStage[] = [
  {
    key: "soil",
    short: "Hiểu đất",
    title: "Hiểu đất trước khi trồng",
    goal: "Biết đất và nước của mình hợp với **cây, giống** nào.",
    link: { label: "Bước 1: Hiểu mảnh đất", path: "/platform/survey" },
    osNote: "Kết quả đo lưu đúng **vị trí lấy mẫu**, dùng lại khi lập kế hoạch bón phân.",
    items: [
      { kind: "service", code: "VY-SO-LAB01", name: "Phân tích đất cơ bản", d: "**Hóa lý, dinh dưỡng**: pH, EC, chất hữu cơ, NPK, CEC." },
      { kind: "service", code: "VY-SO-LAB02", name: "Đất & vi sinh", d: "Gói cơ bản, thêm **vi sinh vật có lợi**." },
      { kind: "service", code: "VY-SO-LAB03", name: "Toàn bộ sức khỏe đất", d: "Gói vi sinh, thêm **mầm bệnh, tuyến trùng**." },
      { kind: "device", code: "VY-LINK", name: "Bộ đo cầm tay", d: "Cắm đầu đo **VY-SO, VY-WA, VY-AIR**, xem kết quả **ngay tại vườn**.", img: vyLink },
      { kind: "device", code: "VY-SO", name: "Cảm biến đất cầm tay 9in1", d: "Đo **9 chỉ số đất**, có chỉ số sức khỏe đất SHI.", img: vySoHandheld },
      { kind: "device", code: "VY-WA", name: "Cảm biến nước 5in1", d: "Kiểm tra **chất lượng nước tưới**.", img: vyWa },
    ],
  },
  {
    key: "plan",
    short: "Quy hoạch",
    title: "Quy hoạch trang trại",
    goal: "Có bản đồ **đến từng cây** trước khi trồng và làm hạ tầng.",
    link: { label: "Bước 2: Quy hoạch & bản đồ", path: "/platform/planning" },
    osNote: "Mỗi khu, luống, **từng cây có mã riêng**; việc làm sau này đều gắn vào đó.",
    items: [
      { kind: "device", code: "MONRTK", name: "MONRTK Base", d: "Trạm mốc cho độ chính xác **đến cm**.", img: rtkBase },
      { kind: "device", code: "MONRTK", name: "MONRTK Rover", d: "Đo **ranh giới, vị trí từng cây** ngoài thực địa.", img: rtkRover },
      { kind: "service", name: "Kỹ sư quy hoạch & lập bản đồ", d: "Thiết kế **khu, hàng cây, đường tưới, hạ tầng**. Báo giá theo diện tích." },
    ],
  },
  {
    key: "monitor",
    short: "Giám sát & tưới",
    title: "Giám sát & tưới tự động",
    goal: "Theo dõi **đất, nước, thời tiết** cả ngày và **tưới khi đất cần**.",
    link: { label: "Xem trạm đo đa cảm biến", path: "/devices/aiot" },
    note: "Mỗi cảm biến trên trạm cũng dùng riêng được như **máy đo cầm tay**.",
    osNote: "Xem số đo trên bản đồ, **nhận cảnh báo và bật tắt tưới** từ điện thoại.",
    items: [
      { kind: "device", code: "VY-NO", name: "Trạm đo đất", d: "**VY-SO-UP, VY-PH-UP** đo dinh dưỡng đất liên tục.", img: stationSoil },
      { kind: "device", code: "VY-NO", name: "Trạm khí hậu & nước", d: "**VY-AIR 8in1, VY-WA 5in1** đo thời tiết tại vườn và nguồn nước.", img: stationWeatherWater },
      { kind: "device", code: "VY-STA", name: "Trung tâm điều khiển tưới", d: "**Tự bật, tắt tưới** theo số đo của trạm.", img: gateway },
    ],
  },
  {
    key: "automate",
    short: "Tối ưu nhân công",
    title: "Giảm việc tay chân bằng UAV, robot",
    goal: "Để máy làm các việc **lặp lại, nặng nhọc**.",
    link: { label: "Bước 5: Tối ưu & tự động hóa", path: "/platform/automation" },
    osNote: "Mỗi lượt bay, lượt phun **tự ghi nhật ký**: ở khu nào, bao nhiêu thuốc, tốn bao nhiêu.",
    items: [
      { kind: "device", code: "MONSKY", name: "UAV MONSKY", d: "**Bay khảo sát, theo dõi sức khỏe cây**, bay tối đa 72 phút.", img: monsky },
      { kind: "device", code: "DUBIRO", name: "Robot đa tác vụ DUBIRO", d: "**Phun thuốc, cắt cỏ** theo tuyến RTK, tự chạy hoặc có người điều khiển.", img: dubiro },
      { kind: "service", name: "Thuê robot DUBIRO", d: "Thuê theo **buổi** hoặc **mùa vụ**, kèm người vận hành." },
    ],
  },
];

export const PLATFORM_OFFER = {
  title: "SutaGrow OS & Trợ lý AI Tiểu Thần Nông",
  goal: "Ghi lại **việc làm hằng ngày** và gom **số liệu từ mọi thiết bị** về một app. Chặng nào cũng dùng.",
  items: [
    { kind: "software", name: "SutaGrow Farm Monitor", d: "Đi kèm thiết bị: **xem số đo, nhận cảnh báo, điều khiển tưới**." },
    { kind: "software", name: "SutaGrow Manage", d: "Cho một trang trại: **bản đồ cây, giao việc, chấm công, kho, chi phí**." },
    { kind: "software", name: "SutaGrow Optimize", d: "Xem **nhiều trang trại** trên một bản đồ, so sánh với nhau." },
    { kind: "software", name: "SutaGrow Enterprise", d: "Cho **vùng trồng, chuỗi thu mua**; có bản mang thương hiệu riêng." },
    { kind: "ai", name: "Trợ lý AI Tiểu Thần Nông", d: "**Nói là nhập liệu**, hỏi kỹ thuật canh tác; trả lời theo vai trò người dùng." },
    { kind: "software", name: "Mở rộng theo nhu cầu", d: "Thêm **trang trại**, thêm **người dùng** khi cần." },
  ] as OfferItem[],
};

export const ONSITE_SERVICE = {
  name: "Triển khai & đào tạo tại trang trại",
  d: "Kỹ thuật viên đến tận nơi **lắp đặt, cài đặt** và **hướng dẫn** người dùng.",
};
