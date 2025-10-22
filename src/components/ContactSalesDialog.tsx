import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ContactSalesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ContactSalesDialog = ({ open, onOpenChange }: ContactSalesDialogProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    farmSize: "",
    location: "",
    cropTypes: "",
    currentChallenges: "",
    needs: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create email body
    const emailBody = `
New B2B Contact Sales Request:

Company Name: ${formData.companyName}
Contact Person: ${formData.contactName}
Email: ${formData.email}
Phone: ${formData.phone}
Farm Size: ${formData.farmSize} acres
Location: ${formData.location}
Crop Types: ${formData.cropTypes}
Current Challenges: ${formData.currentChallenges}
Specific Needs: ${formData.needs}
    `.trim();

    // Create mailto link
    const mailtoLink = `mailto:info@agribeacon.tech?subject=B2B Sales Inquiry - ${formData.companyName}&body=${encodeURIComponent(emailBody)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    toast({
      title: "Opening Email Client",
      description: "Your email client will open with the pre-filled information.",
    });
    
    // Reset form and close dialog
    setFormData({
      companyName: "",
      contactName: "",
      email: "",
      phone: "",
      farmSize: "",
      location: "",
      cropTypes: "",
      currentChallenges: "",
      needs: "",
    });
    onOpenChange(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Contact Sales - B2B Solutions</DialogTitle>
          <DialogDescription>
            Tell us about your farm and business needs, and our team will get back to you within 24 hours.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company/Farm Name *</Label>
              <Input
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
                placeholder="ABC Agricultural Co."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactName">Contact Person *</Label>
              <Input
                id="contactName"
                name="contactName"
                value={formData.contactName}
                onChange={handleChange}
                required
                placeholder="John Doe"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Business Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="john@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="+84 XXX XXX XXX"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="farmSize">Total Farm Size (acres) *</Label>
              <Input
                id="farmSize"
                name="farmSize"
                value={formData.farmSize}
                onChange={handleChange}
                required
                placeholder="e.g., 500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Farm Location *</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                placeholder="Province/Region"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cropTypes">Main Crop Types *</Label>
            <Input
              id="cropTypes"
              name="cropTypes"
              value={formData.cropTypes}
              onChange={handleChange}
              required
              placeholder="e.g., Rice, Coffee, Vegetables"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="currentChallenges">Current Farming Challenges</Label>
            <Textarea
              id="currentChallenges"
              name="currentChallenges"
              value={formData.currentChallenges}
              onChange={handleChange}
              placeholder="What challenges are you facing in your farming operations?"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="needs">Specific Needs & Solutions of Interest *</Label>
            <Textarea
              id="needs"
              name="needs"
              value={formData.needs}
              onChange={handleChange}
              required
              placeholder="Tell us about the solutions you're interested in (IoT sensors, drones, robotics, platform, etc.)"
              rows={4}
            />
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-glow group"
          >
            Submit Inquiry
            <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactSalesDialog;
