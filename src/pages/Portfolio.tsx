import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, 
  ExternalLink, 
  Bot, 
  BookOpen, 
  BrainCircuit, 
  DollarSign, 
  Link as LinkIcon, 
  Code,
  Activity,
  Clock,
  MessageCircle,
  ClipboardCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLang } from "@/hooks/use-lang";
import { ProjectCard } from "@/components/ProjectCard";

const Portfolio = () => {
  const { t } = useLanguage();
  const { lp } = useLang();

  const projectTags = {
    julishub: (t('portfolio.projects.julishub.tags') as unknown as string[]) || [],
    atendimento: (t('portfolio.projects.atendimento.tags') as unknown as string[]) || [],
    gerador: (t('portfolio.projects.gerador.tags') as unknown as string[]) || [],
    metodologias: (t('portfolio.projects.metodologias.tags') as unknown as string[]) || [],
  };

  useEffect(() => {
    document.title = `${t('portfolio.title')} | Juliano Conzatti`;
    // Garante que a página comece no topo ao carregar
    window.scrollTo(0, 0);
  }, [t]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-card">
      {/* Navegação fixa no topo (já inclui ThemeToggle e LanguageToggle) */}
      <Navigation />
      
      {/* Ajustei o padding-top (pt-28) para compensar a altura da Navigation fixa.
        Mantive max-w-4xl para a lista centralizada conforme seu desejo.
      */}
      <div className="max-w-4xl mx-auto px-6 pt-28 pb-20">
        <Button
          variant="ghost"
          className="mb-8 group"
          asChild
        >
          <Link to={lp('/')}>
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            {t('portfolio.back')}
          </Link>
        </Button>

        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            {t('portfolio.headerPrefix')} <span className="text-gradient">{t('portfolio.headerHighlight')}</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('portfolio.description')}
          </p>
        </div>

        {/* Lista vertical de projetos (flex-col) */}
        <div className="flex flex-col gap-6 animate-fade-in-up">
          
          {/* CARD 1: JULISHUB */}
          <ProjectCard
            title={t('portfolio.projects.julishub.title')}
            description={t('portfolio.projects.julishub.description')}
            icon={<DollarSign className="w-6 h-6" />}
            tags={projectTags.julishub}
          >
            <Button asChild size="sm" variant="default">
              <a href="https://julishub.vercel.app/" target="_blank" rel="noopener noreferrer">
                <LinkIcon className="w-3 h-3 mr-2" /> {t('portfolio.viewProject')}
              </a>
            </Button>
            <Button asChild size="sm" variant="outline">
              <a href="https://github.com/jhconzatti/julishub" target="_blank" rel="noopener noreferrer">
                <Code className="w-3 h-3 mr-2" /> {t('portfolio.code')}
              </a>
            </Button>
          </ProjectCard>

          {/* CARD 2: ATENDIMENTO DE EXCELÊNCIA */}
          <ProjectCard
            title={t('portfolio.projects.atendimento.title')}
            description={t('portfolio.projects.atendimento.description')}
            icon={<BookOpen className="w-6 h-6" />}
            tags={projectTags.atendimento}
          >
            <Button asChild size="sm" variant="default">
              <a href="https://atendimento-de-excelencia.lovable.app/" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-3 h-3 mr-2" /> {t('portfolio.access')}
              </a>
            </Button>
            {/* Links secundários agrupados */}
            <div className="flex gap-2">
                <Button asChild size="sm" variant="ghost" className="text-xs px-2 h-9">
                <Link to={lp('/guia-ia-suporte')}>{t('portfolio.guideIA')}</Link>
                </Button>
                <Button asChild size="sm" variant="ghost" className="text-xs px-2 h-9">
                <Link to={lp('/mestres-diagnostico')}>{t('portfolio.diagnosis')}</Link>
                </Button>
            </div>
          </ProjectCard>

          {/* CARD 3: GERADOR KCS */}
          <ProjectCard
            title={t('portfolio.projects.gerador.title')}
            description={t('portfolio.projects.gerador.description')}
            icon={<Bot className="w-6 h-6" />}
            tags={projectTags.gerador}
          >
            <Button asChild size="sm" className="bg-primary/90 hover:bg-primary">
              <Link to={lp('/gerador-kcs')}>
                <Bot className="w-3 h-3 mr-2" /> {t('portfolio.testTool')}
              </Link>
            </Button>
          </ProjectCard>

          {/* CARD 4: METODOLOGIAS */}
          <ProjectCard
            title={t('portfolio.projects.metodologias.title')}
            description={t('portfolio.projects.metodologias.description')}
            icon={<BrainCircuit className="w-6 h-6" />}
            tags={projectTags.metodologias}
          >
             <div className="text-xs text-muted-foreground flex items-center h-9">
                {t('portfolio.resourcesIntegrated')}
             </div>
          </ProjectCard>

          {/* Work In Progress Section */}
          <div className="mt-12 w-full">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">{t('portfolio.wipHeader')}</h2>
                <p className="text-sm text-muted-foreground">{t('portfolio.wipSubtitle')}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
              {/* Card Template - 4 cards */}
              {[
                {
                  title: 'Client Health Monitor',
                  subtitle: 'Predição de Churn & CS',
                  description: 'Dashboard preditivo que utiliza algoritmos ponderados para cruzar tickets críticos, tempo sem login e NPS, gerando um "Health Score" que antecipa o cancelamento antes que ele aconteça.',
                  stack: 'Python • Pandas • Data Viz',
                  icon: <Activity className="w-12 h-12 text-muted group-hover:text-primary transition-colors" />
                },
                {
                  title: 'SLA Crusher',
                  subtitle: 'Gestão de Crise & Suporte',
                  description: 'Kanban inteligente que revoluciona a fila de atendimento. Prioriza chamados baseado no impacto financeiro e contratual (multas), com contagem regressiva e alertas de "Zona de Perigo".',
                  stack: 'SQL • Python • Lógica de Negócio',
                  icon: <Clock className="w-12 h-12 text-muted group-hover:text-primary transition-colors" />
                },
                {
                  title: 'AI Sentiment Triage',
                  subtitle: 'Empatia via Inteligência Artificial',
                  description: 'Ferramenta de triagem que usa NLP para detectar o humor do cliente (Feliz, Neutro, Furioso) na abertura do ticket, sugerindo ao analista a postura ideal para evitar escalonamentos.',
                  stack: 'Python (NLTK) • AI • API',
                  icon: <MessageCircle className="w-12 h-12 text-muted group-hover:text-primary transition-colors" />
                },
                {
                  title: 'Onboarding Tracker',
                  subtitle: 'A Ponte Vendas-Suporte',
                  description: 'Régua de implantação gamificada para eliminar o "buraco negro" entre a venda e o Go-Live. Mostra visualmente o progresso de Setup e Treinamento para reduzir o Early Churn.',
                  stack: 'Frontend Dinâmico • Processos',
                  icon: <ClipboardCheck className="w-12 h-12 text-muted group-hover:text-primary transition-colors" />
                }
              ].map((p, i) => (
                <div key={i} className={`group bg-card/50 border-border/50 backdrop-blur-sm rounded-lg overflow-hidden relative hover:shadow-glow transition-all duration-500`}>
                  <div className="pointer-events-none absolute -inset-y-10 -left-1/3 w-1/2 rotate-12 bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 blur-md transition-all duration-700 group-hover:left-full group-hover:opacity-100" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-primary/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="h-40 bg-gradient-to-br from-gray-300 to-gray-400 filter grayscale opacity-80 group-hover:filter-none group-hover:opacity-100 transition-all flex items-center justify-center">
                    {p.icon}
                  </div>
                  <div className="p-4">
                    <div className="absolute top-3 right-3">
                      <span className="bg-yellow-400 text-black text-xs font-semibold px-2 py-1 rounded-full">{t('portfolio.wipBadge')}</span>
                    </div>
                    <h3 className="text-lg font-bold mt-2">{p.title}</h3>
                    <p className="text-sm text-primary font-medium">{p.subtitle}</p>
                    <p className="text-sm text-foreground/80 mt-3 mb-3 leading-relaxed">{p.description}</p>
                    <div className="flex gap-2 flex-wrap mb-4">
                      {p.stack.split(' • ').map((s, idx) => (
                        <span key={idx} className="text-xs px-2 py-1 rounded-full border border-border/60 bg-muted/80 transition-all duration-300 hover:bg-primary/15 hover:text-primary hover:border-primary/40">
                          {s}
                        </span>
                      ))}
                    </div>
                    <div>
                      <Button disabled className="w-full" aria-disabled>
                        {t('portfolio.notifyMe')}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
};

export default Portfolio;