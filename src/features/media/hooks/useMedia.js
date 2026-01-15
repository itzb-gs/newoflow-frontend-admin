import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getMediaFiles,
  getMediaFile,
  updateMediaFile,
  deleteMediaFile,
  createMediaItem,
} from '@/api/media';
import { toast } from 'sonner';

export const useMediaList = (filters) => {
  return useQuery({
    queryKey: ['media', 'list', filters],
    queryFn: () => getMediaFiles(filters),
  });
};

export const useMediaItem = (id) => {
  return useQuery({
    queryKey: ['media', 'item', id],
    queryFn: () => getMediaFile(id),
    enabled: !!id,
  });
};

export const useCreateMedia = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMediaItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['media'] });
      toast.success('Media item created successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.detail || 'Failed to create media item');
    },
  });
};

export const useUpdateMedia = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateMediaFile(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['media'] });
      queryClient.invalidateQueries({ queryKey: ['media', 'item', variables.id] });
      toast.success('Media file updated successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.detail || 'Failed to update media file');
    },
  });
};

export const useDeleteMedia = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMediaFile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['media'] });
      toast.success('Media file deleted successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.detail || 'Failed to delete media file');
    },
  });
};
