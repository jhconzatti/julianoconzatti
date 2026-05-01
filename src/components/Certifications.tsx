import { BriefcaseBusiness, Landmark, ShieldCheck, Sparkles, Target } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { renderWithHighlights } from "@/utils/renderUtils";

interface CertificationData {
  title: string;
  issuer: string;
  year: string;
  highlight?: boolean;
}

interface CertificationCategory {
  title: string;
  description: string;
  items: CertificationData[];
}

interface CertificationBackground {
  title: string;
  description: string;
}

const iconMap = [Sparkles, BriefcaseBusiness, ShieldCheck];

export const Certifications = () => {
  const { t } = useLanguage();

  const certificationCategories = (t('certifications.categories') as unknown as CertificationCategory[]) || [];
  const background = (t('certifications.background') as unknown as CertificationBackground) || {
    title: '',
    description: '',
  };

  return (
    <section id="certifications" className="py-20 px-6 bg-card">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {renderWithHighlights(t('certifications.header'))}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('certifications.subtitle')}
          </p>
        </div>

        <Card className="premium-glass-card mb-8 border-primary/30 bg-gradient-to-r from-primary/10 via-card to-card">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/15">
                <Landmark className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-xl">{background.title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm md:text-base text-foreground/80 leading-relaxed">{background.description}</p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {certificationCategories.map((category, index) => {
            const Icon = iconMap[index] || Target;

            return (
              <Card key={index} className="premium-glass-card h-full transition-smooth">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-muted">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl leading-tight">{category.title}</CardTitle>
                      <CardDescription className="mt-2">{category.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {category.items.map((cert, certIndex) => (
                    <div key={certIndex} className="premium-glass-card rounded-md border border-border/60 bg-background/40 p-3 hover:-translate-y-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-semibold text-foreground leading-snug">{cert.title}</h4>
                        {cert.highlight && (
                          <Badge variant="secondary" className="bg-primary/15 text-primary border-primary/30">
                            Core
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{cert.issuer}</p>
                      <p className="text-xs text-muted-foreground">{cert.year}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};