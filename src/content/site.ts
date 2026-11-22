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
    menuHint: "Khảo sát RTK, drone, đất & nước",
    title: "Hiểu mảnh đất",
    question: "Đất của tôi thế nào, trồng gì, ở đâu?",
    problem: "Ranh giới ước chừng, diện tích theo sổ đỏ, đất mỗi khu một khác nhưng không ai đo.",
    answer: "Đo ranh giới bằng RTK, bay drone lấy ảnh nền, lấy mẫu đất và nước theo vị trí.",
    dataOut: ["Bản đồ nền chính xác", "Kết quả xét nghiệm đất & nước theo vị trí", "Hồ sơ khảo sát"],
    heroTitle: "Mọi farm tốt đều bắt đầu từ một bản đồ đúng.",
    heroSub:
      "Trước khi trồng thêm một cây hay mua thêm một thiết bị, hãy biết chính xác mình đang có gì: ranh giới, độ dốc, đất, nước.",
    features: [
      { title: "Đo đạc bằng MONRTK", desc: "Đặt trạm base, đi rover quanh farm: ranh giới, diện tích, chu vi, tọa độ chính xác tới từng centimet.", status: "live" },
      { title: "Ảnh nền drone trên bản đồ GIS", desc: "Ảnh chụp từ drone được phủ lên bản đồ farm trong SutaGrow OS.", status: "live" },
      { title: "Kế hoạch lấy mẫu", desc: "Lên điểm lấy mẫu đất, nước theo lưới hoặc theo khu ngay trên bản đồ.", status: "live" },
      { title: "Xét nghiệm đất & nước", desc: "Lưu kết quả xét nghiệm gắn với vị trí – nền cho gợi ý bón phân sau này.", status: "live" },
      { title: "Phân tích đất & vi sinh tại phòng lab", desc: "3 gói VY-SO-LAB: từ hóa lý – dinh dưỡng cơ bản, đến vi sinh vật có lợi, tác nhân gây bệnh (Fusarium, Phytophthora…) và tuyến trùng.", status: "live" },
      { title: "Đo nhanh tại vườn", desc: "Cảm biến cầm tay VY-SO (8 chỉ số đất) và VY-WA (5 chỉ số nước) – đọc số ngay trên điện thoại.", status: "live" },
    ],
    devices: ["RTK MONRTK", "UAV MONSKY"],
    video: "Flycam mảnh đất trống + đội khảo sát đo RTK",
  },
  {
    n: 2,
    slug: "planning",
    path: "/platform/planning",
    short: "Quy hoạch & bản đồ",
    menuHint: "Từng khu, từng lô, từng cây",
    title: "Quy hoạch & bản đồ số từng cây",
    question: "Chia lô thế nào, mỗi cây nằm ở đâu, tưới ra sao?",
    problem: "Cây lâu năm sống hàng chục năm, nhưng lịch sử từng cây chỉ nằm trong trí nhớ người làm vườn.",
    answer: "Chia farm thành khu → lô/luống → từng cây, mỗi cây một mã. Quy hoạch nguồn nước và tưới trên cùng bản đồ.",
    dataOut: ["Bản đồ khu – lô – cây", "Hồ sơ giống & loại cây", "Sơ đồ nguồn nước, tuyến tưới"],
    heroTitle: "Mỗi cây một địa chỉ.",
    heroSub: "Khi mỗi cây có một địa chỉ, mọi công việc, mọi bao phân, mọi lần thu hoạch đều có chỗ để ghi lại.",
    features: [
      { title: "Khu → Lô/Luống → Cây", desc: "Chia farm theo đúng cách bạn quản lý. Mỗi cây có mã định danh riêng.", status: "live" },
      { title: "Loại cây & giống", desc: "Gắn loại cây, giống cho từng lô và từng cây.", status: "live" },
      { title: "Lịch sử từng cây", desc: "Bấm vào một cây để thấy toàn bộ những gì đã xảy ra với nó.", status: "live" },
      { title: "Nguồn nước & hệ thống tưới", desc: "Vẽ nguồn nước, tuyến ống, van và khu tưới trước khi lắp.", status: "verify" },
    ],
    devices: ["RTK MONRTK", "UAV MONSKY"],
    video: "Bản đồ số trên màn hình chồng lên cảnh vườn thật",
  },
  {
    n: 3,
    slug: "sensing",
    path: "/platform/sensing",
    short: "Trạm AIoT & tưới",
    menuHint: "Đo đất, nước, khí hậu · tự bật/dừng tưới",
    title: "Trạm AIoT & tưới tự động",
    question: "Chuyện gì đang xảy ra ngoài vườn lúc tôi không có mặt?",
    problem: "Tưới theo thói quen, bón theo kinh nghiệm, biết thời tiết qua bản tin của cả tỉnh.",
    answer:
      "Một trạm đo đa cảm biến – đất 9in1, nước 5in1, khí hậu 8in1 – nối thẳng vào hệ thống điều khiển tưới: tự bật, tự dừng theo dữ liệu thực tế.",
    dataOut: ["Độ ẩm, EC, pH, NPK của đất", "Chất lượng nước tưới", "Vi khí hậu tại chính farm", "Nhật ký tưới: bật/dừng lúc nào, vì sao"],
    heroTitle: "Biết chuyện gì đang xảy ra ngoài vườn, kể cả khi bạn không có mặt.",
    heroSub:
      "Một trạm đo đa cảm biến, ba lớp dữ liệu: đất, nước, khí hậu – và nối thẳng vào hệ thống tưới. Đất đủ ẩm thì dừng, trời sắp mưa thì hoãn, nước không đạt thì không bơm.",
    features: [
      { title: "VY-SO · Dinh dưỡng đất 9in1", desc: "N, P, K, pH, EC, độ ẩm, nhiệt độ, độ mặn… – biết khi nào tưới, bón gì, bón bao nhiêu.", status: "live" },
      { title: "VY-WA · Chất lượng nước 5in1", desc: "pH, nhiệt độ, EC, TDS, độ mặn – nước tưới có an toàn cho cây hay không. Chuẩn IP68.", status: "live" },
      { title: "VY-AIR · Khí hậu 8in1", desc: "Nhiệt độ, độ ẩm, tốc độ & hướng gió, áp suất, mưa, ánh sáng, bức xạ – đo tại chính farm.", status: "live" },
      { title: "Cắm là chạy, mở rộng bằng mesh", desc: "Một trạm gắn tới 5 cảm biến, tự nhận diện. Farm nhỏ: 1 trạm độc lập. Farm lớn: trạm nối mesh về gateway.", status: "live" },
      { title: "Tự động bật/dừng tưới", desc: "Trạm đo tích hợp trực tiếp với hệ thống điều khiển tưới: tự bật, tự dừng theo dữ liệu thực tế từ đất, nước, khí hậu. Vẫn điều khiển tay từ app khi cần.", status: "live" },
      { title: "Cảnh báo tại trạm và trên app", desc: "Còi báo động tại trạm, cảnh báo cho quản lý, cấu hình giờ hoạt động qua app.", status: "live" },
    ],
    devices: ["Trạm đo đa cảm biến"],
    video: "Lắp trạm AIoT ngoài farm, dữ liệu hiện trên app",
  },
  {
    n: 4,
    slug: "operations",
    path: "/platform/operations",
    short: "Vận hành hằng ngày",
    menuHint: "Việc, người, vật tư, chi phí",
    title: "Ghi nhận vận hành hằng ngày",
    question: "Hôm nay ai làm gì, dùng bao nhiêu vật tư, tốn bao nhiêu tiền?",
    problem: "Sổ tay, nhóm Zalo, file Excel rời rạc. Cuối tháng mới biết chi phí – mà vẫn không biết của lô nào.",
    answer:
      "Giao việc, chấm công, công nhật, lương, nhập–xuất kho, mua hàng, phê duyệt – tất cả trên một app, gắn vào đúng lô, đúng cây.",
    dataOut: ["Nhật ký công việc theo lô/cây", "Công & lương theo người, theo tổ", "Nhập – xuất – tồn vật tư", "Giá thành thật theo lô"],
    heroTitle: "Ai làm gì, ở lô nào, dùng bao nhiêu, tốn bao nhiêu – ghi lại mỗi ngày.",
    heroSub:
      "Dữ liệu tốt nhất không đến từ cảm biến. Nó đến từ công việc thật, được ghi lại đúng lúc, đúng chỗ.",
    features: [
      { title: "Giao việc & theo dõi", desc: "Tạo việc theo lô/cây, giao cho người hoặc tổ, kèm ảnh và trạng thái.", status: "live" },
      { title: "Ca làm & chấm công", desc: "Mẫu ca, phân ca theo tổ, chấm công hằng ngày.", status: "live" },
      { title: "Công nhật & bảng lương", desc: "Đơn giá công nhật, quy tắc tăng ca, kỳ lương theo người và theo tổ.", status: "live" },
      { title: "Vật tư & kho", desc: "Danh mục phân, thuốc, giống; nhập – xuất nhiều kho, theo lô hàng.", status: "live" },
      { title: "Mua hàng & nhà cung cấp", desc: "Đề xuất → đơn mua → nhận hàng → thanh toán, có lịch sử.", status: "live" },
      { title: "Đề xuất & phê duyệt", desc: "Mua vật tư, ứng tiền, tăng ca đi qua quy trình duyệt nhiều bước.", status: "live" },
      { title: "Chi phí & ngân sách", desc: "Gom nhân công, vật tư, dịch vụ về đúng lô để biết giá thành thật.", status: "live" },
      { title: "IPM – sâu bệnh & dịch hại", desc: "Ghi nhận, theo dõi và xử lý sâu bệnh theo lô, theo cây.", status: "live" },
      { title: "Thu hoạch & chất lượng", desc: "Sản lượng, phân loại, lô thu hoạch – nối về đúng cây đã cho trái.", status: "live" },
      { title: "Một cây, một hồ sơ xuyên suốt", desc: "Cây SG-L03-087 → nhật ký chăm sóc → vật tư & người thực hiện → lô thu hoạch → mã QR. Quét mã để xem toàn bộ lịch sử.", status: "live" },
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
    menuHint: "Định mức, so sánh lô, máy làm thay",
    title: "Chuẩn hóa → tối ưu → tự động hóa",
    question: "Lô nào hiệu quả, quy trình nào nên làm chuẩn, việc gì máy làm được?",
    problem: "Mua drone, robot khi quy trình chưa chuẩn – máy chạy nhưng không ai biết có hiệu quả hơn không.",
    answer:
      "Từ dữ liệu thật: lập định mức, so sánh lô với lô, rồi mới giao cho máy những việc lặp lại – drone, robot phun theo bản đồ.",
    dataOut: ["Quy trình chuẩn (SOP) & định mức", "So sánh hiệu quả giữa các lô", "Lịch sử bay/phun có vị trí và liều lượng"],
    heroTitle: "Làm chuẩn trước, rồi mới để máy làm.",
    heroSub:
      "Khi đã biết cách làm tốt nhất – dựa trên dữ liệu của chính farm bạn – hãy để nó lặp lại mỗi ngày, bằng người hoặc bằng máy.",
    features: [
      { title: "Quy trình chuẩn & định mức", desc: "Định mức vật tư và công theo loại việc, theo lô.", status: "verify" },
      { title: "Gợi ý bón phân", desc: "Dựa trên kết quả xét nghiệm đất và dữ liệu trạm AIoT.", status: "live" },
      { title: "Gợi ý & thông báo", desc: "Nhắc việc, cảnh báo vượt định mức, tồn kho thấp.", status: "live" },
      { title: "UAV MONSKY: bản đồ sức khỏe cây", desc: "Ảnh đa phổ (NDVI…) theo cùng một đường bay, phát hiện sớm stress và sâu bệnh, lưu lịch sử bay.", status: "live" },
      { title: "Robot DUBIRO phun tự hành", desc: "Điều khiển từ xa hoặc bán tự hành theo tuyến RTK, camera 360°. Lưu tuyến đi, lưu lượng và thời gian phun sau mỗi lượt.", status: "live" },
      { title: "Việc lặp tự sinh", desc: "Công việc định kỳ tự tạo theo quy trình chuẩn.", status: "pilot" },
    ],
    devices: ["UAV MONSKY", "Robot DUBIRO", "Trạm đo đa cảm biến"],
    video: "Drone bay theo đường bay cố định, robot phun giữa hàng cây",
  },
  {
    n: 6,
    slug: "ai",
    path: "/platform/ai",
    short: "AI Tiểu Thần Nông",
    menuHint: "Khi dữ liệu đã đủ",
    title: "AI trên dữ liệu thật",
    question: "Hãy cho tôi biết trước, và làm thay tôi phần lặp lại.",
    problem: "AI chung chung trả lời như sách giáo khoa, vì nó không biết gì về farm của bạn.",
    answer:
      "Tiểu Thần Nông đọc chính nhật ký, chi phí, cảm biến của farm bạn, kết hợp kiến thức chuyên môn từ đối tác về sâu bệnh hại.",
    dataOut: ["Tóm tắt farm mỗi sáng", "Cảnh báo sớm", "Báo cáo truy xuất, chứng nhận"],
    heroTitle: "Tiểu Thần Nông hiểu farm của bạn – vì nó đọc dữ liệu thật của farm bạn.",
    heroSub: "AI chỉ tốt bằng dữ liệu bạn có. Đó là lý do nó đứng ở bước thứ sáu, không phải bước đầu tiên.",
    features: [
      { title: "Hiểu từng vai", desc: "Chủ farm hỏi hiệu quả – chi phí – rủi ro; quản lý hỏi ưu tiên và điều phối; kỹ thuật hỏi dinh dưỡng, sâu bệnh; nhân công nhận việc và ghi nhận.", status: "live" },
      { title: "Nhập liệu bằng giọng nói & văn bản", desc: "“Hôm nay tưới lô 3 xong” → thành công việc. Từ hội thoại thành đề xuất mua vật tư đã điền sẵn.", status: "live" },
      { title: "Soi điểm cần xem lại", desc: "Phát hiện số liệu bất thường, thiếu ghi nhận và lỗ hổng vận hành.", status: "live" },
      { title: "Hiểu nông học, nói dễ hiểu", desc: "Kiến thức sâu bệnh hại phối hợp chuyên môn cùng Viện Bảo vệ thực vật.", status: "verify" },
      { title: "Cảnh báo sớm & dự báo sản lượng", desc: "Dựa trên lịch sử từng cây, cảm biến và ảnh drone.", status: "pilot" },
      { title: "Báo cáo truy xuất & chứng nhận", desc: "Tự sinh nhật ký canh tác cho GlobalGAP, VietGAP, mã vùng trồng.", status: "pilot" },
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
  step: number; // bước hiện tại – GIẢ ĐỊNH, cần xác nhận
  note: string;
  featured?: boolean;
}

export const FARMS: Farm[] = [
  { name: "Nguyễn Duy Farm", crop: "Cacao", area: "40 ha", location: "Gia Lai", step: 4, note: "Trang trại doanh nghiệp – quản lý nhân công và chi phí trên diện tích lớn.", featured: true },
  { name: "Kiri Coffee", crop: "Cà phê", area: "80 ha", location: "Campuchia", step: 4, note: "Farm lớn nhất, vận hành từ xa ở nước ngoài.", featured: true },
  { name: "Farm bơ", crop: "Bơ", area: "5 ha", location: "Lâm Đồng", step: 3, note: "Tưới và dinh dưỡng theo lô, giá thành trên mỗi kg." },
  { name: "Farm ổi", crop: "Ổi", area: "1 ha", location: "Phú Thọ", step: 3, note: "Farm nhỏ, ghi nhận công việc hằng ngày trên app." },
  { name: "Farm nho", crop: "Nho", area: "0,5 ha", location: "Bắc Giang", step: 3, note: "Canh tác thâm canh – nhỏ cũng nên số hóa." },
];

export interface Partner {
  name: string;
  short: string;
  role: string;
  desc: string;
}

export const PARTNERS: Partner[] = [
  {
    name: "Viện Bảo vệ thực vật",
    short: "Viện BVTV",
    role: "Phối hợp chuyên môn sâu bệnh hại",
    desc: "Kiến thức sâu bệnh hại cho thư viện trong SutaGrow OS, cho Tiểu Thần Nông và cho các hướng dẫn thực hành.",
  },
  {
    name: "Trường Đại học Nông Lâm Nghệ An",
    short: "ĐH Nông Lâm Nghệ An",
    role: "Hợp tác triển khai dự án công nghệ cao",
    desc: "Cùng triển khai các dự án nông nghiệp công nghệ cao, trong đó có mô hình Ổi Nghĩa Đàn.",
  },
  {
    name: "HTX Dâu Tằm Lâm Đồng",
    short: "HTX Dâu Tằm Lâm Đồng",
    role: "Dự án hợp tác",
    desc: "Số hóa vùng trồng dâu cho các hộ thành viên trên cùng một hệ thống.",
  },
];

export const PROJECTS = [
  { name: "Ổi Nghĩa Đàn", place: "Nghệ An", with: "Trường ĐH Nông Lâm Nghệ An", desc: "Mô hình ổi công nghệ cao – viện, trường và farm dùng chung một bản đồ, một nhật ký." },
  { name: "Dâu tằm Lâm Đồng", place: "Lâm Đồng", with: "HTX Dâu Tằm Lâm Đồng", desc: "Nhiều hộ thành viên, một quy trình chuẩn chung trên SutaGrow OS." },
];

export const DEVICES = [
  { name: "Trạm đo đa cảm biến", model: "VY-SO · VY-WA · VY-AIR", path: "/devices/aiot", hint: "Đất, nước, khí hậu · tự bật/dừng tưới", steps: [3, 5] },
  { name: "RTK MONRTK", model: "Base & Rover", path: "/devices/rtk", hint: "Bản đồ ranh giới, từng cây, tuyến máy", steps: [1, 2, 5] },
  { name: "UAV MONSKY", model: "Drone đa phổ + AI", path: "/devices/uav", hint: "Khảo sát, sức khỏe cây, sâu bệnh", steps: [1, 5] },
  { name: "Robot DUBIRO", model: "Phun tự hành / bán tự hành", path: "/devices/robot", hint: "Phun theo tuyến RTK, có nhật ký", steps: [5] },
];

export const SERVICES = [
  { name: "Số hóa bản đồ farm", path: "/services/farm-mapping", hint: "Kỹ sư bản đồ + MONRTK + drone" },
  { name: "Phân tích đất & vi sinh", path: "/pricing#dich-vu", hint: "3 gói VY-SO-LAB tại phòng lab" },
  { name: "Thuê robot phun", path: "/services/robot-rental", hint: "Theo buổi hoặc mùa vụ" },
  { name: "Triển khai & đào tạo", path: "/contact?need=onboarding", hint: "30 ngày đầu tiên tại farm" },
];

export const CROPS = ["Cacao", "Cà phê", "Bơ", "Ổi", "Nho", "Dâu tằm"];

// Dải bằng chứng – chỉ dùng thông tin đã xác nhận
export const PROOF_LINE = "Đang vận hành trên các farm cacao, cà phê, bơ, ổi, nho – từ Bắc Giang đến Gia Lai và Campuchia";

// Sau bước 6: dữ liệu thành giá trị thương mại
export const MARKET = {
  name: "SutaMarket",
  desc: "Hồ sơ nông trại, dữ liệu canh tác và lịch sử vận hành đã xác minh – để người mua, đơn vị thu mua và xuất khẩu tin vào giá trị thật của nông sản.",
  points: [
    { t: "Sở hữu từng cây", d: "Người mua tra cứu cây, vùng trồng và quá trình chăm sóc qua hồ sơ số." },
    { t: "Chất lượng đã xác minh", d: "Dữ liệu canh tác, đầu vào, ảnh hiện trường chứng minh chất lượng." },
    { t: "Giao dịch minh bạch", d: "Kết nối trang trại, người mua và đơn vị thu mua trên cùng một nền dữ liệu." },
  ],
};

// Quy trình triển khai (brochure trang 14)
export const DEPLOY_STEPS = [
  { t: "Khảo sát hiện trạng", d: "Ra tận farm: đất, cây, con người, cách đang ghi chép." },
  { t: "Xác định mục tiêu", d: "Lao động, cây trồng, vật tư, giám sát từ xa, truy xuất hay chứng nhận." },
  { t: "Lập bản đồ dữ liệu", d: "Bản đồ GIS, phân vùng, vị trí trạm đo, vùng bay drone." },
  { t: "Lắp đặt & cấu hình", d: "Thiết bị AIoT, QR, tài khoản, module và dashboard theo nhu cầu." },
  { t: "Đào tạo vận hành", d: "Chủ farm, kỹ thuật, tổ trưởng, công nhân – mỗi người một cách dùng." },
  { t: "Chạy thử & hiệu chỉnh", d: "Kiểm tra dữ liệu thật, chỉnh quy trình, báo cáo." },
  { t: "Vận hành & mở rộng", d: "Thêm lô, thêm farm, thêm cây trồng, thêm mắt xích chuỗi cung ứng." },
];
