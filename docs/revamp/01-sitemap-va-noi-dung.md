# AgriBeacon: Sitemap và nội dung mục tiêu (bản đề xuất v2)

> Ngày: 2026-11-22 · Trạng thái: **bản nháp để review**
> v2: chốt thương hiệu SutaGrow OS, nhóm cây trồng mục tiêu, danh sách farm khách hàng và đối tác chuyên môn
> Phạm vi: toàn bộ website agribeacon.tech (VI là ngôn ngữ gốc, EN/JA dịch sau)

---

## 0. Nguyên tắc chung

### 0.1 Thông điệp gốc

**AgriBeacon xây SutaGrow OS, hệ điều hành AIoT cho trang trại cây lâu năm và cây công nghiệp. Chúng tôi không bắt đầu từ AI. Chúng tôi bắt đầu từ mảnh đất.**

**Đối tượng cây trồng:** cây lâu năm và cây công nghiệp, như cacao, cà phê, bơ, ổi, nho, dâu tằm… Không làm lúa và rau màu ngắn ngày.

Mọi trang trên site đều là một mảnh của cùng một hành trình gồm 6 bước:

| Bước | Tên | Câu hỏi của chủ farm | Dữ liệu tạo ra |
|---|---|---|---|
| 1 | **Hiểu mảnh đất** | Đất của tôi thế nào, trồng gì, ở đâu? | Bản đồ nền RTK/drone, kết quả xét nghiệm đất và nước |
| 2 | **Quy hoạch & bản đồ số** | Chia lô thế nào, mỗi cây nằm ở đâu, tưới ra sao? | Zone → Lô/Luống → từng cây, nguồn nước, hệ thống tưới |
| 3 | **Cảm biến** | Chuyện gì đang xảy ra ngoài vườn lúc tôi không có mặt? | Độ ẩm đất, thời tiết, mực nước, đo liên tục |
| 4 | **Ghi nhận vận hành hằng ngày** | Hôm nay ai làm gì, dùng bao nhiêu vật tư, tốn bao nhiêu tiền? | Công việc, chấm công, công nhật, lương, nhập–xuất–tồn vật tư, mua hàng, phê duyệt, chi phí theo lô/cây |
| 5 | **Chuẩn hóa → tối ưu → tự động hóa** | Lô nào hiệu quả, quy trình nào nên làm chuẩn, việc gì máy làm được? | Định mức (SOP), so sánh lô, gợi ý bón phân, tưới tự động, drone/robot phun theo bản đồ |
| 6 | **AI trên dữ liệu thật** | Hãy cho tôi biết trước và làm thay tôi phần lặp lại | Tiểu Thần Nông: tóm tắt, cảnh báo, dự báo, truy xuất |

**Câu chốt dùng xuyên suốt:** *"AI chỉ tốt bằng dữ liệu bạn có. Chúng tôi giúp bạn có dữ liệu đó trước."*

### 0.2 Giọng văn (tone of voice)

- **Thực tế, cụ thể, nói bằng ngôn ngữ của người làm vườn.** Viết "tưới lô 3 xong lúc 9h, hết 12 m³ nước", không viết "tối ưu hóa nguồn lực bằng AI".
- **Nói rõ mỗi thứ đang ở mức nào:** đang dùng, đang thí điểm, hay đang phát triển. Không vẽ tương lai như hiện tại.
- **Mỗi lời hứa phải gắn với một bước làm được.** Không dùng các từ "cách mạng", "hàng đầu thế giới", "toàn diện".
- **Ưu tiên câu ngắn, động từ, con số có đơn vị.**

### 0.3 Chính sách số liệu (bắt buộc)

- **Bỏ ngay** các số không có nguồn đang dùng trên site: 500+ farm, 1M+ data/ngày, +25% năng suất, −30% nước, "hàng trăm trang trại", "tiết kiệm 40% thuốc", "±2 cm".
- **Chỉ dùng số liệu có nguồn:** từ khách hàng thật (có đồng ý công bố), từ thông số thiết bị của nhà sản xuất, hoặc từ chính hệ thống (ví dụ "đang quản lý X cây trên Y ha").
- **Mọi con số ghi kèm bối cảnh:** farm nào, cây gì, thời gian nào, so với cái gì.

### 0.4 Kiến trúc thương hiệu (đã chốt)

**AgriBeacon là công ty. Mọi sản phẩm nằm trong hệ sinh thái AgriBeacon, và mọi dữ liệu đều đổ về SutaGrow OS.**

| Tầng | Tên | Vai trò trên site |
|---|---|---|
| Công ty / hệ sinh thái | **AgriBeacon** | Domain, người kể chuyện, ký tên dưới mọi sản phẩm |
| Nền tảng trung tâm | **SutaGrow OS** | Hệ điều hành của farm (web + app). Nơi hội tụ mọi dữ liệu |
| AI | **Tiểu Thần Nông** | Trợ lý AI chạy trên dữ liệu của SutaGrow OS |
| Thiết bị | **Trạm AIoT · RTK · UAV · Robot** | Thiết bị thu thập và thực thi, đều đẩy dữ liệu về SutaGrow OS |
| Dịch vụ | Số hóa bản đồ · Thuê robot · Triển khai & đào tạo | Do đội AgriBeacon thực hiện, kết quả nằm trong SutaGrow OS |

**Quy tắc viết:**
- Lần đầu xuất hiện trên mỗi trang, viết đầy đủ "SutaGrow OS của AgriBeacon". Từ lần sau chỉ cần "SutaGrow OS".
- Tiểu Thần Nông luôn được giới thiệu là "AI trong SutaGrow OS", không phải sản phẩm đứng riêng.
- Mọi trang thiết bị đều có một dòng cố định: *"Dữ liệu tự động về SutaGrow OS."*
- Sơ đồ hệ sinh thái (dùng ở trang chủ, `/platform`, brochure): SutaGrow OS ở giữa, Tiểu Thần Nông là lớp trên cùng, thiết bị và app ở vòng ngoài, đối tác chuyên môn ở viền ngoài cùng.
- Logo/wordmark: cần bộ nhận diện SutaGrow OS đi kèm dòng "by AgriBeacon".

### 0.4b Logo & màu nhận diện

- **Logo chuẩn:** `src/assets/brand/agribeacon-logo.svg` (bản gốc anh/chị gửi, 505×107). Biểu tượng chữ "A" có ngọn hải đăng màu xanh lá, wordmark "AgriBeacon" màu xanh than.
- **Màu chủ đạo lấy từ logo:**
  - Xanh lá `#9ACB64`: màu nhấn, cây trồng, sự sống.
  - Xanh than `#092833`: chữ, nền tối, độ tin cậy.
- **Biểu tượng riêng** (chữ "A" không kèm chữ): dùng cho favicon, avatar mạng xã hội và nền tối.

### 0.4c Video (chờ anh/chị bổ sung)

Các vị trí dành sẵn cho video, đánh dấu 🎬. Mỗi slot có ảnh poster dự phòng để trang vẫn đẹp khi chưa có video:

| Vị trí | Nội dung video gợi ý |
|---|---|
| Trang chủ: hero | Flycam một mảnh đất, tốt nhất là timelapse từ đất trống đến vườn cây |
| Trang chủ: "Một ngày trên farm" | Cảnh làm việc thật: giao việc, ghi nhận trên app, kho vật tư |
| Mỗi bước ①–⑥ | Clip 20–40 giây minh họa đúng bước đó |
| Case study Nguyễn Duy, Kiri Coffee | Phỏng vấn chủ farm/quản lý |
| Trang thiết bị (Trạm AIoT, UAV, Robot) | Thiết bị hoạt động ngoài farm |

### 0.5 CTA thống nhất toàn site

| CTA | Dùng khi | Đích |
|---|---|---|
| **Đặt lịch khảo sát farm** (CTA chính) | Mọi trang | Form khảo sát: diện tích, cây trồng, tỉnh, giai đoạn hiện tại |
| **Dùng thử miễn phí** (CTA phụ) | Trang nền tảng, trang giá | Đăng ký app (gói Starter) |
| **Farm của bạn đang ở bước nào?** | Trang chủ, trang Hành trình | Công cụ tự đánh giá |

Lý do đổi "Yêu cầu demo" thành "Đặt lịch khảo sát": câu chuyện bắt đầu từ mảnh đất, nên bước đầu tiên khách làm với AgriBeacon cũng nên là ra đồng.

---

## 1. Sitemap mới

