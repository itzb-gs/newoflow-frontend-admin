import { useQuery } from '@tanstack/react-query';
import { getHookLogs } from '@/api/hooks';
import { toast } from '@/hooks/use-toast';

export const useHookLogs = (filters) => {
  return useQuery({
    queryKey: ['hooks', 'logs', filters],
    queryFn: () => getHookLogs(filters),
  });
};

export const useRetryHook = () => {
  // Note: Retry endpoint not available in OpenAPI spec
  return {
    mutate: () => {
      toast.warning('Hook retry not yet implemented in backend');
    },
    isPending: false,
  };
};
