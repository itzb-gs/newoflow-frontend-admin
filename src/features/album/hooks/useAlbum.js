import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getAlbums, 
  getAlbum, 
  createAlbum, 
  updateAlbum, 
  deleteAlbum,
  getAlbumTracks
} from '@/api/album';
import { toast } from '@/hooks/use-toast';

/**
 * Hook to fetch list of albums
 * @param {Object} filters - Query filters
 * @returns {Object} Query result with albums data
 */
export const useAlbums = (filters = {}) => {
  return useQuery({
    queryKey: ['albums', 'list', filters],
    queryFn: () => getAlbums(filters),
    keepPreviousData: true,
  });
};

/**
 * Hook to fetch a single album by ID
 * @param {number|string} id - Album ID
 * @returns {Object} Query result with album data
 */
export const useAlbum = (id) => {
  return useQuery({
    queryKey: ['albums', 'detail', id],
    queryFn: () => getAlbum(id),
    enabled: !!id,
  });
};

/**
 * Hook to fetch tracks for an album
 * @param {number|string} albumId - Album ID
 * @param {Object} filters - Query filters
 * @returns {Object} Query result with tracks data
 */
export const useAlbumTracks = (albumId, filters = {}) => {
  return useQuery({
    queryKey: ['albums', 'tracks', albumId, filters],
    queryFn: () => getAlbumTracks(albumId, filters),
    enabled: !!albumId,
  });
};

/**
 * Hook to create a new album
 * @returns {Object} Mutation object
 */
export const useCreateAlbum = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAlbum,
    onSuccess: () => {
      queryClient.invalidateQueries(['albums']);
      queryClient.invalidateQueries(['artists']); // Invalidate artists as they include album count
      toast({
        title: 'Success',
        description: 'Album created successfully',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.response?.data?.detail || 'Failed to create album',
        variant: 'destructive',
      });
    },
  });
};

/**
 * Hook to update an album
 * @returns {Object} Mutation object
 */
export const useUpdateAlbum = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateAlbum(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(['albums']);
      queryClient.invalidateQueries(['albums', 'detail', variables.id]);
      queryClient.invalidateQueries(['artists']);
      toast({
        title: 'Success',
        description: 'Album updated successfully',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.response?.data?.detail || 'Failed to update album',
        variant: 'destructive',
      });
    },
  });
};

/**
 * Hook to delete an album
 * @returns {Object} Mutation object
 */
export const useDeleteAlbum = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAlbum,
    onSuccess: () => {
      queryClient.invalidateQueries(['albums']);
      queryClient.invalidateQueries(['artists']);
      toast({
        title: 'Success',
        description: 'Album deleted successfully',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.response?.data?.detail || 'Failed to delete album',
        variant: 'destructive',
      });
    },
  });
};
