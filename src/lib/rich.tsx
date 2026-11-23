import { Fragment, type ReactNode } from "react";

/**
 * Hiển thị chuỗi có đánh dấu **từ khóa** thành chữ đậm.
 * Ví dụ: rich("Tưới **tự động** theo dữ liệu")
 */
export function rich(text: string, strongClass = "font-semibold text-brand-navy"): ReactNode {
  const parts = text.split("**");
  return parts.map((p, i) =>
    i % 2 === 1 ? (
      <strong key={i} className={strongClass}>
        {p}
      </strong>
    ) : (
      <Fragment key={i}>{p}</Fragment>
    ),
  );
}

/** Bỏ dấu ** khi cần chuỗi thuần (title, alt, aria). */
export const plain = (text: string) => text.replace(/\*\*/g, "");
