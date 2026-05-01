import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Sparkles, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import profilePhoto from "@/assets/profile-photo.jpg";

const GENERATOR_DISABLED_MESSAGE =
  "Sistema desativado provisoriamente: a integração com a API do Gemini foi removida temporariamente por segurança.";




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
