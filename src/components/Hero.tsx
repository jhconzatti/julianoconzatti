import { ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import heroVideo from "@/assets/hero-background.mp4";
import profilePhoto from "@/assets/profile-photo.jpg";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLang } from "@/hooks/use-lang";
import { renderWithHighlights } from "@/utils/renderUtils";
import { useLatestPost } from "@/hooks/use-latest-post";

export const Hero = () => {
  const { t } = useLanguage();
  const { lp } = useLang();

  const { data: latestPost, isLoading: loading } = useLatestPost();

  return (
    <section className="dark hero-section relative isolate min-h-screen overflow-hidden bg-slate-950 px-6 py-20">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="pointer-events-none absolute inset-0 -z-20 h-full w-full scale-[1.06] object-cover blur-[7px] brightness-[0.44] saturate-[0.78] contrast-110 md:scale-100 md:blur-[3px] md:brightness-[0.62] md:saturate-[0.9]"
        src={heroVideo}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-slate-950/88 via-slate-950/76 to-black/86 md:from-slate-950/72 md:via-slate-950/56 md:to-black/74" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_18%,rgba(15,23,42,0.08),rgba(2,6,23,0.52)_52%,rgba(2,6,23,0.84)_100%)] md:bg-[radial-gradient(circle_at_50%_18%,rgba(15,23,42,0.06),rgba(2,6,23,0.32)_48%,rgba(2,6,23,0.7)_100%)]" />

      {/* Bottom fade — dissolve into page background */}
      <div className="pointer-events-none absolute bottom-0 inset-x-0 h-52 z-[1] bg-gradient-to-b from-transparent to-[hsl(222_47%_6%)]" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-5xl">
        <div className="flex min-h-[calc(100vh-10rem)] items-center">
          <div className="w-full px-2 md:px-0">
            <div className="flex flex-col items-center gap-12 md:flex-row md:gap-16">
            {/* Profile Photo */}
              <div className="hero-photo-cinematic">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-primary-glow opacity-30 blur-2xl animate-glow-pulse" />
                  <img
                    src={profilePhoto}
                    alt="Juliano Heberhardt Conzatti"
                    className="relative h-64 w-64 rounded-full border-4 border-card object-cover shadow-elegant transition-all duration-700 hover:scale-[1.02] hover:shadow-glow md:h-80 md:w-80"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="relative flex-1 overflow-hidden rounded-[1.5rem] border border-white/5 bg-slate-950/14 px-6 py-8 text-center shadow-[0_16px_48px_rgba(2,6,23,0.2)] backdrop-blur-[8px] md:px-8 md:py-10 md:text-left">
                <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(15,23,42,0.08),transparent_40%),linear-gradient(135deg,rgba(2,6,23,0.58),rgba(2,6,23,0.24)_42%,rgba(2,6,23,0.62))] md:bg-[radial-gradient(circle_at_20%_18%,rgba(15,23,42,0.12),transparent_36%),linear-gradient(90deg,rgba(2,6,23,0.74)_0%,rgba(2,6,23,0.42)_48%,rgba(2,6,23,0.12)_100%)]" />
                <div className="space-y-4 animate-slide-in-right">
                   <h1 className="hero-name-cinematic text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                     Juliano <span className="surname text-gradient">Conzatti</span>
                   </h1>
                   
                   <h2 className="hero-role-premium text-xl font-semibold text-primary/90 md:text-2xl lg:text-3xl">
                     {t('hero.role')}
                   </h2>
                   <p className="hero-subtext-cinematic text-lg text-white/82 md:text-xl">
                     {t('hero.subtitle')}
                   </p>
                 </div>
 
                 <div className="max-w-2xl pt-4">
                   <p className="text-base leading-relaxed text-white/88 md:text-lg">
                     {/* AQUI ESTÁ A MÁGICA: Chamamos a função para renderizar o texto */}
                     {renderWithHighlights(t('hero.description'), "text-primary font-semibold")}
                   </p>
                 </div>
 
                 <div className="flex flex-col gap-4 pt-6 sm:flex-row">
                   <Button
                     size="lg"
                     className="group bg-gradient-to-r from-primary to-primary-glow px-8 py-6 text-lg transition-smooth hover:shadow-glow"
                     asChild
                   >
                     <a href="https://taggo.one/hcjuliano" target="_blank" rel="noopener noreferrer">
                       {t('hero.cta')}
                       <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                     </a>
                   </Button>
                 </div>
              </div>
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
                    <Link to={lp(`/blog/${latestPost.slug.current}`)}>
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