```
/                                   Trang chủ: Hành trình 6 bước

NỀN TẢNG: SutaGrow OS
/platform                           Tổng quan SutaGrow OS, hệ điều hành AIoT của farm
/platform/survey                    1. Hiểu mảnh đất
/platform/planning                  2. Quy hoạch & bản đồ số từng cây
/platform/sensing                   3. Cảm biến & tưới
/platform/operations                4. Vận hành hằng ngày (hub)
   /platform/operations/work-labor     4a. Công việc, chấm công, công nhật & lương
   /platform/operations/materials      4b. Vật tư, kho & mua hàng
   /platform/operations/costs          4c. Chi phí & giá thành theo lô/cây
/platform/automation                5. Chuẩn hóa, tối ưu & tự động hóa
/platform/ai                        6. Tiểu Thần Nông: AI trên dữ liệu thật
/platform/mobile-app                App cho người làm vườn (offline, giọng nói)

THIẾT BỊ & DỊCH VỤ
/devices/aiot                       Trạm AIoT: đất 9in1 · nước 5in1 · khí hậu 8in1
/devices/rtk                        RTK: trạm base & rover cầm tay
/devices/uav                        UAV RTK: khảo sát, giám sát, phun
/devices/robot                      Robot phun tự hành
/services/farm-mapping              Dịch vụ số hóa bản đồ farm
/services/robot-rental              Dịch vụ thuê robot phun theo buổi/mùa vụ
/services/onboarding                Triển khai & đào tạo tại farm

GIẢI PHÁP
/solutions                          Chọn theo bài toán của bạn
/solutions/family-farm              Farm gia đình / hộ (< 10 ha)
/solutions/commercial-farm          Trang trại doanh nghiệp (10–50 ha)
/solutions/multi-farm               Tập đoàn, HTX, nhiều farm (> 50 ha)
/solutions/export-traceability      Xuất khẩu, mã vùng trồng & truy xuất
/solutions/sustainability           Bền vững & ESG: đo được thì mới báo cáo được
/solutions/crops                    Theo cây trồng (cây lâu năm & cây công nghiệp)
   /solutions/crops/cacao              Cacao      (farm thật: Nguyễn Duy, Gia Lai)
   /solutions/crops/ca-phe             Cà phê     (farm thật: Kiri Coffee, Campuchia)
   /solutions/crops/bo                 Bơ         (farm thật: Lâm Đồng)
   /solutions/crops/oi                 Ổi         (farm thật: Phú Thọ; dự án Ổi Nghĩa Đàn)
   /solutions/crops/nho                Nho        (farm thật: Bắc Giang)
   /solutions/crops/dau-tam            Dâu tằm    (HTX Dâu Tằm Lâm Đồng)

KHÁCH HÀNG & ĐỐI TÁC
/customers                          Farm đang dùng SutaGrow OS
/customers/{slug}                   Case study chi tiết
/partners                           Đối tác chuyên môn & dự án hợp tác

BẢNG GIÁ
/pricing                            Gói phần mềm + thiết bị + dịch vụ

TÀI NGUYÊN
/journal                            Nhật ký thực địa (blog)
/guides                             Hướng dẫn thực hành (thay Best Practices)
/tools/readiness                    Farm của bạn đang ở bước nào?
/tools/cost-estimator               Ước tính chi phí đầu tư
/brochure                           Brochure (giữ)
/help                               Trung tâm trợ giúp (giữ)

VỀ CHÚNG TÔI
/about                              Câu chuyện & triết lý
/about/team                         Đội ngũ & farm thử nghiệm
/careers, /careers/{slug}           Tuyển dụng (giữ)
/contact                            Liên hệ & đặt lịch khảo sát
/partners/become-a-partner          Trở thành đối tác (đại lý, nhà phân phối, đơn vị nghiên cứu)

PHÁP LÝ (footer)
/legal/privacy  /legal/terms  /legal/data-ownership
```

### 1.1 Menu chính (desktop)

```
[AgriBeacon]  SutaGrow OS ▾   Thiết bị & Dịch vụ ▾   Giải pháp ▾   Khách hàng & Đối tác ▾   Bảng giá   Tài nguyên ▾   Về chúng tôi ▾     [VI|EN|JA]  Đăng nhập SutaGrow  [Đặt lịch khảo sát]
```

Menu thứ nhất gọi thẳng là **"SutaGrow OS"** thay vì "Nền tảng", để tên sản phẩm trung tâm xuất hiện ngay trên thanh menu.

**Mega menu "SutaGrow OS"** sắp theo hành trình, có đánh số:

```
HÀNH TRÌNH 6 BƯỚC                               │  BẮT ĐẦU
① Hiểu mảnh đất          Khảo sát, đất, nước    │  ▸ Tổng quan SutaGrow OS
② Quy hoạch & bản đồ     Từng lô, từng cây      │  ▸ App cho người làm vườn
③ Cảm biến & tưới        Đo liên tục 24/7       │  ▸ Farm của bạn ở bước nào? →
④ Vận hành hằng ngày     Việc, người, vật tư    │
⑤ Tối ưu & tự động hóa   Định mức, máy làm thay │
⑥ AI Tiểu Thần Nông      Khi dữ liệu đã đủ      │
```

**Mega menu "Thiết bị & Dịch vụ":** hai cột, Thiết bị (Trạm AIoT, RTK, UAV, Robot) và Dịch vụ (Số hóa bản đồ, Thuê robot, Triển khai & đào tạo). Mỗi mục ghi một dòng *"dùng ở bước ②/③/⑤"* để nối thiết bị về hành trình.

**Mega menu "Giải pháp":** ba nhóm.
- *Theo cây trồng:* Cacao, Cà phê, Bơ, Ổi, Nho, Dâu tằm, và "Cây lâu năm khác →".
- *Theo quy mô:* 3 mục.
- *Theo mục tiêu:* Xuất khẩu & truy xuất, Bền vững & ESG.

**Mega menu "Khách hàng & Đối tác":**
- *Farm đang dùng:* thẻ mini Nguyễn Duy (cacao, 40 ha), Kiri Coffee (cà phê, 80 ha), và "Xem tất cả →".
- *Đối tác chuyên môn:* Viện Bảo vệ thực vật, Trường Đại học Nông Lâm Nghệ An.
- *Trở thành đối tác.*

**Mobile:** menu dạng accordion. Nút "Đặt lịch khảo sát" ghim cố định ở đáy màn hình.

### 1.2 Footer

- **Cột 1:** logo, một câu định vị, địa chỉ, hotline/Zalo, mạng xã hội
- **Cột 2, Nền tảng:** 6 bước
- **Cột 3, Thiết bị & Dịch vụ**
- **Cột 4, Tài nguyên:** Nhật ký thực địa, Hướng dẫn, Brochure, Trợ giúp, Ước tính chi phí
- **Cột 5, Công ty:** Về chúng tôi, Đội ngũ, Tuyển dụng, Đối tác, Liên hệ
- **Dải logo phía trên footer:** "Đồng hành chuyên môn cùng": Viện Bảo vệ thực vật · Trường ĐH Nông Lâm Nghệ An · HTX Dâu Tằm Lâm Đồng *(cần xin phép dùng logo)*
- **Dải cuối:** Quyền riêng tư · Điều khoản · **Dữ liệu farm thuộc về bạn** (trang riêng, vì đây là mối lo thật của chủ farm)

---

## 2. Nội dung mục tiêu từng trang

> **Quy ước:** mỗi trang có các mục 🎯 Mục tiêu · 👤 Người đọc chính · 💬 Thông điệp · 📐 Cấu trúc section · 🔗 CTA · 🔎 SEO · 📥 Cần cung cấp.
> Tiêu đề trong ngoặc kép là **bản nháp copy**, sẽ chỉnh tiếp.
> Đánh dấu tính năng: ✅ = đã có trong hệ thống (đối chiếu backend/app) · 🔶 = cần xác nhận mức sẵn sàng · 🧪 = thí điểm/đang phát triển (phải ghi rõ trên site).

---

### 2.1 Trang chủ `/`

🎯 **Mục tiêu:** trong 10 giây người đọc hiểu AgriBeacon là gì. Trong 2 phút họ thấy farm của mình nằm ở bước nào và bấm "Đặt lịch khảo sát".
👤 **Người đọc chính:** chủ farm và quản lý farm cây lâu năm và cây công nghiệp, từ 0,5 ha (nho, ổi) đến 80 ha (cà phê). Lưu ý: trang EN cần phục vụ cả khách ở Campuchia và khu vực.
💬 **Thông điệp:** *Không bắt đầu từ AI. Bắt đầu từ mảnh đất.*

