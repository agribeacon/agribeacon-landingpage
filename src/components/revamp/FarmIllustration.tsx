import { useId, useMemo } from "react";

/**
 * Hình minh họa xuyên suốt hành trình: cùng một mảnh đất, mỗi bước thêm một lớp.
 * step = 1..6 (0 = đất trống).
 */
const LAND: [number, number][] = [
  [60, 78],
  [408, 56],
  [440, 300],
  [300, 360],
  [48, 332],
];

const inside = (x: number, y: number) => {
  let c = false;
  for (let i = 0, j = LAND.length - 1; i < LAND.length; j = i++) {
    const [xi, yi] = LAND[i];
    const [xj, yj] = LAND[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c;
  }
  return c;
};

const landPath = `M${LAND.map((p) => p.join(",")).join(" L")} Z`;

const layer = (visible: boolean) => ({
  opacity: visible ? 1 : 0,
  transition: "opacity 700ms ease, transform 700ms ease",
  transform: visible ? "translateY(0)" : "translateY(6px)",
});

const FarmIllustration = ({ step, className }: { step: number; className?: string }) => {
  // id riêng cho mỗi bản vẽ: trang có nhiều minh họa cùng lúc (một số đang ẩn trên desktop)
  const uid = useId().replace(/:/g, "");
  const ID = { soil: `soil-${uid}`, clip: `clip-${uid}`, shadow: `shadow-${uid}` };
  const trees = useMemo(() => {
    const pts: { x: number; y: number }[] = [];
    for (let y = 100; y < 345; y += 26) {
      for (let x = 78; x < 430; x += 26) {
        const ox = x + ((y / 26) % 2 ? 6 : 0);
        if (inside(ox, y) && inside(ox + 12, y) && inside(ox - 12, y) && inside(ox, y - 12) && inside(ox, y + 12)) {
          // chừa chỗ cho trạm AIoT và nguồn nước
          if (Math.hypot(ox - 300, y - 236) < 22) continue;
          if (Math.hypot(ox - 388, y - 96) < 26) continue;
          pts.push({ x: ox, y });
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
        <g clipPath={`url(#${ID.clip})`} fill="none" stroke="#B89B6A" strokeDasharray="4 5" opacity={step >= 2 ? 0.35 : 0.9}>
          <path d="M30 150 C 150 120, 260 170, 470 120" />
          <path d="M30 210 C 160 180, 280 230, 470 190" />
          <path d="M30 275 C 170 245, 300 290, 470 255" />
        </g>
        {LAND.map(([x, y], i) => (
          <g key={i} transform={`translate(${x},${y})`}>
            <circle r="8" fill="#fff" stroke="#092833" strokeWidth="1.5" />
            <path d="M-12 0 H12 M0 -12 V12" stroke="#092833" strokeWidth="1.2" />
          </g>
        ))}
        {step < 2 &&
          [
            [140, 160],
            [260, 120],
            [340, 250],
            [180, 290],
          ].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="5" fill="#8B5E34" stroke="#fff" strokeWidth="1.5" />)}
      </g>

      {/* 2 – quy hoạch: chia lô, hàng cây, nguồn nước, ống tưới */}
      <g style={layer(step >= 2)}>
        <g clipPath={`url(#${ID.clip})`}>
          {/* 5 – lớp màu hiệu quả theo lô (vẽ dưới cây) */}
          <g style={layer(step >= 5)}>
            <polygon points="40,40 236,40 214,205 40,212" fill="#9ACB64" opacity="0.28" />
            <polygon points="236,40 470,40 470,186 214,205" fill="#E0A43A" opacity="0.28" />
            <polygon points="40,212 214,205 190,380 40,380" fill="#9ACB64" opacity="0.2" />
            <polygon points="214,205 470,186 470,380 190,380" fill="#9ACB64" opacity="0.32" />
          </g>
          <path d="M236 40 L190 380" stroke="#092833" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.55" />
          <path d="M40 212 L470 186" stroke="#092833" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.55" />
          {[124, 176, 228, 280, 332].map((y) => (
            <line key={y} x1="40" x2="470" y1={y} y2={y - 6} stroke="#4E9CC2" strokeWidth="1" opacity="0.5" />
          ))}
        </g>
        {trees.map((t, i) => (
          <g key={i}>
            <circle cx={t.x} cy={t.y} r="8.5" fill="#6FA845" />
            <circle cx={t.x - 2} cy={t.y - 2} r="4" fill="#9ACB64" />
          </g>
        ))}
        <circle cx="388" cy="96" r="16" fill="#4E9CC2" stroke="#fff" strokeWidth="2" />
        <path d="M382 96 q6 -8 12 0" stroke="#fff" strokeWidth="1.5" fill="none" />
        {[
          ["Lô 1", 120, 112],
          ["Lô 2", 330, 104],
          ["Lô 3", 110, 300],
          ["Lô 4", 330, 316],
        ].map(([l, x, y]) => (
          <g key={l as string} transform={`translate(${x},${y})`}>
            <rect x="-20" y="-10" width="40" height="18" rx="9" fill="#092833" />
            <text y="3" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">
              {l}
            </text>
          </g>
        ))}
      </g>

      {/* 3 – trạm AIoT nối vào điều khiển tưới */}
      <g style={layer(step >= 3)}>
        <path d="M300 236 L388 96" stroke="#9ACB64" strokeWidth="2" strokeDasharray="4 4">
          <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="1s" repeatCount="indefinite" />
        </path>
        <g transform="translate(408,70)" filter={`url(#${ID.shadow})`}>
          <rect x="-4" y="-2" width="74" height="34" rx="8" fill="#092833" />
          <text x="4" y="12" fontSize="8.5" fontWeight="700" fill="#9ACB64">
            VAN TƯỚI · TỰ ĐỘNG
          </text>
          <text x="4" y="25" fontSize="8.5" fill="#fff">
            Lô 4: đang tưới
          </text>
        </g>
        <g transform="translate(300,236)">
          {[18, 30, 42].map((r, i) => (
            <circle key={r} r={r} fill="none" stroke="#9ACB64" strokeWidth="2" opacity={0.7 - i * 0.2}>
              <animate attributeName="r" values={`${r};${r + 8};${r}`} dur="3s" repeatCount="indefinite" />
            </circle>
          ))}
          <circle r="12" fill="#092833" filter={`url(#${ID.shadow})`} />
          <path d="M0 -6 V6 M-5 -2 H5" stroke="#9ACB64" strokeWidth="2.2" strokeLinecap="round" />
          <g transform="translate(18,-44)" filter={`url(#${ID.shadow})`}>
            <rect width="104" height="40" rx="8" fill="#fff" />
            <text x="8" y="16" fontSize="9" fontWeight="700" fill="#092833">
              Trạm đo · Lô 4
            </text>
            <text x="8" y="30" fontSize="8.5" fill="#4F7A26">
              Ẩm 31% · pH 5.8 · 29°C
            </text>
          </g>
        </g>
      </g>

      {/* 4 – vận hành hằng ngày */}
      <g style={layer(step >= 4)}>
        {[
          { x: 140, y: 150, t: "Tưới lô 1 ✓", s: "Tổ A · 09:10" },
          { x: 118, y: 262, t: "Xuất 2 bao NPK", s: "Kho chính → Lô 3" },
          { x: 360, y: 150, t: "Tỉa cành lô 2", s: "6 công · 1,2 tr" },
        ].map((p, i) => (
          <g key={i} transform={`translate(${p.x},${p.y})`} filter={`url(#${ID.shadow})`}>
            <path d="M0 0 l-6 -10 a8 8 0 1 1 12 0 z" fill="#092833" />
            <g transform="translate(10,-34)">
              <rect width="98" height="34" rx="7" fill="#fff" />
              <text x="8" y="14" fontSize="9" fontWeight="700" fill="#092833">
                {p.t}
              </text>
              <text x="8" y="26" fontSize="8" fill="#5b6b70">
                {p.s}
              </text>
            </g>
          </g>
        ))}
      </g>

      {/* 5 – drone bay theo đường cố định */}
      <g style={layer(step >= 5)}>
        <path
          d="M70 120 H420 L424 150 H66 L64 180 H428 L432 210 H62"
          fill="none"
          stroke="#092833"
          strokeWidth="1.6"
          strokeDasharray="5 5"
          opacity="0.7"
        >
          <animate attributeName="stroke-dashoffset" from="0" to="-40" dur="2s" repeatCount="indefinite" />
        </path>
        <g transform="translate(424,150)">
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

      {/* 6 – AI Tiểu Thần Nông */}
      <g style={layer(step >= 6)}>
        <g transform="translate(150,12)" filter={`url(#${ID.shadow})`}>
          <rect width="200" height="48" rx="12" fill="#092833" />
          <text x="14" y="20" fontSize="9" fontWeight="700" fill="#9ACB64">
            ✦ Tiểu Thần Nông
          </text>
          <text x="14" y="36" fontSize="10" fill="#fff">
            Lô 2 thiếu ẩm – nên tưới trước 14h
          </text>
          <path d="M150 48 l10 12 l4 -12 z" fill="#092833" />
        </g>
      </g>
    </svg>
  );
};

export default FarmIllustration;
