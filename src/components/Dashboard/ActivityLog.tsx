import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface LogEntry {
  id: string;
  user: string;
  url: string;
  duration: number;
  category: string;
  timestamp: string;
}

const mockLogs: LogEntry[] = [
  { id: "1", user: "Ana Lara Fernandes", url: "chatgpt.com", duration: 45, category: "IA", timestamp: "27/10/2025 14:32" },
  { id: "2", user: "Gustavo Alves", url: "instagram.com", duration: 120, category: "Redes Sociais", timestamp: "27/10/2025 14:15" },
  { id: "3", user: "Sidney da Silva Paulino", url: "youtube.com", duration: 65, category: "Streaming", timestamp: "27/10/2025 13:48" },
];

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    "IA": "bg-success/20 text-success border-success/30",
    "Redes Sociais": "bg-accent/20 text-accent border-accent/30",
    "Streaming": "bg-warning/20 text-warning border-warning/30",
    "Jogos": "bg-destructive/20 text-destructive border-destructive/30",
  };
  return colors[category] || "bg-muted/20 text-muted-foreground border-muted/30";
};

export const ActivityLog = () => {
  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm border-2 border-primary/20">
      <h2 className="text-2xl font-bold mb-6">Logs de Atividade ({mockLogs.length})</h2>
      <div className="rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="font-semibold">ALUNO</TableHead>
              <TableHead className="font-semibold">URL</TableHead>
              <TableHead className="font-semibold">DURAÇÃO (S)</TableHead>
              <TableHead className="font-semibold">CATEGORIA</TableHead>
              <TableHead className="font-semibold">DATA E HORA</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockLogs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                  Nenhum log encontrado para a seleção atual.
                </TableCell>
              </TableRow>
            ) : (
              mockLogs.map((log) => (
                <TableRow key={log.id} className="hover:bg-muted/30 transition-colors">
                  <TableCell className="font-medium">{log.user}</TableCell>
                  <TableCell className="text-primary">{log.url}</TableCell>
                  <TableCell>{log.duration}</TableCell>
                  <TableCell>
                    <Badge className={`${getCategoryColor(log.category)} border`}>
                      {log.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{log.timestamp}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};
