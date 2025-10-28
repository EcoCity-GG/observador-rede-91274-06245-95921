import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSelector } from "@/components/LanguageSelector";
import { CookieBanner } from "@/components/CookieBanner";
import { PricingDialog } from "@/components/PricingDialog";
import { useEffect, useState } from "react";
import { useDashboardData } from "@/hooks/useDashboardData"; //
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
  Activity,
  TrendingUp,
  Clock,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Brain,
  Search,
  Filter
} from "lucide-react";



const statsDisplay = [
  { number: "99.9%", label: "Precisão" },
  { number: "24/7", label: "Monitoramento" },
  { number: "500+", label: "Empresas" },
  { number: "<1s", label: "Detecção" }
];

const Landing = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [pricingDialogOpen, setPricingDialogOpen] = useState(false);
  const { data } = useDashboardData();
  const stats = data ? { totalUsers: data.summary.length, totalAlerts: 0, aiDetections: 0 } : null;

  // src/pages/Landing.tsx
  useEffect(() => {
    setIsVisible(true);

    // Vlibras (código comentado conforme sua versão)
    // const script = document.createElement("script");
    // script.src = "https://vlibras.gov.br/app/vlibras-plugin.js";
    // script.async = true;
    // document.body.appendChild(script);

    // script.onload = () => {
    //   // @ts-ignore
    //   new window.VLibras.Widget("https://vlibras.gov.br/app");
    // };

    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 5); // Atualizado para 5 features
    }, 5000);

    return () => {
      // if (script.parentNode) {
      //   document.body.removeChild(script);
      // }
      clearInterval(interval);
    };
  }, []);

  const features = [
    {
      icon: Eye,
      title: "Monitoramento em Tempo Real",
      description: "Acompanhe todos os sites acessados pelos usuários com atualizações instantâneas",
      details: [
        "Registro completo de URLs visitadas",
        "Histórico detalhado de navegação por usuário",
        "Filtros por data, horário e categoria de site",
        "Visualização de acessos ativos em tempo real"
      ],
      metric: "< 100ms",
      metricLabel: "Tempo de detecção",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-500/10 to-cyan-500/10"
    },
    {
      icon: AlertTriangle,
      title: "Alertas de Sites Indevidos",
      description: "Notificações automáticas quando usuários acessam sites bloqueados ou suspeitos",
      details: [
        "Detecção instantânea de sites não permitidos",
        "Alertas por email, SMS e dashboard",
        "Categorização automática de sites (redes sociais, jogos, adulto)",
        "Regras personalizadas por departamento ou usuário"
      ],
      metric: "98.5%",
      metricLabel: "Taxa de detecção",
      gradient: "from-amber-500 to-orange-500",
      bgGradient: "from-amber-500/10 to-orange-500/10"
    },
    {
      icon: BarChart3,
      title: "Dashboard Analítico",
      description: "Visualize padrões de navegação através de gráficos e relatórios detalhados",
      details: [
        "Gráficos de sites mais acessados",
        "Análise de produtividade por usuário",
        "Comparativos entre períodos",
        "Identificação de tendências de acesso"
      ],
      metric: "50+",
      metricLabel: "Tipos de relatórios",
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-500/10 to-pink-500/10"
    },
    {
      icon: Users,
      title: "Gestão de Usuários",
      description: "Monitore individualmente ou em grupos com diferentes políticas de acesso",
      details: [
        "Perfis de monitoramento personalizados",
        "Grupos por departamento ou função",
        "Políticas de acesso diferenciadas",
        "Histórico individual de navegação"
      ],
      metric: "10k+",
      metricLabel: "Usuários monitorados",
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-500/10 to-emerald-500/10"
    },
    {
      icon: FileText,
      title: "Relatórios de Navegação",
      description: "Exporte dados de acesso filtrados por período, usuário ou categoria",
      details: [
        "Relatórios de conformidade e produtividade",
        "Exportação em PDF, Excel e CSV",
        "Agendamento automático de relatórios",
        "Análise de sites mais visitados"
      ],
      metric: "100+",
      metricLabel: "Templates de relatório",
      gradient: "from-red-500 to-rose-500",
      bgGradient: "from-red-500/10 to-rose-500/10"
    }
  ];

  return (
    <div className="min-h-screen bg-background relative">
      {/* Gradiente Animado de Fundo - Atrás de tudo */}
      <div className="fixed inset-0 -z-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 bg-400% animate-background-pan" />
      </div>

      {/* Vlibras Widget Placeholder */}
      <div data-vw="true" className="enabled">
        <div data-vw-access-button="true" className="active"></div>
        <div data-vw-plugin-wrapper="true">
          <div className="vw-plugin-top-wrapper"></div>
        </div>
      </div>

      {/* Background Effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/80 to-background/90" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>

      <PricingDialog open={pricingDialogOpen} onOpenChange={setPricingDialogOpen} />

      {/* Navigation */}
      <nav className="bg-background/80 backdrop-blur-xl border-b border-border/50 sticky top-0 z-50">
         <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-12">
              <div className="flex items-center gap-3 group cursor-pointer" onClick={() => navigate("/")}>
                <img
                  src="/LOGO.png"
                  alt="NexusCore Security Logo"
                  className="w-12 h-12 rounded-xl shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
                />
                <div className="flex flex-col">
                  <span className="font-bold text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    NexusCore Security
                  </span>
                  <span className="text-xs text-muted-foreground -mt-1">Real-time Protection</span>
                </div>
              </div>

              <div className="hidden lg:flex items-center gap-8">
                {["Home", "Recursos", "Dashboard", "Preços", "Contato"].map((item) => (
                  <a
                    key={item} // Key adicionada
                    href={`#${item.toLowerCase()}`}
                    className="text-foreground/80 hover:text-primary transition-all duration-300 font-medium relative group"
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300" />
                  </a>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <LanguageSelector />
              <ThemeToggle />
              <Button
                onClick={() => navigate("/dashboard")}
                className="relative rounded-xl px-6 shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden bg-gradient-to-r from-primary to-secondary"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                <Zap className="w-4 h-4 mr-2 relative z-10 group-hover:rotate-12 transition-transform" />
                <span className="relative z-10">Acessar Dashboard</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-20 pb-32">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column: Text Content */}
            <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium animate-pulse">
                  <Sparkles className="w-4 h-4" />
                  Monitoramento Inteligente de Navegação Web
                </div>
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  Monitore Acessos{" "}
                  <span className="relative inline-block">
                    <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                      Web em Tempo Real
                    </span>
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary blur-2xl opacity-20 -z-10" />
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                  Solução completa para empresas e escolas monitorarem sites acessados,
                  detectarem conteúdo indevido e garantirem produtividade através de alertas inteligentes.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => navigate("/dashboard")}
                  className="relative rounded-xl px-8 py-6 text-lg shadow-lg hover:shadow-2xl transition-all duration-300 group overflow-hidden bg-gradient-to-r from-primary to-secondary"
                  size="lg"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Activity className="w-5 h-5 mr-2 relative z-10 group-hover:scale-110 transition-transform" />
                  <span className="relative z-10">Acessar a Demo</span>
                </Button>
                <Button
                  onClick={() => setPricingDialogOpen(true)}
                  variant="outline"
                  className="rounded-xl px-8 py-6 text-lg border-2 hover:border-primary hover:bg-primary/5 transition-all duration-300 group"
                  size="lg"
                >
                  <FileText className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                  Ver Planos
                </Button>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
                {statsDisplay.map((stat, index) => (
                  <div
                    key={stat.label || index} // Key adicionada
                    className="text-center group cursor-pointer"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                      {stat.number}
                    </div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Dashboard Mockup + Image */}
<div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="absolute -inset-8 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-3xl animate-pulse" />

              {/* Imagem PNG do Empresário (MAIOR E MAIS À ESQUERDA) */}
              <img
                src="/empresario.png" // Caminho da pasta public
                alt="Empresário sorrindo com o dashboard do MonitorPro"
                className="absolute top-34 right-32 w-[1200px] h-auto object-contain z-20 // Tamanho base BEM MAIOR, right positivo
                           lg:w-[2000px] lg:right-64 lg:top-24 // Tamanho LG BEM MAIOR, right positivo
                           transform transition-transform duration-300 hover:scale-105"
                // ^^^^^^^^^^ VALORES AUMENTADOS E MOVIDOS MAIS À ESQUERDA ^^^^^^^^^^
              />

              {/* O Card do Dashboard existente */}
              <div className="relative z-10 bg-card border border-border/50 rounded-2xl p-6 shadow-2xl hover:shadow-primary/10 transition-all duration-500">
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse delay-75" />
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse delay-150" />
                  </div>
                  <div className="text-sm text-muted-foreground ml-2 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    Monitoramento Ativo
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg p-3 text-center border border-primary/20 hover:scale-105 transition-transform">
                      <div className="text-lg font-bold text-primary">{stats?.totalUsers || 156}</div>
                      <div className="text-xs text-muted-foreground">Usuários</div>
                    </div>
                    <div className="bg-gradient-to-br from-amber-500/20 to-amber-500/5 rounded-lg p-3 text-center border border-amber-500/20 hover:scale-105 transition-transform">
                      <div className="text-lg font-bold text-amber-600">{stats?.totalAlerts || 23}</div>
                      <div className="text-xs text-muted-foreground">Alertas</div>
                    </div>
                    <div className="bg-gradient-to-br from-green-500/20 to-green-500/5 rounded-lg p-3 text-center border border-green-500/20 hover:scale-105 transition-transform">
                      <div className="text-lg font-bold text-green-600">1,284</div>
                      <div className="text-xs text-muted-foreground">Sites/hora</div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-muted to-muted/50 rounded-lg h-32 flex items-center justify-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 animate-gradient bg-[length:200%_auto]" />
                    <BarChart3 className="w-8 h-8 text-primary group-hover:scale-110 transition-transform relative z-10" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Sites Acessados Recentemente
                      </span>
                      <span className="text-primary hover:underline cursor-pointer">Ver todos →</span>
                    </div>
                    <div className="space-y-1">
                      {[
                        { site: "facebook.com", status: "Bloqueado", color: "red" },
                        { site: "youtube.com", status: "Alerta", color: "amber" },
                        { site: "linkedin.com", status: "Permitido", color: "green" }
                      ].map((item, index) => (
                        <div
                          key={item.site} // Key adicionada
                          className="flex justify-between text-xs p-2 rounded bg-muted/50 hover:bg-muted transition-colors"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <span className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full bg-${item.color}-500 animate-pulse`} />
                            {item.site}
                          </span>
                          <span className={`text-${item.color}-600 font-medium`}>
                            {item.status}
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
      <section id="recursos" className="py-32 bg-muted/30 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Recursos Completos
            </div>
            <h2 className="text-5xl font-bold mb-6">
              Recursos <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">de Monitoramento</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Controle completo sobre acessos web com tecnologia avançada para detectar sites indevidos e garantir produtividade
            </p>
          </div>

          <div className="space-y-32 max-w-7xl mx-auto">
            {features.map((feature, index) => {
              const isEven = index % 2 === 0;
              const FeatureIcon = feature.icon;
              return (
                <div
                  key={feature.title || index} // Key adicionada
                  className={`grid lg:grid-cols-2 gap-12 items-center`}
                >
                  <div className={`space-y-6 ${!isEven ? 'lg:order-2' : ''}`}>
                    <div className="space-y-4">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} shadow-lg relative group`}>
                        <FeatureIcon className="w-8 h-8 text-white relative z-10" />
                        <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity`} />
                      </div>
                      <div>
                        <h3 className="text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                          {feature.title}
                        </h3>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {feature.details.map((detail, idx) => (
                        <div
                          key={idx} // Key adicionada
                          className="flex items-start gap-3 group"
                          style={{ animationDelay: `${idx * 100}ms` }}
                        >
                          <div className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br ${feature.gradient} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                            <CheckCircle className="w-3 h-3 text-white" />
                          </div>
                          <p className="text-foreground/80 group-hover:text-foreground transition-colors">
                            {detail}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className={`inline-flex items-center gap-4 px-6 py-4 rounded-2xl bg-gradient-to-br ${feature.bgGradient} border border-border/50`}>
                      <div>
                        <div className={`text-3xl font-bold bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}>
                          {feature.metric}
                        </div>
                        <div className="text-sm text-muted-foreground">{feature.metricLabel}</div>
                      </div>
                      <TrendingUp className="w-6 h-6 text-green-500" />
                    </div>
                  </div>
                  <div className={`relative ${!isEven ? 'lg:order-1' : ''}`}>
                    <div className={`absolute -inset-4 bg-gradient-to-br ${feature.gradient} opacity-20 rounded-3xl blur-2xl`} />
                    <div className="relative bg-card border border-border/50 rounded-3xl p-8 shadow-2xl hover:shadow-primary/10 transition-all duration-500 overflow-hidden group">
                      <div className="absolute inset-0 opacity-5">
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:2rem_2rem]" />
                      </div>
                      <div className="relative z-10 space-y-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${feature.gradient} animate-pulse`} />
                            <span className="text-sm font-medium text-muted-foreground">Sistema Ativo</span>
                          </div>
                          <div className="flex gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse delay-75" />
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse delay-150" />
                          </div>
                        </div>

                        {/* Mocks condicionais (como no código original) */}
                        {index === 0 && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-3 gap-3">
                              {["Sites Visitados", "URLs Únicas", "Tempo Online"].map((label, i) => (
                                <div key={i} className={`h-24 bg-gradient-to-br ${feature.bgGradient} rounded-xl border border-border/50 flex flex-col items-center justify-center`}>
                                  <Eye className="w-6 h-6 text-primary animate-pulse mb-2" style={{ animationDelay: `${i * 200}ms` }} />
                                  <div className="text-xs text-muted-foreground text-center px-1">{label}</div>
                                </div>
                              ))}
                            </div>
                            <div className="h-32 bg-gradient-to-br from-muted to-muted/50 rounded-xl border border-border/50 flex items-center justify-center">
                              <div className="text-center">
                                <div className="text-2xl font-bold text-primary">1,284</div>
                                <div className="text-xs text-muted-foreground">Sites monitorados hoje</div>
                              </div>
                            </div>
                          </div>
                        )}
                        {index === 1 && (
                           <div className="space-y-3">
                            {[
                              { label: "Redes Sociais Bloqueadas", severity: "high", time: "Agora" },
                              { label: "Site de Jogos Detectado", severity: "medium", time: "2 min atrás" },
                              { label: "Conteúdo Impróprio", severity: "high", time: "5 min atrás" }
                            ].map((alert, i) => (
                              <div
                                key={i} // Key adicionada
                                className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl border border-border/50 hover:bg-muted transition-colors"
                                style={{ animationDelay: `${i * 150}ms` }}
                              >
                                <AlertTriangle className={`w-5 h-5 ${alert.severity === 'high' ? 'text-red-500' : 'text-amber-500'} animate-pulse`} />
                                <div className="flex-1">
                                  <div className="font-medium text-sm">{alert.label}</div>
                                  <div className="text-xs text-muted-foreground">{alert.time}</div>
                                </div>
                                <ArrowRight className="w-4 h-4 text-muted-foreground" />
                              </div>
                            ))}
                          </div>
                        )}
                         {index === 2 && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                              {[
                                { label: "Sites Produtivos", value: "67%", color: "green" },
                                { label: "Sites Bloqueados", value: "12%", color: "red" }
                              ].map((metric, i) => (
                                <div key={i} className="p-4 bg-gradient-to-br from-muted to-muted/50 rounded-xl border border-border/50">
                                  <div className={`text-2xl font-bold text-${metric.color}-500`}>{metric.value}</div>
                                  <div className="text-xs text-muted-foreground">{metric.label}</div>
                                </div>
                              ))}
                            </div>
                            <div className="h-40 bg-gradient-to-br from-muted to-muted/50 rounded-xl border border-border/50 flex items-center justify-center relative overflow-hidden">
                              <BarChart3 className="w-12 h-12 text-primary/50" />
                              <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />
                            </div>
                          </div>
                        )}
                        {index === 3 && (
                           <div className="space-y-3">
                            {[
                              { name: "Marketing", sites: 234 },
                              { name: "Desenvolvimento", sites: 189 },
                              { name: "Administrativo", sites: 156 }
                            ].map((teamData, i) => (
                              <div
                                key={i} // Key adicionada
                                className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl border border-border/50 hover:bg-muted transition-colors"
                                style={{ animationDelay: `${i * 150}ms` }}
                              >
                                <Users className="w-5 h-5 text-primary" />
                                <div className="flex-1">
                                  <div className="font-medium text-sm">{teamData.name}</div>
                                  <div className="text-xs text-muted-foreground">{teamData.sites} sites acessados hoje</div>
                                </div>
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                              </div>
                            ))}
                          </div>
                        )}
                        {index === 4 && (
                           <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                              {["PDF", "Excel", "CSV", "JSON"].map((format, i) => (
                                <div
                                  key={i} // Key adicionada
                                  className="p-3 bg-gradient-to-br from-muted to-muted/50 rounded-xl border border-border/50 text-center hover:scale-105 transition-transform cursor-pointer"
                                >
                                  <FileText className="w-5 h-5 text-primary mx-auto mb-2" />
                                  <div className="text-xs font-medium">{format}</div>
                                </div>
                              ))}
                            </div>
                            <div className="p-4 bg-muted/50 rounded-xl border border-border/50">
                              <div className="flex items-center justify-between mb-3">
                                <span className="text-sm font-medium">Relatório de Acessos</span>
                                <span className="text-xs text-muted-foreground">Último mês</span>
                              </div>
                              <div className="space-y-2">
                                <div className="h-2 bg-primary/20 rounded-full overflow-hidden">
                                  <div className="h-full bg-gradient-to-r from-primary to-secondary w-3/4 animate-pulse" />
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="pt-4 border-t border-border/50 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center`}>
                              <Zap className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-xs text-muted-foreground">Powered by AI</span>
                          </div>
                          <Button variant="ghost" size="sm" className="text-xs">
                            Ver mais <ArrowRight className="w-3 h-3 ml-1" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-32 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-transparent to-muted/30" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <Brain className="w-4 h-4" />
              Tecnologia Avançada
            </div>
            <h2 className="text-5xl font-bold mb-6">
              Como Funciona o <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Monitoramento</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Sistema inteligente que rastreia e analisa todos os acessos web em tempo real
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Search,
                title: "Detecção Automática",
                description: "Captura cada URL acessada pelos usuários através de extensão de navegador",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                icon: Filter,
                title: "Categorização Inteligente",
                description: "IA classifica sites automaticamente em categorias (social, produtivo, impróprio)",
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                icon: AlertTriangle,
                title: "Alertas Instantâneos",
                description: "Notificações em tempo real quando detecta acesso a sites bloqueados",
                gradient: "from-red-500 to-orange-500"
              }
            ].map((tech, index) => (
              <div
                key={tech.title || index} // Key adicionada
                className="relative group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`absolute -inset-2 bg-gradient-to-r ${tech.gradient} opacity-0 group-hover:opacity-20 rounded-2xl blur-xl transition-opacity duration-500`} />
                <div className="relative bg-card border border-border rounded-2xl p-8 hover:shadow-2xl transition-all duration-500">
                  <div className={`w-16 h-16 bg-gradient-to-br ${tech.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <tech.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{tech.title}</h3>
                  <p className="text-muted-foreground">{tech.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#fff2_1px,transparent_1px),linear-gradient(to_bottom,#fff2_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              Comece Hoje Mesmo
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
              Pronto para Monitorar<br />Acessos Web com Inteligência?
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Junte-se a centenas de empresas e escolas que já protegem sua produtividade monitorando sites indevidos
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Button
                onClick={() => navigate("/dashboard")}
                className="bg-white text-primary hover:bg-white/90 rounded-xl px-8 py-6 text-lg shadow-2xl hover:shadow-white/20 hover:scale-105 transition-all duration-300 group"
                size="lg"
              >
                <Zap className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                Começar Monitoramento
              </Button>
              <Button
                onClick={() => setPricingDialogOpen(true)}
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 rounded-xl px-8 py-6 text-lg hover:scale-105 transition-all duration-300"
                size="lg"
              >
                <FileText className="w-5 h-5 mr-2" />
                Ver Planos
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16">
              {[
                { number: "500+", label: "Empresas Monitorando" },
                { number: "50k+", label: "Usuários Rastreados" },
                { number: "99.9%", label: "Taxa de Detecção" },
                { number: "24/7", label: "Monitoramento Ativo" }
              ].map((stat, index) => (
                <div
                  key={stat.label || index} // Key adicionada
                  className="text-center"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-sm text-white/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <img
                  src="https://i.ibb.co/gF7msvyr/LOGO-PERFIL-1.png"
                  alt="MonitorPro Logo"
                  className="w-12 h-12 rounded-xl shadow-lg"
                />
                <div>
                  <span className="font-bold text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    MonitorPro
                  </span>
                  <div className="text-xs text-muted-foreground">Web Access Monitor</div>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed max-w-md mb-6">
                Solução completa de monitoramento de acessos web para empresas e instituições de ensino.
                Detecte sites indevidos e garanta produtividade 24/7.
              </p>
              <div className="flex gap-4">
                {[Globe, Shield, Lock].map((Icon, index) => (
                  <div
                    key={index} // Key adicionada
                    className="w-10 h-10 bg-muted hover:bg-primary/10 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 group"
                  >
                    <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                ))}
              </div>
            </div>
            {[
              {
                title: "Produto",
                links: ["Recursos", "Dashboard", "Preços", "API", "Extensão"]
              },
              {
                title: "Empresa",
                links: ["Sobre", "Blog", "Casos de Uso", "Contato", "Parceiros"]
              },
              {
                title: "Legal",
                links: ["Privacidade", "LGPD", "Termos", "Cookies", "Compliance"]
              }
            ].map((section) => (
              <div key={section.title}>
                <h4 className="font-semibold mb-6 text-lg">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
                      >
                        <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all" />
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="pt-8 border-t border-border">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <span className="text-sm text-muted-foreground">
                © 2025 MonitorPro. Todos os direitos reservados.
              </span>
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Sistema de monitoramento ativo
                </span>
                <span>|</span>
                <span>Feito com ❤️ no Brasil</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <CookieBanner />

      <style>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
        
        .delay-75 {
          animation-delay: 75ms;
        }
        
        .delay-150 {
          animation-delay: 150ms;
        }
        
        .delay-1000 {
          animation-delay: 1000ms;
        }
      `}</style>
    </div>
  );
};

export default Landing;
