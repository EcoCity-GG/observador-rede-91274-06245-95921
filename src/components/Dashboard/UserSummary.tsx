import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CheckCircle2, AlertTriangle } from "lucide-react";

interface User {
  id: string;
  name: string;
  userId: string;
  totalTime: number;
  records: number;
  lastActivity: string;
  hasAI: boolean;
  hasViolation: boolean;
}

const mockUsers: User[] = [
  { id: "1", name: "Ana Lara Fernandes", userId: "60522655823", totalTime: 0, records: 0, lastActivity: "N/A", hasAI: true, hasViolation: false },
  { id: "2", name: "Gustavo Alves", userId: "PC22", totalTime: 0, records: 0, lastActivity: "N/A", hasAI: false, hasViolation: true },
  { id: "3", name: "Sidney da Silva Paulino", userId: "PC18", totalTime: 0, records: 0, lastActivity: "N/A", hasAI: true, hasViolation: true },
];

export const UserSummary = () => {
  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm border-2 border-primary/20">
      <h2 className="text-2xl font-bold mb-6">Resumo de Atividade</h2>
      <div className="rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="font-semibold">STATUS</TableHead>
              <TableHead className="font-semibold">NOME DO ALUNO</TableHead>
              <TableHead className="font-semibold">ID BRUTO</TableHead>
              <TableHead className="font-semibold">TEMPO TOTAL (MIN)</TableHead>
              <TableHead className="font-semibold">REGISTROS</TableHead>
              <TableHead className="font-semibold">ÚLTIMA ATIVIDADE</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockUsers.map((user) => (
              <TableRow key={user.id} className="hover:bg-muted/30 transition-colors">
                <TableCell>
                  <div className="flex gap-2">
                    {user.hasAI && (
                      <Badge variant="outline" className="bg-success/20 text-success border-success/30">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        IA
                      </Badge>
                    )}
                    {user.hasViolation && (
                      <Badge variant="outline" className="bg-accent/20 text-accent border-accent/30">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        Alerta
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell className="text-muted-foreground">{user.userId}</TableCell>
                <TableCell>{user.totalTime.toFixed(1)}</TableCell>
                <TableCell>{user.records}</TableCell>
                <TableCell className="text-muted-foreground">{user.lastActivity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};