📐 **Cấu trúc**

1. **Hero**
   - **Eyebrow:** "SutaGrow OS by AgriBeacon"
   - **H1:** "Hệ điều hành AIoT cho trang trại, bắt đầu từ mảnh đất."
   - **Sub:** "Từ đo đạc, quy hoạch, cảm biến đến ghi nhận từng công việc mỗi ngày, SutaGrow OS giúp farm của bạn có dữ liệu thật trước. Rồi mới tối ưu, tự động hóa và để AI Tiểu Thần Nông làm phần việc lặp lại."
   - **Dải bằng chứng ngay dưới hero:** "Đang vận hành trên các farm cacao, cà phê, bơ, ổi, nho, từ Bắc Giang đến Gia Lai và Campuchia". Có thể thêm tổng diện tích (5 farm đã liệt kê cộng lại khoảng 126 ha; cần xác nhận trước khi dùng).
   - **CTA:** Đặt lịch khảo sát · Xem hành trình 6 bước
   - **Visual:** một mảnh đất nhìn từ trên cao, chưa có gì. Ảnh/video thật, có poster tĩnh.
2. **Vấn đề, nói thẳng:** "Phần lớn farm không thiếu công nghệ. Họ thiếu dữ liệu đáng tin."
   - Ba thẻ ngắn: *Sổ tay và Zalo rời rạc* · *Không biết chi phí thật của từng lô* · *Mua thiết bị đắt tiền rồi không dùng tới*.
3. **Hành trình 6 bước (phần thân, cuộn kể chuyện)**
   - Cùng một hình minh họa farm được thêm lớp qua từng bước. Thanh tiến trình ①–⑥ ghim bên trái.
   - Mỗi bước gồm: 1 câu vấn đề, 1 câu giải pháp, "Dữ liệu bạn có được", và link "Tìm hiểu bước này →".
   - Bước ④ được làm nổi nhất. Nhãn: *"Trái tim của hệ thống"*.
   - Bước ⑥ có câu chốt: *"AI chỉ tốt bằng dữ liệu bạn có."*
4. **Một ngày trên farm với SutaGrow OS:** timeline 5h sáng → 18h, dựng theo một farm thật (ví dụ Nguyễn Duy Farm).
   - Ví dụ: quản lý giao việc qua app → tổ trưởng chấm công → công nhân nói "tưới lô 3 xong" → kho xuất 2 bao phân → cảm biến báo đất khô lô 5 → tối nhận tóm tắt 3 dòng.
   - Phần này biến tính năng thành cảnh thật.
5. **Nền tảng + thiết bị, gắn vào hành trình:** sơ đồ đơn giản SutaGrow OS ở giữa, xung quanh là Trạm AIoT, RTK, UAV, Robot và App. Mỗi thiết bị ghi "dùng ở bước nào".
6. **Bằng chứng: "Từ 0,5 ha đến 80 ha"**
   - Băng chuyền thẻ farm thật. Mỗi thẻ gồm ảnh, cây, diện tích, tỉnh/quốc gia, và chip "đang ở bước ④":
     - Nguyễn Duy Farm: cacao, 40 ha, Gia Lai
     - Kiri Coffee: cà phê, 80 ha, Campuchia
     - Farm bơ: 5 ha, Lâm Đồng
     - Farm ổi: 1 ha, Phú Thọ
     - Farm nho: 0,5 ha, Bắc Giang
   - Thông điệp ngầm: *bắt đầu nhỏ cũng được.*
   - Bên dưới là dải **đối tác chuyên môn**: Viện Bảo vệ thực vật (sâu bệnh hại), Trường ĐH Nông Lâm Nghệ An (dự án công nghệ cao Ổi Nghĩa Đàn), HTX Dâu Tằm Lâm Đồng.
7. **Farm của bạn đang ở bước nào?** Quiz 5 câu, cho ra "Bạn ở bước ②. Bước tiếp theo nên làm là…" và CTA tương ứng.
8. **Cam kết:** dữ liệu thuộc về bạn · bắt đầu nhỏ, không bắt mua cả gói · app dùng được khi mất sóng 🔶 · đội ngũ ra tận farm.
9. **CTA cuối:** "Bắt đầu bằng một buổi khảo sát." Form ngắn: tên, SĐT/Zalo, tỉnh, diện tích, cây trồng.

🔎 **SEO**
- **Title:** "SutaGrow OS by AgriBeacon: Hệ điều hành AIoT cho trang trại cây lâu năm"
- **Từ khóa:** phần mềm quản lý trang trại, quản lý vườn cây lâu năm, nông nghiệp chính xác, AIoT nông nghiệp, trạm quan trắc nông nghiệp, quản lý farm cà phê/cacao/sầu riêng.

📥 **Cần cung cấp:** ảnh/video thật từ 5 farm (flycam Nguyễn Duy Farm hoặc Kiri Coffee qua các giai đoạn là lý tưởng), xác nhận farm nào đồng ý hiện tên và logo, ảnh chụp app thật.

---

### 2.2 Tổng quan nền tảng `/platform`

🎯 **Mục tiêu:** giải thích "hệ điều hành AIoT" nghĩa là gì, cho cả người không rành công nghệ.
💬 **Thông điệp:** *Một nơi duy nhất cho mảnh đất, cái cây, con người, vật tư và đồng tiền của farm.*

📐 **Cấu trúc**

1. **Hero:** "SutaGrow OS: mọi thứ diễn ra trên farm, ở một nơi."
2. **"Hệ điều hành" là gì?** So sánh dễ hiểu: điện thoại có hệ điều hành để mọi ứng dụng nói chuyện với nhau. Farm cũng cần một lớp như vậy để bản đồ, cảm biến, nhân công, kho và kế toán dùng chung một dữ liệu.
3. **Kiến trúc 4 lớp** (sơ đồ):
   - **Lớp vật lý:** đất, cây, nước, máy
   - **Lớp thu thập:** RTK, drone, trạm AIoT, app di động, giọng nói
   - **Lớp vận hành:** bản đồ, công việc, nhân sự, kho, chi phí, phê duyệt
   - **Lớp trí tuệ:** báo cáo, định mức, gợi ý, AI
4. **Mô hình dữ liệu xoay quanh cái cây:** Farm → Zone → Lô/Luống → **Cây** ✅. Mỗi cây có lịch sử ✅: được bón gì, ai chăm, tốn bao nhiêu.
5. **6 bước:** thẻ link sang 6 trang con.
6. **Web cho văn phòng, app cho ngoài vườn:** ảnh chụp màn hình thật; vai trò và phân quyền theo tổ chức/farm ✅.
7. **Tích hợp & mở rộng:** xuất dữ liệu Excel ✅; API, kết nối thiết bị bên thứ ba 🔶.
8. **Bảo mật & quyền sở hữu dữ liệu:** link sang `/legal/data-ownership`.
9. **CTA:** Dùng thử miễn phí · Đặt lịch khảo sát.

---

### 2.3 Bước ① Hiểu mảnh đất `/platform/survey`

🎯 **Mục tiêu:** chứng minh AgriBeacon bắt đầu từ hiện trường. Đây là cửa vào bán dịch vụ khảo sát/số hóa.
💬 **Thông điệp:** *Trước khi trồng hay đầu tư thiết bị, hãy biết chính xác mình đang có gì.*

📐 **Cấu trúc**

1. **Hero:** "Mọi farm tốt đều bắt đầu từ một bản đồ đúng."
2. **Câu hỏi bạn cần trả lời:** ranh giới thật, diện tích thật, độ dốc, hướng thoát nước, đất từng khu, nguồn nước.
3. **Chúng tôi làm gì:**
   - Đo ranh giới và mốc bằng RTK, sai số cấp centimet theo thông số thiết bị.
   - Bay drone chụp ảnh nền độ phân giải cao. Ảnh được phủ lên bản đồ GIS ✅.
   - Lập kế hoạch lấy mẫu ✅, xét nghiệm đất ✅ và nước ✅, lưu kết quả theo vị trí.
4. **Bạn nhận được:** bản đồ nền số, lớp dữ liệu đất/nước, báo cáo khảo sát, mảnh đất đã sẵn sàng cho bước quy hoạch.
5. **Quy trình & thời gian:** hẹn → ra farm → xử lý → bàn giao (số ngày cần xác nhận).
6. **Ví dụ trước/sau:** ảnh vệ tinh mờ so với bản đồ RTK + drone.
7. **CTA:** Đặt lịch khảo sát · Xem dịch vụ số hóa bản đồ.

