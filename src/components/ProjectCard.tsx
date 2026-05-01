import { ReactNode } from 'react';

interface ProjectCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  tags: string[];
  variant?: "premium" | "minimal";
  children?: ReactNode;
}

type PortfolioVisualVariant = "premium" | "minimal";

const variantClasses: Record<
  PortfolioVisualVariant,
  {
    card: string;
    reflection: string;
    glow: string;
    tag: string;
    overlay: string;
  }
> = {
  premium: {
    card: "duration-500 hover:-translate-y-1 hover:border-primary/50",
    reflection:
      "pointer-events-none absolute -inset-y-10 -left-1/3 w-1/2 rotate-12 bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 blur-md transition-all duration-700 group-hover:left-full group-hover:opacity-100",
    glow:
      "pointer-events-none absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-primary/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100",
    tag: "px-2.5 py-0.5 text-xs rounded-md font-medium border border-border/60 bg-secondary/80 text-secondary-foreground transition-all duration-300 hover:bg-primary/15 hover:text-primary hover:border-primary/40 hover:shadow-sm",
    overlay: "absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none",
  },
  minimal: {
    card: "duration-400 hover:-translate-y-0.5 hover:border-primary/35",
    reflection:
      "pointer-events-none absolute -inset-y-8 -left-1/4 w-2/5 rotate-12 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 blur-sm transition-all duration-700 group-hover:left-full group-hover:opacity-80",
    glow:
      "pointer-events-none absolute inset-0 bg-gradient-to-br from-white/0 via-transparent to-primary/5 opacity-0 transition-opacity duration-400 group-hover:opacity-70",
    tag: "px-2.5 py-0.5 text-xs rounded-md font-medium border border-border/50 bg-secondary/70 text-secondary-foreground transition-colors duration-250 hover:bg-primary/10 hover:text-primary hover:border-primary/30",
    overlay: "absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none",
  },
};

export const ProjectCard = ({ title, description, icon, tags, variant = "premium", children }: ProjectCardProps) => {
  const visual = variantClasses[variant];

  return (
    <div
      className={`
        group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl
        bg-card border border-border/50
        transform transition-all
        flex flex-col md:flex-row w-full
        ${visual.card}
      `}
    >
      <div className={visual.reflection} />
      <div className={visual.glow} />
      
      {/* 1. Área de Ícone (Lateral Esquerda no Desktop) */}
      <div className="
        p-6 flex items-center justify-center md:justify-start
        bg-secondary/30 md:w-48 md:shrink-0 md:border-r border-b md:border-b-0 border-border/50
      ">
        <div className="text-center md:text-left">
           <div className="mb-3 inline-flex p-3 rounded-lg bg-background shadow-sm text-primary">
             {icon}
           </div>
           <h3 className="text-xl font-bold text-foreground leading-tight">
             {title}
           </h3>
        </div>
      </div>

      {/* 2. Conteúdo do Card (Lado Direito) */}
      <div className="p-6 flex flex-col flex-1">
        <p className="text-muted-foreground mb-4 text-base leading-relaxed flex-1">
          {description}
        </p>

        {/* 3. Tecnologias e Ações */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-auto">
          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span 
                  key={index} 
                  className={visual.tag}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Botões (Children) */}
          <div className="flex flex-wrap gap-2 pt-4 sm:pt-0">
            {children}
          </div>
        </div>
      </div>
      
      {/* Efeito de destaque suave */}
      <div className={visual.overlay}></div>
    </div>
  );
};