import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import { useSimpleLanguage } from "@/contexts/SimpleLanguageContext";

const TopMenuBar = () => {
  const { t } = useSimpleLanguage();
  return (
    <div className="fixed top-0 w-full bg-background border-b border-border/50 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end items-center h-8 gap-4 text-sm">
          {/* Login Button */}
          <a href="https://farm.agribeacon.tech" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="sm" className="gap-1 text-sm h-8 px-3 hover:bg-muted">
              <LogIn className="h-3 w-3" />
              {t('nav.login')}
            </Button>
          </a>
          
          {/* Language Switcher */}
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  );
};

export default TopMenuBar;
