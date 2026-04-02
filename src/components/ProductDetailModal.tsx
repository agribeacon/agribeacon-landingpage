import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ProductDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children?: React.ReactNode;
}

export const ProductDetailModal = ({ open, onOpenChange, title, children }: ProductDetailModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{title}</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          {children || (
            <div className="text-center text-muted-foreground py-8">
              Product details will be displayed here
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