📥 **Cần cung cấp:** quy trình khảo sát thực tế, thời gian và giá tham khảo, một bản đồ mẫu đã ẩn danh.

---

### 2.4 Bước ② Quy hoạch & bản đồ số `/platform/planning`

🎯 **Mục tiêu:** cho thấy "bản đồ tới từng cây" là nền móng cho mọi dữ liệu sau này.
💬 **Thông điệp:** *Khi mỗi cây có một địa chỉ, mọi công việc đều có chỗ để ghi lại.*

📐 **Cấu trúc**

1. **Hero:** "Mỗi cây một địa chỉ."
2. **Chia farm theo cách bạn quản lý:** Zone → Lô/Luống ✅ → Cây ✅. Mỗi cây gắn loại và giống ✅ và có mã định danh.
3. **Quy hoạch hệ thống tưới & nguồn nước:** nguồn nước ✅, tuyến ống, van, khu tưới 🔶. Lên bản đồ trước khi lắp.
4. **Kế hoạch canh tác:** kế hoạch mùa vụ, lịch bón và phun theo lô ✅/🔶.
5. **Lịch sử từng cây ✅:** bấm vào một cây, thấy toàn bộ những gì đã xảy ra với nó.
6. **Demo tương tác:** bản đồ mẫu cho bấm thử (dùng lại component Map hiện có).
7. **CTA:** Dùng thử miễn phí (tự vẽ bản đồ) · Nhờ AgriBeacon số hóa.

---

### 2.5 Bước ③ Trạm AIoT & tưới `/platform/sensing`

🎯 **Mục tiêu:** bán trạm AIoT một cách tỉnh táo. Lắp đúng chỗ, đúng mục đích.
💬 **Thông điệp:** *Một trạm đo, ba lớp dữ liệu: đất, nước, khí hậu. Mỗi chỉ số phải trả lời một câu hỏi cụ thể.*

📐 **Cấu trúc**

1. **Hero:** "Biết chuyện gì đang xảy ra ngoài vườn, kể cả khi bạn không có mặt."
2. **🎬 Video:** lắp đặt trạm AIoT ngoài farm *(chờ video từ anh/chị)*.
3. **Trạm AIoT: ba cụm cảm biến trên cùng một trạm đo:**

   | Cụm | Trả lời câu hỏi | Chỉ số (cần xác nhận danh sách chính xác) |
   |---|---|---|
   | **Dinh dưỡng đất 9in1** | Đất có đủ ẩm, đủ dinh dưỡng không? Bón gì, bao nhiêu? | Độ ẩm, nhiệt độ, EC, pH, N, P, K, độ mặn, TDS |
   | **Chất lượng nước 5in1** | Nước tưới có an toàn cho cây không? | *Ví dụ:* pH, EC, TDS, nhiệt độ, ORP/DO |
   | **Quan trắc khí hậu 8in1** | Thời tiết tại chính farm này ra sao? Có rủi ro sâu bệnh, khô hạn không? | *Ví dụ:* nhiệt độ, độ ẩm không khí, áp suất, tốc độ gió, hướng gió, lượng mưa, bức xạ/ánh sáng, … |

   - "AIoT" nghĩa là dữ liệu trạm không chỉ để hiển thị. Nó nuôi gợi ý bón phân (kết hợp xét nghiệm đất ✅), cảnh báo, và Tiểu Thần Nông.
4. **Nguyên tắc "ít mà đúng":** đặt trạm theo lô đại diện trên bản đồ (bước ②), không lắp tràn lan.
5. **Dữ liệu đi đâu:** trạm → bản đồ → cảnh báo → gắn vào công việc (ví dụ cảnh báo khô thành việc "tưới lô 5").
6. **⭐ Tự động bật/dừng tưới ✅ (điểm nhấn, website cũ chưa nhắc tới):** trạm đo được tích hợp trực tiếp với hệ thống điều khiển tưới. Hệ thống tự bật và tự dừng tưới theo dữ liệu thực tế từ đất, nước và khí hậu. Ví dụ: đất đủ ẩm thì dừng; trời sắp mưa thì hoãn; nước không đạt thì không bơm. Mỗi lần bật/dừng đều ghi vào nhật ký tưới kèm lý do. Vẫn điều khiển tay được từ app. Cần một sơ đồ "trạm đo → bộ điều khiển → van/bơm" và một video 🎬 cảnh van tự mở.
7. **Kết nối:** LoRaWAN/4G 🔶, pin/năng lượng mặt trời 🔶. Link sang `/devices/aiot`.
8. **CTA:** Tư vấn bố trí trạm AIoT.

---

### 2.6 Bước ④ Vận hành hằng ngày `/platform/operations` (HUB, trang quan trọng nhất)

🎯 **Mục tiêu:** cho thấy AgriBeacon giải bài toán đau nhất hiện nay: quản lý người, việc, vật tư và tiền. Đây cũng là nơi dữ liệu thật được sinh ra.
👤 **Người đọc chính:** chủ farm, quản lý farm, kế toán/thủ kho.
💬 **Thông điệp:** *Dữ liệu tốt nhất không đến từ cảm biến. Nó đến từ công việc thật, được ghi lại đúng lúc, đúng chỗ.*

📐 **Cấu trúc**

1. **Hero:** "Ai làm gì, ở lô nào, dùng bao nhiêu, tốn bao nhiêu: ghi lại mỗi ngày, không cần sổ tay."
2. **Vòng lặp vận hành** (sơ đồ vòng tròn):
   - Lên kế hoạch → giao việc ✅ → làm & ghi nhận (app, giọng nói 🔶) → xuất vật tư ✅ → chấm công ✅ → tính chi phí → báo cáo → điều chỉnh kế hoạch.
3. **Ba trụ cột** (link sang 3 trang con 4a/4b/4c).
4. **Đề xuất & phê duyệt ✅:** mua vật tư, ứng tiền, tăng ca đi qua quy trình duyệt nhiều bước, có lịch sử.
5. **Nhật ký hoạt động ✅:** mọi thay đổi đều có dấu vết. Đây là nền cho truy xuất nguồn gốc.
6. **Dành cho từng vai trò:** chủ farm / quản lý / tổ trưởng / công nhân / kế toán–kho, mỗi người thấy gì và làm gì.
7. **Trước/sau, kể bằng tình huống:** "Cuối tháng tính lương mất 3 ngày" → "…" *(cần số thật từ khách hàng)*.
8. **CTA:** Dùng thử miễn phí · Đặt lịch demo vận hành.

#### 4a. Công việc, chấm công, công nhật & lương `/platform/operations/work-labor`

- **H1:** "Giao việc, chấm công và tính lương cho cả đội làm vườn, trên một app."
- **Công việc ✅:** tạo việc theo lô/cây, giao cho người hoặc tổ, theo dõi trạng thái, kèm ảnh.
- **Ca làm ✅:** mẫu ca, phân ca theo tổ, chấm công ✅.
- **Công nhật ✅:** đơn giá công nhật ✅, ghi công theo ngày, quy tắc tăng ca ✅.
- **Bảng lương ✅:** tạo kỳ lương, bảng lương công nhật, định mức theo người hoặc theo tổ ✅.
- **Nhóm/tổ lao động ✅.**
- **Kết quả:** biết chi phí nhân công thật của từng lô, từng loại việc.
- 🔎 **Từ khóa:** phần mềm chấm công nông trại, tính lương công nhật, quản lý nhân công vườn.

#### 4b. Vật tư, kho & mua hàng `/platform/operations/materials`

- **H1:** "Biết trong kho còn gì, đã dùng vào đâu, mua của ai, với giá nào."
- **Danh mục vật tư ✅:** phân bón, thuốc BVTV, giống… có phân loại ✅ và đơn vị ✅.
- **Nhập kho ✅ / xuất kho ✅ / nhiều kho ✅ / lô hàng ✅:** theo dõi hạn dùng và giá vốn theo lô 🔶.
- **Mua hàng:** đề xuất → đơn mua ✅ → nhận hàng ✅ → nhà cung cấp ✅ → thanh toán/phiếu thu chi ✅.
- **Xuất vật tư gắn vào công việc và lô:** biết từng bao phân đi đâu.
- **Cảnh báo tồn kho thấp 🔶.**
- 🔎 **Từ khóa:** quản lý kho vật tư nông nghiệp, quản lý phân bón thuốc BVTV.

