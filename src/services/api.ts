const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

export interface DashboardStats {
  totalUsers: number;
  totalAlerts: number;
  aiDetections: number;
  totalLogs: number;
}

export interface RecentAccess {
  log_id: number;
  aluno_id: string;
  student_name: string;
  url: string;
  duration: number;
  categoria: string;
  timestamp: string;
}

export interface UserSummary {
  student_db_id: number;
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
  log_id: number;
  aluno_id: string;
  student_name: string;
  url: string;
  duration: number;
  categoria: string;
  timestamp: string;
}

export interface Student {
  id: number;
  full_name: string;
  cpf: string | null;
  pc_id: string | null;
}

export interface Class {
  id: number;
  name: string;
  owner_id?: number;
}

export interface Professor {
  id: number;
  full_name: string;
  username: string;
  email: string;
  isOwner?: boolean;
}

async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    }
  });
  
  if (!response.ok) {
    if (response.status === 401) {
      window.location.href = '/login';
      throw new Error('Sessão expirada');
    }
    const error = await response.json().catch(() => ({ error: response.statusText }));
    throw new Error(error.error || error.message || `Erro: ${response.statusText}`);
  }
  
  return response.json();
}

export const api = {
  // Dashboard Data
  async getDashboardData(): Promise<{ logs: Log[], summary: UserSummary[] }> {
    return fetchAPI<{ logs: Log[], summary: UserSummary[] }>("/data");
  },

  // Alert Logs
  async getAlertLogs(alunoId: string, type: 'red' | 'blue'): Promise<Log[]> {
    return fetchAPI<Log[]>(`/alerts/${encodeURIComponent(alunoId)}/${type}`);
  },

  // Category Override
  async overrideCategory(url: string, newCategory: string): Promise<{ success: boolean, message: string }> {
    return fetchAPI<{ success: boolean, message: string }>("/override-category", {
      method: 'POST',
      body: JSON.stringify({ url, newCategory }),
    });
  },

  // Classes
  async getClasses(): Promise<Class[]> {
    return fetchAPI<Class[]>("/classes");
  },

  async createClass(name: string): Promise<{ success: boolean, classId: number, message: string }> {
    return fetchAPI<{ success: boolean, classId: number, message: string }>("/classes", {
      method: 'POST',
      body: JSON.stringify({ name }),
    });
  },

  async deleteClass(classId: number): Promise<{ success: boolean, message: string }> {
    return fetchAPI<{ success: boolean, message: string }>(`/classes/${classId}`, {
      method: 'DELETE',
    });
  },

  async shareClass(classId: number, professorId: number): Promise<{ success: boolean, message: string }> {
    return fetchAPI<{ success: boolean, message: string }>(`/classes/${classId}/share`, {
      method: 'POST',
      body: JSON.stringify({ professorId }),
    });
  },

  async removeClassMember(classId: number, professorId: number): Promise<{ success: boolean, message: string }> {
    return fetchAPI<{ success: boolean, message: string }>(`/classes/${classId}/remove-member/${professorId}`, {
      method: 'DELETE',
    });
  },

  async getClassMembers(classId: number): Promise<{ members: Professor[], isCurrentUserOwner: boolean }> {
    return fetchAPI<{ members: Professor[], isCurrentUserOwner: boolean }>(`/classes/${classId}/members`);
  },

  // Students
  async getAllStudents(): Promise<Student[]> {
    return fetchAPI<Student[]>("/students/all");
  },

  async getClassStudents(classId: number): Promise<Student[]> {
    return fetchAPI<Student[]>(`/classes/${classId}/students`);
  },

  async createStudent(data: { fullName: string, cpf?: string, pc_id?: string }): Promise<{ success: boolean, student: Student }> {
    return fetchAPI<{ success: boolean, student: Student }>("/students", {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async addStudentToClass(classId: number, studentId: number): Promise<{ success: boolean, message: string }> {
    return fetchAPI<{ success: boolean, message: string }>(`/classes/${classId}/add-student`, {
      method: 'POST',
      body: JSON.stringify({ studentId }),
    });
  },

  async removeStudentFromClass(classId: number, studentId: number): Promise<{ success: boolean, message: string }> {
    return fetchAPI<{ success: boolean, message: string }>(`/classes/${classId}/remove-student/${studentId}`, {
      method: 'DELETE',
    });
  },

  // Professors
  async getProfessors(): Promise<Professor[]> {
    return fetchAPI<Professor[]>("/professors/list");
  },

  // PDF Report
  downloadReport(date: string) {
    window.open(`${API_BASE_URL.replace('/api', '')}/api/download-report/${date}`, '_blank');
  },
};
