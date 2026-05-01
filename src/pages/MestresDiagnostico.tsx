import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowLeft, Search, Target, Microscope, CheckCircle2, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";
import { useLang } from "@/hooks/use-lang";

const MestresDiagnostico = () => {
  const { lp } = useLang();

  useEffect(() => {
    document.title = "Mestres em Diagnóstico | Juliano Conzatti";
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-card">
      <Navigation />
      
      <div className="max-w-5xl mx-auto px-6 pt-28 pb-20">
        <Button
          variant="ghost"
          className="mb-8 group"
          asChild
        >
          <Link to={lp('/portfolio')}>
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Voltar ao Portfólio
          </Link>
        </Button>

        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Mestres em <span className="text-gradient">Diagnóstico</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Um guia de referência para excelência em Suporte Técnico, baseado nos padrões HDI-SCA.
          </p>
        </div>

        <div className="space-y-8">
          <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-card backdrop-blur-sm animate-fade-in-up">
            <CardHeader>
              <CardTitle className="text-xl">Visão de Gestão (HDI-SCM)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Cada ticket resolvido na primeira interação (First Contact Resolution - FCR) representa uma economia direta 
                de custos operacionais e um aumento na satisfação do cliente (CSAT). Um diagnóstico preciso e metódico é o 
                caminho mais rápido para um FCR elevado.
              </p>
            </CardContent>
          </Card>

          <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              O Modelo <span className="text-gradient">ISLA</span>: Seu Guia de Investigação
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-glow transition-smooth group">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-primary-glow">
                      <Search className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <CardTitle>I - Identificar</CardTitle>
                  </div>
                  <CardDescription>Colete e valide a informação inicial com Escuta Ativa</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    O cliente diz "o sistema está lento", mas o problema real é "não consigo gerar o relatório para a reunião 
                    da diretoria". Pratique a escuta ativa para entender o problema real, não apenas o que foi reportado.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-glow transition-smooth group">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-primary-glow">
                      <Target className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <CardTitle>S - Situar</CardTitle>
                  </div>
                  <CardDescription>Entenda o escopo e o impacto com Questionamento Estratégico</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Quem é afetado? Onde o erro acontece? Quando começou? Qual o impacto no negócio? 
                    Use a Técnica do Funil para ir do geral ao específico.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-glow transition-smooth group">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-primary-glow">
                      <Microscope className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <CardTitle>L - Isolar</CardTitle>
                  </div>
                  <CardDescription>Teste hipóteses e elimine variáveis através da Análise Lógica</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    "O erro acontece em outro navegador?", "Acontece com outro usuário?", "Consigo replicar em nosso 
                    ambiente de teste?". Esta é a fase de detetive.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-glow transition-smooth group">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-primary-glow">
                      <CheckCircle2 className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <CardTitle>A - Agir e Arquivar</CardTitle>
                  </div>
                  <CardDescription>Execute a solução e documente no padrão KCS</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Transforme a solução de um problema individual em um ativo para toda a equipe através da documentação 
                    Knowledge-Centered Service.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Manual de <span className="text-gradient">Frases de Poder</span>
            </h2>

            <div className="space-y-4">
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Situação: Você não sabe a resposta</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                    <X className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-destructive mb-1">❌ Frase a Evitar</p>
                      <p className="text-sm">"Eu não sei."</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-primary/10 border border-primary/20">
                    <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-primary mb-1">✅ Frase de Poder</p>
                      <p className="text-sm">
                        "Essa é uma excelente pergunta. Para te dar a resposta correta, preciso consultar nossa base de 
                        conhecimento avançada. Posso te retornar em 15 minutos?"
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Situação: O problema é mais complexo</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                    <X className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-destructive mb-1">❌ Frase a Evitar</p>
                      <p className="text-sm">"Isso vai demorar."</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-primary/10 border border-primary/20">
                    <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-primary mb-1">✅ Frase de Poder</p>
                      <p className="text-sm">
                        "Identifiquei que este caso exige uma análise mais aprofundada para garantir a solução definitiva. 
                        Vou envolver nosso time especializado. Qual seria um prazo confortável para você? Posso sugerir 
                        até amanhã às 14h?"
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Situação: Precisa fazer uma pergunta ao cliente</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                    <X className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-destructive mb-1">❌ Frase a Evitar</p>
                      <p className="text-sm">"Qual o erro?"</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-primary/10 border border-primary/20">
                    <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-primary mb-1">✅ Frase de Poder</p>
                      <p className="text-sm">
                        "Para diagnosticar com precisão, preciso entender melhor o comportamento do sistema. Você poderia 
                        me descrever exatamente o que acontece quando você tenta realizar essa operação? Há alguma mensagem 
                        ou código de erro específico?"
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default MestresDiagnostico;
