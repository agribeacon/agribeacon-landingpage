import { useId, useMemo } from "react";

/**
 * Hình minh họa xuyên suốt hành trình: cùng một mảnh đất, mỗi bước thêm một lớp.
 * step = 1..6 (0 = đất trống).
 *
 * Bố cục (viewBox 480 x 400):
 *  - Dải hạ tầng bên trái: hồ chứa nước + trạm bơm, vườn ươm, nhà điều hành, nhà kho
 *  - Đường nội bộ chính (dọc x=158, ngang y=206) và đường lô (dọc x=304)
 *  - 4 khu trồng hình chữ nhật
 */
const LAND: [number, number][] = [
  [38, 58],
  [444, 46],
  [452, 352],
  [30, 362],
];

const LOTS = [
  { id: "Khu 1", x: 166, y: 62, w: 130, h: 136 },
  { id: "Khu 2", x: 312, y: 58, w: 130, h: 140 },
  { id: "Khu 3", x: 166, y: 214, w: 130, h: 136 },
  { id: "Khu 4", x: 312, y: 214, w: 132, h: 134 },
];

const landPath = `M${LAND.map((p) => p.join(",")).join(" L")} Z`;

const layer = (visible: boolean) => ({
  opacity: visible ? 1 : 0,
  transition: "opacity 700ms ease, transform 700ms ease",
  transform: visible ? "translateY(0)" : "translateY(6px)",
});

const Chip = ({ x, y, text, dark = false }: { x: number; y: number; text: string; dark?: boolean }) => {
  const w = text.length * 5.2 + 12;
  return (
    <g transform={`translate(${x},${y})`}>
      <rect x={-w / 2} y="-8" width={w} height="15" rx="7.5" fill={dark ? "#092833" : "#ffffff"} opacity="0.95" />
      <text y="3" textAnchor="middle" fontSize="8" fontWeight="700" fill={dark ? "#ffffff" : "#092833"}>
        {text}
      </text>
    </g>
  );
};

