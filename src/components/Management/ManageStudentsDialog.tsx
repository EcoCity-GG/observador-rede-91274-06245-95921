import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api, Class } from "@/services/api";
import { toast } from "sonner";
import { useAllStudents, useClassStudents } from "@/hooks/useDashboardData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ManageStudentsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  classData: Class | null;
}

export const ManageStudentsDialog = ({ open, onOpenChange, classData }: ManageStudentsDialogProps) => {
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [newStudentName, setNewStudentName] = useState("");
  const [newStudentCpf, setNewStudentCpf] = useState("");
  const [newStudentPcId, setNewStudentPcId] = useState("");
  const queryClient = useQueryClient();

  const { data: allStudents = [] } = useAllStudents();
  const { data: classStudents = [] } = useClassStudents(classData?.id || null);

  const addMutation = useMutation({
    mutationFn: (studentId: number) => api.addStudentToClass(classData!.id, studentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classStudents", classData?.id] });
      toast.success("Aluno adicionado com sucesso!");
      setSelectedStudentId("");
    },
    onError: (error: Error) => {
      toast.error(`Erro: ${error.message}`);
    },
  });

  const createAndAddMutation = useMutation({
    mutationFn: async (data: { fullName: string; cpf?: string; pc_id?: string }) => {
      const result = await api.createStudent(data);
      await api.addStudentToClass(classData!.id, result.student.id);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allStudents"] });
      queryClient.invalidateQueries({ queryKey: ["classStudents", classData?.id] });
      toast.success("Aluno criado e adicionado com sucesso!");
      setNewStudentName("");
      setNewStudentCpf("");
      setNewStudentPcId("");
    },
    onError: (error: Error) => {
      toast.error(`Erro: ${error.message}`);
    },
  });

  const removeMutation = useMutation({
    mutationFn: (studentId: number) => api.removeStudentFromClass(classData!.id, studentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classStudents", classData?.id] });
      toast.success("Aluno removido com sucesso!");
    },
    onError: (error: Error) => {
      toast.error(`Erro: ${error.message}`);
    },
  });

  const handleAddExisting = () => {
    if (selectedStudentId) {
      addMutation.mutate(parseInt(selectedStudentId));
    }
  };

  const handleCreateNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (newStudentName.trim()) {
      createAndAddMutation.mutate({
        fullName: newStudentName.trim(),
        cpf: newStudentCpf.trim() || undefined,
        pc_id: newStudentPcId.trim() || undefined,
      });
    }
  };

  // Filtrar alunos que não estão na turma
  const availableStudents = allStudents.filter(
    (s) => !classStudents.find((cs) => cs.id === s.id)
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle>Gerenciar Alunos - {classData?.name}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Adicionar Aluno Existente */}
          <div className="space-y-2">
            <Label>Adicionar Aluno Existente</Label>
            <div className="flex gap-2">
              <Select value={selectedStudentId} onValueChange={setSelectedStudentId}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Selecione um aluno" />
                </SelectTrigger>
                <SelectContent>
                  {availableStudents.map((student) => (
                    <SelectItem key={student.id} value={student.id.toString()}>
                      {student.full_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={handleAddExisting} disabled={!selectedStudentId || addMutation.isPending}>
                Adicionar
              </Button>
            </div>
          </div>

          {/* Criar Novo Aluno */}
          <div className="space-y-2 border-t pt-4">
            <Label>Criar Novo Aluno</Label>
            <form onSubmit={handleCreateNew} className="space-y-3">
              <div>
                <Label htmlFor="newName">Nome Completo *</Label>
                <Input
                  id="newName"
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  placeholder="Nome do aluno"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="newCpf">CPF</Label>
                  <Input
                    id="newCpf"
                    value={newStudentCpf}
                    onChange={(e) => setNewStudentCpf(e.target.value)}
                    placeholder="CPF do aluno"
                  />
                </div>
                <div>
                  <Label htmlFor="newPcId">ID do PC</Label>
                  <Input
                    id="newPcId"
                    value={newStudentPcId}
                    onChange={(e) => setNewStudentPcId(e.target.value)}
                    placeholder="ID do computador"
                  />
                </div>
              </div>
              <Button type="submit" disabled={createAndAddMutation.isPending} className="w-full">
                {createAndAddMutation.isPending ? "Criando..." : "Criar e Adicionar"}
              </Button>
            </form>
          </div>

          {/* Lista de Alunos na Turma */}
          <div className="space-y-2 border-t pt-4">
            <Label>Alunos na Turma ({classStudents.length})</Label>
            <ScrollArea className="h-[200px] rounded border">
              <div className="p-4 space-y-2">
                {classStudents.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    Nenhum aluno na turma
                  </p>
                ) : (
                  classStudents.map((student) => (
                    <div
                      key={student.id}
                      className="flex items-center justify-between p-2 rounded bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <span className="font-medium">{student.full_name}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeMutation.mutate(student.id)}
                        disabled={removeMutation.isPending}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </div>
        </div>

        <div className="flex justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
