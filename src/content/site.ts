import ppriLogo from "@/assets/partners/ppri-logo.jpg";
import nauLogo from "@/assets/partners/nau-logo.png";
// Nội dung dùng chung cho website mới (bản VI – ngôn ngữ gốc).
// Nguồn: docs/revamp/01-sitemap-va-noi-dung.md
//
// status của một tính năng:
//  - "live"    : đã có trong SutaGrow OS (đối chiếu backend/app)
//  - "verify"  : cần xác nhận mức sẵn sàng – chỉ hiện nhãn ở môi trường dev
//  - "pilot"   : thí điểm / đang phát triển – luôn hiện nhãn công khai

export type FeatureStatus = "live" | "verify" | "pilot";

export interface Feature {
  title: string;
  desc: string;
  status: FeatureStatus;
}

export interface JourneyStep {
  n: number;
  slug: string;
  path: string;
  short: string; // tên ngắn trong menu
  menuHint: string; // một dòng mô tả trong menu
  title: string; // tiêu đề chương
  question: string; // câu hỏi của chủ farm
  pain: string; // hiện trạng – 1 dòng, **từ khóa**
  gain: string; // giải pháp – 1 dòng, **từ khóa**
  problem: string;
  answer: string;
  dataOut: string[]; // dữ liệu bạn có được
  heroTitle: string;
  heroSub: string;
  features: Feature[];
  devices?: string[];
  video: string; // mô tả video cần quay (placeholder)
  highlight?: boolean;
}

export const BRAND = {
  company: "AgriBeacon",
  os: "SutaGrow OS",
  ai: "Tiểu Thần Nông",
  appUrl: "https://sutagrow.agribeacon.tech",
  surveyPath: "/contact?need=survey",
};

