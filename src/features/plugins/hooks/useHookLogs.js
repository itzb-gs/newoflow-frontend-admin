import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getHookLogs, retryHook } from '@/api/hooks';
import { toast } from 'sonner';

export const useHookLogs = (filters) => {
  return useQuery({
    queryKey: ['hooks', 'logs', filters],
    queryFn: () => getHookLogs(filters),
  });
};

export const useRetryHook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: retryHook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hooks', 'logs'] });
      toast.success('Hook retry initiated');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to retry hook');
    },
  });
};
