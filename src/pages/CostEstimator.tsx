import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PricingCalculator from "@/components/PricingCalculator";
import { useSimpleLanguage } from "@/contexts/SimpleLanguageContext";

const CostEstimator = () => {
  const { t } = useSimpleLanguage();

  return (
    <div className="min-h-screen bg-background pt-28 pb-20">
      <div className="container mx-auto px-4">
        <Link
          to="/price"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("nav.pricing") || "Pricing"}
        </Link>
      </div>
      <PricingCalculator />
    </div>
  );
};

export default CostEstimator;
