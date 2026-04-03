import { ThemeToggle } from "@/components/ThemeToggle";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Sparkles, Target, Info, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";

const GuiaIASuporte = () => {
  useEffect(() => {
    document.title = "Guia de IA no Suporte | Juliano Conzatti";
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-card">
      <ThemeToggle />
      
      <div className="max-w-5xl mx-auto px-6 py-20">
        <Button
          variant="ghost"
          className="mb-8 group"
          asChild
        >
          <Link to="/portfolio">
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Voltar ao Portfólio
          </Link>
        </Button>

        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Guia Básico de <span className="text-gradient">IA no Suporte</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Técnicas e estratégias de excelência em Suporte Técnico potencializadas por Inteligência Artificial, seguindo os padrões HDI-SCA.
          </p>
        </div>

        <div className="space-y-8">
          <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-card backdrop-blur-sm animate-fade-in-up">
            <CardHeader>
              <CardTitle className="text-xl">Essência do Guia e Padrão HDI</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Este guia fornece técnicas e estratégias de excelência em Suporte Técnico e Atendimento ao Cliente (SCA), 
                potencializando o trabalho da equipe de Centro de Suporte através da aplicação dos padrões HDI-SCA somados 
                ao uso simples de IA como ferramenta de apoio.
              </p>
            </CardContent>
          </Card>

          <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Estrutura <span className="text-gradient">4i's</span> para Engenharia de Prompt
            </h2>
            <p className="text-muted-foreground mb-6">
              A estrutura 4i's é a base para a Engenharia de Prompt, otimizando a interação do analista com a IA para 
              tarefas de Suporte Técnico, análise de logs e geração de soluções.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-glow transition-smooth group">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-primary-glow">
                      <Target className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <CardTitle>Intenção</CardTitle>
                  </div>
                  <CardDescription>Define o objetivo final do analista para a IA</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground italic">
                    <strong>Exemplo:</strong> "Minha intenção é que você analise o log anexo e gere um resumo de 3 pontos 
                    que posso utilizar para criação de artigo na base de conhecimento (KCS)."
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-glow transition-smooth group">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-primary-glow">
                      <CheckCircle2 className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <CardTitle>Instrução</CardTitle>
                  </div>
                  <CardDescription>O comando específico para o processamento da IA</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground italic">
                    <strong>Exemplo:</strong> "Identifique a causa raiz e sugira 3 passos de troubleshooting (contorno) 
                    para o incidente de conexão com o banco de dados."
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-glow transition-smooth group">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-primary-glow">
                      <Info className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <CardTitle>Informação</CardTitle>
                  </div>
                  <CardDescription>Contexto e dados de entrada fornecidos à IA</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground italic">
                    <strong>Exemplo:</strong> "O ambiente é Java 17 no Windows, com Oracle DB. A mensagem de erro é: 
                    'ORA-01017: invalid username/password...'"
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-glow transition-smooth group">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-primary-glow">
                      <MessageSquare className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <CardTitle>Interação</CardTitle>
                  </div>
                  <CardDescription>Refinamento da saída da IA para adequação ao processo</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground italic">
                    <strong>Exemplo:</strong> "Ajuste o passo 2 da resolução, substituindo o termo 'resetar' por 'validar' 
                    e formate o resultado para um template de e-mail."
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <Card className="border-primary/50 bg-gradient-to-br from-card to-primary/5 backdrop-blur-sm animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Sparkles className="h-6 w-6 text-primary" />
                <CardTitle className="text-2xl">Técnicas Avançadas de IA</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2 text-primary">Pense passo a passo</h3>
                <p className="text-muted-foreground">
                  Força a IA a aplicar lógica dedutiva, decompondo problemas em etapas sequenciais 
                  (Identificação → Diagnóstico → Ação → Verificação), replicando a disciplina de resolução de problemas do HDI.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2 text-primary">Persona Especialista</h3>
                <p className="text-muted-foreground">
                  Direcione a IA a assumir o papel de um especialista: "Atue como um analista sênior de suporte técnico 
                  com 10 anos de experiência em ambientes Windows Server."
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2 text-primary">Contexto de Negócio</h3>
                <p className="text-muted-foreground">
                  Sempre forneça o impacto: "Este é um servidor de produção crítico com 200 usuários afetados. 
                  A prioridade é restaurar o serviço em menos de 30 minutos."
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default GuiaIASuporte;
