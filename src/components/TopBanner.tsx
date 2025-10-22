import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { useState } from "react";

const TopBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-primary to-secondary text-white py-3 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex-1 text-center">
          <p className="text-sm sm:text-base font-medium">
            Transform your farm with smart technology.{" "}
            <Link to="/contact" className="underline font-semibold hover:text-white/90 transition-colors">
              Start your free consultation
            </Link>
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link 
            to="/contact" 
            className="hidden sm:inline-block text-sm font-medium hover:text-white/90 transition-colors"
          >
            Contact Us
          </Link>
          <button
            onClick={() => setIsVisible(false)}
            className="p-1 hover:bg-white/10 rounded transition-colors"
            aria-label="Close banner"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopBanner;