#### 4c. Chi phí & giá thành `/platform/operations/costs`

- **H1:** "Giá thành thật của mỗi lô, mỗi cây, mỗi kg."
- Gom chi phí nhân công (4a), vật tư (4b), máy móc và dịch vụ về đúng lô/cây.
- Dashboard và chỉ số ✅. Xuất báo cáo Excel ✅.
- So sánh lô với lô, mùa với mùa.
- **Góc kế toán:** sổ thu chi, kỳ lương 🔶 (nói rõ có thay phần mềm kế toán hay không).
- **Đây là cầu nối sang bước ⑤:** không đo được thì không tối ưu được.

---

### 2.7 Bước ⑤ Chuẩn hóa, tối ưu & tự động hóa `/platform/automation`

🎯 **Mục tiêu:** cho thấy tự động hóa là kết quả của dữ liệu và quy trình, không phải điểm bắt đầu.
💬 **Thông điệp:** *Làm chuẩn trước, rồi mới để máy làm.*

📐 **Cấu trúc**

1. **Hero:** "Khi đã biết cách làm tốt nhất, hãy để nó lặp lại mỗi ngày."
2. **Bậc thang 3 nấc:**
   - **Chuẩn hóa:** quy trình mẫu (SOP) cho từng loại việc, định mức vật tư và công theo lô.
   - **Tối ưu:** so sánh lô hiệu quả và kém hiệu quả; gợi ý bón phân dựa trên xét nghiệm đất ✅; gợi ý ✅ và thông báo ✅.
   - **Tự động hóa:** việc lặp tự sinh 🔶, tưới theo ngưỡng 🔶, drone/robot phun theo bản đồ và lịch 🔶.
3. **Máy móc trong hành trình:**
   - UAV khảo sát và giám sát định kỳ, có lịch sử bay ✅.
   - Robot phun tự hành điều khiển qua app.
   - Mọi lần bay hay phun đều thành một bản ghi công việc có vị trí, liều lượng và chi phí.
4. **Thành thật về giới hạn:** cái gì đã tự động hoàn toàn, cái gì vẫn cần người duyệt, và vì sao.
5. **CTA:** Xem thiết bị · Thuê robot thử một mùa.

---

### 2.8 Bước ⑥ AI Tiểu Thần Nông `/platform/ai`

🎯 **Mục tiêu:** định vị AI đúng chỗ. AI là lớp trên cùng, mạnh nhờ dữ liệu của chính farm.
💬 **Thông điệp:** *AI của chúng tôi không đoán mò. Nó đọc chính nhật ký farm của bạn.*

📐 **Cấu trúc**

1. **Hero:** "Tiểu Thần Nông: trợ lý hiểu farm của bạn, vì nó đọc dữ liệu thật của farm bạn."
2. **Vì sao AI đứng ở bước 6:** sơ đồ "dữ liệu tích lũy theo thời gian ↔ AI làm được gì".
3. **AI làm được gì hôm nay** (chỉ liệt kê cái đã chạy):
   - Nhập liệu bằng giọng nói/chat: "Hôm nay tưới lô 3 xong" thành bản ghi công việc 🔶.
   - Tóm tắt farm 3 dòng mỗi sáng 🔶.
   - Hỏi đáp nông học, tra cứu quy trình 🔶.
4. **AI đang phát triển 🧪** (ghi rõ nhãn): cảnh báo sớm, dự báo sản lượng, phân tích ảnh drone từng cây, gợi ý xuất khẩu.
5. **Hai nguồn hiểu biết của Tiểu Thần Nông:**
   - **Dữ liệu farm của bạn:** nhật ký, chi phí, cảm biến, lịch sử cây trong SutaGrow OS.
   - **Kiến thức chuyên môn:** phối hợp với **Viện Bảo vệ thực vật** về sâu bệnh hại, và với **Trường ĐH Nông Lâm Nghệ An** từ các dự án thực địa.
   - Câu viết đề xuất: *"Khi Tiểu Thần Nông nói về sâu bệnh, nó không lấy từ internet."* (Cần thống nhất với Viện mức độ được ghi trên site, ví dụ "phối hợp chuyên môn" hay "thẩm định nội dung".)
6. **Dữ liệu & quyền riêng tư:** AI dùng dữ liệu của ai, dữ liệu có rời khỏi farm không.
7. **Gói & giá:** gói câu hỏi (link sang `/pricing`).
8. **CTA:** Dùng thử Tiểu Thần Nông.

---

### 2.9 App cho người làm vườn `/platform/mobile-app`

- **H1:** "Thiết kế cho người cầm cuốc, không chỉ cho người ngồi văn phòng."
- Tính năng theo vai trò: công việc ✅, cây ✅, lô ✅, đề xuất ✅, chấm công ✅, drone ✅, thông báo ✅, kế toán ✅.
- Giọng nói, chữ to, ít bước bấm. Offline 🔶.
- Ảnh chụp màn hình thật và badge App Store/Google Play (đã có asset).

---

### 2.10 Thiết bị: khung chung cho 4 trang `/devices/*`

Mọi trang thiết bị dùng **cùng một khuôn**, để thiết bị luôn phục vụ hành trình chứ không đứng một mình:

1. **Hero:** tên thiết bị + một câu "dùng để trả lời câu hỏi gì".
2. **Nằm ở bước nào trong hành trình** (chip ①–⑥).
3. **Làm được gì:** 3–4 năng lực, có ảnh thật.
4. **Dữ liệu nó sinh ra và đi vào SutaGrow OS thế nào.**
5. **Thông số kỹ thuật:** chỉ số của nhà sản xuất, ghi nguồn.
6. **Mua, thuê hay dịch vụ:** các hình thức sở hữu.
7. **FAQ:** bảo hành, lắp đặt, bảo trì.
8. **CTA:** Tư vấn thiết bị.

| Trang | Câu định vị đề xuất | Bước |
|---|---|---|
| `/devices/aiot` | "Một trạm đo đa cảm biến (đất 9in1, nước 5in1, khí hậu 8in1), nối thẳng vào hệ thống tưới để tự bật/dừng." | ③ ⑤ |
| `/devices/rtk` (mới, tách từ asset có sẵn) | "Tọa độ cấp centimet: nền móng của bản đồ từng cây." | ① ② ⑤ |
| `/devices/uav` | "Nhìn cả farm từ trên cao, định kỳ, theo cùng một đường bay." | ① ⑤ |
| `/devices/robot` | "Phun đúng chỗ, đúng liều, người vận hành đứng ngoài vùng thuốc." | ⑤ |

> ⚠️ Bỏ các con số chưa kiểm chứng đang có trên trang Robot/UAV ("tiết kiệm 40%", "±2 cm", "24/7 không cần giám sát").

### 2.11 Dịch vụ `/services/*`

- **Số hóa bản đồ farm:** gói khảo sát RTK + drone + vector hóa. Giá tham khảo đang có: từ 3.000 ₫/m². Nêu quy trình, bàn giao và thời gian.
- **Thuê robot phun:** theo buổi hoặc mùa vụ. Bao gồm gì, người vận hành, an toàn, cách đặt lịch.
- **Triển khai & đào tạo (mới):** chương trình "30 ngày đầu tiên".
  - Tuần 1: bản đồ.
  - Tuần 2: đưa đội vào app.
  - Tuần 3: kho và vật tư.
  - Tuần 4: báo cáo chi phí đầu tiên.
  - Đây là điều chủ farm sợ nhất ("mua về không ai dùng"), nên cần nói rõ.

---

### 2.12 Giải pháp `/solutions` và các trang con

🎯 **Mục tiêu:** giúp người đọc tự nhận ra mình, rồi thấy lộ trình phù hợp. **Không lặp lại tính năng**, mà sắp lại hành trình theo bối cảnh.

**Khung chung mỗi trang:**
1. Chân dung: "Bạn là…"
2. 3 vấn đề điển hình.
3. Lộ trình đề xuất (bước nào trước, bước nào để sau).
4. Gói phù hợp.
5. Câu chuyện khách hàng tương tự.
6. CTA.

