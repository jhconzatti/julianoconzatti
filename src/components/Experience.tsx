import { Building2, TrendingUp, Users, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useEffect, useRef, useState, memo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { renderWithHighlights } from "@/utils/renderUtils";

// Interface para os dados que vêm da tradução
interface ExperienceData {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
}

// Mapeamento fixo de ícones na ordem dos itens
const iconMap = [
  TrendingUp, // Item 1 (Líder)
  Users,      // Item 2 (Contact Owner)
  Zap,        // Item 3 (Analista)
  Building2   // Item 4 (Consultor)
];

const ExperienceCard = memo(({ item, index }: { item: ExperienceData; index: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Pega o ícone correto baseado no índice
  const Icon = iconMap[index] || Building2;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <Card className="premium-glass-card p-6 md:p-8 transition-smooth group">
        <div className="flex items-start gap-4 mb-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-primary-glow group-hover:scale-110 transition-transform">
            <Icon className="h-6 w-6 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
              {item.role}
            </h3>
            <p className="text-lg font-semibold text-primary mt-1">{item.company}</p>
            <p className="text-sm text-muted-foreground mt-1">
              {item.period} • {item.location}
            </p>
          </div>
        </div>
        
        <p className="text-foreground/80 mb-4 leading-relaxed">{item.description}</p>
        
        <ul className="space-y-2">
          {item.highlights.map((highlight, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-foreground/70">
              <span className="text-primary mt-1">▸</span>
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
});

export const Experience = () => {
  const { t } = useLanguage();

  // Carrega os itens traduzidos e garante que o TS entenda que é um array
  const experienceItems = (t('experience.items') as unknown as ExperienceData[]) || [];

  return (
    <section id="experience" className="py-20 px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {renderWithHighlights(t('experience.header'))}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('experience.subtitle')}
          </p>
        </div>

        <div className="space-y-6">
          {experienceItems.map((item, index) => (
            <ExperienceCard key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};