export const JOURNEY: JourneyStep[] = [
  {
    n: 1,
    slug: "survey",
    path: "/platform/survey",
    short: "Hiểu mảnh đất",
    menuHint: "Đo ranh giới, xét nghiệm đất và nước",
    title: "Hiểu mảnh đất",
    question: "Đất của tôi thế nào, trồng gì, ở đâu?",
    pain: "Ranh giới **ước lượng**, đất **chưa được đo**",
    gain: "**Bản đồ RTK** và **xét nghiệm đất, nước** theo vị trí",
    problem: "Ranh giới, diện tích thường ước lượng theo sổ đỏ; chất lượng đất từng khu khác nhau nhưng chưa được đo đạc.",
    answer: "Đo ranh giới bằng RTK, bay drone lấy ảnh nền, lấy mẫu đất và nước theo vị trí.",
    dataOut: ["Bản đồ nền chính xác", "Kết quả xét nghiệm đất & nước theo vị trí", "Hồ sơ khảo sát"],
    heroTitle: "Quản lý trang trại hiệu quả bắt đầu từ bản đồ chính xác",
    heroSub: "Nắm rõ **ranh giới, độ dốc, đất và nước** trước khi trồng mới hay đầu tư thiết bị.",
    features: [
      { title: "Đo đạc bằng MONRTK", desc: "Ranh giới, diện tích, tọa độ **chính xác đến cm**.", status: "live" },
      { title: "Ảnh nền drone trên bản đồ GIS", desc: "Ảnh drone **phủ lên bản đồ** trang trại.", status: "live" },
      { title: "Kế hoạch lấy mẫu", desc: "Điểm lấy mẫu **đất, nước** ngay trên bản đồ.", status: "live" },
      { title: "Xét nghiệm đất & nước", desc: "Kết quả **lưu theo vị trí**, nền cho gợi ý bón phân.", status: "live" },
      { title: "Phân tích đất & vi sinh tại phòng lab", desc: "3 gói **VY-SO-LAB**: dinh dưỡng, **vi sinh**, **tác nhân gây bệnh**.", status: "live" },
      { title: "Đo nhanh tại vườn", desc: "**VY-SO 9in1**, **VY-WA 5in1** cầm tay, xem trên điện thoại.", status: "live" },
    ],
    devices: ["RTK MONRTK", "UAV MONSKY"],
    video: "Flycam mảnh đất trống + đội khảo sát đo RTK",
  },
  {
    n: 2,
    slug: "planning",
    path: "/platform/planning",
    short: "Quy hoạch & bản đồ",
    menuHint: "Chia khu, luống, đánh mã từng cây",
    title: "Quy hoạch & bản đồ số từng cây",
    question: "Chia khu thế nào, mỗi cây nằm ở đâu, tưới ra sao?",
    pain: "Lịch sử từng cây **chỉ nằm trong trí nhớ**",
    gain: "**Mã định danh** cho từng khu, luống, **từng cây**",
    problem: "Cây lâu năm có chu kỳ hàng chục năm, nhưng lịch sử chăm sóc từng cây thường chỉ nằm trong trí nhớ người làm vườn.",
    answer: "Phân chia trang trại theo khu, luống đến từng cây, mỗi cây có mã định danh. Quy hoạch nguồn nước và hệ thống tưới trên cùng bản đồ.",
    dataOut: ["Bản đồ khu, luống, từng cây", "Hồ sơ giống & loại cây", "Sơ đồ nguồn nước, tuyến tưới"],
    heroTitle: "Định danh và quản lý đến từng cây",
    heroSub: "Mỗi cây một mã: **công việc, vật tư, sản lượng** đều gắn đúng chỗ.",
    features: [
      { title: "Khu, luống, từng cây", desc: "Chia theo cách bạn quản lý, **mỗi cây một mã**.", status: "live" },
      { title: "Loại cây & giống", desc: "Gắn **loại cây, giống** cho từng khu, từng cây.", status: "live" },
      { title: "Lịch sử từng cây", desc: "Bấm vào cây, xem **toàn bộ lịch sử**.", status: "live" },
      { title: "Nguồn nước & hệ thống tưới", desc: "Vẽ **nguồn nước, tuyến ống, van** trước khi lắp.", status: "verify" },
    ],
    devices: ["RTK MONRTK", "UAV MONSKY"],
    video: "Bản đồ số trên màn hình chồng lên cảnh vườn thật",
  },
  {
    n: 3,
    slug: "sensing",
    path: "/platform/sensing",
    short: "Trạm AIoT & tưới",
    menuHint: "Theo dõi đất, thời tiết và tưới tự động",
    title: "Trạm AIoT & tưới tự động",
    question: "Chuyện gì đang xảy ra ngoài vườn lúc tôi không có mặt?",
    pain: "Tưới, bón **theo thói quen**",
    gain: "Trạm đo **đất, nước, khí hậu** tự **bật/dừng tưới**",
    problem: "Tưới theo thói quen, bón phân theo kinh nghiệm, theo dõi thời tiết qua bản tin chung của cả tỉnh.",
    answer:
      "Trạm đo đa cảm biến giám sát đất (9in1), nước (5in1), khí hậu (8in1) và kết nối trực tiếp hệ thống tưới để tự động bật, dừng theo dữ liệu thực tế.",
    dataOut: ["Độ ẩm, EC, pH, NPK của đất", "Chất lượng nước tưới", "Vi khí hậu tại chính trang trại", "Nhật ký tưới: bật/dừng lúc nào, vì sao"],
    heroTitle: "Giám sát vườn cây liên tục, kể cả khi bạn không có mặt",
    heroSub: "Theo dõi **đất, nước, khí hậu** và **tự động bật/dừng tưới** theo dữ liệu thực tế.",
    features: [
      { title: "VY-SO · Dinh dưỡng đất 9in1", desc: "**pH, EC, NPK**, ẩm, nhiệt, mặn và **SHI**.", status: "live" },
      { title: "Chỉ số sức khỏe đất SHI", desc: "Một chỉ số từ **EC, độ ẩm, nhiệt độ** theo nguyên tắc **Goldilocks**.", status: "live" },
      { title: "VY-WA · Chất lượng nước 5in1", desc: "**pH, EC, TDS**, nhiệt độ, độ mặn. Chuẩn **IP68**.", status: "live" },
      { title: "VY-AIR · Khí hậu 8in1", desc: "**Nhiệt, ẩm, gió, mưa, bức xạ** tại chính trang trại.", status: "live" },
      { title: "Lắp đặt nhanh, dễ mở rộng", desc: "**5 cảm biến/trạm**, tự nhận diện, nối **mesh** khi mở rộng.", status: "live" },
      { title: "Tự động bật/dừng tưới", desc: "Tưới theo **dữ liệu thực tế**, vẫn **bấm tay** được trên app.", status: "live" },
      { title: "Cảnh báo tại trạm và trên app", desc: "**Còi tại trạm**, cảnh báo quản lý, hẹn giờ từ xa.", status: "live" },
    ],
    devices: ["Trạm đo đa cảm biến"],
    video: "Lắp trạm AIoT ngoài farm, dữ liệu hiện trên app",
  },
  {
    n: 4,
    slug: "operations",
    path: "/platform/operations",
    short: "Vận hành hằng ngày",
    menuHint: "Giao việc, chấm công, quản lý kho và chi phí",
    title: "Ghi nhận vận hành hằng ngày",
    question: "Hôm nay ai làm gì, dùng bao nhiêu vật tư, tốn bao nhiêu tiền?",
    pain: "**Sổ tay, Zalo, Excel** rời rạc",
    gain: "**Việc, công, kho, chi phí** trên **một ứng dụng**",
    problem: "Dữ liệu nằm rải rác ở sổ tay, nhóm Zalo, file Excel. Chi phí chỉ tổng hợp cuối tháng và khó phân bổ theo từng khu.",
    answer:
      "Giao việc, chấm công, công nhật, bảng lương, nhập xuất kho, mua hàng và phê duyệt trên cùng một ứng dụng, gắn với từng khu, từng cây.",
    dataOut: ["Nhật ký công việc theo khu/cây", "Công & lương theo người, theo tổ", "Nhập, xuất, tồn vật tư", "Giá thành thực tế theo khu"],
    heroTitle: "Ghi nhận công việc, nhân công, vật tư và chi phí mỗi ngày",
    heroSub: "**Ai làm gì, ở khu nào, tốn bao nhiêu**: ghi nhận ngay trong ngày.",
    features: [
      { title: "Giao việc & theo dõi", desc: "Giao theo **khu, cây, tổ**, kèm ảnh và trạng thái.", status: "live" },
      { title: "Ca làm & chấm công", desc: "**Phân ca**, **chấm công** hằng ngày.", status: "live" },
      { title: "Công nhật & bảng lương", desc: "**Đơn giá, tăng ca, kỳ lương** theo người và tổ.", status: "live" },
      { title: "Vật tư & kho", desc: "**Nhập xuất** nhiều kho, theo **lô hàng**.", status: "live" },
      { title: "Mua hàng & nhà cung cấp", desc: "**Đề xuất → đơn mua → nhận hàng → thanh toán**.", status: "live" },
      { title: "Đề xuất & phê duyệt", desc: "Duyệt **nhiều cấp**, có lịch sử.", status: "live" },
      { title: "Chi phí & ngân sách", desc: "**Giá thành thực tế** theo từng khu.", status: "live" },
      { title: "IPM: quản lý sâu bệnh & dịch hại", desc: "Theo dõi, xử lý **sâu bệnh theo khu, theo cây**.", status: "live" },
      { title: "Thu hoạch & chất lượng", desc: "**Sản lượng, phân loại** gắn với đúng cây.", status: "live" },
      { title: "Một cây, một hồ sơ xuyên suốt", desc: "Từ **chăm sóc** đến **thu hoạch**, quét **QR** là thấy.", status: "live" },
    ],
    devices: ["App SutaGrow"],
    video: "Một ngày vận hành: giao việc, chấm công, xuất kho trên app",
    highlight: true,
  },
  {
    n: 5,
    slug: "automation",
    path: "/platform/automation",
    short: "Tối ưu & tự động hóa",
    menuHint: "So sánh các khu, giao việc nặng cho máy",
    title: "Chuẩn hóa, tối ưu và tự động hóa",
    question: "Khu nào hiệu quả, quy trình nào nên làm chuẩn, việc gì máy làm được?",
    pain: "Mua máy khi **quy trình chưa chuẩn**",
    gain: "**Định mức** từ dữ liệu, **drone, robot** làm việc lặp lại",
    problem: "Đầu tư drone, robot khi quy trình chưa chuẩn hóa nên khó đánh giá hiệu quả.",
    answer:
      "Dựa trên dữ liệu thực tế để xây dựng định mức, so sánh hiệu quả giữa các khu, sau đó tự động hóa công việc lặp lại bằng drone, robot phun theo bản đồ.",
    dataOut: ["Quy trình chuẩn (SOP) & định mức", "So sánh hiệu quả giữa các khu", "Lịch sử bay/phun có vị trí và liều lượng"],
    heroTitle: "Chuẩn hóa quy trình trước khi tự động hóa",
    heroSub: "Xác định **quy trình hiệu quả nhất**, rồi để **máy** lặp lại mỗi ngày.",
    features: [
      { title: "Quy trình chuẩn & định mức", desc: "**Định mức vật tư, công** theo loại việc, theo khu.", status: "verify" },
      { title: "Gợi ý bón phân", desc: "Dựa trên **xét nghiệm đất** và **dữ liệu trạm đo**.", status: "live" },
      { title: "Gợi ý & thông báo", desc: "Nhắc việc, **vượt định mức**, **tồn kho thấp**.", status: "live" },
      { title: "UAV MONSKY: bản đồ sức khỏe cây", desc: "**Ảnh đa phổ**, phát hiện sớm **stress, sâu bệnh**.", status: "live" },
      { title: "Robot DUBIRO phun tự hành", desc: "Phun theo **tuyến RTK**, lưu **lưu lượng, thời gian**.", status: "live" },
      { title: "Việc lặp tự sinh", desc: "Việc định kỳ **tự tạo** theo quy trình.", status: "pilot" },
    ],
    devices: ["UAV MONSKY", "Robot DUBIRO", "Trạm đo đa cảm biến"],
    video: "Drone bay theo đường bay cố định, robot phun giữa hàng cây",
  },
  {
    n: 6,
    slug: "ai",
    path: "/platform/ai",
    short: "AI Tiểu Thần Nông",
    menuHint: "Nói để ghi chép, hỏi cách chăm cây",
    title: "AI Tiểu Thần Nông: nhập liệu dễ, dữ liệu đủ",
    question: "Làm sao ghi nhận đầy đủ mọi việc mà không mất nhiều thời gian?",
    pain: "Nhập liệu **nhiều bước, khó dùng**",
    gain: "**Nói một câu**, AI **điền sẵn**, bạn **bấm xác nhận**",
    problem:
      "Phần mềm quản lý thường nhiều bước, nhiều biểu mẫu, khó dùng với người làm vườn. Dữ liệu vì thế bị bỏ sót hoặc ghi bù, và các công cụ AI phổ thông chỉ trả lời chung chung vì không có dữ liệu riêng của trang trại.",
    answer:
      "Chỉ cần chat hoặc nói, Tiểu Thần Nông hiểu bạn cần ghi nhận việc gì, điền sẵn thông tin để bạn xác nhận bằng một cú bấm, rồi phân tích chính dữ liệu đó để cảnh báo và gợi ý.",
    dataOut: ["Dữ liệu vận hành đầy đủ, ghi nhận đúng lúc", "Cảnh báo và gợi ý theo dữ liệu trang trại", "Báo cáo truy xuất, chứng nhận"],
    heroTitle: "Nhập liệu bằng lời nói, xác nhận bằng một cú bấm",
    heroSub: "Ghi nhận **công việc, kho, công nhật** chỉ **vài phút mỗi ngày**.",
    features: [
      { title: "Nhập liệu bằng chat hoặc giọng nói", desc: "**Nói hoặc nhắn** như trò chuyện bình thường.", status: "live" },
      { title: "Điền sẵn, xác nhận một cú bấm", desc: "AI **điền sẵn** khu, người, vật tư. Bạn **bấm xác nhận**.", status: "live" },
      { title: "Gợi ý bước tiếp theo", desc: "Nhập kho xong, **gợi ý xuất**; phun xong, **nhắc cách ly**.", status: "live" },
      { title: "Hiểu từng vai", desc: "Trả lời theo vai: **chủ, quản lý, kỹ thuật, công nhân**.", status: "live" },
      { title: "Soi điểm cần xem lại", desc: "Phát hiện **số liệu bất thường**, **thiếu ghi nhận**.", status: "live" },
      { title: "Hiểu nông học, nói dễ hiểu", desc: "Kiến thức **sâu bệnh** cùng **Viện Bảo vệ thực vật**.", status: "verify" },
      { title: "Cảnh báo sớm & dự báo sản lượng", desc: "Từ **lịch sử cây, cảm biến, ảnh drone**.", status: "pilot" },
      { title: "Báo cáo truy xuất & chứng nhận", desc: "Nhật ký tự sinh cho **GlobalGAP, GAP quốc gia, đăng ký vùng trồng**.", status: "pilot" },
    ],
    devices: ["Tiểu Thần Nông"],
    video: "Người làm vườn nói vào app, Tiểu Thần Nông trả lời",
  },
];

