import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Calendar, Download } from "lucide-react";

export const Filters = () => {
  return (
    <div className="space-y-4">
      <Card className="p-6 bg-card/50 backdrop-blur-sm border-2 border-primary/20">
        <h2 className="text-xl font-bold mb-4">Exportar Relatório Diário</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Selecione a data para gerar um relatório em PDF com os dados de atividade dos alunos. Os relatórios ficam disponíveis por até 3 dias.
        </p>
        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <Label>Data do Relatório</Label>
            <Input type="date" defaultValue="2025-10-27" className="mt-2 border-border" />
          </div>
          <Button className="gradient-primary glow">
            <Download className="w-4 h-4 mr-2" />
            BAIXAR RELATÓRIO
          </Button>
        </div>
      </Card>

      <Card className="p-6 bg-card/50 backdrop-blur-sm border-2 border-primary/20">
        <h2 className="text-xl font-bold mb-4">Filtros de Dados e Visualização</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <Label>Filtrar por Turma</Label>
            <Select defaultValue="all">
              <SelectTrigger className="mt-2 border-border">
                <SelectValue placeholder="Selecione uma turma" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Visão Geral (Todas as Turmas)</SelectItem>
                <SelectItem value="dev_a">DEV_A</SelectItem>
                <SelectItem value="dev_b">DEV_B</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Pesquisar por Aluno/ID/URL</Label>
            <Input placeholder="Digite para buscar..." className="mt-2 border-border" />
          </div>
          <div>
            <Label>Categoria</Label>
            <Select defaultValue="all">
              <SelectTrigger className="mt-2 border-border">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="ia">IA</SelectItem>
                <SelectItem value="social">Redes Sociais</SelectItem>
                <SelectItem value="streaming">Streaming</SelectItem>
                <SelectItem value="games">Jogos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox id="alerts" />
            <label
              htmlFor="alerts"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Apenas Alertas
            </label>
          </div>
          <div className="flex gap-2">
            <Button variant="default" className="gradient-primary">
              APLICAR
            </Button>
            <Button variant="outline" className="border-border">
              LIMPAR
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
