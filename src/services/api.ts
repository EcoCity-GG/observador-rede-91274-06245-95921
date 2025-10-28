import { 
  dashboardService, 
  logsService, 
  studentsService, 
  classesService, 
  professorsService 
} from './firebaseService';
import { auth } from '@/lib/firebase';

export interface DashboardStats {
  totalUsers: number;
  totalAlerts: number;
  aiDetections: number;
  totalLogs: number;
}

export interface RecentAccess {
  log_id: string;
  aluno_id: string;
  student_name: string;
  url: string;
  duration: number;
  categoria: string;
  timestamp: string;
}

export interface UserSummary {
  student_db_id: string;
  student_name: string;
  cpf: string;
  pc_id: string;
  aluno_id: string;
  total_duration: number;
  log_count: number;
  last_activity: string | null;
  has_red_alert: boolean;
  has_blue_alert: boolean;
}

export interface Log {
  id?: string;
  log_id?: string;
  aluno_id: string;
  student_name: string;
  url: string;
  duration: number;
  categoria: string;
  timestamp: string;
}

export interface Student {
  id?: string;
  full_name: string;
  cpf?: string | null;
  pc_id?: string | null;
}

export interface Class {
  id?: string;
  name: string;
  owner_id?: string;
}

export interface Professor {
  id: string;
  full_name: string;
  username: string;
  email: string;
  isOwner?: boolean;
}

export const api = {
  // Dashboard Data
  async getDashboardData(): Promise<{ logs: Log[], summary: UserSummary[] }> {
    try {
      return await dashboardService.getData();
    } catch (error) {
      console.error('Erro ao buscar dados do dashboard:', error);
      throw error;
    }
  },

  // Alert Logs
  async getAlertLogs(alunoId: string, type: 'red' | 'blue'): Promise<Log[]> {
    try {
      const categories = type === 'red' 
        ? ['Rede Social', 'Streaming & Jogos', 'Outros']
        : ['IA'];
      return await logsService.getByStudentAndCategory(alunoId, categories);
    } catch (error) {
      console.error('Erro ao buscar logs de alerta:', error);
      throw error;
    }
  },

  // Category Override
  async overrideCategory(url: string, newCategory: string): Promise<{ success: boolean, message: string }> {
    // This would need custom implementation in Firebase
    console.log('Override category not implemented yet:', url, newCategory);
    return { success: true, message: 'Funcionalidade em desenvolvimento' };
  },

  // Classes
  async getClasses(): Promise<Class[]> {
    try {
      return await classesService.getAll();
    } catch (error) {
      console.error('Erro ao buscar turmas:', error);
      throw error;
    }
  },

  async createClass(name: string): Promise<{ success: boolean, classId: string, message: string }> {
    try {
      const newClass = await classesService.create(name);
      return { 
        success: true, 
        classId: newClass.id!, 
        message: 'Turma criada com sucesso' 
      };
    } catch (error) {
      console.error('Erro ao criar turma:', error);
      throw error;
    }
  },

  async deleteClass(classId: string): Promise<{ success: boolean, message: string }> {
    try {
      await classesService.delete(classId);
      return { success: true, message: 'Turma deletada com sucesso' };
    } catch (error) {
      console.error('Erro ao deletar turma:', error);
      throw error;
    }
  },

  async shareClass(classId: string, professorId: string): Promise<{ success: boolean, message: string }> {
    try {
      await classesService.addMember(classId, professorId);
      return { success: true, message: 'Professor adicionado à turma' };
    } catch (error) {
      console.error('Erro ao compartilhar turma:', error);
      throw error;
    }
  },

  async removeClassMember(classId: string, professorId: string): Promise<{ success: boolean, message: string }> {
    try {
      await classesService.removeMember(classId, professorId);
      return { success: true, message: 'Professor removido da turma' };
    } catch (error) {
      console.error('Erro ao remover membro:', error);
      throw error;
    }
  },

  async getClassMembers(classId: string): Promise<{ members: Professor[], isCurrentUserOwner: boolean }> {
    try {
      const members = await classesService.getMembers(classId);
      const classData = await classesService.getById(classId);
      const isCurrentUserOwner = classData?.owner_id === auth.currentUser?.uid;
      
      return { 
        members: members as Professor[], 
        isCurrentUserOwner 
      };
    } catch (error) {
      console.error('Erro ao buscar membros da turma:', error);
      throw error;
    }
  },

  // Students
  async getAllStudents(): Promise<Student[]> {
    try {
      return await studentsService.getAll();
    } catch (error) {
      console.error('Erro ao buscar estudantes:', error);
      throw error;
    }
  },

  async getClassStudents(classId: string): Promise<Student[]> {
    try {
      return await classesService.getStudents(classId);
    } catch (error) {
      console.error('Erro ao buscar estudantes da turma:', error);
      throw error;
    }
  },

  async createStudent(data: { fullName: string, cpf?: string, pc_id?: string }): Promise<{ success: boolean, student: Student }> {
    try {
      const student = await studentsService.create({
        full_name: data.fullName,
        cpf: data.cpf,
        pc_id: data.pc_id
      });
      return { success: true, student };
    } catch (error) {
      console.error('Erro ao criar estudante:', error);
      throw error;
    }
  },

  async addStudentToClass(classId: string, studentId: string): Promise<{ success: boolean, message: string }> {
    try {
      await classesService.addStudent(classId, studentId);
      return { success: true, message: 'Estudante adicionado à turma' };
    } catch (error) {
      console.error('Erro ao adicionar estudante:', error);
      throw error;
    }
  },

  async removeStudentFromClass(classId: string, studentId: string): Promise<{ success: boolean, message: string }> {
    try {
      await classesService.removeStudent(classId, studentId);
      return { success: true, message: 'Estudante removido da turma' };
    } catch (error) {
      console.error('Erro ao remover estudante:', error);
      throw error;
    }
  },

  // Professors
  async getProfessors(): Promise<Professor[]> {
    try {
      return await professorsService.getAll() as Professor[];
    } catch (error) {
      console.error('Erro ao buscar professores:', error);
      throw error;
    }
  },

  // PDF Report
  downloadReport(date: string) {
    console.log('Download report not implemented yet:', date);
    // This would need custom implementation
  },
};
