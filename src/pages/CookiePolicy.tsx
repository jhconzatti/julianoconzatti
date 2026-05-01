import { useEffect } from "react";
import { Cookie } from "lucide-react";

import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

type CookiePolicySection = {
  title: string;
  body: string;
};

const CookiePolicy = () => {
  const { t } = useLanguage();
  const sections = t("cookiePolicy.sections") as unknown as CookiePolicySection[];

  useEffect(() => {
    document.title = `${t("cookiePolicy.title")} | Juliano Conzatti`;
    window.scrollTo(0, 0);
  }, [t]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-card">
      <Navigation />

      <section className="px-6 pb-28 pt-28">
        <article className="mx-auto max-w-4xl space-y-8">
          <div className="rounded-3xl border border-border/60 bg-gradient-to-br from-card via-card to-primary/5 p-8 shadow-sm md:p-12">
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Cookie className="h-4 w-4" />
              <span>{t("cookiePolicy.eyebrow")}</span>
            </div>

            <div className="space-y-5">
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                {t("cookiePolicy.title")}
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-muted-foreground md:text-xl">
                {t("cookiePolicy.intro")}
              </p>
            </div>
          </div>

          <div className="space-y-5">
            {sections.map((section) => (
              <Card
                key={section.title}
                className="border-border/60 bg-card/80 p-6 shadow-sm backdrop-blur-sm md:p-8"
              >
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                  {section.title}
                </h2>
                <p className="mt-4 text-base leading-8 text-muted-foreground md:text-lg">
                  {section.body}
                </p>
              </Card>
            ))}
          </div>
        </article>
      </section>

      <Footer />
    </main>
  );
};

export default CookiePolicy;