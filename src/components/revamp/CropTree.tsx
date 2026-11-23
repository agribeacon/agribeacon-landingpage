/** Minh họa cây có quả theo loại cây trồng (SVG, không dùng ảnh). */

const TRUNK = "#8A5A3B";
const LEAF = "#6FA544";
const LEAF_DARK = "#4F8A35";

const Ground = () => <ellipse cx="60" cy="108" rx="34" ry="5" fill="#000" opacity="0.08" />;

/** Cacao: thân cao, trái mọc thẳng trên thân và cành lớn. */
const Cacao = () => (
  <>
    <Ground />
    <path d="M56 108 L56 52 Q56 44 50 38 M64 108 L64 52 Q64 44 70 38" stroke={TRUNK} strokeWidth="6" fill="none" strokeLinecap="round" />
    <rect x="55" y="50" width="10" height="58" rx="3" fill={TRUNK} />
    <ellipse cx="60" cy="32" rx="40" ry="24" fill={LEAF_DARK} />
    <ellipse cx="48" cy="26" rx="22" ry="15" fill={LEAF} />
    <ellipse cx="74" cy="28" rx="20" ry="13" fill={LEAF} />
    {[
      [49, 70, -12, "#D9822B"],
      [71, 66, 12, "#B5532E"],
      [50, 90, -8, "#E0A43A"],
      [70, 86, 10, "#D9822B"],
    ].map(([x, y, r, c]) => (
      <g key={`${x}-${y}`} transform={`rotate(${r} ${x} ${y})`}>
        <ellipse cx={x as number} cy={y as number} rx="5.5" ry="10" fill={c as string} />
        <path d={`M${x} ${(y as number) - 9} L${x} ${(y as number) + 9}`} stroke="#000" strokeOpacity="0.15" strokeWidth="1" />
      </g>
    ))}
  </>
);

/** Cà phê: cây bụi, chùm quả chín đỏ dọc cành. */
const Coffee = () => (
  <>
    <Ground />
    <rect x="56" y="74" width="8" height="34" rx="3" fill={TRUNK} />
    <path d="M60 22 C30 30 18 60 26 90 L94 90 C102 60 90 30 60 22 Z" fill={LEAF_DARK} />
    <path d="M60 30 C40 38 32 58 36 82 L84 82 C88 58 80 38 60 30 Z" fill={LEAF} />
    {[
      [40, 52], [46, 66], [36, 74], [80, 50], [74, 64], [84, 74], [58, 46], [62, 72], [52, 84], [70, 84],
    ].map(([x, y]) => (
      <g key={`${x}-${y}`}>
        <circle cx={x} cy={y} r="3.4" fill="#C8352E" />
        <circle cx={x + 4.5} cy={y + 1.5} r="3.4" fill="#E04A3A" />
        <circle cx={x + 1.5} cy={y + 5} r="3.4" fill="#A82A26" />
      </g>
    ))}
  </>
);

/** Bơ: tán tròn rộng, quả hình giọt nước treo dưới tán. */
const Avocado = () => (
  <>
    <Ground />
    <rect x="55" y="60" width="10" height="48" rx="3" fill={TRUNK} />
    <circle cx="60" cy="44" r="36" fill={LEAF_DARK} />
    <circle cx="48" cy="38" r="20" fill={LEAF} />
    <circle cx="74" cy="46" r="18" fill={LEAF} />
    {[
      [38, 62], [58, 70], [80, 64], [66, 52],
    ].map(([x, y]) => (
      <g key={`${x}-${y}`}>
        <path d={`M${x} ${y - 4} L${x} ${y - 9}`} stroke={TRUNK} strokeWidth="1.5" />
        <path d={`M${x} ${y - 5} C${x + 6} ${y - 5} ${x + 8} ${y + 9} ${x} ${y + 10} C${x - 8} ${y + 9} ${x - 6} ${y - 5} ${x} ${y - 5} Z`} fill="#3E5F1F" />
        <ellipse cx={x - 2} cy={y + 2} rx="1.5" ry="3" fill="#fff" opacity="0.25" />
      </g>
    ))}
  </>
);

/** Ổi: tán thấp, quả tròn xanh vàng. */
const Guava = () => (
  <>
    <Ground />
    <path d="M60 108 L60 66 M60 80 L44 62 M60 74 L78 58" stroke={TRUNK} strokeWidth="7" strokeLinecap="round" />
    <ellipse cx="60" cy="46" rx="42" ry="30" fill={LEAF_DARK} />
    <ellipse cx="46" cy="40" rx="22" ry="16" fill={LEAF} />
    <ellipse cx="76" cy="44" rx="20" ry="15" fill={LEAF} />
    {[
      [36, 58], [54, 64], [72, 60], [86, 50], [62, 44], [44, 44],
    ].map(([x, y]) => (
      <g key={`${x}-${y}`}>
        <circle cx={x} cy={y} r="6.5" fill="#C9D95B" />
        <circle cx={x - 2} cy={y - 2} r="2" fill="#fff" opacity="0.35" />
        <circle cx={x} cy={y + 6} r="1" fill="#6B4A2B" />
      </g>
    ))}
  </>
);

/** Nho: giàn leo, chùm quả tím. */
const Grape = () => {
  const bunch = (cx: number, cy: number) =>
    [
      [0, 0], [-5, 0], [5, 0], [-2.5, 4.5], [2.5, 4.5], [-7.5, 4.5], [7.5, 4.5], [0, 9], [-5, 9], [5, 9], [-2.5, 13.5], [2.5, 13.5], [0, 18],
    ].map(([dx, dy]) => <circle key={`${cx}-${dx}-${dy}`} cx={cx + dx} cy={cy + dy} r="3" fill={dy % 9 === 0 ? "#6B3FA0" : "#7E4FB5"} />);
  return (
    <>
      <Ground />
      <path d="M22 108 L22 30 M98 108 L98 30" stroke={TRUNK} strokeWidth="4" strokeLinecap="round" />
      <path d="M16 30 L104 30" stroke="#B9A27A" strokeWidth="3" strokeLinecap="round" />
      <path d="M60 108 C56 90 66 70 60 32" stroke={TRUNK} strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M14 30 C20 14 44 12 60 22 C76 12 100 14 106 30 C96 42 72 40 60 36 C48 40 24 42 14 30 Z" fill={LEAF_DARK} />
      <path d="M26 28 C34 18 50 20 58 26 C48 32 34 34 26 28 Z M62 26 C70 20 86 18 94 28 C86 34 72 32 62 26 Z" fill={LEAF} />
      {bunch(36, 40)}
      {bunch(60, 44)}
      {bunch(84, 40)}
    </>
  );
};

const BY_CROP: Record<string, () => JSX.Element> = {
  Cacao: Cacao,
  "Cà phê": Coffee,
  Bơ: Avocado,
  Ổi: Guava,
  Nho: Grape,
};

const CropTree = ({ crop, className }: { crop: string; className?: string }) => {
  const Art = BY_CROP[crop] ?? Guava;
  return (
    <svg viewBox="0 0 120 116" className={className} role="img" aria-label={`Cây ${crop.toLowerCase()}`}>
      <Art />
    </svg>
  );
};

export default CropTree;
