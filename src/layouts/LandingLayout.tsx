import { Outlet } from "react-router-dom";
import SiteNav, { MobileCta } from "@/components/revamp/SiteNav";
import SiteFooter from "@/components/revamp/SiteFooter";
import ChatBot from "@/components/ChatBot";

// Khung landing: menu + footer mới (revamp storytelling) + chatbot.
const LandingLayout = () => (
  <>
    <SiteNav />
    <Outlet />
    <SiteFooter />
    <MobileCta />
    <ChatBot />
  </>
);

export default LandingLayout;
