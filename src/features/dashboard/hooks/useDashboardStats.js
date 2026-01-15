import { useQuery } from '@tanstack/react-query';
import { getDashboardStats, getRecentActivity } from '@/api/dashboard';

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: getDashboardStats,
  });
};

export const useRecentActivity = (limit = 10) => {
  return useQuery({
    queryKey: ['dashboard', 'activity', limit],
    queryFn: () => getRecentActivity(limit),
  });
};
