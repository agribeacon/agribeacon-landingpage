import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, ShoppingCart } from "lucide-react";
import { useSimpleLanguage } from "@/contexts/SimpleLanguageContext";

interface ProductDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  type: string;
  productKey: string;
  onAddToCart?: () => void;
  priceLabel?: string;
  isRental?: boolean;
}

export const ProductDetailModal = ({ open, onOpenChange, title, type, productKey, onAddToCart, priceLabel, isRental }: ProductDetailModalProps) => {
  const { t } = useSimpleLanguage();

  const prefix = type === 'hardware' ? `hardware.${productKey}.detail` : `addons.${productKey}.detail`;

  const tagline = t(`${prefix}.tagline`) as string;
  const overview = t(`${prefix}.overview`) as string;
  const features = t(`${prefix}.features`);
  const featuresTitle = t(`${prefix}.featuresTitle`) as string;
  const featuresArray: string[] = Array.isArray(features) ? features : [];

  // Hardware-specific fields
  const specs = t(`${prefix}.specs`);
  const specsArray: Array<{ label: string; value: string }> = Array.isArray(specs) ? specs : [];
  const specTitle = t(`${prefix}.specTitle`) as string;
  const useCases = t(`${prefix}.useCases`);
  const useCasesArray: string[] = Array.isArray(useCases) ? useCases : [];
  const useCasesTitle = t(`${prefix}.useCasesTitle`) as string;
  const whatsIncluded = t(`${prefix}.whatsIncluded`);
  const includedArray: string[] = Array.isArray(whatsIncluded) ? whatsIncluded : [];
  const includedTitle = t(`${prefix}.includedTitle`) as string;

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

          {/* Add to Cart */}
          {onAddToCart && (
            <div className="flex items-center justify-between pt-4 border-t border-border">
              {priceLabel && (
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-foreground">{priceLabel}</span>
                  {isRental && (
                    <Badge className="text-xs bg-amber-100 text-amber-800 hover:bg-amber-100">
                      {t('hardware.rentBundle')}
                    </Badge>
                  )}
                </div>
              )}
              <Button size="lg" className={priceLabel ? '' : 'w-full'} onClick={() => { onAddToCart(); onOpenChange(false); }}>
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
