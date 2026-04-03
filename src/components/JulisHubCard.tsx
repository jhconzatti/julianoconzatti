import { ArrowRight, Code, Link, DollarSign, Zap } from 'lucide-react';

const JulisHubCard = () => {
  return (
    <div className="
      group relative overflow-hidden rounded-xl shadow-2xl 
      bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-800
      transform transition-all duration-500 hover:scale-[1.02] hover:shadow-primary/50
    ">
      
      {/* 1. Área de Ícone/Destaque */}
      <div className="p-6 bg-primary/10 dark:bg-primary/50">
          <h3 className="text-2xl font-bold text-foreground mb-0 flex ">
          <DollarSign className="w-8 h-8" /> JulisHub 
        </h3>
      </div>

      {/* 2. Conteúdo do Card */}
      <div className="p-6 bg-background">
        <p className="text-muted-foreground mb-4">
          Plataforma de análise financeira e ferramentas para mercados, indicadores e calculadoras. Desenvolvido para demonstrar arquitetura desacoplada.
        </p>

        {/* 3. Tecnologias */}
        <div className="flex flex-wrap gap-2 text-sm mb-4">
          <span className="px-3 py-1 bg-secundary-600/10 text-secundary-500 rounded-full font-medium">Fullstack</span>
          <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full font-medium">React & Vite</span>
          <span className="px-3 py-1 bg-green-600/10 text-green-500 rounded-full font-medium">Python & FastAPI</span>
          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">Shadcn/ui</span>
        </div>

        {/* 4. Ações (Botões/Links) */}
        <div className="mt-4 flex flex-col sm:flex-row gap-3">
          
          {/* Link para o Site Publicado */}
          <a
            href="https://julishub.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center px-4 py-2 text-sm font-semibold 
                       bg-primary text-primary-foreground rounded-lg transition-colors 
                       hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <Link className="w-4 h-4 mr-2" />
            Ver Projeto
          </a>
          
          {/* Link para o Código Fonte */}
          <a
            href="https://github.com/jhconzatti/julishub" // Substitua pelo caminho real do seu repo
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center px-4 py-2 text-sm font-semibold 
                       bg-secondary text-secondary-foreground rounded-lg transition-colors 
                       hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-secondary/50"
          >
            <Code className="w-4 h-4 mr-2" />
            Código Fonte
          </a>
        </div>
      </div>
      
      {/* Efeito de destaque no hover */}
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none"></div>
    </div>
  );
};

export default JulisHubCard;