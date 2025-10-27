import type { DashboardStats, RecentAccess, Log, Student, Class, Professor } from "@/types/database";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// Helper para obter token
const getAuthHeaders = () => {
  const token = localStorage.getItem('auth_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
};

// Helper para fetch com autenticação
async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...options?.headers,
    }
  });
  
  if (!response.ok) {
    if (response.status === 401) {
      // Token inválido ou expirado
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
      throw new Error('Sessão expirada');
    }
    throw new Error(`API Error: ${response.statusText}`);
  }
  return response.json();
}

export const api = {
  // Dashboard Stats
  async getDashboardStats(): Promise<DashboardStats> {
    return fetchAPI<DashboardStats>("/dashboard/stats");
  },

  // Recent Access Logs
  async getRecentAccess(limit: number = 10): Promise<RecentAccess[]> {
    return fetchAPI<RecentAccess[]>(`/logs/recent?limit=${limit}`);
  },

  // Logs
  async getLogs(filters?: { startDate?: string; endDate?: string; category?: string }): Promise<Log[]> {
    const params = new URLSearchParams(filters as Record<string, string>);
    return fetchAPI<Log[]>(`/logs?${params}`);
  },

  // Students
  async getStudents(): Promise<Student[]> {
    return fetchAPI<Student[]>("/students");
  },

  async getStudentById(id: number): Promise<Student> {
    return fetchAPI<Student>(`/students/${id}`);
  },

  // Classes
  async getClasses(): Promise<Class[]> {
    return fetchAPI<Class[]>("/classes");
  },

  async getClassById(id: number): Promise<Class> {
    return fetchAPI<Class>(`/classes/${id}`);
  },

  // Professors
  async getProfessors(): Promise<Professor[]> {
    return fetchAPI<Professor[]>("/professors");
  },

  async getProfessorById(id: number): Promise<Professor> {
    return fetchAPI<Professor>(`/professors/${id}`);
  },

  // Category Analytics
  async getCategoryBreakdown(): Promise<{ category: string; count: number; percentage: number }[]> {
    return fetchAPI("/analytics/categories");
  },

  // Time-based Analytics
  async getActivityByHour(): Promise<{ hour: number; count: number }[]> {
    return fetchAPI("/analytics/by-hour");
  },
};
