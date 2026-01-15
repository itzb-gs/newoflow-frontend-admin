import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getCatalogItems,
  getCatalogItem,
  createCatalogItem,
  updateCatalogItem,
  deleteCatalogItem,
} from '@/api/catalog';
import { toast } from '@/hooks/use-toast';

export const useCatalogList = (filters = {}) => {
  return useQuery({
    queryKey: ['catalog', 'list', filters],
    queryFn: () => getCatalogItems(filters),
  });
};

export const useCatalogItem = (id) => {
  return useQuery({
    queryKey: ['catalog', 'item', id],
    queryFn: () => getCatalogItem(id),
    enabled: !!id,
  });
};

export const useCreateCatalog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCatalogItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['catalog'] });
      toast.success('Catalog item created successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to create catalog item');
    },
  });
};

export const useUpdateCatalog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateCatalogItem(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['catalog'] });
      queryClient.invalidateQueries({ queryKey: ['catalog', 'item', variables.id] });
      toast.success('Catalog item updated successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update catalog item');
    },
  });
};

export const useDeleteCatalog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCatalogItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['catalog'] });
      toast.success('Catalog item deleted successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to delete catalog item');
    },
  });
};