| Trang | Chân dung | Lộ trình đề xuất | Farm tham chiếu |
|---|---|---|---|
| **Farm gia đình (< 10 ha)** | Chủ vườn tự quản lý, 5–20 lao động thời vụ | ② bản đồ cơ bản → ④ công việc, công nhật → ③ 1–2 cảm biến. Gói Starter/Pro | Nho Bắc Giang 0,5 ha · Ổi Phú Thọ 1 ha · Bơ Lâm Đồng 5 ha |
| **Trang trại doanh nghiệp (10–50 ha)** | Có quản lý, kế toán, thủ kho | ① khảo sát → ② → ④ đầy đủ (lương, kho, mua hàng, phê duyệt) → ③ → ⑤. Gói Business | Nguyễn Duy Farm, cacao 40 ha, Gia Lai |
| **Farm lớn, HTX, nhiều farm (> 50 ha)** | Nhiều farm, nhiều tổ chức hoặc nhiều hộ thành viên, cần báo cáo tập trung | Chuẩn hóa SOP chung, phân quyền đa tổ chức ✅, so sánh giữa các farm/hộ, ⑤ ⑥. Gói Enterprise | Kiri Coffee 80 ha (Campuchia) · HTX Dâu Tằm Lâm Đồng |
| **Xuất khẩu & truy xuất** | Farm cần mã vùng trồng, GlobalGAP, VietGAP | Nhật ký canh tác tự sinh từ bước ④, truy xuất tới lô/cây, xuất báo cáo cho đoàn đánh giá |
| **Bền vững & ESG** | Doanh nghiệp cần báo cáo môi trường/xã hội | Đo nước, phân, thuốc, công lao động thật → báo cáo ESG có số liệu gốc. Nội dung từ trang Best Practices cũ chuyển về đây, gọn và thực tế hơn |

#### Theo cây trồng `/solutions/crops/*`

**Tổng quan `/solutions/crops`**
- **H1:** "Cây lâu năm cần quản lý theo năm, không theo vụ."
- **Lý do nói thẳng điều này:** một cây cacao hay cà phê sống hàng chục năm. Lịch sử của từng cây (bón gì, bệnh gì, cho bao nhiêu trái) chính là tài sản. Đó là lý do SutaGrow OS quản lý tới từng cây.
- **Lưới 6 cây chủ lực,** cộng mục "Cây lâu năm/công nghiệp khác (sầu riêng, hồ tiêu, điều, cao su, macca…): liên hệ để khảo sát".

**Khung chung mỗi trang cây:**
1. **Hero:** ảnh từ farm thật, ví dụ "Cacao ở Gia Lai: 40 ha, từng cây có hồ sơ riêng".
2. **Đặc thù canh tác và các điểm đau của loại cây này:** chu kỳ, công việc chính trong năm, sâu bệnh chính (nội dung sâu bệnh phối hợp Viện BVTV).
3. **Lịch canh tác 12 tháng:** công việc nào ghi nhận trong SutaGrow OS ở tháng nào.
4. **Thiết lập SutaGrow OS gợi ý:** cách chia lô, cảm biến nên lắp, định mức vật tư và công.
5. **Câu chuyện farm thật** (link sang case study).
6. **CTA:** Đặt lịch khảo sát farm [cây].

| Trang | Farm / dự án tham chiếu | Góc kể chuyện chính |
|---|---|---|
| Cacao | Nguyễn Duy Farm, 40 ha, Gia Lai | Quản lý nhân công và chi phí trên diện tích lớn; truy xuất cho chuỗi cacao chất lượng cao |
| Cà phê | Kiri Coffee, 80 ha, Campuchia | Farm lớn ở nước ngoài, quản lý từ xa; vận hành đa ngôn ngữ; truy xuất xuất khẩu (EUDR, chống phá rừng: cần xác nhận có làm) |
| Bơ | Farm 5 ha, Lâm Đồng | Tưới và dinh dưỡng theo lô; chi phí trên mỗi kg |
| Ổi | Farm 1 ha, Phú Thọ + **dự án Ổi Nghĩa Đàn** (cùng ĐH Nông Lâm Nghệ An) | Từ farm nhỏ đến mô hình công nghệ cao có viện/trường đồng hành |
| Nho | Farm 0,5 ha, Bắc Giang | "Nhỏ cũng nên số hóa": canh tác thâm canh, nhiều công chăm sóc |
| Dâu tằm | HTX Dâu Tằm Lâm Đồng | Mô hình HTX: nhiều hộ thành viên trên một hệ thống, quy trình chuẩn chung |

📥 **Cần cung cấp:** cho mỗi farm, những gì đã triển khai (bước nào, thiết bị gì), từ khi nào, và 1–2 con số trước/sau nếu có.

---

### 2.13 Khách hàng `/customers`

🎯 **Mục tiêu:** bằng chứng thật, thay cho toàn bộ số liệu chung chung. Thông điệp ngầm: *"Từ 0,5 ha đến 80 ha, từ Bắc Giang đến Campuchia."*

📐 **Cấu trúc**

1. **Hero:** "Những farm đang vận hành bằng SutaGrow OS."
2. **Bản đồ hệ thống farm:** ghim các farm trên bản đồ Việt Nam và Campuchia. Dùng lại component Map hiện có.
3. **Lưới thẻ farm** (bộ lọc theo cây, quy mô, bước):

   | Farm | Cây | Diện tích | Vị trí | Bước hiện tại* |
   |---|---|---|---|---|
   | Nguyễn Duy Farm | Cacao | 40 ha | Gia Lai | ④ |
   | Kiri Coffee | Cà phê | 80 ha | Campuchia | ④ |
   | Farm bơ | Bơ | 5 ha | Lâm Đồng | ③ |
   | Farm ổi | Ổi | 1 ha | Phú Thọ | ③ |
   | Farm nho | Nho | 0,5 ha | Bắc Giang | ③ |
   | *(sẽ bổ sung)* | | | | |

   \* Cột "bước hiện tại" là giả định, cần anh/chị điền đúng. Tên các farm bơ/ổi/nho cần chủ farm đồng ý hiển thị.
4. **Case study ưu tiên viết trước:**
   - **Nguyễn Duy Farm** (cacao 40 ha): trang trại doanh nghiệp, điển hình cho bước ④.
   - **Kiri Coffee** (80 ha): quy mô lớn nhất, thể hiện năng lực quốc tế, phục vụ bản EN.
5. **Mẫu case study:**
   1. Bối cảnh farm
   2. Trước khi dùng SutaGrow OS
   3. Đã triển khai bước nào, thiết bị gì
   4. Một ngày vận hành bây giờ
   5. Sau X tháng: số liệu có bối cảnh
   6. Trích dẫn chủ farm/quản lý
   7. Bước tiếp theo trong hành trình
6. **CTA:** "Farm của bạn có thể là câu chuyện tiếp theo". Đặt lịch khảo sát.

📥 **Cần cung cấp:** xác nhận quyền công bố (tên, logo, ảnh) của từng farm; buổi phỏng vấn 30 phút với Nguyễn Duy Farm và Kiri Coffee.

---

### 2.13b Đối tác chuyên môn & dự án hợp tác `/partners`

🎯 **Mục tiêu:** cho thấy AgriBeacon không làm một mình. Công nghệ đi cùng chuyên môn nông học và nghiên cứu. Đây là lớp uy tín quan trọng với cả farm lẫn cơ quan nhà nước.
💬 **Thông điệp:** *"Công nghệ của chúng tôi, chuyên môn của những người hiểu cây trồng nhất."*

📐 **Cấu trúc**

1. **Hero:** "Đi cùng các nhà khoa học, từ phòng thí nghiệm ra tận vườn."
2. **Đối tác chuyên môn:**
   - **Viện Bảo vệ thực vật:** phối hợp chuyên môn về sâu bệnh hại. Ứng dụng: thư viện sâu bệnh trong SutaGrow OS, kiến thức cho Tiểu Thần Nông, nội dung hướng dẫn trên `/guides`.
   - **Trường Đại học Nông Lâm Nghệ An:** hợp tác triển khai dự án nông nghiệp công nghệ cao.
3. **Dự án hợp tác** (thẻ dự án: mục tiêu, địa điểm, vai trò AgriBeacon, trạng thái):
   - **Ổi Nghĩa Đàn (Nghệ An):** mô hình ổi công nghệ cao.
   - **HTX Dâu Tằm Lâm Đồng:** số hóa vùng trồng dâu cho hộ thành viên.
   - *(sẽ bổ sung)*
4. **Đối tác triển khai & thương mại:** nhà phân phối thiết bị, đại lý vật tư, đơn vị xét nghiệm đất (sẽ bổ sung).
5. **Trở thành đối tác:** form cho đại lý, nhà phân phối, viện/trường, HTX.

