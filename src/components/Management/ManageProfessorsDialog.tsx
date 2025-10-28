import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api, Class } from "@/services/api";
import { toast } from "sonner";
import { useClassMembers, useProfessors } from "@/hooks/useDashboardData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Crown } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ManageProfessorsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  classData: Class | null;
}

export const ManageProfessorsDialog = ({ open, onOpenChange, classData }: ManageProfessorsDialogProps) => {
  const [selectedProfessorId, setSelectedProfessorId] = useState("");
  const queryClient = useQueryClient();

  const { data: allProfessors = [] } = useProfessors();
  const { data: membersData } = useClassMembers(classData?.id || null);

  const classMembers = membersData?.members || [];
  const isCurrentUserOwner = membersData?.isCurrentUserOwner || false;

  const shareMutation = useMutation({
    mutationFn: (professorId: number) => api.shareClass(classData!.id, professorId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classMembers", classData?.id] });
      toast.success("Professor adicionado com sucesso!");
      setSelectedProfessorId("");
    },
    onError: (error: Error) => {
      toast.error(`Erro: ${error.message}`);
    },
  });

  const removeMutation = useMutation({
    mutationFn: (professorId: number) => api.removeClassMember(classData!.id, professorId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classMembers", classData?.id] });
      toast.success("Professor removido com sucesso!");
    },
    onError: (error: Error) => {
      toast.error(`Erro: ${error.message}`);
    },
  });

  const handleShare = () => {
    if (selectedProfessorId) {
      shareMutation.mutate(parseInt(selectedProfessorId));
    }
  };

  // Filtrar professores que não estão na turma
  const availableProfessors = allProfessors.filter(
    (p) => !classMembers.find((m) => m.id === p.id)
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Gerenciar Professores - {classData?.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Adicionar Professor */}
          {isCurrentUserOwner && (
            <div className="space-y-2">
              <Label>Compartilhar Turma com Professor</Label>
              <div className="flex gap-2">
                <Select value={selectedProfessorId} onValueChange={setSelectedProfessorId}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Selecione um professor" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableProfessors.map((prof) => (
                      <SelectItem key={prof.id} value={prof.id.toString()}>
                        {prof.full_name} ({prof.username})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button onClick={handleShare} disabled={!selectedProfessorId || shareMutation.isPending}>
                  Adicionar
                </Button>
              </div>
            </div>
          )}

          {/* Lista de Professores */}
          <div className="space-y-2 border-t pt-4">
            <Label>Professores da Turma ({classMembers.length})</Label>
            <ScrollArea className="h-[250px] rounded border">
              <div className="p-4 space-y-2">
                {classMembers.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    Nenhum professor compartilhado
                  </p>
                ) : (
                  classMembers.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between p-3 rounded bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {member.isOwner && (
                          <div title="Proprietário">
                            <Crown className="w-4 h-4 text-warning" />
                          </div>
                        )}
                        <div>
                          <p className="font-medium">{member.full_name}</p>
                          <p className="text-sm text-muted-foreground">{member.email}</p>
                        </div>
                      </div>
                      {isCurrentUserOwner && !member.isOwner && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeMutation.mutate(member.id)}
                          disabled={removeMutation.isPending}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      )}
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </div>

          {!isCurrentUserOwner && (
            <p className="text-sm text-muted-foreground">
              Apenas o proprietário da turma pode adicionar ou remover professores.
            </p>
          )}
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
