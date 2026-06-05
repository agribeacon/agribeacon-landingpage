import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import logo from "@/assets/Logo.svg";
import { useSimpleLanguage } from "@/contexts/SimpleLanguageContext";

const APP_STORE_URL = "https://apps.apple.com/us/app/agribeacon-farm-management/id6754689259?l=vi";
const GOOGLE_PLAY_URL = "https://play.google.com/store/apps/details?id=com.farmmanagement.mobile";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useSimpleLanguage();

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4 w-fit">
              <img src={logo} alt="AgriBeacon" className="h-10 w-auto" />
            </Link>
            <p className="text-muted-foreground text-sm max-w-md mb-4">
              {t('footer.tagline')}
            </p>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:info@agribeacon.tech" className="hover:text-primary transition-colors">
                  info@agribeacon.tech
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <a href="tel:+84962709987" className="hover:text-primary transition-colors">
                  +84 962 709 987
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>KĐT Geleximco, Hoài Đức, Hà Nội, Việt Nam</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/solutions" className="hover:text-primary transition-colors">{t('footer.solutions')}</Link></li>
              <li><Link to="/technology" className="hover:text-primary transition-colors">{t('footer.technology')}</Link></li>
              <li><Link to="/best-practices" className="hover:text-primary transition-colors">{t('nav.resources.bestPractices')}</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">{t('nav.about.aboutUs')}</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">{t('nav.contact')}</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">{t('footer.resources')}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">{t('footer.documentation')}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">{t('footer.support')}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">{t('footer.privacy')}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">{t('footer.terms')}</a></li>
            </ul>
          </div>

          {/* Download App QR Codes */}
          <div>
            <h3 className="font-semibold mb-4">{t('footer.downloadApp')}</h3>
            <div className="flex gap-6">
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1 group"
              >
                <div className="bg-white p-1.5 rounded-md border border-border group-hover:border-primary transition-colors">
                  <QRCodeSVG value={APP_STORE_URL} size={80} />
                </div>
                <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors">App Store</span>
              </a>
              <a
                href={GOOGLE_PLAY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1 group"
              >
                <div className="bg-white p-1.5 rounded-md border border-border group-hover:border-primary transition-colors">
                  <QRCodeSVG value={GOOGLE_PLAY_URL} size={80} />
                </div>
                <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors">Google Play</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>{t('footer.copyright').replace('© 2024 AgriBeacon. ', '')} {t('footer.builtFor')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
