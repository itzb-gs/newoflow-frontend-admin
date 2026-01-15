import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getPlugins, getPlugin, enablePlugin, disablePlugin } from '@/api/hooks';
import { toast } from 'sonner';

export const usePluginsList = () => {
  return useQuery({
    queryKey: ['plugins', 'list'],
    queryFn: getPlugins,
  });
};

export const usePlugin = (id) => {
  return useQuery({
    queryKey: ['plugins', 'item', id],
    queryFn: () => getPlugin(id),
    enabled: !!id,
  });
};

export const useEnablePlugin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: enablePlugin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['plugins'] });
      toast.success('Plugin enabled successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to enable plugin');
    },
  });
};

export const useDisablePlugin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: disablePlugin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['plugins'] });
      toast.success('Plugin disabled successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to disable plugin');
    },
  });
};
