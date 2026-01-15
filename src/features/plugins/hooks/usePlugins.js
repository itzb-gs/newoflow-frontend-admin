import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

/**
 * NOTE: Plugin management endpoints are not yet implemented in the backend OpenAPI spec.
 * These hooks return mock data until backend implementation is available.
 */

export const usePluginsList = () => {
  return useQuery({
    queryKey: ['plugins', 'list'],
    queryFn: async () => {
      // TODO: Backend endpoint not available
      // Return mock data for now
      toast.info('Plugin API not yet implemented in backend');
      return [];
    },
    staleTime: Infinity, // Don't refetch mock data
  });
};

export const usePlugin = (id) => {
  return useQuery({
    queryKey: ['plugins', 'item', id],
    queryFn: async () => {
      // TODO: Backend endpoint not available
      return null;
    },
    enabled: !!id,
    staleTime: Infinity,
  });
};

export const useEnablePlugin = () => {
  return {
    mutate: () => {
      toast.warning('Plugin management not yet implemented in backend');
    },
    isPending: false,
  };
};

export const useDisablePlugin = () => {
  return {
    mutate: () => {
      toast.warning('Plugin management not yet implemented in backend');
    },
    isPending: false,
  };
};
