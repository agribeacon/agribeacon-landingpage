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
  note?: string;
}

const STATION_BASE =
  "Trụ trạm 2–3,5 m, móng bê tông · 4G + GPS · pin mặt trời 12V + bộ lưu điện (UPS) · tủ điện, bộ điều khiển trạm · 5 cổng cắm tối đa 5 loại cảm biến";

export const DEVICE_LINES: DeviceLine[] = [
  {
    slug: "aiot",
    name: "Trạm đo đa cảm biến AIoT",
    tagline: "Một trạm đo, ba lớp dữ liệu – đất, nước, khí hậu – và nối thẳng vào hệ thống tưới.",
    intro:
      "Trạm đo cố định gắn tới 5 cảm biến, tự nhận diện, gửi dữ liệu qua 4G. Trung tâm điều khiển VY-STA dùng chính dữ liệu đó để tự bật, tự dừng tưới. Cảm biến cầm tay dùng chung đầu đo để kiểm tra nhanh tại vườn.",
    steps: [3, 5],
    hero: stationWeatherWater,
    heroField: waterField,
    heroFieldPos: "object-[50%_80%]",
    highlights: [
      { t: "Cắm là chạy", d: "Trạm tự nhận cảm biến. Farm nhỏ: 1 trạm độc lập. Farm lớn: trạm nối mesh về gateway." },
      { t: "Tự bật/dừng tưới", d: "VY-STA điều khiển van, bơm theo độ ẩm đất, chất lượng nước và thời tiết thực tế." },
      { t: "Cảnh báo ngay tại trạm", d: "Còi báo tại trạm, cảnh báo quản lý trên app, cấu hình giờ hoạt động từ xa." },
      { t: "Bền ngoài trời", d: "Năng lượng mặt trời, có lưu điện; đầu đo nước chuẩn IP68." },
    ],
    products: [
      { name: "Trạm đo đa cảm biến cố định", code: "VY-NO", img: stationMulti, summary: "Khung trạm để tự chọn cảm biến theo vị trí.", specs: [STATION_BASE, "Không bao gồm SIM 4G"] },
      { name: "Trạm đo đất", code: "VY-NO + VY-SO-UP + VY-PH-UP", img: stationSoil, summary: "Trạm cố định giám sát dinh dưỡng đất liên tục.", specs: [STATION_BASE, "VY-SO-UP: EC, N, P, K, nhiệt độ, độ ẩm đất", "VY-PH-UP: pH đất"] },
      { name: "Trạm khí hậu & nước", code: "VY-NO + VY-AIR + VY-WA", img: stationWeatherWater, summary: "Vi khí hậu tại farm và chất lượng nguồn nước tưới.", specs: [STATION_BASE, "VY-AIR: 8 thông số khí hậu", "VY-WA: 5 thông số chất lượng nước"] },
      { name: "Trung tâm điều khiển thiết bị (Gateway)", code: "VY-STA", img: gateway, summary: "Gom dữ liệu các trạm và điều khiển thiết bị tưới tự động bật/dừng." },
      { name: "Hub kết nối & data logger", code: "VY-LINK", img: vyLink, summary: "Cắm một trong các đầu đo VY-SO, VY-WA, VY-AIR – tự nhận diện, đo và hiển thị chỉ số." },
      { name: "Cảm biến dinh dưỡng đất (trạm, cao cấp)", code: "VY-SO-UP", img: vySoUp, summary: "EC, N, P, K, nhiệt độ, độ ẩm đất." },
      { name: "Cảm biến pH đất (trạm, cao cấp)", code: "VY-PH-UP", img: vyPhUp, summary: "pH đất." },
      { name: "Cảm biến dinh dưỡng đất cầm tay", code: "VY-SO", img: vySoHandheld, summary: "8 chỉ số: pH, EC, N, P, K, nhiệt độ, độ ẩm, độ mặn. BLE 5.0, màn OLED, đọc số ngay tại ruộng." },
      { name: "Cảm biến chất lượng nước 5in1", code: "VY-WA", img: vyWa, summary: "pH, nhiệt độ, TDS, độ mặn, EC." },
      { name: "Cảm biến thời tiết 8in1", code: "VY-AIR", img: vyAir, summary: "Nhiệt độ & độ ẩm không khí, tốc độ & hướng gió, áp suất, lượng mưa, độ chiếu sáng, tổng bức xạ." },
    ],
    video: "Trạm đo ngoài farm và van tưới tự bật/dừng",
  },
  {
    slug: "rtk",
    name: "MONRTK – định vị & lập bản đồ RTK",
    tagline: "Tọa độ cấp centimet: nền móng của bản đồ từng cây.",
    intro:
      "Đặt trạm Base, đi Rover quanh farm để lấy ranh giới, diện tích, vị trí từng cây và tuyến di chuyển cho máy móc. Dữ liệu đẩy về SutaGrow OS qua 4G/MQTT, xử lý thành bản đồ 2D/3D.",
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
  },
  {
    slug: "uav",
    name: "MONSKY UAV – khảo sát & giám sát",
    tagline: "Nhìn cả farm từ trên cao, định kỳ, theo cùng một đường bay.",
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
  },
  {
    slug: "robot",
    name: "DUBIRO – robot phun thuốc",
    tagline: "Phun đúng tuyến, đều liều, người vận hành đứng ngoài vùng thuốc.",
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
  },
];

