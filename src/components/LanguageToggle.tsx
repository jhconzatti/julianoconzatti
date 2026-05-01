import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const LanguageToggle = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLangChange = (newLang: string) => {
    const rest = location.pathname.replace(/^\/[^/]*/, '') || '';
    navigate(`/${newLang}${rest}`);
  };

  return (
    <div className="flex gap-2 bg-secondary/30 p-1.5 rounded-full border border-border/50 backdrop-blur-sm">
      <TooltipProvider>
        {/* Português - Brasil */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleLangChange('pt')}
              className={`w-8 h-8 rounded-full transition-all hover:bg-background/80 ${
                language === 'pt' 
                  ? 'bg-background shadow-sm ring-2 ring-primary/20 grayscale-0 scale-110' 
                  : 'grayscale opacity-70 hover:grayscale-0 hover:opacity-100 hover:scale-105'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 50" className="w-6 h-6 rounded-sm shadow-sm">
                <rect width="72" height="50" fill="#009c3b"/>
                <polygon points="36,6 66,25 36,44 6,25" fill="#ffdf00"/>
                <circle cx="36" cy="25" r="12" fill="#002776"/>
                <path d="M12,25c0,0,10,5,24,0s24,0,24,0" stroke="#fff" strokeWidth="1.5" fill="none"/>
              </svg>
              <span className="sr-only">Português</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Português</TooltipContent>
        </Tooltip>

        {/* Inglês - EUA */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleLangChange('en')}
              className={`w-8 h-8 rounded-full transition-all hover:bg-background/80 ${
                language === 'en' 
                  ? 'bg-background shadow-sm ring-2 ring-primary/20 grayscale-0 scale-110' 
                  : 'grayscale opacity-70 hover:grayscale-0 hover:opacity-100 hover:scale-105'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 50" className="w-6 h-6 rounded-sm shadow-sm">
                <rect width="72" height="50" fill="#b22234"/>
                <path d="M0,0h72v3.8H0zm0,7.7h72v3.8H0zm0,7.7h72v3.8H0zm0,7.7h72v3.8H0zm0,7.7h72v3.8H0zm0,7.7h72v3.8H0zm0,7.7h72v3.8H0z" fill="#fff"/>
                <path d="M0,0h72v3.8H0zm0,7.7h72v3.8H0zm0,7.7h72v3.8H0zm0,7.7h72v3.8H0zm0,7.7h72v3.8H0zm0,7.7h72v3.8H0z" fill="#b22234"/>
                <rect width="28" height="27" fill="#3c3b6e"/>
                {/* Estrelas simplificadas para SVG pequeno */}
                <path d="M2,2h2v2H2zm4,0h2v2H6zm4,0h2v2h-2zm4,0h2v2h-2zm4,0h2v2h-2zm4,0h2v2h-2z" fill="#fff"/>
                <path d="M4,6h2v2H4zm4,0h2v2H8zm4,0h2v2h-2zm4,0h2v2h-2zm4,0h2v2h-2z" fill="#fff"/>
                <path d="M2,10h2v2H2zm4,0h2v2H6zm4,0h2v2h-2zm4,0h2v2h-2zm4,0h2v2h-2zm4,0h2v2h-2z" fill="#fff"/>
                <path d="M4,14h2v2H4zm4,0h2v2H8zm4,0h2v2h-2zm4,0h2v2h-2zm4,0h2v2h-2z" fill="#fff"/>
                <path d="M2,18h2v2H2zm4,0h2v2H6zm4,0h2v2h-2zm4,0h2v2h-2zm4,0h2v2h-2zm4,0h2v2h-2z" fill="#fff"/>
                <path d="M4,22h2v2H4zm4,0h2v2H8zm4,0h2v2h-2zm4,0h2v2h-2zm4,0h2v2h-2z" fill="#fff"/>
              </svg>
              <span className="sr-only">English</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>English</TooltipContent>
        </Tooltip>

        {/* Espanhol - Argentina */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleLangChange('es')}
              className={`w-8 h-8 rounded-full transition-all hover:bg-background/80 ${
                language === 'es' 
                  ? 'bg-background shadow-sm ring-2 ring-primary/20 grayscale-0 scale-110' 
                  : 'grayscale opacity-70 hover:grayscale-0 hover:opacity-100 hover:scale-105'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 50" className="w-6 h-6 rounded-sm shadow-sm">
                <rect width="72" height="16.6" fill="#75aadb"/>
                <rect y="16.6" width="72" height="16.6" fill="#fff"/>
                <rect y="33.2" width="72" height="16.8" fill="#75aadb"/>
                <circle cx="36" cy="25" r="6" fill="#f6b40e"/>
              </svg>
              <span className="sr-only">Español</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Español</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};