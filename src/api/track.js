import client from './client';

/**
 * Track API endpoints
 * 
 * NOTE: These endpoints assume future backend implementation at /api/v1/catalog/tracks
 * The backend catalog endpoints are not yet fully implemented in the OpenAPI spec.
 * 
 * Expected API structure:
 * - GET /api/v1/catalog/tracks - List tracks with pagination
 * - GET /api/v1/catalog/tracks/{id} - Get track details
 * - POST /api/v1/catalog/tracks - Create new track
 * - PUT /api/v1/catalog/tracks/{id} - Update track
 * - DELETE /api/v1/catalog/tracks/{id} - Delete track
 */

/**
 * Get tracks list with filters
 * @param {Object} filters
 * @param {string} [filters.search] - Search query
 * @param {number} [filters.album_id] - Filter by album ID
 * @param {number} [filters.artist_id] - Filter by artist ID
 * @param {number} [filters.skip] - Number of records to skip
 * @param {number} [filters.limit] - Number of records to return
 * @returns {Promise<Array>}
 */
export const getTracks = async (filters = {}) => {
  const response = await client.get('/api/v1/catalog/tracks', {
    params: {
      skip: filters.skip || 0,
      limit: filters.limit || 100,
      search: filters.search,
      album_id: filters.album_id,
      artist_id: filters.artist_id,
    },
  });
  return response.data;
};

/**
 * Get single track by ID
 * @param {number|string} id - Track ID
 * @returns {Promise<Object>}
 */
export const getTrack = async (id) => {
  const response = await client.get(`/api/v1/catalog/tracks/${id}`);
  return response.data;
};

/**
 * Create new track
 * @param {Object} data - Track data
 * @param {string} data.title - Track title (required)
 * @param {number} data.album_id - Album ID (required)
 * @param {number} data.artist_id - Artist ID (required)
 * @param {number} [data.track_number] - Track number in album
 * @param {number} [data.duration] - Duration in seconds
 * @param {string} [data.lyrics] - Track lyrics
 * @param {number} [data.media_id] - Associated media file ID
 * @returns {Promise<Object>}
 */
export const createTrack = async (data) => {
  const response = await client.post('/api/v1/catalog/tracks', data);
  return response.data;
};

/**
 * Update track
 * @param {number|string} id - Track ID
 * @param {Object} data - Updated data
 * @returns {Promise<Object>}
 */
export const updateTrack = async (id, data) => {
  const response = await client.put(`/api/v1/catalog/tracks/${id}`, data);
  return response.data;
};

/**
 * Delete track
 * @param {number|string} id - Track ID
 * @returns {Promise<void>}
 */
export const deleteTrack = async (id) => {
  await client.delete(`/api/v1/catalog/tracks/${id}`);
};

/**
 * Link track to media file
 * @param {number|string} trackId - Track ID
 * @param {number|string} mediaId - Media file ID
 * @returns {Promise<Object>}
 */
export const linkTrackToMedia = async (trackId, mediaId) => {
  const response = await client.post(`/api/v1/catalog/tracks/${trackId}/media`, {
    media_id: mediaId,
  });
  return response.data;
};

/**
 * Unlink track from media file
 * @param {number|string} trackId - Track ID
 * @param {number|string} mediaId - Media file ID
 * @returns {Promise<void>}
 */
export const unlinkTrackFromMedia = async (trackId, mediaId) => {
  await client.delete(`/api/v1/catalog/tracks/${trackId}/media/${mediaId}`);
};
