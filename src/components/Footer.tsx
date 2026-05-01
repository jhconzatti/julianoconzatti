import { Code } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLang } from "@/hooks/use-lang";
import { openCookiePreferences } from "@/lib/cookie-consent";

export const Footer = () => {
  const { t } = useLanguage();
  const { lp } = useLang();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background py-12 border-t border-border/40">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col gap-6 text-sm text-muted-foreground md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <p>
              &copy; {currentYear} Juliano Conzatti. {t('footer.rights')}
            </p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <Link
                to={lp('/privacy')}
                className="text-xs underline-offset-4 transition-colors duration-300 hover:text-primary hover:underline md:text-[13px]"
              >
                {t('privacyPolicy.title')}
              </Link>

              <button
                type="button"
                onClick={openCookiePreferences}
                className="text-xs underline-offset-4 transition-colors duration-300 hover:text-primary hover:underline md:text-[13px]"
              >
                {t('cookiePolicy.footerLabel')}
              </button>
            </div>
          </div>
          
          <a 
            href="https://github.com/jhconzatti" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 self-start transition-colors duration-300 hover:text-primary group md:self-auto"
          >
            <Code size={16} className="text-muted-foreground group-hover:text-primary group-hover:rotate-12 transition-all duration-300" />
            <span>
              {t('footer.developedBy')} <span className="font-semibold text-foreground group-hover:text-primary transition-colors">Juliano Conzatti</span>
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
};