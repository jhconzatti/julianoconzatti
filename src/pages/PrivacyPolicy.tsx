import { useEffect } from "react";
import { ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";

type PolicySection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

const PrivacyPolicy = () => {
  const { t } = useTranslation();
  const sections = t("privacyPolicy.sections", { returnObjects: true }) as PolicySection[];

  useEffect(() => {
    document.title = `${t("privacyPolicy.title")} | Juliano Conzatti`;
    window.scrollTo(0, 0);
  }, [t]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-card">
      <Navigation />

      <section className="px-6 pt-28 pb-20">
        <article className="mx-auto max-w-4xl space-y-8">
          <div className="rounded-3xl border border-border/60 bg-gradient-to-br from-card via-card to-primary/5 p-8 shadow-sm md:p-12">
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <ShieldCheck className="h-4 w-4" />
              <span>{t("privacyPolicy.eyebrow")}</span>
            </div>

            <div className="space-y-5">
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                {t("privacyPolicy.title")}
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-muted-foreground md:text-xl">
                {t("privacyPolicy.summary")}
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-[0.9fr_1.1fr]">
              <Card className="border-border/60 bg-background/55 p-5 shadow-none">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  {t("privacyPolicy.lastUpdatedLabel")}
                </p>
                <p className="mt-2 text-base font-medium text-foreground md:text-lg">
                  {t("privacyPolicy.lastUpdatedValue")}
                </p>
              </Card>

              <Card className="border-border/60 bg-background/55 p-5 shadow-none">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  {t("privacyPolicy.currentScopeTitle")}
                </p>
                <p className="mt-2 text-sm leading-7 text-muted-foreground md:text-base">
                  {t("privacyPolicy.currentScopeBody")}
                </p>
              </Card>
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

                <div className="mt-4 space-y-4">
                  {section.paragraphs?.map((paragraph) => (
                    <p key={paragraph} className="text-base leading-8 text-muted-foreground md:text-lg">
                      {paragraph}
                    </p>
                  ))}

                  {section.bullets?.length ? (
                    <ul className="space-y-3 pl-5 text-base leading-8 text-muted-foreground marker:text-primary md:text-lg">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="list-disc">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </Card>
            ))}
          </div>
        </article>
      </section>

      <Footer />
    </main>
  );
};

export default PrivacyPolicy;