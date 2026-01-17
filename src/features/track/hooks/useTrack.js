import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getTracks, 
  getTrack, 
  createTrack, 
  updateTrack, 
  deleteTrack,
  linkTrackToMedia,
  unlinkTrackFromMedia
} from '@/api/track';
import { toast } from '@/hooks/use-toast';

/**
 * Hook to fetch list of tracks
 * @param {Object} filters - Query filters
 * @returns {Object} Query result with tracks data
 */
export const useTracks = (filters = {}) => {
  return useQuery({
    queryKey: ['tracks', 'list', filters],
    queryFn: () => getTracks(filters),
    keepPreviousData: true,
  });
};

/**
 * Hook to fetch a single track by ID
 * @param {number|string} id - Track ID
 * @returns {Object} Query result with track data
 */
export const useTrack = (id) => {
  return useQuery({
    queryKey: ['tracks', 'detail', id],
    queryFn: () => getTrack(id),
    enabled: !!id,
  });
};

/**
 * Hook to create a new track
 * @returns {Object} Mutation object
 */
export const useCreateTrack = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTrack,
    onSuccess: () => {
      queryClient.invalidateQueries(['tracks']);
      queryClient.invalidateQueries(['albums']); // Invalidate albums as they include track count
      toast({
        title: 'Success',
        description: 'Track created successfully',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.response?.data?.detail || 'Failed to create track',
        variant: 'destructive',
      });
    },
  });
};

/**
 * Hook to update a track
 * @returns {Object} Mutation object
 */
export const useUpdateTrack = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateTrack(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(['tracks']);
      queryClient.invalidateQueries(['tracks', 'detail', variables.id]);
      queryClient.invalidateQueries(['albums']);
      toast({
        title: 'Success',
        description: 'Track updated successfully',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.response?.data?.detail || 'Failed to update track',
        variant: 'destructive',
      });
    },
  });
};

/**
 * Hook to delete a track
 * @returns {Object} Mutation object
 */
export const useDeleteTrack = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTrack,
    onSuccess: () => {
      queryClient.invalidateQueries(['tracks']);
      queryClient.invalidateQueries(['albums']);
      toast({
        title: 'Success',
        description: 'Track deleted successfully',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.response?.data?.detail || 'Failed to delete track',
        variant: 'destructive',
      });
    },
  });
};

/**
 * Hook to link a track to a media file
 * @returns {Object} Mutation object
 */
export const useLinkTrackToMedia = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ trackId, mediaId }) => linkTrackToMedia(trackId, mediaId),
    onSuccess: () => {
      queryClient.invalidateQueries(['tracks']);
      queryClient.invalidateQueries(['media']);
      toast({
        title: 'Success',
        description: 'Track linked to media successfully',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.response?.data?.detail || 'Failed to link track to media',
        variant: 'destructive',
      });
    },
  });
};

/**
 * Hook to unlink a track from a media file
 * @returns {Object} Mutation object
 */
export const useUnlinkTrackFromMedia = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ trackId, mediaId }) => unlinkTrackFromMedia(trackId, mediaId),
    onSuccess: () => {
      queryClient.invalidateQueries(['tracks']);
      queryClient.invalidateQueries(['media']);
      toast({
        title: 'Success',
        description: 'Track unlinked from media successfully',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.response?.data?.detail || 'Failed to unlink track from media',
        variant: 'destructive',
      });
    },
  });
};
