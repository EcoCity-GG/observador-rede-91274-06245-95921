import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ["dashboardStats"],
    queryFn: api.getDashboardStats,
    staleTime: 30000, // 30 segundos
  });
};

export const useRecentAccess = (limit: number = 10) => {
  return useQuery({
    queryKey: ["recentAccess", limit],
    queryFn: () => api.getRecentAccess(limit),
    staleTime: 10000, // 10 segundos
  });
};

export const useLogs = (filters?: { startDate?: string; endDate?: string; category?: string }) => {
  return useQuery({
    queryKey: ["logs", filters],
    queryFn: () => api.getLogs(filters),
    staleTime: 30000,
  });
};

export const useCategoryBreakdown = () => {
  return useQuery({
    queryKey: ["categoryBreakdown"],
    queryFn: api.getCategoryBreakdown,
    staleTime: 60000, // 1 minuto
  });
};

export const useActivityByHour = () => {
  return useQuery({
    queryKey: ["activityByHour"],
    queryFn: api.getActivityByHour,
    staleTime: 60000,
  });
};
