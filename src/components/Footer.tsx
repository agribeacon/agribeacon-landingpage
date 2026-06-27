import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import logo from "@/assets/Logo.svg";
import appStoreBadge from "@/assets/badge-appstore.svg";
import googlePlayBadge from "@/assets/badge-googleplay.png";
import { useSimpleLanguage } from "@/contexts/SimpleLanguageContext";

const APP_STORE_URL = "https://apps.apple.com/us/app/agribeacon-farm-management/id6754689259?l=vi";
const GOOGLE_PLAY_URL = "https://play.google.com/store/apps/details?id=com.farmmanagement.mobile";

const Footer = () => {
  const { t } = useSimpleLanguage();

  const stores = [
    { name: "App Store", url: APP_STORE_URL, badge: appStoreBadge, badgeClass: "h-11 w-auto" },
    { name: "Google Play", url: GOOGLE_PLAY_URL, badge: googlePlayBadge, badgeClass: "h-16 w-auto -my-2.5" },
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-8">
          {/* Brand */}
          <div>
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

          {/* Download App */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold mb-1 text-center">{t('footer.downloadApp')}</h3>
            <p className="text-sm text-muted-foreground mb-5 text-center">{t('footer.scanToDownload')}</p>
            <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-8">
              {stores.map((store) => (
                <div key={store.name} className="flex flex-row items-center gap-5">
                  {/* Store badge */}
                  <a
                    href={store.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-opacity hover:opacity-80"
                    aria-label={store.name}
                  >
                    <img src={store.badge} alt={store.name} className={store.badgeClass} />
                  </a>
                  {/* QR code */}
                  <a
                    href={store.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white p-2.5 rounded-2xl border border-border shadow-sm hover:border-primary hover:shadow-md transition-all"
                    aria-label={`${t('footer.downloadApp')} – ${store.name}`}
                  >
                    <QRCodeSVG value={store.url} size={120} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-4">
            <Link to="/help" className="hover:text-primary transition-colors">{t('nav.help')}</Link>
            <Link to="/best-practices" className="hover:text-primary transition-colors">{t('nav.resources.bestPractices')}</Link>
            <a href="/brochure" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">{t('nav.resources.brochure')}</a>
            <Link to="/price" className="hover:text-primary transition-colors">{t('nav.pricing')}</Link>
            <Link to="/contact" className="hover:text-primary transition-colors">{t('nav.about.contact')}</Link>
          </div>
          <p>{t('footer.copyright').replace('© 2024 AgriBeacon. ', '')} {t('footer.builtFor')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
