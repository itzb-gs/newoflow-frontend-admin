import client from './client';

/**
 * Album API endpoints
 * 
 * NOTE: These endpoints assume future backend implementation at /api/v1/catalog/albums
 * The backend catalog endpoints are not yet fully implemented in the OpenAPI spec.
 * 
 * Expected API structure:
 * - GET /api/v1/catalog/albums - List albums with pagination
 * - GET /api/v1/catalog/albums/{id} - Get album details
 * - POST /api/v1/catalog/albums - Create new album
 * - PUT /api/v1/catalog/albums/{id} - Update album
 * - DELETE /api/v1/catalog/albums/{id} - Delete album
 */

/**
 * Get albums list with filters
 * @param {Object} filters
 * @param {string} [filters.search] - Search query
 * @param {number} [filters.artist_id] - Filter by artist ID
 * @param {number} [filters.skip] - Number of records to skip
 * @param {number} [filters.limit] - Number of records to return
 * @returns {Promise<Array>}
 */
export const getAlbums = async (filters = {}) => {
  const response = await client.get('/api/v1/catalog/albums', {
    params: {
      skip: filters.skip || 0,
      limit: filters.limit || 100,
      search: filters.search,
      artist_id: filters.artist_id,
    },
  });
  return response.data;
};

/**
 * Get single album by ID
 * @param {number|string} id - Album ID
 * @returns {Promise<Object>}
 */
export const getAlbum = async (id) => {
  const response = await client.get(`/api/v1/catalog/albums/${id}`);
  return response.data;
};

/**
 * Create new album
 * @param {Object} data - Album data
 * @param {string} data.title - Album title (required)
 * @param {number} data.artist_id - Artist ID (required)
 * @param {string} [data.release_date] - Release date (ISO format)
 * @param {string} [data.description] - Album description
 * @param {string} [data.cover_url] - Album cover image URL
 * @param {string} [data.genre] - Album genre
 * @returns {Promise<Object>}
 */
export const createAlbum = async (data) => {
  const response = await client.post('/api/v1/catalog/albums', data);
  return response.data;
};

/**
 * Update album
 * @param {number|string} id - Album ID
 * @param {Object} data - Updated data
 * @returns {Promise<Object>}
 */
export const updateAlbum = async (id, data) => {
  const response = await client.put(`/api/v1/catalog/albums/${id}`, data);
  return response.data;
};

/**
 * Delete album
 * @param {number|string} id - Album ID
 * @returns {Promise<void>}
 */
export const deleteAlbum = async (id) => {
  await client.delete(`/api/v1/catalog/albums/${id}`);
};

/**
 * Get tracks for an album
 * @param {number|string} albumId - Album ID
 * @param {Object} filters
 * @param {number} [filters.skip] - Number of records to skip
 * @param {number} [filters.limit] - Number of records to return
 * @returns {Promise<Array>}
 */
export const getAlbumTracks = async (albumId, filters = {}) => {
  const response = await client.get(`/api/v1/catalog/albums/${albumId}/tracks`, {
    params: {
      skip: filters.skip || 0,
      limit: filters.limit || 100,
    },
  });
  return response.data;
};
