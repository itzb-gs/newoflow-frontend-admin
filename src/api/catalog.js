import client from './client';

/**
 * NOTE: Catalog endpoints are not yet implemented in the backend OpenAPI spec.
 * These endpoints assume future implementation for organizing media into catalogs
 * (albums, series, movies, etc.). For now, they return placeholder responses.
 * 
 * The backend currently only has /api/v1/media/media endpoints.
 * Catalog functionality may need to be added to the backend or
 * the frontend should use media items directly.
 */

/**
 * Get catalog items with filters
 * @param {Object} filters
 * @param {string} [filters.type] - Content type
 * @param {string[]} [filters.tags] - Tags to filter
 * @param {string} [filters.search] - Search query
 * @param {number} [filters.page] - Page number
 * @param {number} [filters.perPage] - Items per page
 * @returns {Promise<{items: Array, total: number, page: number}>}
 */
export const getCatalogItems = async (filters = {}) => {
  // TODO: Backend endpoint not yet available - using media items as catalog for now
  const response = await client.get('/api/v1/media/media', { 
    params: {
      skip: (filters.page - 1) * (filters.perPage || 10),
      limit: filters.perPage || 10,
      media_type: filters.type,
      // Note: search and tags not supported by current backend
    } 
  });
  return response.data;
};

/**
 * Get single catalog item by ID
 * @param {number|string} id - Catalog item ID
 * @returns {Promise<Object>}
 */
export const getCatalogItem = async (id) => {
  // TODO: Backend endpoint not yet available - using media item as catalog for now
  const response = await client.get(`/api/v1/media/media/${id}`);
  return response.data;
};

/**
 * Create new catalog item
 * @param {Object} data - Catalog item data
 * @returns {Promise<Object>}
 */
export const createCatalogItem = async (data) => {
  // TODO: Backend endpoint not yet available - using media item creation for now
  const mediaData = {
    title: data.title,
    media_type: data.type,
    file_path: data.file_path || '/placeholder',
    description: data.description,
    media_metadata: JSON.stringify({ tags: data.tags || [] }),
  };
  const response = await client.post('/api/v1/media/media', mediaData);
  return response.data;
};

/**
 * Update catalog item
 * @param {number|string} id - Catalog item ID
 * @param {Object} data - Updated data
 * @returns {Promise<Object>}
 */
export const updateCatalogItem = async (id, data) => {
  // TODO: Backend endpoint not yet available - using media item update for now
  const mediaData = {
    title: data.title,
    media_type: data.type,
    description: data.description,
    media_metadata: data.tags ? JSON.stringify({ tags: data.tags }) : undefined,
  };
  const response = await client.put(`/api/v1/media/media/${id}`, mediaData);
  return response.data;
};

/**
 * Delete catalog item
 * @param {number|string} id - Catalog item ID
 * @returns {Promise<void>}
 */
export const deleteCatalogItem = async (id) => {
  // TODO: Backend endpoint not yet available - using media item deletion for now
  await client.delete(`/api/v1/media/media/${id}`);
};
