import { Outlet } from "react-router-dom";
import HelpHeader from "@/components/help/HelpHeader";

// Khung riêng cho Help Center: chỉ có header tối giản, không navbar/footer landing.
const HelpLayout = () => (
  <>
    <HelpHeader />
    <Outlet />
  </>
);

export default HelpLayout;
