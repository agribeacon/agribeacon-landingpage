// Nội dung "Thực trạng" và "Nông nghiệp chính xác" – dùng chung cho trang chủ và trang /precision-agriculture

export interface Pain {
  t: string;
  d: string;
}

export interface PainGroup {
  key: string;
  label: string;
  title: string;
  pains: Pain[];
}

export interface Fact {
  value: string;
  label: string;
  source: string;
  url: string;
}

// Số liệu có nguồn – dùng ở phần Thực trạng. Kiểm tra lại trước mỗi đợt cập nhật website.
export const FACTS: Fact[] = [
  {
    value: "−30%",
    label: "sầu riêng tươi **Trung Quốc nhập từ Đông Nam Á** (5 tháng đầu 2025) sau khi **siết kiểm tra chất lượng**",
    source: "VnExpress International, 2025",
    url: "https://e.vnexpress.net/news/business/economy/china-s-durian-imports-slashed-by-over-30-as-stricter-quality-requirements-hit-southeast-asian-suppliers-4909857.html",
  },
  {
    value: "30/12/2026",
    label: "**EUDR** áp dụng: cà phê, cacao, cao su, dầu cọ từ **Đông Nam Á** phải có **tọa độ vườn trồng**",
    source: "Quy định (EU) 2023/1115, sửa đổi bởi 2025/2650",
    url: "https://taxnews.ey.com/news/2026-0237-eu-deforestation-regulation-application-postponed-to-30-december-2026",
  },
  {
    value: "40–50%",
    label: "lượng **phân đạm** được cây trồng hấp thụ trên thế giới, phần còn lại **thất thoát**",
    source: "Ambio, 2021",
    url: "https://www.doi.org/10.1007/S13280-021-01526-W",
  },
  {
    value: "72%",
    label: "nước ngọt khai thác toàn cầu dùng cho **nông nghiệp**",
    source: "FAO AQUASTAT, 2025",
    url: "https://www.fao.org/newsroom/detail/renewable-water-availability-per-person-plunges-7-percent-in-a-decade-as-global-scarcity-deepens--fao-data-shows/en",
  },
];

export const PAIN_GROUPS: PainGroup[] = [
  {
    key: "quality",
    label: "Chất lượng và tiêu chuẩn xuất khẩu",
    title: "Thị trường khắt khe hơn, trang trại **chưa có dữ liệu chứng minh**",
    pains: [
      { t: "Dư lượng thuốc BVTV, kim loại nặng vượt ngưỡng", d: "Bị **tăng kiểm tra**, **trả hàng**, **tạm dừng mã vùng trồng**." },
      { t: "Yêu cầu truy xuất đến từng vùng trồng", d: "**Đăng ký vùng trồng**, **tọa độ EUDR**, **thời gian cách ly**." },
      { t: "Nhật ký canh tác ghi bù, khó kiểm chứng", d: "Hồ sơ **GlobalGAP, GAP quốc gia** tổng hợp **sau mùa vụ**." },
      { t: "Mỗi thị trường một bộ tiêu chuẩn", d: "**EU, Trung Quốc, Mỹ, Nhật**: mỗi nơi một ngưỡng." },
    ],
  },
  {
    key: "traditional",
    label: "Canh tác truyền thống",
    title: "Quyết định **theo kinh nghiệm**, không có số liệu đối chiếu",
    pains: [
      { t: "Bón phân, phun thuốc theo cảm tính", d: "**Thừa** thì lãng phí, dư lượng; **thiếu** thì giảm năng suất." },
      { t: "Thất thoát vật tư", d: "Xuất kho **không gắn với khu**, với công việc." },
      { t: "Công nhật khó kiểm soát", d: "Chấm công **bằng sổ**, tính lương **thủ công**." },
      { t: "Năng suất, chất lượng không đồng đều", d: "Khu tốt, khu kém **không rõ nguyên nhân**." },
    ],
  },
  {
    key: "fragmented",
    label: "Đã đầu tư công nghệ",
    title: "Có công cụ, nhưng dữ liệu **chưa thành hệ thống**",
    pains: [
      { t: "Dữ liệu nằm rải rác", d: "**Sổ tay, Zalo, Excel**: nhân sự nghỉ là mất." },
      { t: "Chi phí chỉ tổng hợp cuối vụ", d: "**Không biết giá thành** từng khu trong mùa." },
      { t: "Thiết bị chưa phát huy hiệu quả", d: "Có số liệu nhưng **không dùng để quyết định**." },
    ],
  },
];

export const PRECISION_PRINCIPLES = [
  { t: "Đúng lượng", d: "Theo **nhu cầu thực tế** của cây." },
  { t: "Đúng thời điểm", d: "Khi **dữ liệu** cho thấy cây cần." },
  { t: "Đúng vị trí", d: "Theo **từng khu, từng cây**." },
  { t: "Đúng loại", d: "Theo **phân tích đất, nước, sâu bệnh**." },
];

