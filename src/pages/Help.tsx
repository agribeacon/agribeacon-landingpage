import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  UserPlus,
  MapPinned,
  CalendarRange,
  ClipboardList,
  Wallet,
  Sparkles,
  LifeBuoy,
  Globe,
  Smartphone,
  MessageCircle,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import { useSimpleLanguage } from "@/contexts/SimpleLanguageContext";

const APP_URL = "https://farm.agribeacon.tech";
const APP_STORE_URL =
  "https://apps.apple.com/us/app/agribeacon-farm-management/id6754689259?l=vi";
const GOOGLE_PLAY_URL =
  "https://play.google.com/store/apps/details?id=com.farmmanagement.mobile";

// Icons paired by step order with the `help.steps` translation array.
const stepIcons = [
  UserPlus,
  MapPinned,
  CalendarRange,
  ClipboardList,
  Wallet,
  Sparkles,
];

const Help = () => {
  const { t } = useSimpleLanguage();

  const stepsRaw = t("help.steps");
  const steps: Array<{ title: string; desc: string }> = Array.isArray(stepsRaw)
    ? stepsRaw
    : [];

  const faqRaw = t("help.faq");
  const faq: Array<{ q: string; a: string }> = Array.isArray(faqRaw)
    ? faqRaw
    : [];

  return (
    <div className="min-h-screen bg-background pt-32">
      {/* Hero */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <Badge variant="outline" className="mb-4">
            <LifeBuoy className="h-3.5 w-3.5 mr-1" />
            {t("help.badge")}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t("help.title")}
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            {t("help.subtitle")}
          </p>

          {/* Quick access */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={APP_URL} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-secondary hover:shadow-glow transition-all w-full sm:w-auto"
              >
                <Globe className="h-4 w-4 mr-2" />
                {t("help.openWebApp")}
              </Button>
            </a>
            <a
              href={GOOGLE_PLAY_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto"
              >
                <Smartphone className="h-4 w-4 mr-2" />
                {t("help.getAndroid")}
              </Button>
            </a>
            <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto"
              >
                <Smartphone className="h-4 w-4 mr-2" />
                {t("help.getIos")}
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Getting started */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-3">
              <BookOpen className="h-3.5 w-3.5 mr-1" />
              {t("help.steps.badge")}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              {t("help.steps.title")}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("help.steps.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {steps.map((step, i) => {
              const Icon = stepIcons[i] ?? BookOpen;
              return (
                <Card
                  key={i}
                  className="hover:shadow-card transition-all duration-300 hover:-translate-y-1"
                >
                  <CardContent className="p-6 flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="bg-gradient-to-br from-primary to-secondary p-3 rounded-lg w-fit">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <span className="mt-2 text-sm font-semibold text-muted-foreground">
                        {i + 1}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-1.5">{step.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      {faq.length > 0 && (
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-3xl">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-3">
                <MessageCircle className="h-3.5 w-3.5 mr-1" />
                {t("help.faq.badge")}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                {t("help.faq.title")}
              </h2>
              <p className="text-muted-foreground">{t("help.faq.subtitle")}</p>
            </div>

            <Accordion type="single" collapsible className="space-y-3">
              {faq.map((item, i) => (
                <AccordionItem
                  key={i}
                  value={`help-faq-${i}`}
                  className="border border-border rounded-lg px-5 data-[state=open]:bg-muted/30"
                >
                  <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline py-4">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      )}

      {/* Support CTA */}
      <section className="bg-primary text-primary-foreground py-16 px-4">
        <div className="container mx-auto text-center max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("help.support.title")}
          </h2>
          <p className="text-primary-foreground/80 mb-8">
            {t("help.support.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/contact">
              <Button
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                {t("help.support.contact")}
              </Button>
            </Link>
            <Link to="/contact-sales">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10"
              >
                {t("help.support.sales")}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Help;
