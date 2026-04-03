import { ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import profilePhoto from "@/assets/profile-photo.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

import React, { useState, useEffect } from "react";
import { client } from "@/lib/sanityClient";

interface LatestPost {
  title: string;
  slug: {
    current: string;
  };
  excerpt: string;
}
// Commit

export const Hero = () => {
  const { t } = useLanguage();

  const [latestPost, setLatestPost] = useState<LatestPost | null>(null);
  const [loading, setLoading] = useState(true);

  // Função Auxiliar: Transforma texto entre *asteriscos* em negrito colorido
  const renderWithHighlights = (text: string) => {
    // Divide o texto onde houver asteriscos
    const parts = text.split('*');
    
    return parts.map((part, index) => {
      // Se o índice for ímpar (1, 3, 5...), é a parte que estava entre asteriscos
      if (index % 2 === 1) {
        return (
          <strong key={index} className="text-primary font-semibold">
            {part}
          </strong>
        );
      }
      // Se for par, é texto normal
      return part;
    });
  };

  useEffect(() => {
    const query = `*[_type == "post"] | order(publishedAt desc) [0] {
      title,
      slug,
      "excerpt": pt::text(body[0]) 
    }`;
    
    client.fetch(query)
      .then((data: LatestPost) => {
        setLatestPost(data);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20 bg-gradient-to-b from-background to-card">
      <div className="max-w-5xl mx-auto w-full">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          {/* Profile Photo */}
          <div className="hero-photo-cinematic">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-glow rounded-full blur-2xl opacity-30 animate-glow-pulse" />
              <img
                src={profilePhoto}
                alt="Juliano Heberhardt Conzatti"
                className="relative w-64 h-64 md:w-80 md:h-80 rounded-full object-cover shadow-elegant border-4 border-card transition-all duration-700 hover:scale-[1.02] hover:shadow-glow"
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 text-center md:text-left space-y-6 animate-slide-in-right">
            <div className="space-y-4">
               <h1 className="hero-name-cinematic text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                 Juliano <span className="surname text-gradient">Conzatti</span>
               </h1>
               
               <h2 className="hero-role-premium text-xl md:text-2xl lg:text-3xl font-semibold">
                 {t('hero.role')}
               </h2>
               <p className="hero-subtext-cinematic text-lg md:text-xl text-muted-foreground">
                 {t('hero.subtitle')}
               </p>
             </div>
 
             <div className="pt-4 max-w-2xl">
               <p className="text-base md:text-lg leading-relaxed text-foreground/80">
                 {/* AQUI ESTÁ A MÁGICA: Chamamos a função para renderizar o texto */}
                 {renderWithHighlights(t('hero.description'))}
               </p>
             </div>
 
             <div className="pt-6 flex flex-col sm:flex-row gap-4">
               <Button
                 size="lg"
                 className="group bg-gradient-to-r from-primary to-primary-glow hover:shadow-glow transition-smooth text-lg px-8 py-6"
                 asChild
               >
                 <a href="https://taggo.one/hcjuliano" target="_blank" rel="noopener noreferrer">
                   {t('hero.cta')}
                   <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                 </a>
               </Button>
             </div>
          </div>
        </div>

        {/* Latest Blog Post */}
        <div className="mt-16 animate-fade-in-up">
          {loading && (
            <Card className="premium-glass-card p-6">
              <p className="text-muted-foreground text-center">{t('blogUI.loading')}</p>
            </Card>
          )}

          {!loading && latestPost && (
            <Card className="premium-glass-card p-6 transition-smooth">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  {/* CORREÇÃO AQUI: Usando a chave correta latestPost */}
                  <p className="text-sm text-muted-foreground mb-2">{t('blogUI.latestPost')}</p>
                  
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {latestPost.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {latestPost.excerpt ? latestPost.excerpt.substring(0, 150) + '...' : t('blogUI.readMore') + '...'}
                  </p>
                  <Button variant="outline" className="group" asChild>
                    <Link to={`/blog/${latestPost.slug.current}`}>
                      {t('blogUI.readMore')}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
};