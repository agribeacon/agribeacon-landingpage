import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import logo from "@/assets/Logo.svg";
import ContactSalesDialog from "./ContactSalesDialog";
import { useSimpleLanguage } from "@/contexts/SimpleLanguageContext";

const Navbar = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactSalesOpen, setContactSalesOpen] = useState(false);
  const { t } = useSimpleLanguage();

  const technologyMenu = [
    { name: t('nav.technology.platform'), path: "/technology#platform", description: t('nav.technology.platform.desc') },
    { name: t('nav.technology.ai'), path: "/technology#ai", description: t('nav.technology.ai.desc') },
    { name: t('nav.technology.connectivity'), path: "/technology#connectivity", description: t('nav.technology.connectivity.desc') },
    { name: t('nav.technology.all'), path: "/technology", description: t('nav.technology.all.desc') },
  ];

  const resourcesMenu = [
    { name: t('nav.resources.bestPractices'), path: "/best-practices", description: t('nav.resources.bestPractices.desc') },
  ];

  const aboutMenu = [
    { name: t('nav.about.aboutUs'), path: "/about", description: t('nav.about.aboutUs.desc') },
    { name: t('nav.about.careers'), path: "/careers", description: t('nav.about.careers.desc') },
    { name: t('nav.about.contact'), path: "/contact", description: t('nav.about.contact.desc') },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-8 w-full z-40 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img src={logo} alt="AgriBeacon" className="h-10 w-auto transition-transform group-hover:scale-105" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <NavigationMenu>
              <NavigationMenuList>
                {/* Technology Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium">
                    {t('nav.technology')}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[400px] p-4 bg-popover">
                      <div className="grid gap-3">
                        {technologyMenu.map((item) => (
                          <Link key={item.path} to={item.path}>
                            <NavigationMenuLink className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                              <div className="text-sm font-medium leading-none mb-1">{item.name}</div>
                              <p className="text-sm leading-snug text-muted-foreground">{item.description}</p>
                            </NavigationMenuLink>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Resources Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium">
                    {t('nav.resources')}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[400px] p-4 bg-popover">
                      <div className="grid gap-3">
                        {resourcesMenu.map((item) => (
                          <Link key={item.path} to={item.path}>
                            <NavigationMenuLink className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                              <div className="text-sm font-medium leading-none mb-1">{item.name}</div>
                              <p className="text-sm leading-snug text-muted-foreground">{item.description}</p>
                            </NavigationMenuLink>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Pricing Link */}
                <NavigationMenuItem>
                  <Link to="/solutions">
                    <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                      {t('nav.pricing')}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                {/* About Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium">
                    {t('nav.about')}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[400px] p-4 bg-popover">
                      <div className="grid gap-3">
                        {aboutMenu.map((item) => (
                          <Link key={item.path} to={item.path}>
                            <NavigationMenuLink className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                              <div className="text-sm font-medium leading-none mb-1">{item.name}</div>
                              <p className="text-sm leading-snug text-muted-foreground">{item.description}</p>
                            </NavigationMenuLink>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Button 
              variant="outline" 
              size="sm" 
              className="border-primary text-primary hover:bg-primary/10 ml-2"
              onClick={() => setContactSalesOpen(true)}
            >
              {t('nav.contactSales')}
            </Button>
            <Link to="/contact">
              <Button size="sm" className="bg-gradient-to-r from-primary to-secondary hover:shadow-glow transition-all">
                {t('nav.tryForFree')}
              </Button>
            </Link>
          </div>
          
          <ContactSalesDialog open={contactSalesOpen} onOpenChange={setContactSalesOpen} />

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in-up">
            <div className="flex flex-col gap-2">
              {/* Technology Menu */}
              <div className="border-b border-border pb-2 mb-2">
                <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase">{t('nav.technology')}</div>
                {technologyMenu.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-2 rounded-lg text-sm font-medium transition-colors text-foreground/70 hover:bg-muted flex flex-col gap-1"
                  >
                    <span>{item.name}</span>
                    <span className="text-xs text-muted-foreground">{item.description}</span>
                  </Link>
                ))}
              </div>

              {/* Resources Menu */}
              <div className="border-b border-border pb-2 mb-2">
                <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase">{t('nav.resources')}</div>
                {resourcesMenu.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-2 rounded-lg text-sm font-medium transition-colors text-foreground/70 hover:bg-muted flex flex-col gap-1"
                  >
                    <span>{item.name}</span>
                    <span className="text-xs text-muted-foreground">{item.description}</span>
                  </Link>
                ))}
              </div>

              {/* Pricing */}
              <div className="border-b border-border pb-2 mb-2">
                <Link
                  to="/solutions"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-colors text-foreground/70 hover:bg-muted flex flex-col gap-1"
                >
                  <span>{t('nav.pricing')}</span>
                  <span className="text-xs text-muted-foreground">{t('nav.pricing.desc')}</span>
                </Link>
              </div>

              {/* About Menu */}
              <div className="border-b border-border pb-2 mb-2">
                <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase">{t('nav.about')}</div>
                {aboutMenu.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-2 rounded-lg text-sm font-medium transition-colors text-foreground/70 hover:bg-muted flex flex-col gap-1"
                  >
                    <span>{item.name}</span>
                    <span className="text-xs text-muted-foreground">{item.description}</span>
                  </Link>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="pt-2 space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full border-primary text-primary"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setContactSalesOpen(true);
                  }}
                >
                  {t('nav.contactSales')}
                </Button>
                <Link to="/contact" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="bg-gradient-to-r from-primary to-secondary w-full">
                    {t('nav.tryForFree')}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
