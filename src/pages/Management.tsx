import { Shield, Users, Plus, Pencil, Trash2, ArrowLeft, UserPlus, UsersRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, Class } from "@/services/api";
import { CreateClassDialog } from "@/components/Management/CreateClassDialog";
import { ManageStudentsDialog } from "@/components/Management/ManageStudentsDialog";
import { ManageProfessorsDialog } from "@/components/Management/ManageProfessorsDialog";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSelector } from "@/components/LanguageSelector";

const Management = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [studentsDialogOpen, setStudentsDialogOpen] = useState(false);
  const [professorsDialogOpen, setProfessorsDialogOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [classToDelete, setClassToDelete] = useState<Class | null>(null);
  const queryClient = useQueryClient();

  const { data: classes = [], isLoading } = useQuery({
    queryKey: ["classes"],
    queryFn: api.getClasses,
  });

  const deleteMutation = useMutation({
    mutationFn: (classId: number) => api.deleteClass(classId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classes"] });
      toast.success("Turma excluída com sucesso!");
      setDeleteDialogOpen(false);
      setClassToDelete(null);
    },
    onError: (error: Error) => {
      toast.error(`Erro ao excluir turma: ${error.message}`);
    },
  });

  const filteredTeams = classes.filter(team => 
    team.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleManageStudents = (classData: Class) => {
    setSelectedClass(classData);
    setStudentsDialogOpen(true);
  };

  const handleManageProfessors = (classData: Class) => {
    setSelectedClass(classData);
    setProfessorsDialogOpen(true);
  };

  const handleDeleteClick = (classData: Class) => {
    setClassToDelete(classData);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (classToDelete) {
      deleteMutation.mutate(classToDelete.id);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button 
                onClick={() => navigate("/")} 
                variant="ghost" 
                size="icon"
                className="hover:bg-primary/10 hover:text-primary transition-all duration-300"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <img
                src="/LOGO.png"
                alt="NexusCore Security Logo"
                className="w-10 h-10 rounded-lg shadow-lg hover:scale-110 transition-transform duration-300 cursor-pointer"
              />
              <div>
                <h1 className="text-xl font-bold hover:text-primary transition-colors">NexusCore Security</h1>
                <p className="text-xs text-muted-foreground -mt-1">Gerenciamento</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <LanguageSelector />
              <ThemeToggle />
              <Button 
                onClick={() => navigate("/dashboard")} 
                variant="outline"
                className="hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
              >
                Dashboard
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
        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-fade-in">
          <Card className="border-border hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300 group">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-secondary group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-5 h-5 text-white" />
                </div>
                Total de Equipes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold group-hover:text-primary transition-colors">
                {isLoading ? "..." : classes.length}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border hover:shadow-xl hover:shadow-success/5 hover:-translate-y-1 transition-all duration-300 group">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <div className="p-2 rounded-lg bg-gradient-to-br from-success to-primary group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-5 h-5 text-white" />
                </div>
                Equipes Ativas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-success group-hover:scale-110 transition-transform">
                {isLoading ? "..." : classes.length}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border hover:shadow-xl hover:shadow-accent/5 hover:-translate-y-1 transition-all duration-300 group">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <div className="p-2 rounded-lg bg-gradient-to-br from-accent to-secondary group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-5 h-5 text-white" />
                </div>
                Total de Membros
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent group-hover:scale-110 transition-transform">
                {isLoading ? "..." : 0}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Input
              placeholder="Buscar equipes ou departamentos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-card border-border hover:border-primary focus:border-primary transition-all duration-300"
            />
          </div>
          <Button 
            variant="default" 
            onClick={() => setCreateDialogOpen(true)}
            className="gap-2 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 hover:scale-105 transition-all duration-300"
          >
            <Plus className="w-4 h-4" />
            Nova Equipe
          </Button>
        </div>

        {/* Teams Table */}
        <Card className="border-border hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Equipes Cadastradas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold">Nome da Turma</th>
                    <th className="text-left py-3 px-4 font-semibold">Professor</th>
                    <th className="text-left py-3 px-4 font-semibold">Alunos</th>
                    <th className="text-left py-3 px-4 font-semibold">Professores</th>
                    <th className="text-right py-3 px-4 font-semibold">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-muted-foreground">
                        Carregando turmas...
                      </td>
                    </tr>
                  ) : filteredTeams.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-muted-foreground">
                        Nenhuma turma encontrada
                      </td>
                    </tr>
                  ) : (
                    filteredTeams.map((team) => (
                      <tr key={team.id} className="border-b border-border hover:bg-muted/30 transition-colors duration-200">
                        <td className="py-4 px-4 font-medium">{team.name}</td>
                        <td className="py-4 px-4 text-muted-foreground">-</td>
                        <td className="py-4 px-4">
                          <span className="px-3 py-1 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 text-primary text-sm hover:from-primary/20 hover:to-secondary/20 transition-all duration-300">
                            - alunos
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="px-3 py-1 rounded-full bg-gradient-to-r from-accent/10 to-primary/10 text-accent text-sm hover:from-accent/20 hover:to-primary/20 transition-all duration-300">
                            - prof.
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex gap-2 justify-end">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleManageStudents(team)}
                              className="hover:bg-primary/10 hover:text-primary transition-all duration-300"
                              title="Gerenciar Alunos"
                            >
                              <UserPlus className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleManageProfessors(team)}
                              className="hover:bg-success/10 hover:text-success transition-all duration-300"
                              title="Gerenciar Professores"
                            >
                              <UsersRound className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleDeleteClick(team)}
                              className="hover:bg-destructive/10 hover:text-destructive transition-all duration-300"
                              title="Excluir Turma"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
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

      {/* Dialogs */}
      <CreateClassDialog open={createDialogOpen} onOpenChange={setCreateDialogOpen} />
      <ManageStudentsDialog 
        open={studentsDialogOpen} 
        onOpenChange={setStudentsDialogOpen} 
        classData={selectedClass}
      />
      <ManageProfessorsDialog 
        open={professorsDialogOpen} 
        onOpenChange={setProfessorsDialogOpen} 
        classData={selectedClass}
      />

      {/* Delete Confirmation */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir Turma</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir a turma <strong>{classToDelete?.name}</strong>? 
              Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleConfirmDelete}
              className="bg-destructive hover:bg-destructive/90"
            >
              {deleteMutation.isPending ? "Excluindo..." : "Excluir"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Management;
