// Tầm nhìn: khi trang trại vận hành bằng dữ liệu, các giá trị mở rộng ngoài tối ưu vận hành.
// Nguyên tắc: AgriBeacon cung cấp dữ liệu và hồ sơ; quyết định cấp chứng nhận, tín chỉ, khoản vay, bảo hiểm thuộc các tổ chức có thẩm quyền.

export interface VisionPillar {
  key: string;
  title: string;
  why: string; // vì sao cần dữ liệu
  needs: string[]; // dữ liệu bên thẩm định cần
  provides: string; // SutaGrow OS cung cấp gì
  short: string; // 1 dòng hiển thị, **từ khóa**
}

export const VISION_PILLARS: VisionPillar[] = [
  {
    key: "cert",
    short: "**Nhật ký tự sinh**, bản đồ RTK sẵn sàng khi **đánh giá**.",
    title: "Rút ngắn thời gian đạt chứng nhận",
    why: "GlobalGAP, GAP quốc gia, hữu cơ, đăng ký vùng trồng hay EUDR đều yêu cầu bằng chứng canh tác có thể kiểm chứng.",
    needs: ["Nhật ký canh tác theo thời gian thực", "Vật tư sử dụng và thời gian cách ly", "Tọa độ, ranh giới vùng trồng"],
    provides: "Nhật ký tự sinh từ công việc hằng ngày, bản đồ RTK và truy xuất đến từng cây, sẵn sàng khi đánh giá.",
  },
  {
    key: "market",
    short: "**Hồ sơ số** theo khu, chia sẻ qua **QR, SutaMarket**.",
    title: "Chứng minh chất lượng với người mua",
    why: "Người mua và doanh nghiệp xuất khẩu ưu tiên vùng trồng có hồ sơ minh bạch, giảm rủi ro bị trả hàng.",
    needs: ["Hồ sơ vùng trồng", "Lịch sử chăm sóc, đầu vào", "Kết quả kiểm nghiệm"],
    provides: "Hồ sơ số theo khu, theo cây, chia sẻ qua mã QR và nền tảng SutaMarket.",
  },
  {
    key: "carbon",
    short: "Dữ liệu **phân bón, nhiên liệu, sinh khối** làm nền **MRV**.",
    title: "Đo lường phát thải, hướng tới tín chỉ carbon",
    why: "Tín chỉ carbon nông nghiệp chỉ được phát hành khi có hệ thống đo lường, báo cáo và thẩm định (MRV) đáng tin cậy.",
    needs: ["Lượng phân bón, nhiên liệu, điện tưới", "Sinh khối, mật độ cây theo thời gian", "Biến động chất lượng đất"],
    provides: "Dữ liệu đầu vào và cây trồng theo từng khu, làm nền cho việc tính toán phát thải và hấp thụ carbon.",
  },
  {
    key: "finance",
    short: "**Chi phí, năng suất, tài nguyên** đo được qua nhiều vụ.",
    title: "Tiếp cận vốn xanh",
    why: "Ngân hàng và quỹ đầu tư xanh cần thấy hiệu quả sản xuất và tác động môi trường được đo lường, không chỉ kế hoạch.",
    needs: ["Chi phí, năng suất qua nhiều mùa vụ", "Mức sử dụng nước, phân bón, thuốc", "Hồ sơ tuân thủ"],
    provides: "Báo cáo chi phí, năng suất và sử dụng tài nguyên theo thời gian, trích xuất từ dữ liệu vận hành thực tế.",
  },
  {
    key: "insurance",
    short: "**Thời tiết tại vườn**, ảnh hiện trường **gắn tọa độ**.",
    title: "Cơ sở cho bảo hiểm nông nghiệp",
    why: "Bảo hiểm theo chỉ số thời tiết và bồi thường thiệt hại đều cần số liệu khách quan tại chính trang trại.",
    needs: ["Số liệu thời tiết tại vườn", "Lịch sử năng suất", "Bằng chứng thiệt hại có thời gian, vị trí"],
    provides: "Trạm khí hậu VY-AIR, lịch sử từng cây và ảnh hiện trường gắn tọa độ trên SutaGrow OS.",
  },
];

export const VISION_NOTE =
  "AgriBeacon cung cấp **dữ liệu và hồ sơ**. Quyết định cấp chứng nhận, tín chỉ, khoản vay, bảo hiểm thuộc **tổ chức có thẩm quyền**.";

export const CARBON_FACT = {
  value: "13–21%",
  label: "phát thải khí nhà kính toàn cầu từ **nông nghiệp, lâm nghiệp và sử dụng đất**",
  source: "IPCC AR6, Chương 7",
  url: "https://www.ipcc.ch/report/ar6/wg3/chapter/chapter-7/",
};
