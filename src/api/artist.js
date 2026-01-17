import client from './client';

/**
 * Artist API endpoints
 * 
 * NOTE: These endpoints assume future backend implementation at /api/v1/catalog/artists
 * The backend catalog endpoints are not yet fully implemented in the OpenAPI spec.
 * 
 * Expected API structure:
 * - GET /api/v1/catalog/artists - List artists with pagination
 * - GET /api/v1/catalog/artists/{id} - Get artist details
 * - POST /api/v1/catalog/artists - Create new artist
 * - PUT /api/v1/catalog/artists/{id} - Update artist
 * - DELETE /api/v1/catalog/artists/{id} - Delete artist
 */

/**
 * Get artists list with filters
 * @param {Object} filters
 * @param {string} [filters.search] - Search query
 * @param {number} [filters.skip] - Number of records to skip
 * @param {number} [filters.limit] - Number of records to return
 * @returns {Promise<Array>}
 */
export const getArtists = async (filters = {}) => {
  const response = await client.get('/api/v1/catalog/artists', {
    params: {
      skip: filters.skip || 0,
      limit: filters.limit || 100,
      search: filters.search,
    },
  });
  return response.data;
};

/**
 * Get single artist by ID
 * @param {number|string} id - Artist ID
 * @returns {Promise<Object>}
 */
export const getArtist = async (id) => {
  const response = await client.get(`/api/v1/catalog/artists/${id}`);
  return response.data;
};

/**
 * Create new artist
 * @param {Object} data - Artist data
 * @param {string} data.name - Artist name (required)
 * @param {string} [data.bio] - Artist biography
 * @param {string} [data.country] - Artist country
 * @param {string} [data.image_url] - Artist image URL
 * @param {string} [data.website] - Artist website
 * @returns {Promise<Object>}
 */
export const createArtist = async (data) => {
  const response = await client.post('/api/v1/catalog/artists', data);
  return response.data;
};

/**
 * Update artist
 * @param {number|string} id - Artist ID
 * @param {Object} data - Updated data
 * @returns {Promise<Object>}
 */
export const updateArtist = async (id, data) => {
  const response = await client.put(`/api/v1/catalog/artists/${id}`, data);
  return response.data;
};

/**
 * Delete artist
 * @param {number|string} id - Artist ID
 * @returns {Promise<void>}
 */
export const deleteArtist = async (id) => {
  await client.delete(`/api/v1/catalog/artists/${id}`);
};

/**
 * Get albums for an artist
 * @param {number|string} artistId - Artist ID
 * @param {Object} filters
 * @param {number} [filters.skip] - Number of records to skip
 * @param {number} [filters.limit] - Number of records to return
 * @returns {Promise<Array>}
 */
export const getArtistAlbums = async (artistId, filters = {}) => {
  const response = await client.get(`/api/v1/catalog/artists/${artistId}/albums`, {
    params: {
      skip: filters.skip || 0,
      limit: filters.limit || 100,
    },
  });
  return response.data;
};
