import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getArtists, 
  getArtist, 
  createArtist, 
  updateArtist, 
  deleteArtist,
  getArtistAlbums
} from '@/api/artist';
import { toast } from '@/hooks/use-toast';

/**
 * Hook to fetch list of artists
 * @param {Object} filters - Query filters
 * @returns {Object} Query result with artists data
 */
export const useArtists = (filters = {}) => {
  return useQuery({
    queryKey: ['artists', 'list', filters],
    queryFn: () => getArtists(filters),
    keepPreviousData: true,
  });
};

/**
 * Hook to fetch a single artist by ID
 * @param {number|string} id - Artist ID
 * @returns {Object} Query result with artist data
 */
export const useArtist = (id) => {
  return useQuery({
    queryKey: ['artists', 'detail', id],
    queryFn: () => getArtist(id),
    enabled: !!id,
  });
};

/**
 * Hook to fetch albums for an artist
 * @param {number|string} artistId - Artist ID
 * @param {Object} filters - Query filters
 * @returns {Object} Query result with albums data
 */
export const useArtistAlbums = (artistId, filters = {}) => {
  return useQuery({
    queryKey: ['artists', 'albums', artistId, filters],
    queryFn: () => getArtistAlbums(artistId, filters),
    enabled: !!artistId,
  });
};

/**
 * Hook to create a new artist
 * @returns {Object} Mutation object
 */
export const useCreateArtist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createArtist,
    onSuccess: () => {
      queryClient.invalidateQueries(['artists']);
      toast({
        title: 'Success',
        description: 'Artist created successfully',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.response?.data?.detail || 'Failed to create artist',
        variant: 'destructive',
      });
    },
  });
};

/**
 * Hook to update an artist
 * @returns {Object} Mutation object
 */
export const useUpdateArtist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateArtist(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(['artists']);
      queryClient.invalidateQueries(['artists', 'detail', variables.id]);
      toast({
        title: 'Success',
        description: 'Artist updated successfully',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.response?.data?.detail || 'Failed to update artist',
        variant: 'destructive',
      });
    },
  });
};

/**
 * Hook to delete an artist
 * @returns {Object} Mutation object
 */
export const useDeleteArtist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteArtist,
    onSuccess: () => {
      queryClient.invalidateQueries(['artists']);
      toast({
        title: 'Success',
        description: 'Artist deleted successfully',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.response?.data?.detail || 'Failed to delete artist',
        variant: 'destructive',
      });
    },
  });
};
