import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Sparkles, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import profilePhoto from "@/assets/profile-photo.jpg";

const GENERATOR_DISABLED_MESSAGE =
  "Sistema desativado provisoriamente: a integração com a API do Gemini foi removida temporariamente por segurança.";

// O "Cérebro" do KCS, baseado no seu Guia de Estilo (KCS - Guia de estilo para edição de artigos.pdf)
const KCS_GUIDE_PROMPT = `
Você é um Líder Técnico de Suporte da Senior Sistemas, especialista em KCS (Knowledge-Centered Service).
Sua missão é revisar o "Texto-Fonte" de um artigo para que ele se adeque 100% ao Guia de Estilo KCS.

REGRAS OBRIGATÓRIAS DO GUIA DE ESTILO:

1.  **Formato de Saída:** Markdown puro.
2.  **Estrutura:** As palavras-chave **Título**, **Incidente** ou **Dúvida**, **Causa** (se aplicável), **Solução**, **Rótulos** e **Artigo Interno ou Externo?** devem estar em **negrito** (ex: **Título**).
3.  **Espaçamento:** Deve haver uma linha em branco entre cada seção principal. [cite: 408]
4.  **Título:** Formato: 'Ronda XT - Rotina - Mensagem/Dúvida'. Não use números de artigo (ex: 10422) nem pontuação final. [cite: 82, 129, 131]
5.  **Dúvida:** Deve começar com "Como", "Qual", "Quando" ou "Quais". [cite: 165] Artigos de Dúvida **NÃO POSSUEM CAUSA**. [cite: 71]
6.  **Incidente:** Deve começar com "No Ronda XT, ao tentar/realizar...". [cite: 210] Artigos de Incidente **SEMPRE POSSUEM CAUSA**. [cite: 77]
7.  **Causa:** Deve começar com "Este incidente ocorre, pois..." ou "Esta mensagem é apresentada, pois...". [cite: 285]
8.  **Solução:** Deve ser um passo-a-passo (lista numerada) se houver ação. [cite: 324] Usar verbos de ordem (Acesse, Verifique, Execute). [cite: 327] Nomes de parâmetros, arquivos ou mensagens devem estar em 'itálico'. [cite: 292]
9.  **Rótulos:** Liste 5-7 palavras-chave (em 'itálico') que NÃO estejam no título. [cite: 416, 420]
10. **Classificação:** Sempre será "Artigo Externo: ficará visível para todos. São os artigos que serão disponibilizados para toda a rede, inclusive externa." [cite: 426]

TAREFA:
Revise o Texto-Fonte abaixo e retorne APENAS o artigo formatado em Markdown, seguindo TODAS as regras.

---
TEXTO-FONTE:
{TEXTO_DO_ARTIGO}
---

INÍCIO DA REVISÃO KCS:
#REVISÃO_ARTIGO
`;

// --- FIM DA INTEGRAÇÃO DO GEMINI ---


const GeradorKCS = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    document.title = "Gerador de KCS com IA (Gemini) | Juliano Conzatti";
  }, []);

  const scrollToGenerator = () => {
    document.getElementById("generator-section")?.scrollIntoView({ 
      behavior: "smooth",
      block: "start"
    });
  };

  const handleGenerate = async () => {
    setOutputText(GENERATOR_DISABLED_MESSAGE);
    toast({
      title: "Gerador desativado",
      description: "A integração com o Gemini foi removida provisoriamente por segurança.",
      variant: "destructive",
    });
  };


  const handleCopy = async () => {
    if (!outputText) return;
    
    try {
      await navigator.clipboard.writeText(outputText);
      setCopied(true);
      toast({
        title: "Copiado!",
        description: "Texto copiado para a área de transferência.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({
        title: "Erro",
        description: "Não foi possível copiar o texto.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <ThemeToggle />
      <Navigation />
      
      {/* Seção 1: Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
            Gerador de Artigos KCS com IA
          </h1>
          <h3 className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Uma ferramenta de portfólio por Juliano Conzatti, aplicando a API do Google Gemini 
            para automatizar a revisão de artigos de suporte e garantir 100% de conformidade 
            com o Guia de Estilo KCS.
          </h3>
          <Button 
            onClick={scrollToGenerator}
            size="lg"
            className="shadow-elegant hover:shadow-glow transition-smooth"
          >
            Ir para a Ferramenta
          </Button>
        </div>
      </section>

      {/* Seção 2: A Ferramenta */}
      <section id="generator-section" className="py-20 px-6 bg-card/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Execute o Gerador</h2>
          <p className="text-center text-sm text-muted-foreground mb-6">
            Desativado provisoriamente por segurança para evitar uso indevido de tokens de API.
          </p>
          
          <div className="space-y-8">
            {/* Caixa de Input */}
            <div className="space-y-3">
              <label className="text-lg font-semibold block">
                1. Cole o Texto-Fonte do Artigo
              </label>
              <Textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Cole aqui o texto-fonte completo do seu artigo (o 'Problema' e 'Solução' do Zendesk)..."
                className="min-h-[200px] resize-y"
              />
              <Button
                onClick={handleGenerate}
                size="lg"
                className="w-full md:w-auto shadow-elegant hover:shadow-glow transition-smooth"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                ✨ Gerador desativado provisoriamente
              </Button>
            </div>

            {/* Caixa de Output */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-lg font-semibold block">
                  2. Resultado Formatado (Markdown)
                </label>
                {outputText && (
                  <Button
                    onClick={handleCopy}
                    variant="outline"
                    size="sm"
                    className="gap-2"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4" />
                        Copiado!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        Copiar
                      </>
                    )}
                  </Button>
                )}
              </div>
              <Textarea
                value={outputText}
                readOnly
                placeholder="Seu KCS formatado em Markdown aparecerá aqui, pronto para copiar..."
                className="min-h-[200px] resize-y bg-muted/50"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Seção 3: Sobre o Projeto */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Sobre Este Projeto</h2>
          
          <Card className="p-8 shadow-elegant">
            <div className="grid md:grid-cols-[200px_1fr] gap-8 items-start">
              {/* Coluna 1: Foto */}
              <div className="flex justify-center">
                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-primary/20 shadow-glow">
                  <img 
                    src={profilePhoto} 
                    alt="Juliano Conzatti" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Coluna 2: Texto */}
              <div className="space-y-6">
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Criei este projeto para demonstrar como a Inteligência Artificial pode 
                  resolver desafios reais de negócios. Esta ferramenta usa a API do Google 
                  Gemini para analisar, reescrever e formatar artigos de suporte (KCS), 
                  transformando texto bruto em conhecimento padronizado instantaneamente. 
                  O objetivo é aumentar a eficiência do time, reduzir o trabalho manual e 
                  melhorar a qualidade da base de conhecimento.
                </p>
                
                <Button 
                  asChild
                  size="lg"
                  className="shadow-elegant hover:shadow-glow transition-smooth"
                >
                  <a 
                    href="https://www.linkedin.com/in/hcjuliano/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Veja meu LinkedIn
                  </a>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GeradorKCS;
