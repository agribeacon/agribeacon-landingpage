import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useSimpleLanguage } from "@/contexts/SimpleLanguageContext";

export interface ProductDetailData {
  tagline?: string;
  overview?: string;
  featuresTitle?: string;
  features?: string[];
  specTitle?: string;
  specs?: Array<{ label: string; value: string }>;
  useCasesTitle?: string;
  useCases?: string[];
  includedTitle?: string;
  whatsIncluded?: string[];
}

interface ProductDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  type: string;
  productKey: string;
  onAddToCart?: () => void;
  priceLabel?: string;
  isRental?: boolean;
  // Sản phẩm "Liên hệ" → không thêm vào giỏ; hiện nút dẫn sang trang liên hệ.
  contactHref?: string;
  // Nội dung động từ catalog (Admin CMS). Nếu có → ưu tiên; nếu không → fallback i18n.
  detailData?: ProductDetailData;
}

export const ProductDetailModal = ({ open, onOpenChange, title, type, productKey, onAddToCart, priceLabel, isRental, contactHref, detailData }: ProductDetailModalProps) => {
  const { t } = useSimpleLanguage();

  const prefix = type === 'hardware' ? `hardware.${productKey}.detail` : `addons.${productKey}.detail`;
  const d = detailData;

  const tRaw = (key: string) => {
    const v = t(key);
    return typeof v === 'string' && v !== key ? v : '';
  };

  const tagline = d ? (d.tagline || '') : tRaw(`${prefix}.tagline`);
  const overview = d ? (d.overview || '') : tRaw(`${prefix}.overview`);
  const featuresArray: string[] = d ? (d.features || []) : (Array.isArray(t(`${prefix}.features`)) ? (t(`${prefix}.features`) as unknown as string[]) : []);
  const featuresTitle = d ? (d.featuresTitle || '') : tRaw(`${prefix}.featuresTitle`);

  // Hardware-specific fields
  const specsArray: Array<{ label: string; value: string }> = d ? (d.specs || []) : (Array.isArray(t(`${prefix}.specs`)) ? (t(`${prefix}.specs`) as unknown as Array<{ label: string; value: string }>) : []);
  const specTitle = d ? (d.specTitle || '') : tRaw(`${prefix}.specTitle`);
  const useCasesArray: string[] = d ? (d.useCases || []) : (Array.isArray(t(`${prefix}.useCases`)) ? (t(`${prefix}.useCases`) as unknown as string[]) : []);
  const useCasesTitle = d ? (d.useCasesTitle || '') : tRaw(`${prefix}.useCasesTitle`);
  const includedArray: string[] = d ? (d.whatsIncluded || []) : (Array.isArray(t(`${prefix}.whatsIncluded`)) ? (t(`${prefix}.whatsIncluded`) as unknown as string[]) : []);
  const includedTitle = d ? (d.includedTitle || '') : tRaw(`${prefix}.includedTitle`);

  const isHardware = type === 'hardware';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{title}</DialogTitle>
          {tagline && tagline !== `${prefix}.tagline` && (
            <p className="text-muted-foreground text-sm mt-1">{tagline}</p>
          )}
        </DialogHeader>

        <div className="space-y-6 py-2">
          {/* Overview */}
          {overview && overview !== `${prefix}.overview` && (
            <div>
              <p className="text-foreground leading-relaxed">{overview}</p>
            </div>
          )}

          {/* Features */}
          {featuresArray.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">{featuresTitle}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {featuresArray.map((feature, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <Check className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technical Specifications (hardware only) */}
          {isHardware && specsArray.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">{specTitle}</h3>
              <div className="rounded-lg border border-border overflow-hidden">
                {specsArray.map((spec, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between px-4 py-2.5 text-sm ${
                      i % 2 === 0 ? 'bg-muted/30' : 'bg-background'
                    }`}
                  >
                    <span className="font-medium text-foreground">{spec.label}</span>
                    <span className="text-muted-foreground">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Use Cases (hardware only) */}
          {isHardware && useCasesArray.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">{useCasesTitle}</h3>
              <div className="flex flex-wrap gap-2">
                {useCasesArray.map((useCase, i) => (
                  <Badge key={i} variant="secondary" className="text-xs font-normal py-1.5 px-3">
                    {useCase}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* What's Included (hardware only) */}
          {isHardware && includedArray.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">{includedTitle}</h3>
              <ul className="space-y-2">
                {includedArray.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm">
                    <Check className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* CTA: Liên hệ (không thêm giỏ) hoặc Thêm vào giỏ */}
          {contactHref ? (
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <Button asChild size="lg" className="w-full" onClick={() => onOpenChange(false)}>
                <Link to={contactHref}>{t('plans.contact')}</Link>
              </Button>
            </div>
          ) : onAddToCart && (
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <Button size="lg" className="w-full" onClick={() => { onAddToCart(); onOpenChange(false); }}>
                <ShoppingCart className="h-4 w-4 mr-2" />
                {t('cart.addToCart')}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
