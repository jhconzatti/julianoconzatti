import { BarChart3, Handshake, SearchCheck } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ExpertisePillar {
  title: string;
  description: string;
  bullets: string[];
}

const iconMap = [SearchCheck, BarChart3, Handshake];

export const Expertise = () => {
  const { t } = useLanguage();

  const renderWithHighlights = (text: string) => {
    const parts = text.split("*");
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        return (
          <span key={index} className="text-gradient">
            {part}
          </span>
        );
      }

      return part;
    });
  };

  const pillars = (t("expertise.pillars") as unknown as ExpertisePillar[]) || [];

  return (
    <section id="expertise" className="py-20 px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {renderWithHighlights(t("expertise.header"))}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t("expertise.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, index) => {
            const Icon = iconMap[index] || Handshake;

            return (
              <Card key={index} className="premium-glass-card h-full transition-smooth">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-xl leading-tight">{pillar.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-foreground/80 leading-relaxed mb-4">{pillar.description}</p>
                  <ul className="space-y-2">
                    {pillar.bullets.map((bullet, bulletIndex) => (
                      <li key={bulletIndex} className="flex items-start gap-2 text-sm text-foreground/75">
                        <span className="text-primary mt-1">▸</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
