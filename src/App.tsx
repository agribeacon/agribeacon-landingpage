import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SimpleLanguageProvider } from "@/contexts/SimpleLanguageContext";
import { CartProvider } from "@/contexts/CartContext";
import ScrollToTop from "./components/ScrollToTop";
import LandingLayout from "./layouts/LandingLayout";
import HelpLayout from "./layouts/HelpLayout";
import Home from "./pages/Home";
import Solutions from "./pages/Solutions";
import Price from "./pages/Price";
import Technology from "./pages/Technology";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ContactSales from "./pages/ContactSales";
import CostEstimator from "./pages/CostEstimator";
import BestPractices from "./pages/BestPractices";
import Careers from "./pages/Careers";
import JobDetail from "./pages/JobDetail";
import Cart from "./pages/Cart";
import FarmOS from "./pages/FarmOS";
import UAV from "./pages/UAV";
import Robot from "./pages/Robot";
import IoT from "./pages/IoT";
import AIAssistant from "./pages/AIAssistant";
import DigitalFarmMap from "./pages/DigitalFarmMap";
import RobotRental from "./pages/RobotRental";
import YieldPlanning from "./pages/YieldPlanning";
import ResourceManagement from "./pages/ResourceManagement";
import Traceability from "./pages/Traceability";
import Help from "./pages/Help";
import NotFound from "./pages/NotFound";

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
                  <Route path="/price" element={<Price />} />
                  <Route path="/technology" element={<Technology />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/contact-sales" element={<ContactSales />} />
                  <Route path="/cost-estimator" element={<CostEstimator />} />
                  <Route path="/best-practices" element={<BestPractices />} />
                  <Route path="/careers" element={<Careers />} />
                  <Route path="/careers/:position" element={<JobDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/products/farm-os" element={<FarmOS />} />
                  <Route path="/products/uav" element={<UAV />} />
                  <Route path="/products/robot" element={<Robot />} />
                  <Route path="/products/iot" element={<IoT />} />
                  <Route path="/products/ai-assistant" element={<AIAssistant />} />
                  <Route path="/services/farm-map" element={<DigitalFarmMap />} />
                  <Route path="/services/robot-rental" element={<RobotRental />} />
                  <Route path="/ai/yield-planning" element={<YieldPlanning />} />
                  <Route path="/ai/resource-management" element={<ResourceManagement />} />
                  <Route path="/ai/traceability" element={<Traceability />} />
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
