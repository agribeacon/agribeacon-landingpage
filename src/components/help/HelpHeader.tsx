import { Link } from "react-router-dom";
import { ArrowLeft, LifeBuoy } from "lucide-react";
import logo from "@/assets/Logo.svg";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useSimpleLanguage } from "@/contexts/SimpleLanguageContext";

// Header tối giản riêng cho Help Center — tách khỏi khung landing.
// Chỉ gồm: logo (về trang chủ), nhãn "Trợ giúp", nút quay lại và đổi ngôn ngữ.
const LABELS: Record<string, { help: string; back: string }> = {
  vi: { help: "Trợ giúp", back: "Về trang chủ" },
  en: { help: "Help", back: "Back to site" },
  ja: { help: "ヘルプ", back: "ホームへ戻る" },
};

const HelpHeader = () => {
  const { language } = useSimpleLanguage();
  const l = LABELS[language] || LABELS.vi;

  return (
    <header className="fixed top-0 inset-x-0 z-50 h-16 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="container mx-auto flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo + nhãn Help */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src={logo}
              alt="AgriBeacon"
              className="h-9 w-auto transition-transform group-hover:scale-105"
            />
          </Link>
          <span className="hidden items-center gap-1.5 border-l border-border pl-3 text-sm font-semibold text-muted-foreground sm:flex">
            <LifeBuoy className="h-4 w-4 text-primary" />
            {l.help}
          </span>
        </div>

        {/* Quay lại + đổi ngôn ngữ */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">{l.back}</span>
          </Link>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
};

export default HelpHeader;
