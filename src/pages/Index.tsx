import { Shield, Activity, Users, AlertTriangle, Settings } from "lucide-react";
import { StatsCard } from "@/components/Dashboard/StatsCard";
import { ChartSection } from "@/components/Dashboard/ChartSection";
import { ActivityLog } from "@/components/Dashboard/ActivityLog";
import { UserSummary } from "@/components/Dashboard/UserSummary";
import { Filters } from "@/components/Dashboard/Filters";
import { AlertDetails } from "@/components/Dashboard/AlertDetails";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Index = () => {
  const navigate = useNavigate();
  const [alertDetailsOpen, setAlertDetailsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
              <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-secondary border border-primary/20 hover:scale-110 transition-transform duration-300">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold hover:text-primary transition-colors">Sistema de Monitoramento</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Bem-vindo, Prof Gu</span>
              <Button 
                onClick={() => navigate("/management")} 
                variant="outline" 
                className="gap-2 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
              >
                <Settings className="w-4 h-4" />
                Gerenciar
              </Button>
              <Button variant="destructive" className="hover:scale-105 transition-transform duration-300">
                SAIR
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-fade-in">
          <StatsCard
            title="Total de Usuários"
            value="156"
            icon={Users}
            trend="+12 esta semana"
            variant="default"
          />
          <div onClick={() => setAlertDetailsOpen(true)} className="cursor-pointer">
            <StatsCard
              title="Alertas Ativos"
              value="8"
              icon={AlertTriangle}
              trend="3 novos hoje"
              variant="warning"
            />
          </div>
          <StatsCard
            title="Uso de IA"
            value="42"
            icon={Shield}
            trend="↑ 15% vs. semana passada"
            variant="success"
          />
          <StatsCard
            title="Atividades Hoje"
            value="1,247"
            icon={Activity}
            trend="Última atualização: agora"
            variant="info"
          />
        </div>

        {/* Chart Section */}
        <div className="mb-8 animate-fade-in">
          <ChartSection />
        </div>

        {/* Filters */}
        <div className="mb-8">
          <Filters />
        </div>

        {/* Activity Log */}
        <div className="mb-8">
          <ActivityLog />
        </div>

        {/* User Summary */}
        <div>
          <UserSummary />
        </div>

        {/* Alert Details Dialog */}
        <AlertDetails open={alertDetailsOpen} onOpenChange={setAlertDetailsOpen} />
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 backdrop-blur-sm mt-12">
        <div className="container mx-auto px-6 py-6 text-center text-sm text-muted-foreground">
          <div className="flex items-center justify-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-primary to-secondary rounded flex items-center justify-center hover:scale-110 transition-transform duration-300">
              <span className="text-white text-xs font-bold">L</span>
            </div>
            <span>© 2025 Sistema de Monitoramento de Acesso. Todos os direitos reservados.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