// Gói phần mềm – không công khai giá
export const SOFTWARE_PLANS = [
  { name: "SutaGrow Farm Monitor", for: "Đi kèm khi trang bị thiết bị AIoT", d: "Theo dõi dữ liệu trạm đo, cảnh báo, điều khiển tưới trên app." },
  { name: "SutaGrow Manage", for: "Một trang trại, quản lý bài bản", d: "Bản đồ từng cây, công việc, nhân công & công nhật, vật tư & kho, chi phí." },
  { name: "SutaGrow Optimize", for: "Nhiều trang trại", d: "Quản lý đa trang trại trên một bản đồ, so sánh KPI giữa các địa điểm." },
  { name: "SutaGrow Enterprise", for: "Vùng trồng, thu mua lớn", d: "Quản lý vùng trồng và chuỗi thu mua. Có phương án white label." },
];

export const PLAN_ADDONS = [
  "Bổ sung trang trại",
  "Bổ sung người dùng",
  "Tiểu Thần Nông – gói câu hỏi AI theo người dùng/tháng (3 mức)",
];

export const SERVICE_LIST = [
  {
    group: "Phân tích đất & vi sinh (phòng lab)",
    items: [
      { name: "VY-SO-LAB01 · Phân tích đất cơ bản", d: "pH, EC, độ ẩm, chất hữu cơ (OM), N tổng số, P dễ tiêu, K trao đổi, CEC – sàng lọc nền hóa lý, dinh dưỡng." },
      { name: "VY-SO-LAB02 · Đất & vi sinh", d: "LAB01 + vi khuẩn hiếu khí, nấm tổng số, vi khuẩn cố định đạm, phân giải lân, phân hủy cellulose, nấm Trichoderma." },
      { name: "VY-SO-LAB03 · Toàn bộ sức khỏe đất", d: "LAB01 + LAB02 + NH4⁺, NO3⁻, P/K tổng số, Ca/Mg/Na trao đổi, tác nhân gây bệnh (Fusarium, Phytophthora, Rhizoctonia), tuyến trùng." },
    ],
  },
  {
    group: "Bản đồ & triển khai",
    items: [
      { name: "Kỹ sư quy hoạch & lập bản đồ farm/cây trồng", d: "Đi cùng MONRTK, tính theo diện tích." },
      { name: "Triển khai tại farm (onsite)", d: "Tư vấn chuyên sâu, lắp đặt, cấu hình, kết nối dữ liệu và đào tạo người dùng." },
      { name: "Thuê robot DUBIRO", d: "Theo buổi hoặc theo mùa vụ, có người vận hành." },
    ],
  },
];
