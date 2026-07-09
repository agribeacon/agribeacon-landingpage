import { Outlet } from "react-router-dom";
import TopMenuBar from "@/components/TopMenuBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";

// Khung landing: thanh trên + navbar + footer + chatbot bao quanh các trang marketing.
const LandingLayout = () => (
  <>
    <TopMenuBar />
    <Navbar />
    <Outlet />
    <Footer />
    <ChatBot />
  </>
);

export default LandingLayout;
