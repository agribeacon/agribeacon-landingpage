import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { SimpleLanguageProvider } from "./contexts/SimpleLanguageContext";

createRoot(document.getElementById("root")!).render(
  <SimpleLanguageProvider>
    <App />
  </SimpleLanguageProvider>
);
