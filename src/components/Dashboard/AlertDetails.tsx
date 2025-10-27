import { AlertTriangle, User, Clock, Globe, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AlertUser {
  id: number;
  name: string;
  email: string;
  site: string;
  category: string;
  time: string;
  severity: "high" | "medium" | "low";
}

interface AlertDetailsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const alertUsers: AlertUser[] = [
  {
    id: 1,
    name: "João Silva",
    email: "joao.silva@empresa.com",
    site: "facebook.com",
    category: "Redes Sociais",
    time: "10:23",
    severity: "high"
  },
  {
    id: 2,
    name: "Maria Santos",
    email: "maria.santos@empresa.com",
    site: "instagram.com",
    category: "Redes Sociais",
    time: "10:45",
    severity: "high"
  },
  {
    id: 3,
    name: "Pedro Costa",
    email: "pedro.costa@empresa.com",
    site: "twitch.tv",
    category: "Streaming",
    time: "11:12",
    severity: "medium"
  },
  {
    id: 4,
    name: "Ana Oliveira",
    email: "ana.oliveira@empresa.com",
    site: "netflix.com",
    category: "Streaming",
    time: "11:34",
    severity: "medium"
  },
  {
    id: 5,
    name: "Carlos Mendes",
    email: "carlos.mendes@empresa.com",
    site: "games.com",
    category: "Jogos",
    time: "12:05",
    severity: "high"
  },
  {
    id: 6,
    name: "Juliana Ferreira",
    email: "juliana.ferreira@empresa.com",
    site: "twitter.com",
    category: "Redes Sociais",
    time: "13:20",
    severity: "medium"
  },
  {
    id: 7,
    name: "Roberto Lima",
    email: "roberto.lima@empresa.com",
    site: "youtube.com",
    category: "Streaming",
    time: "14:15",
    severity: "low"
  },
  {
    id: 8,
    name: "Fernanda Rocha",
    email: "fernanda.rocha@empresa.com",
    site: "tiktok.com",
    category: "Redes Sociais",
    time: "15:30",
    severity: "high"
  },
];

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "high":
      return "bg-destructive/10 text-destructive border-destructive/20";
    case "medium":
      return "bg-warning/10 text-warning border-warning/20";
    case "low":
      return "bg-accent/10 text-accent border-accent/20";
    default:
      return "bg-muted/10 text-muted-foreground border-muted/20";
  }
};

const getSeverityLabel = (severity: string) => {
  switch (severity) {
    case "high":
      return "Alta";
    case "medium":
      return "Média";
    case "low":
      return "Baixa";
    default:
      return "Normal";
  }
};

export function AlertDetails({ open, onOpenChange }: AlertDetailsProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[85vh] p-0">
        <DialogHeader className="p-6 pb-4 border-b border-border/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-warning/10 border border-warning/20">
                <AlertTriangle className="w-5 h-5 text-warning" />
              </div>
              <DialogTitle className="text-2xl">Detalhes dos Alertas</DialogTitle>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
                8 alertas ativos
              </Badge>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Usuários que acessaram sites indevidos hoje
          </p>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(85vh-180px)]">
          <div className="p-6 space-y-4">
            {alertUsers.map((user) => (
              <div
                key={user.id}
                className="p-4 rounded-lg border border-border/50 bg-card hover:bg-muted/20 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="font-semibold">{user.name}</h3>
                        <Badge 
                          variant="outline" 
                          className={getSeverityColor(user.severity)}
                        >
                          Severidade {getSeverityLabel(user.severity)}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                      
                      <div className="flex items-center gap-4 flex-wrap text-sm">
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium">{user.site}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 rounded bg-accent/10 text-accent text-xs">
                            {user.category}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>{user.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="p-6 pt-4 border-t border-border/50 bg-muted/20">
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              Total de {alertUsers.length} acessos indevidos detectados
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