export interface Farm {
  name: string;
  crop: string;
  area: string;
  location: string;
  featured?: boolean;
}

export const FARMS: Farm[] = [
  { name: "Nguyễn Duy Farm", crop: "Cacao", area: "40 ha", location: "Gia Lai", featured: true },
  { name: "Kiri Coffee", crop: "Cà phê", area: "80 ha", location: "Campuchia", featured: true },
  { name: "Farm bơ", crop: "Bơ", area: "5 ha", location: "Lâm Đồng" },
  { name: "Farm ổi", crop: "Ổi", area: "1 ha", location: "Phú Thọ" },
  { name: "Farm nho", crop: "Nho", area: "0,5 ha", location: "Bắc Giang" },
];

export interface Partner {
  name: string;
  short: string;
  role: string;
  desc: string;
  logo: string;
  url: string;
}

export const PARTNERS: Partner[] = [
  {
    name: "Viện Bảo vệ thực vật",
    short: "Viện BVTV",
    role: "Phối hợp chuyên môn sâu bệnh hại",
    desc: "Kiến thức **sâu bệnh hại** cho thư viện trong SutaGrow OS và trợ lý **Tiểu Thần Nông**.",
    logo: ppriLogo,
    url: "https://ppri.org.vn",
  },
  {
    name: "Trường Đại học Nghệ An – Khoa Nông Lâm Nghiệp",
    short: "ĐH Nghệ An – Khoa Nông Lâm Nghiệp",
    role: "Hợp tác triển khai dự án công nghệ cao",
    desc: "Cùng triển khai dự án **nông nghiệp công nghệ cao**, trong đó có mô hình **Ổi Nghĩa Đàn**.",
    logo: nauLogo,
    url: "https://nau.edu.vn",
  },
];

