import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SimpleLanguageProvider } from "@/contexts/SimpleLanguageContext";
import { CartProvider } from "@/contexts/CartContext";
import ScrollToTop from "./components/ScrollToTop";
import TopMenuBar from "./components/TopMenuBar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Solutions from "./pages/Solutions";
import Price from "./pages/Price";
import Technology from "./pages/Technology";
import About from "./pages/About";
import Contact from "./pages/Contact";
import BestPractices from "./pages/BestPractices";
import Careers from "./pages/Careers";
import JobDetail from "./pages/JobDetail";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SimpleLanguageProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
            <BrowserRouter>
              <ScrollToTop />
              <TopMenuBar />
              <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/solutions" element={<Solutions />} />
              <Route path="/price" element={<Price />} />
              <Route path="/technology" element={<Technology />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/best-practices" element={<BestPractices />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/careers/:position" element={<JobDetail />} />
              <Route path="/cart" element={<Cart />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </SimpleLanguageProvider>
  </QueryClientProvider>
);

export default App;