export const PRECISION_WHY = [
  { t: "Giảm chi phí đầu vào", d: "Phân bón, thuốc BVTV, nước và nhân công là các khoản chi lớn nhất. Dùng đúng nhu cầu giúp cắt giảm phần lãng phí." },
  { t: "Năng suất ổn định, đồng đều", d: "Phát hiện sớm khu kém, nguyên nhân thiếu dinh dưỡng hay sâu bệnh để xử lý trước khi ảnh hưởng mùa vụ." },
  { t: "Bảo vệ đất và môi trường", d: "Hạn chế dư thừa hóa chất, giữ sức khỏe đất cho cây lâu năm trong nhiều chục năm." },
  { t: "Đáp ứng tiêu chuẩn thị trường", d: "Nhật ký canh tác, truy xuất nguồn gốc là yêu cầu bắt buộc với GlobalGAP, các chuẩn GAP quốc gia (VietGAP, ThaiGAP, MyGAP, IndoGAP), đăng ký vùng trồng và nhiều thị trường xuất khẩu." },
  { t: "Chủ động khi thiếu lao động", d: "Chuẩn hóa quy trình và tự động hóa các khâu lặp lại như tưới, phun thuốc." },
];

export const PRECISION_COMPARE = [
  { k: "Bón phân", old: "Theo kinh nghiệm hoặc định mức chung cho cả vườn", neu: "Theo kết quả phân tích đất và dữ liệu cảm biến của từng khu" },
  { k: "Tưới nước", old: "Theo giờ cố định, theo thói quen", neu: "Tự động bật/dừng theo độ ẩm đất, thời tiết, chất lượng nước" },
  { k: "Phòng trừ sâu bệnh", old: "Phun định kỳ hoặc khi đã thấy bệnh", neu: "Phát hiện sớm qua giám sát, phun đúng vùng, đúng liều" },
  { k: "Quản lý nhân công", old: "Chấm công bằng sổ, tính lương thủ công", neu: "Giao việc, chấm công, tính công nhật trên ứng dụng theo từng khu" },
  { k: "Quản lý vật tư", old: "Khó biết đã dùng bao nhiêu, dùng vào đâu", neu: "Nhập xuất kho gắn với khu, với công việc cụ thể" },
  { k: "Truy xuất nguồn gốc", old: "Ghi chép lại khi cần đánh giá", neu: "Nhật ký canh tác tự động, truy xuất đến từng cây" },
];

export const PRECISION_LOOP = [
  { t: "Đo lường", d: "Khảo sát, bản đồ, cảm biến, ghi nhận công việc hằng ngày." },
  { t: "Phân tích", d: "So sánh với ngưỡng, định mức, lịch sử từng khu, từng cây." },
  { t: "Hành động", d: "Tưới, bón, phun, giao việc đúng lượng, đúng lúc, đúng chỗ." },
  { t: "Đánh giá", d: "Đối chiếu chi phí, năng suất để điều chỉnh mùa vụ sau." },
];

export const PRECISION_TECH = [
  { t: "Định vị RTK & bản đồ GIS", d: "Xác định vị trí chính xác đến từng cây, làm nền cho mọi dữ liệu.", path: "/devices/rtk" },
  { t: "Trạm đo đa cảm biến", d: "Theo dõi liên tục đất, nước, khí hậu tại chính trang trại.", path: "/devices/aiot" },
  { t: "Drone & ảnh đa phổ", d: "Đánh giá sức khỏe cây trồng trên diện rộng.", path: "/devices/uav" },
  { t: "Tự động hóa", d: "Tưới tự động, robot phun thuốc theo tuyến.", path: "/devices/robot" },
  { t: "Phần mềm quản lý vận hành", d: "Ghi nhận công việc, nhân công, vật tư, chi phí theo từng khu.", path: "/platform/operations" },
  { t: "Phân tích & AI", d: "Gợi ý, cảnh báo dựa trên dữ liệu của chính trang trại.", path: "/platform/ai" },
];

export const PRECISION_FAQ = [
  { q: "Trang trại nhỏ có áp dụng được nông nghiệp chính xác không?", a: "Có. Bước đầu chỉ cần lập bản đồ và ghi nhận công việc, vật tư hằng ngày trên ứng dụng. Thiết bị có thể bổ sung dần khi cần." },
  { q: "Có phải đầu tư nhiều thiết bị ngay từ đầu không?", a: "Không. AgriBeacon khảo sát hiện trạng và đề xuất lộ trình theo từng bước, ưu tiên những hạng mục mang lại hiệu quả sớm nhất." },
  { q: "Người làm vườn có cần trình độ kỹ thuật cao không?", a: "Không. Ứng dụng được thiết kế đơn giản, hỗ trợ nhập liệu bằng giọng nói, và đội ngũ AgriBeacon đào tạo trực tiếp tại trang trại." },
  { q: "Áp dụng cho những loại cây nào?", a: "Tập trung vào cây lâu năm và cây công nghiệp như cacao, cà phê, bơ, ổi, nho, dâu tằm, sầu riêng, hồ tiêu…" },
];
