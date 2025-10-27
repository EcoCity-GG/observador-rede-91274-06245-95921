import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSelector } from "@/components/LanguageSelector";
import { CookieBanner } from "@/components/CookieBanner";
import { useEffect, useState } from "react";
import { useDashboardData } from "@/hooks/useDashboardData";
import { 
  Shield, 
  Eye, 
  AlertTriangle, 
  BarChart3, 
  Users, 
  FileText,
  Zap,
  Globe,
  Lock,
  Activity
} from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const { data } = useDashboardData();
  const stats = data ? { totalUsers: data.summary.length, totalAlerts: 0, aiDetections: 0 } : null;

  useEffect(() => {
    setIsVisible(true);
    
    // VLibras integration
    const script = document.createElement("script");
    script.src = "https://vlibras.gov.br/app/vlibras-plugin.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      // @ts-ignore
      new window.VLibras.Widget("https://vlibras.gov.br/app");
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const features = [
    {
      icon: Eye,
      title: "Monitoramento em Tempo Real",
      description: "Acompanhe todas as atividades de navegação com atualizações instantâneas"
    },
    {
      icon: AlertTriangle,
      title: "Alertas Inteligentes",
      description: "Notificações automáticas para acessos indevidos e comportamentos suspeitos"
    },
    {
      icon: BarChart3,
      title: "Dashboard Analítico",
      description: "Visualize dados através de gráficos interativos e relatórios detalhados"
    },
    {
      icon: Users,
      title: "Gestão de Usuários",
      description: "Controle individual ou em grupo com diferentes níveis de permissão"
    },
    {
      icon: FileText,
      title: "Relatórios Customizáveis",
      description: "Exporte dados filtrados por período, usuário ou categoria de acesso"
    },
    {
      icon: Shield,
      title: "Conformidade LGPD",
      description: "Solução totalmente adequada à legislação de proteção de dados"
    }
  ];

  const statsDisplay = [
    { number: "99.9%", label: "Precisão na Classificação" },
    { number: "< 2s", label: "Tempo de Resposta" },
    { number: "500+", label: "Categorias de Sites" },
    { number: "24/7", label: "Monitoramento Contínuo" }
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* VLibras accessibility */}
      <div data-vw="true" className="enabled">
        <div data-vw-access-button="true" className="active"></div>
        <div data-vw-plugin-wrapper="true">
          <div className="vw-plugin-top-wrapper"></div>
        </div>
      </div>

      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Navbar */}
      <nav className="bg-background/80 backdrop-blur-xl border-b border-border/50 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-12">
              <div className="flex items-center gap-3 group cursor-pointer" onClick={() => navigate("/")}>
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    MonitorPro
                  </span>
                  <span className="text-xs text-muted-foreground -mt-1">Security & Analytics</span>
                </div>
              </div>
              
              {/* Navigation Links */}
              <div className="hidden lg:flex items-center gap-8">
                {["Home", "Recursos", "Dashboard", "Preços", "Contato"].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-foreground/80 hover:text-primary transition-all duration-300 font-medium relative group"
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300" />
                  </a>
                ))}
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              <LanguageSelector />
              <ThemeToggle />
              <Button 
                onClick={() => navigate("/dashboard")}
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white rounded-xl px-6 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
              >
                <Zap className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                Acessar Dashboard
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-20 pb-32">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
                  <Shield className="w-4 h-4" />
                  Solução Empresarial de Monitoramento
                </div>
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Controle Total de{" "}
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Acessos Web
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                  Monitoramento inteligente de navegação para empresas e escolas. 
                  Detecte, classifique e alerte sobre acessos indevidos em tempo real.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => navigate("/dashboard")}
                  className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white rounded-xl px-8 py-6 text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
                  size="lg"
                >
                  <Activity className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Experimente Gratuitamente
                </Button>
                <Button 
                  variant="outline"
                  className="rounded-xl px-8 py-6 text-lg border-2 hover:border-primary hover:bg-primary/5 transition-all duration-300"
                  size="lg"
                >
                  <FileText className="w-5 h-5 mr-2" />
                  Ver Demonstração
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
                {statsDisplay.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl font-bold text-primary">{stat.number}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - Dashboard Preview */}
            <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="absolute -inset-8 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-3xl animate-pulse" />
              <div className="relative bg-card border border-border/50 rounded-2xl p-6 shadow-2xl transform hover:scale-105 transition-transform duration-500">
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-full bg-destructive" />
                    <div className="w-3 h-3 rounded-full bg-warning" />
                    <div className="w-3 h-3 rounded-full bg-success" />
                  </div>
                  <div className="text-sm text-muted-foreground ml-2">Dashboard - Visão Geral</div>
                </div>
                
                {/* Mini dashboard preview */}
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-primary/10 rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-primary">{stats?.totalUsers || 0}</div>
                      <div className="text-xs text-muted-foreground">Usuários</div>
                    </div>
                    <div className="bg-warning/10 rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-warning">{stats?.totalAlerts || 0}</div>
                      <div className="text-xs text-muted-foreground">Alertas</div>
                    </div>
                    <div className="bg-success/10 rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-success">{stats?.aiDetections || 0}</div>
                      <div className="text-xs text-muted-foreground">IA Detectada</div>
                    </div>
                  </div>
                  
                  <div className="bg-muted rounded-lg h-32 flex items-center justify-center">
                    <BarChart3 className="w-8 h-8 text-muted-foreground" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Acessos Recentes</span>
                      <span className="text-primary">Ver todos</span>
                    </div>
                    <div className="space-y-1">
                      {["chatgpt.com", "instagram.com", "youtube.com"].map((site, index) => (
                        <div key={site} className="flex justify-between text-xs">
                          <span>{site}</span>
                          <span className={index === 0 ? "text-success" : "text-warning"}>
                            {index === 0 ? "IA" : "Alerta"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="recursos" className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Recursos <span className="text-primary">Avançados</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Tecnologia de ponta para garantir o controle e segurança total da navegação corporativa e educacional
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className="bg-card border border-border rounded-2xl p-8 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2 transition-all duration-500 group"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Como Funciona</h2>
            <p className="text-xl text-muted-foreground">Implementação simples e resultados imediatos</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { step: "01", title: "Instalação", description: "Implemente nossa extensão em navegadores corporativos" },
              { step: "02", title: "Configuração", description: "Defina categorias e políticas de acesso personalizadas" },
              { step: "03", title: "Monitoramento", description: "Acompanhe dados em tempo real pelo dashboard" }
            ].map((item, index) => (
              <div key={item.step} className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 relative">
                  <span className="text-white font-bold text-xl">{item.step}</span>
                  {index < 2 && (
                    <div className="absolute -right-8 top-1/2 w-16 h-0.5 bg-gradient-to-r from-primary to-secondary transform translate-x-full hidden md:block" />
                  )}
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Pronto para Transformar seu Controle de Acesso?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Junte-se a centenas de empresas e escolas que já utilizam nossa solução
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate("/dashboard")}
              className="bg-white text-primary hover:bg-white/90 rounded-xl px-8 py-6 text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              size="lg"
            >
              <Zap className="w-5 h-5 mr-2" />
              Começar Agora
            </Button>
            <Button 
              variant="outline"
              className="border-white text-white hover:bg-white/10 rounded-xl px-8 py-6 text-lg hover:scale-105 transition-all duration-300"
              size="lg"
            >
              Agendar Demonstração
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="font-bold text-lg">MonitorPro</span>
                  <div className="text-xs text-muted-foreground">Security & Analytics</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Solução completa de monitoramento e controle de acesso web para empresas e instituições de ensino.
              </p>
            </div>
            
            {[
              {
                title: "Produto",
                links: ["Recursos", "Dashboard", "Preços", "API"]
              },
              {
                title: "Empresa",
                links: ["Sobre", "Blog", "Carreiras", "Contato"]
              },
              {
                title: "Legal",
                links: ["Privacidade", "LGPD", "Termos", "Cookies"]
              }
            ].map((section) => (
              <div key={section.title}>
                <h4 className="font-semibold mb-4">{section.title}</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="hover:text-primary transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <div className="flex items-center justify-center gap-6 mb-4">
              <span>© 2025 MonitorPro. Todos os direitos reservados.</span>
              <div className="flex gap-4">
                <Globe className="w-4 h-4 hover:text-primary cursor-pointer transition-colors" />
                <Lock className="w-4 h-4 hover:text-primary cursor-pointer transition-colors" />
              </div>
            </div>
          </div>
        </div>
      </footer>

      <CookieBanner />
    </div>
  );
};

export default Landing;