const FarmIllustration = ({ step, className }: { step: number; className?: string }) => {
  const uid = useId().replace(/:/g, "");
  const ID = { soil: `soil-${uid}`, clip: `clip-${uid}`, shadow: `shadow-${uid}` };

  const trees = useMemo(() => {
    const pts: { x: number; y: number }[] = [];
    for (const lot of LOTS) {
      for (let y = lot.y + 14; y < lot.y + lot.h - 6; y += 22) {
        for (let x = lot.x + 14; x < lot.x + lot.w - 6; x += 22) {
          // chừa chỗ cho trạm đo ở khu 4
          if (lot.id === "Khu 4" && Math.hypot(x - 378, y - 282) < 22) continue;
          pts.push({ x, y });
        }
      }
    }
    return pts;
  }, []);

  return (
    <svg viewBox="0 0 480 400" className={className} role="img" aria-label="Minh họa một mảnh đất được số hóa qua 6 bước">
      <defs>
        <pattern id={ID.soil} width="8" height="8" patternUnits="userSpaceOnUse">
          <rect width="8" height="8" fill="#EFE6D2" />
          <circle cx="2" cy="2" r="0.8" fill="#D9C9A6" />
          <circle cx="6" cy="6" r="0.6" fill="#D9C9A6" />
        </pattern>
        <clipPath id={ID.clip}>
          <path d={landPath} />
        </clipPath>
        <filter id={ID.shadow} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#092833" floodOpacity="0.18" />
        </filter>
      </defs>

      {/* 0 – mảnh đất */}
      <path d={landPath} fill={`url(#${ID.soil})`} stroke="#B89B6A" strokeWidth="2" />

      {/* 1 – khảo sát: đường đồng mức, điểm RTK, điểm lấy mẫu */}
      <g style={layer(step >= 1)}>
        <g clipPath={`url(#${ID.clip})`} fill="none" stroke="#B89B6A" strokeDasharray="4 5" opacity={step >= 2 ? 0.25 : 0.9}>
          <path d="M20 140 C 150 110, 270 160, 470 115" />
          <path d="M20 210 C 160 180, 290 225, 470 185" />
          <path d="M20 285 C 170 255, 300 300, 470 260" />
        </g>
        {LAND.map(([x, y], i) => (
          <g key={i} transform={`translate(${x},${y})`}>
            <circle r="8" fill="#fff" stroke="#092833" strokeWidth="1.5" />
            <path d="M-12 0 H12 M0 -12 V12" stroke="#092833" strokeWidth="1.2" />
          </g>
        ))}
        {step < 2 &&
          [
            [120, 150],
            [250, 110],
            [360, 250],
            [200, 300],
            [380, 120],
          ].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="5" fill="#8B5E34" stroke="#fff" strokeWidth="1.5" />)}
      </g>

      {/* 2 – quy hoạch: đường nội bộ, khu, hạ tầng, hàng cây, ống tưới */}
      <g style={layer(step >= 2)}>
        <g clipPath={`url(#${ID.clip})`}>
          {/* 5 – lớp màu hiệu quả theo khu (vẽ dưới cây) */}
          <g style={layer(step >= 5)}>
            {LOTS.map((l, i) => (
              <rect key={l.id} x={l.x} y={l.y} width={l.w} height={l.h} rx="4" fill={i === 1 ? "#E0A43A" : "#9ACB64"} opacity={i === 1 ? 0.32 : 0.26} />
            ))}
          </g>

          {/* Đường nội bộ */}
          <g fill="#E3D5B5" stroke="#CDBB92" strokeWidth="0.8">
            <rect x="152" y="30" width="12" height="350" />
            <rect x="152" y="200" width="320" height="12" />
            <rect x="298" y="30" width="12" height="350" />
            <rect x="20" y="206" width="132" height="10" />
          </g>

          {/* Ranh giới khu */}
          {LOTS.map((l) => (
            <rect key={l.id} x={l.x} y={l.y} width={l.w} height={l.h} rx="4" fill="none" stroke="#092833" strokeWidth="1" strokeDasharray="5 4" opacity="0.45" />
          ))}

          {/* Ống tưới chính từ trạm bơm theo đường nội bộ, nhánh vào từng hàng */}
          <g stroke="#4E9CC2" fill="none" opacity="0.85">
            <path d="M118 112 H158 V354" strokeWidth="2" />
            <path d="M158 206 H446" strokeWidth="2" />
            <path d="M304 50 V354" strokeWidth="1.6" />
            {LOTS.flatMap((l) =>
              Array.from({ length: Math.floor((l.h - 8) / 22) }, (_, k) => {
                const y = l.y + 14 + k * 22;
                return <path key={`${l.id}-${k}`} d={`M${l.x} ${y} H${l.x + l.w - 4}`} strokeWidth="0.7" opacity="0.6" />;
              }),
            )}
          </g>
        </g>

        {/* Cây trồng */}
        {trees.map((t, i) => (
          <g key={i}>
            <circle cx={t.x} cy={t.y} r="7.5" fill="#6FA845" />
            <circle cx={t.x - 2} cy={t.y - 2} r="3.5" fill="#9ACB64" />
          </g>
        ))}

        {/* Hồ chứa nước + trạm bơm */}
        <g>
          <rect x="52" y="72" width="78" height="56" rx="16" fill="#4E9CC2" stroke="#fff" strokeWidth="2" />
          <path d="M66 96 q8 -6 16 0 t16 0 t16 0" stroke="#fff" strokeWidth="1.4" fill="none" opacity="0.8" />
          <rect x="112" y="104" width="14" height="14" rx="2" fill="#092833" />
          <Chip x={91} y={64} text="Hồ chứa nước" />
        </g>

        {/* Vườn ươm */}
        <g>
          <rect x="52" y="144" width="78" height="50" rx="4" fill="#DDEFC9" stroke="#6FA845" strokeWidth="1.2" />
          <path d="M52 156 H130 M52 168 H130 M52 180 H130" stroke="#6FA845" strokeWidth="0.6" opacity="0.6" />
          {Array.from({ length: 4 }, (_, r) =>
            Array.from({ length: 8 }, (_, c) => <circle key={`${r}-${c}`} cx={60 + c * 9.5} cy={150 + r * 12} r="2.4" fill="#6FA845" />),
          )}
          <Chip x={91} y={200} text="Vườn ươm" />
        </g>

        {/* Nhà điều hành */}
        <g filter={`url(#${ID.shadow})`}>
          <rect x="54" y="232" width="50" height="34" rx="3" fill="#ffffff" stroke="#092833" strokeWidth="1.2" />
          <path d="M50 234 L79 220 L108 234 Z" fill="#092833" />
          <rect x="74" y="250" width="10" height="16" fill="#9ACB64" />
        </g>
        <Chip x={79} y={278} text="Nhà điều hành" />

        {/* Nhà kho */}
        <g filter={`url(#${ID.shadow})`}>
          <rect x="54" y="298" width="72" height="38" rx="3" fill="#B89B6A" stroke="#092833" strokeWidth="1.2" />
          <path d="M54 306 H126" stroke="#092833" strokeWidth="1" />
          <rect x="80" y="316" width="20" height="20" fill="#8B7350" />
        </g>
        <Chip x={90} y={346} text="Nhà kho" />

        {/* Nhãn khu */}
        {LOTS.map((l) => (
          <Chip key={l.id} x={l.x + l.w / 2} y={l.y + l.h / 2} text={l.id} dark />
        ))}
      </g>

      {/* 3 – trạm đo nối vào điều khiển tưới */}
      <g style={layer(step >= 3)}>
        <path d="M378 282 L304 282 L304 206 L158 206 L158 112 L126 112" stroke="#9ACB64" strokeWidth="2" strokeDasharray="4 4" fill="none">
          <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="1s" repeatCount="indefinite" />
        </path>
        <path d="M60 44 C 80 70, 100 90, 116 104" stroke="#092833" strokeWidth="1" strokeDasharray="2 3" fill="none" />
        <g transform="translate(6,14)" filter={`url(#${ID.shadow})`}>
          <rect width="78" height="30" rx="7" fill="#092833" />
          <text x="7" y="12" fontSize="7.5" fontWeight="700" fill="#9ACB64">
            TRẠM BƠM · TỰ ĐỘNG
          </text>
          <text x="7" y="24" fontSize="8" fill="#fff">
            Đang tưới khu 4
          </text>
        </g>
        <g transform="translate(378,282)">
          {[16, 26, 36].map((r, i) => (
            <circle key={r} r={r} fill="none" stroke="#9ACB64" strokeWidth="2" opacity={0.7 - i * 0.2}>
              <animate attributeName="r" values={`${r};${r + 6};${r}`} dur="3s" repeatCount="indefinite" />
            </circle>
          ))}
          <circle r="11" fill="#092833" filter={`url(#${ID.shadow})`} />
          <path d="M0 -6 V6 M-5 -2 H5" stroke="#9ACB64" strokeWidth="2.2" strokeLinecap="round" />
          <g transform="translate(-102,32)" filter={`url(#${ID.shadow})`}>
            <rect width="100" height="36" rx="8" fill="#fff" />
            <text x="8" y="15" fontSize="8.5" fontWeight="700" fill="#092833">
              Trạm đo · Khu 4
            </text>
            <text x="8" y="28" fontSize="8" fill="#4F7A26">
              Ẩm 31% · pH 5.8 · 29°C
            </text>
          </g>
        </g>
      </g>

      {/* 5 – drone bay theo đường cố định trên khu 1, 2 */}
      <g style={layer(step >= 5)}>
        <path d="M172 76 H436 L436 106 H172 L172 136 H436 L436 166 H172" fill="none" stroke="#092833" strokeWidth="1.5" strokeDasharray="5 5" opacity="0.65">
          <animate attributeName="stroke-dashoffset" from="0" to="-40" dur="2s" repeatCount="indefinite" />
        </path>
        <g transform="translate(420,136)">
          <rect x="-10" y="-4" width="20" height="8" rx="3" fill="#092833" />
          {[
            [-12, -8],
            [12, -8],
            [-12, 8],
            [12, 8],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="5" fill="none" stroke="#092833" strokeWidth="1.5" />
          ))}
        </g>
      </g>

      {/* 4 – vận hành hằng ngày */}
      <g style={layer(step >= 4)}>
        {[
          { x: 196, y: 104, t: "Tưới khu 1 ✓", s: "Tổ A · 09:10" },
          { x: 196, y: 258, t: "Xuất 2 bao NPK", s: "Kho → Khu 3" },
          { x: 334, y: 104, t: "Tỉa cành khu 2", s: "6 công · 1,2 tr" },
        ].map((p, i) => (
          <g key={i} transform={`translate(${p.x},${p.y})`} filter={`url(#${ID.shadow})`}>
            <path d="M0 0 l-6 -10 a8 8 0 1 1 12 0 z" fill="#092833" />
            <g transform="translate(10,-34)">
              <rect width="94" height="32" rx="7" fill="#fff" />
              <text x="8" y="13" fontSize="8.5" fontWeight="700" fill="#092833">
                {p.t}
              </text>
              <text x="8" y="25" fontSize="7.5" fill="#5b6b70">
                {p.s}
              </text>
            </g>
          </g>
        ))}
      </g>

      {/* 6 – AI Tiểu Thần Nông */}
      <g style={layer(step >= 6)}>
        <g transform="translate(170,6)" filter={`url(#${ID.shadow})`}>
          <rect width="200" height="44" rx="12" fill="#092833" />
          <text x="14" y="18" fontSize="9" fontWeight="700" fill="#9ACB64">
            ✦ Tiểu Thần Nông
          </text>
          <text x="14" y="33" fontSize="10" fill="#fff">
            Khu 2 thiếu ẩm, nên tưới trước 14h
          </text>
          <path d="M176 44 l8 12 l4 -12 z" fill="#092833" />
        </g>
      </g>
    </svg>
  );
};

export default FarmIllustration;