> ⚠️ Cần xác nhận cách gọi chính xác vai trò của từng bên ("phối hợp chuyên môn", "đồng triển khai", "chuyển giao") và quyền dùng logo, trước khi đăng.

> ❓ Cần làm rõ: HTX Dâu Tằm Lâm Đồng là dự án cùng ĐH Nông Lâm Nghệ An, hay một dự án/khách hàng riêng? Bản nháp này đang để là dự án hợp tác riêng.

---

### 2.14 Bảng giá `/pricing`

🎯 **Mục tiêu:** minh bạch và dễ bắt đầu nhỏ. Giảm độ phức tạp so với trang hiện tại (khoảng 1.100 dòng code).

📐 **Cấu trúc**

1. **"Bắt đầu nhỏ, mở rộng theo hành trình."**
2. **4 gói phần mềm** (giữ khung hiện có):
   - Starter: miễn phí, < 1 ha
   - Pro: 599k/tháng, 1–10 ha
   - Business: 2,4tr/tháng, 10–50 ha
   - Enterprise: liên hệ
   - Bảng so sánh sắp theo 6 bước: gói nào mở bước nào.
3. **Add-on:** AI Tiểu Thần Nông (gói câu hỏi), AI Analytics.
4. **Thiết bị & dịch vụ:** giá "từ…" hoặc "báo giá theo khảo sát". Không bán thiết bị qua giỏ hàng.
5. **Công cụ ước tính chi phí** (nhúng hoặc link).
6. **FAQ:** hợp đồng, hủy gói, dữ liệu khi ngừng dùng, VAT.

> ❓ **Cần quyết định:** bỏ **giỏ hàng** (`/cart`)? Đề xuất: SaaS đăng ký thẳng trên app; thiết bị và dịch vụ đi qua form báo giá. Mục "Buy Tree" (chia sẻ 5% doanh thu) có còn chạy không?

---

### 2.15 Tài nguyên

| Trang | Mục tiêu | Nội dung |
|---|---|---|
| **Nhật ký thực địa** `/journal` | SEO + storytelling dài hạn | Bài viết từ hiện trường, 2 bài/tháng. Đề tài mở đầu: "Số hóa 40 ha cacao ở Gia Lai: tuần đầu tiên" · "Quản lý 80 ha cà phê ở Campuchia từ xa" · "0,5 ha nho có cần phần mềm không?" · "Ổi Nghĩa Đàn: khi viện, trường và farm dùng chung một bản đồ" · "Tính giá thành 1 kg bơ" |
| **Hướng dẫn** `/guides` | Thay "Best Practices" (480 dòng, nặng lý thuyết ESG) | Hướng dẫn thực hành ngắn theo 6 bước: "Cách chia lô", "Lấy mẫu đất đúng cách", "Thiết lập đơn giá công nhật"… Thêm chuyên mục **Sâu bệnh hại theo cây**, phối hợp Viện BVTV. Liên kết với Help Center |
| **Farm bạn ở bước nào?** `/tools/readiness` | Tạo lead có phân loại | 8–10 câu hỏi → kết quả bước ①–⑥ + gợi ý + CTA |
| **Ước tính chi phí** `/tools/cost-estimator` | Giữ, chỉnh theo gói mới | — |
| **Brochure** | Giữ; cập nhật theo câu chuyện mới ở giai đoạn 2 | — |
| **Trợ giúp** `/help` | Giữ nguyên | — |

---

### 2.16 Về chúng tôi

**`/about`, Câu chuyện & triết lý**

1. **Hero:** "Chúng tôi bắt đầu từ chính mảnh đất."
2. **Câu chuyện thành lập:** vì sao, từ farm nào, ai. *(cần nội dung thật từ founder)*
3. **Triết lý 4 điều:**
   - Đất trước, AI sau.
   - Ghi lại cái thật, không vẽ cái đẹp.
   - Bắt đầu nhỏ, đi từng bước.
   - Dữ liệu thuộc về người làm ra nó.
4. **Ý nghĩa tên "AgriBeacon":** giữ, viết gọn.
5. **Hệ sinh thái AgriBeacon:** sơ đồ SutaGrow OS ở trung tâm, Tiểu Thần Nông, thiết bị, dịch vụ, và đối tác chuyên môn.
6. **Tầm nhìn**, viết lại thực tế. Bỏ "hàng đầu thế giới". Ví dụ: "Để mỗi trang trại cây lâu năm và cây công nghiệp ở Việt Nam và Đông Nam Á có thể vận hành bằng dữ liệu của chính mình".
7. **Mốc phát triển** (timeline thật): farm đầu tiên, hợp tác Viện BVTV, dự án Ổi Nghĩa Đàn, farm đầu tiên ở nước ngoài (Kiri Coffee)…
8. **CTA.**

**Các trang khác**
- **`/about/team`:** đội ngũ (nông học, kỹ thuật, hiện trường) và cố vấn chuyên môn.
- **`/careers`:** giữ. Viết lại phần "Tại sao chọn AgriBeacon" theo triết lý mới.
- **`/contact`:** gộp Contact và Contact Sales. Một form duy nhất có trường "Bạn cần gì?" (khảo sát, demo phần mềm, thiết bị, thuê robot, hợp tác). Có thêm Zalo và bản đồ văn phòng.

### 2.17 Pháp lý

- **`/legal/data-ownership` (mới):** dữ liệu farm thuộc về ai, xuất dữ liệu ra thế nào, xóa ra sao, AI dùng dữ liệu như thế nào.
- **Privacy, Terms:** kiểm tra đã có ở app chưa. Nếu có, dùng chung.

---

## 3. Chuyển hướng route cũ → mới (301)

| Route cũ | Route mới |
|---|---|
| `/solutions` | `/solutions` (nội dung mới) |
| `/technology` | `/platform` |
| `/products/farm-os` | `/platform` |
| `/products/iot` | `/devices/aiot` |
| `/products/uav` | `/devices/uav` |
| `/products/robot` | `/devices/robot` |
| `/products/ai-assistant` | `/platform/ai` |
| `/services/farm-map` | `/services/farm-mapping` |
| `/services/robot-rental` | giữ nguyên |
| `/ai/yield-planning` | `/platform/ai` (mục dự báo) |
| `/ai/resource-management` | `/platform/operations` |
| `/ai/traceability` | `/solutions/export-traceability` |
| `/price` | `/pricing` |
| `/cart` | `/pricing` (nếu bỏ giỏ hàng) |
| `/contact-sales` | `/contact?need=sales` |
| `/cost-estimator` | `/tools/cost-estimator` |
| `/best-practices` | `/guides` (nội dung ESG chuyển về `/solutions/sustainability`) |
| `/about`, `/careers/*`, `/help/*`, `/brochure` | giữ nguyên |

---

## 4. Yêu cầu kỹ thuật đi kèm (để nội dung phát huy)

1. **Prerender/SSG mọi trang marketing**, để Google và Zalo/Facebook đọc được nội dung. Hiện tại bot chỉ thấy title.
2. **Meta riêng từng trang:** title, description, OG image. Bổ sung `og-image.png` đang thiếu. Dùng `hreflang` cho VI/EN/JA và `<html lang>` theo ngôn ngữ.
3. **Tách bản dịch:** bỏ file 4.500 dòng, chuyển sang file nội dung theo trang và theo ngôn ngữ, để người viết content sửa được mà không đụng code.
4. **Video hero có poster** và tải lười (lazy-load).
5. **Analytics theo phễu:** xem hành trình → làm quiz → đặt lịch khảo sát.
6. **Sitemap.xml + schema.org:** Organization, Product, FAQ.

---

## 5. Lộ trình đề xuất

| Giai đoạn | Phạm vi |
|---|---|
| **P1: Câu chuyện lõi + bằng chứng** | Trang chủ, `/platform` + 6 trang bước (gồm 3 trang con của ④), `/customers` (lưới farm + 2 case study Nguyễn Duy, Kiri Coffee), `/partners`, `/pricing`, `/contact`, `/about`, chuyển hướng route, prerender + SEO, **bản EN cho các trang P1** (vì có khách Campuchia) |
| **P2: Thiết bị & giải pháp** | 4 trang thiết bị, 3 trang dịch vụ, giải pháp theo quy mô và mục tiêu, **6 trang theo cây trồng**, quiz readiness, app page |
| **P3: Nội dung dài hạn** | Case study còn lại, Nhật ký thực địa, Hướng dẫn + thư viện sâu bệnh (Viện BVTV), brochure mới, bản JA |

