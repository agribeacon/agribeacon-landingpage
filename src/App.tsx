import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SimpleLanguageProvider } from "@/contexts/SimpleLanguageContext";
import { CartProvider } from "@/contexts/CartContext";
import ScrollToTop from "./components/ScrollToTop";
import LandingLayout from "./layouts/LandingLayout";
import HelpLayout from "./layouts/HelpLayout";
import Home from "./pages/Home";
import Solutions from "./pages/Solutions";
import About from "./pages/About";
import Contact from "./pages/Contact";
import CostEstimator from "./pages/CostEstimator";
import BestPractices from "./pages/BestPractices";
import Careers from "./pages/Careers";
import JobDetail from "./pages/JobDetail";
import DigitalFarmMap from "./pages/DigitalFarmMap";
import RobotRental from "./pages/RobotRental";
import YieldPlanning from "./pages/YieldPlanning";
import ResourceManagement from "./pages/ResourceManagement";
import Traceability from "./pages/Traceability";
import Help from "./pages/Help";
import NotFound from "./pages/NotFound";
import Platform from "./pages/revamp/Platform";
import StepPage from "./pages/revamp/StepPage";
import Customers from "./pages/revamp/Customers";
import Partners from "./pages/revamp/Partners";
import DevicePage from "./pages/revamp/DevicePage";
import Pricing from "./pages/revamp/Pricing";
import PrecisionAgriculture from "./pages/revamp/PrecisionAgriculture";
import RoiCalculator from "./pages/revamp/RoiCalculator";

const queryClient = new QueryClient();

const BrochureRedirect = () => {
  useEffect(() => {
    window.location.replace(`/brochure/index.html${window.location.search}${window.location.hash}`);
  }, []);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SimpleLanguageProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
            <BrowserRouter>
              <ScrollToTop />
              <Routes>
                {/* Trang marketing — khung landing (navbar + footer + chatbot) */}
                <Route element={<LandingLayout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/solutions" element={<Solutions />} />
                  <Route path="/price" element={<Navigate to="/pricing" replace />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  {/* Một form liên hệ duy nhất — đường cũ chuyển về /contact. */}
                  <Route path="/contact-sales" element={<Navigate to="/contact" replace />} />
                  <Route path="/cost-estimator" element={<CostEstimator />} />
                  <Route path="/best-practices" element={<BestPractices />} />
                  <Route path="/careers" element={<Careers />} />
                  <Route path="/careers/:position" element={<JobDetail />} />
                  <Route path="/cart" element={<Navigate to="/pricing" replace />} />
                  <Route path="/products/uav" element={<Navigate to="/devices/uav" replace />} />
                  <Route path="/products/robot" element={<Navigate to="/devices/robot" replace />} />
                  <Route path="/services/farm-map" element={<DigitalFarmMap />} />
                  <Route path="/services/robot-rental" element={<RobotRental />} />
                  <Route path="/ai/yield-planning" element={<YieldPlanning />} />
                  <Route path="/ai/resource-management" element={<ResourceManagement />} />
                  <Route path="/ai/traceability" element={<Traceability />} />

                  {/* Cấu trúc mới (revamp) */}
                  <Route path="/platform" element={<Platform />} />
                  <Route path="/platform/:slug" element={<StepPage />} />
                  <Route path="/customers" element={<Customers />} />
                  <Route path="/partners" element={<Partners />} />
                  <Route path="/precision-agriculture" element={<PrecisionAgriculture />} />
                  <Route path="/tools/roi-calculator" element={<RoiCalculator />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/guides" element={<BestPractices />} />
                  <Route path="/tools/cost-estimator" element={<CostEstimator />} />
                  <Route path="/services/farm-mapping" element={<DigitalFarmMap />} />
                  <Route path="/devices/:slug" element={<DevicePage />} />
                  {/* Route cũ → mới */}
                  <Route path="/technology" element={<Navigate to="/platform" replace />} />
                  <Route path="/products/farm-os" element={<Navigate to="/platform" replace />} />
                  <Route path="/products/ai-assistant" element={<Navigate to="/platform/ai" replace />} />
                  <Route path="/products/iot" element={<Navigate to="/devices/aiot" replace />} />
                </Route>

                {/* Help Center — khung riêng, không có navbar/footer landing */}
                <Route element={<HelpLayout />}>
                  <Route path="/help" element={<Help />} />
                  <Route path="/help/:categorySlug" element={<Help />} />
                  <Route path="/help/:categorySlug/:articleSlug" element={<Help />} />
                </Route>

                <Route path="/brochure" element={<BrochureRedirect />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </SimpleLanguageProvider>
  </QueryClientProvider>
);

export default App;
