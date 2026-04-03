import { ArrowRight, Linkedin, Mail, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

export const Contact = () => {
  const { t } = useLanguage();

  // Função para aplicar o 'text-gradient' onde houver asteriscos *
  const renderWithHighlights = (text: string) => {
    const parts = text.split('*');
    return parts.map((part, index) => {
      // Se for ímpar, é o texto entre asteriscos -> aplica o gradiente
      if (index % 2 === 1) {
        return <span key={index} className="text-gradient">{part}</span>;
      }
      return part;
    });
  };

  return (
    <section id="contact" className="py-20 px-6 bg-background">
      <div className="max-w-4xl mx-auto">
        <Card className="p-8 md:p-12 text-center bg-gradient-to-br from-card to-primary/5 border-primary/30 shadow-elegant">
          <div className="max-w-2xl mx-auto space-y-8">
            
            <div className="space-y-4 animate-fade-in">
              {/* Título Traduzido com Efeito Gradiente */}
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                {renderWithHighlights(t('contact.title'))}
              </h2>
              
              {/* Descrição Traduzida */}
              <p className="text-lg text-muted-foreground">
                {t('contact.description')}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-scale-in">
              
              {/* Botão de Contato Principal */}
              <Button
                size="lg"
                className="group bg-gradient-to-r from-primary to-primary-glow hover:shadow-glow transition-smooth text-lg px-8 py-6 w-full sm:w-auto"
                asChild
              >
                <a href="https://taggo.one/hcjuliano" target="_blank" rel="noopener noreferrer">
                  <Mail className="mr-2 h-5 w-5" />
                  {t('contact.cta')}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>

              {/* Botão LinkedIn */}
              <Button
                size="lg"
                variant="outline"
                className="border-primary/30 hover:bg-primary/10 text-lg px-8 py-6 w-full sm:w-auto group"
                asChild
              >
                <a href="https://www.linkedin.com/in/hcjuliano/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="mr-2 h-5 w-5 group-hover:text-primary transition-colors" />
                  {t('contact.linkedin')}
                </a>
              </Button>

              {/* Botão Instagram */}
              <Button
                size="lg"
                variant="outline"
                className="border-primary/30 hover:bg-primary/10 text-lg px-8 py-6 w-full sm:w-auto group"
                asChild
              >
                <a href="https://www.instagram.com/hcjuliano/" target="_blank" rel="noopener noreferrer">
                  <Instagram className="mr-2 h-5 w-5 group-hover:text-primary transition-colors" />
                  {t('contact.instagram')}
                </a>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};