export const DEVICES = [
  { name: "RTK MONRTK", model: "Base & Rover", path: "/devices/rtk", hint: "Đo ranh giới và vị trí từng cây, chính xác đến cm", steps: [1, 2, 5] },
  { name: "Trạm đo đa cảm biến", model: "VY-SO · VY-WA · VY-AIR", path: "/devices/aiot", hint: "Đo đất, nước, thời tiết và điều khiển tưới", steps: [3, 5] },
  { name: "UAV MONSKY", model: "Drone đa phổ + AI", path: "/devices/uav", hint: "Bay khảo sát, phát hiện cây yếu và sâu bệnh", steps: [1, 5] },
  { name: "Robot DUBIRO", model: "Phun tự hành / bán tự hành", path: "/devices/robot", hint: "Phun thuốc, cắt cỏ theo tuyến định sẵn", steps: [5] },
];

export const SERVICES = [
  { name: "Số hóa bản đồ farm", path: "/services/farm-mapping", hint: "Kỹ sư đến đo và dựng bản đồ trang trại" },
  { name: "Phân tích đất & vi sinh", path: "/pricing#soil", hint: "Gửi mẫu đất, nhận kết quả từ phòng lab" },
  { name: "Thuê robot phun", path: "/services/robot-rental", hint: "Thuê theo buổi hoặc mùa vụ, kèm người vận hành" },
  { name: "Triển khai & đào tạo", path: "/contact?need=onboarding", hint: "Lắp đặt và kèm cặp 30 ngày đầu tại vườn" },
];