---

## 6. Danh sách cần anh/chị cung cấp hoặc quyết định

**Đã chốt (v2):**
- ✅ Thương hiệu: AgriBeacon (công ty) → SutaGrow OS (nền tảng trung tâm) → Tiểu Thần Nông và các thiết bị (sản phẩm trong hệ sinh thái).
- ✅ Cây trồng: cây lâu năm và cây công nghiệp.
- ✅ Farm tham chiếu: Nguyễn Duy (cacao 40 ha, Gia Lai), Kiri Coffee (cà phê 80 ha, Campuchia), nho 0,5 ha Bắc Giang, ổi 1 ha Phú Thọ, bơ 5 ha Lâm Đồng.
- ✅ Đối tác: Viện Bảo vệ thực vật, Trường ĐH Nông Lâm Nghệ An (Ổi Nghĩa Đàn), HTX Dâu Tằm Lâm Đồng.

**Còn cần:**
1. ❓ Bỏ giỏ hàng? "Buy Tree" còn chạy không?
2. ❓ Vai trò chính xác của HTX Dâu Tằm Lâm Đồng (dự án cùng ĐH Nông Lâm Nghệ An hay riêng) và cách gọi vai trò từng đối tác.
3. 📥 Quyền công bố tên, logo, ảnh của từng farm và đối tác.
4. 📥 Mỗi farm: đã triển khai bước nào, thiết bị gì, từ khi nào, có số liệu trước/sau không.
5. 📥 Xác nhận mức sẵn sàng của các mục 🔶 (đặc biệt: tưới tự động, giọng nói, offline, tóm tắt AI, LoRaWAN).
6. 📥 Ảnh/video thật từ các farm, đội ngũ, thiết bị, ảnh chụp màn hình app.
7. 📥 Câu chuyện thành lập, mốc phát triển, đội ngũ.
8. 📥 Quy trình và giá tham khảo cho dịch vụ khảo sát, triển khai, thuê robot.
9. 📥 Bộ nhận diện SutaGrow OS (logo, wordmark "by AgriBeacon").

---

## 7. Cập nhật v3 (2026-11-22): đối chiếu brochure & danh mục bảng giá

**Đã đưa vào site (bản code trên nhánh `feat/revamp-storytelling`):**
- Tên sản phẩm theo brochure: **MONRTK** (Base/Rover), **MONSKY** UAV (bay tối đa 72 phút), **DUBIRO** robot phun, trạm đo đa cảm biến **VY-NO** với **VY-SO / VY-SO-UP / VY-PH-UP / VY-WA / VY-AIR**, gateway **VY-STA** (trung tâm điều khiển, tự bật/dừng tưới), hub **VY-LINK**, nền tảng thương mại **SutaMarket**.
- **Không công khai giá.** `/pricing` đổi thành trang "Gói & báo giá": gói SutaGrow Farm Monitor / Manage / Optimize / Enterprise, add-on, thiết bị, dịch vụ. `/price` và `/cart` chuyển hướng về `/pricing`.
- Dịch vụ từ bảng giá: 3 gói phân tích đất & vi sinh VY-SO-LAB01/02/03, kỹ sư quy hoạch & lập bản đồ, triển khai onsite, thuê robot.
- Quy trình triển khai 7 bước (brochure trang 14) đưa lên trang chủ.
- Ảnh sản phẩm thật lấy từ file bảng giá; ảnh hiện trường lấy từ brochure.

**Thông số còn lệch nhau giữa các nguồn (cần chốt):**
| Mục | Anh/chị nói | Brochure | Bảng giá |
|---|---|---|---|
| Cảm biến đất | 9in1 | VY-SO 8 chỉ số | VY-SO cầm tay 8 chỉ số; trạm: VY-SO-UP + VY-PH-UP |
| Cảm biến nước VY-WA | 5in1 | Trang 6: pH, nhiệt độ, EC, TDS, độ mặn · Trang 8: pH, DO, ORP, nhiệt độ, TDS | pH, nhiệt độ, TDS, độ mặn, EC |

Site đang dùng: đất **"9in1"** (theo anh/chị) và nước theo **bảng giá**.

**Việc tiếp theo:** chatbot Tiểu Thần Nông trên website vẫn đọc dữ liệu giá cũ (`api/generated/agribeacon-knowledge.ts` sinh từ trang Price cũ). Cần cập nhật script `scripts/build-chatbot-knowledge.mjs` để không trả lời giá.

---

## 8. Cập nhật v4: trang "Nông nghiệp chính xác" và phần Thực trạng

- **Trang mới `/precision-agriculture`** (menu Tài nguyên, mega menu SutaGrow OS, footer):
  - định nghĩa;
  - 4 nguyên tắc (đúng lượng, đúng thời điểm, đúng vị trí, đúng loại);
  - vì sao quan trọng;
  - thực trạng;
  - bảng so sánh canh tác truyền thống với nông nghiệp chính xác;
  - vòng lặp đo lường, phân tích, hành động, đánh giá;
  - công nghệ thành phần;
  - lộ trình 6 bước;
  - FAQ.
- **Phần "Thực trạng" trên trang chủ** chia 2 nhóm:
  - trang trại canh tác truyền thống: thất thoát vật tư, công nhật khó kiểm soát, bón phân/phun thuốc theo cảm tính, năng suất không đồng đều;
  - trang trại đã đầu tư công nghệ: dữ liệu rời rạc, chi phí chỉ tổng hợp cuối vụ, thiết bị chưa phát huy hiệu quả.
- **Dòng chứng minh dưới hero** rút gọn, không liệt kê từng loại cây và tỉnh.
- Nội dung dùng chung đặt tại `src/content/precision.ts`.

---

## 9. Chốt thông số VY-SO (2026-11-22)

VY-SO **9in1**: pH, EC, N, P, K, nhiệt độ, độ ẩm, **độ mặn** và **SHI** (Soil Health Index).
- SHI tổng hợp từ EC, độ ẩm và nhiệt độ theo nguyên tắc Goldilocks: đất khỏe khi các yếu tố nằm trong vùng tối ưu.
- Đã cập nhật trên trang chủ, bước 3, trang thiết bị Trạm AIoT và danh mục sản phẩm.
- Cảm biến trạm VY-SO-UP + VY-PH-UP vẫn ghi theo bảng giá (EC, N, P, K, nhiệt độ, độ ẩm + pH). Cần xác nhận trạm cố định đã có độ mặn và SHI chưa.

---

## 10. Thực trạng có số liệu & phần Tầm nhìn (2026-11-22)

**Thực trạng** gồm 3 nhóm, xếp theo mức ưu tiên:
1. Chất lượng & tiêu chuẩn xuất khẩu
2. Canh tác truyền thống
3. Công nghệ rời rạc

**Số liệu đang dùng** (kiểm tra lại trước mỗi đợt cập nhật):

| Số liệu | Nguồn |
|---|---|
| 20% lô sầu riêng VN vào EU bị kiểm tra (tăng từ 10%) | Quy định (EU) 2024/3153 |
| EUDR áp dụng từ 30/12/2026 với cà phê, cacao, cao su | Quy định (EU) 2023/1115, sửa đổi bởi 2025/2650 |
| Hiệu suất sử dụng phân bón tại VN dưới 50% | Cục Trồng trọt, báo Nhân Dân |
| 72% nước ngọt khai thác dùng cho nông nghiệp | FAO AQUASTAT 2025 |
| Xuất khẩu nông lâm thủy sản VN 2025 khoảng 70 tỷ USD | Bộ NN&MT |
| Nông nghiệp, lâm nghiệp, sử dụng đất chiếm 13–21% phát thải khí nhà kính toàn cầu (2010–2019) | IPCC AR6, Chương 7 |
| Trung Quốc yêu cầu xét nghiệm cadimi, auramine O với toàn bộ lô sầu riêng VN | Báo chí VN (VietnamNet) |

**Tầm nhìn** gồm 5 trụ cột:
1. Chứng nhận
2. Chứng minh chất lượng với người mua (SutaMarket)
3. Đo lường carbon
4. Vốn xanh
5. Bảo hiểm nông nghiệp

Mỗi trụ cột ghi rõ dữ liệu bên thẩm định cần và phần SutaGrow OS cung cấp. Kèm ghi chú: việc cấp chứng nhận, tín chỉ, khoản vay, bảo hiểm do tổ chức có thẩm quyền quyết định.