export const CROPS = ["Cacao", "Cà phê", "Bơ", "Ổi", "Nho", "Dâu tằm"];


// Sau bước 6: dữ liệu thành giá trị thương mại
export const MARKET = {
  name: "SutaMarket",
  desc: "kết nối hồ sơ nông trại, dữ liệu canh tác và lịch sử vận hành đã được xác minh với người mua, đơn vị thu mua và doanh nghiệp xuất khẩu.",
  points: [
    { t: "Sở hữu từng cây", d: "Người mua tra cứu cây, vùng trồng và quá trình chăm sóc qua hồ sơ số." },
    { t: "Chất lượng đã xác minh", d: "Dữ liệu canh tác, đầu vào, ảnh hiện trường chứng minh chất lượng." },
    { t: "Giao dịch minh bạch", d: "Kết nối trang trại, người mua và đơn vị thu mua trên cùng một nền dữ liệu." },
  ],
};

// Quy trình triển khai (brochure trang 14)
export const DEPLOY_STEPS = [
  { t: "Khảo sát hiện trạng", d: "Đánh giá hiện trạng đất, cây trồng, nhân sự và cách ghi chép hiện tại." },
  { t: "Xác định mục tiêu", d: "Lao động, cây trồng, vật tư, giám sát từ xa, truy xuất hay chứng nhận." },
  { t: "Lập bản đồ dữ liệu", d: "Bản đồ GIS, phân vùng, vị trí trạm đo, vùng bay drone." },
  { t: "Lắp đặt & cấu hình", d: "Thiết bị AIoT, QR, tài khoản, module và dashboard theo nhu cầu." },
  { t: "Đào tạo vận hành", d: "Hướng dẫn sử dụng theo từng vai trò: chủ trang trại, kỹ thuật, tổ trưởng, công nhân." },
  { t: "Chạy thử & hiệu chỉnh", d: "Kiểm tra dữ liệu thật, chỉnh quy trình, báo cáo." },
  { t: "Vận hành & mở rộng", d: "Mở rộng sang nhiều khu, nhiều trang trại, loại cây trồng và các khâu trong chuỗi cung ứng." },
];
