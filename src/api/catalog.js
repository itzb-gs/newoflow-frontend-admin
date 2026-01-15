import client from './client';

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
  const response = await client.get('/api/catalog', { params: filters });
  return response.data;
};

/**
 * Get single catalog item by ID
 * @param {number|string} id - Catalog item ID
 * @returns {Promise<Object>}
 */
export const getCatalogItem = async (id) => {
  const response = await client.get(`/api/catalog/${id}`);
  return response.data;
};

/**
 * Create new catalog item
 * @param {Object} data - Catalog item data
 * @returns {Promise<Object>}
 */
export const createCatalogItem = async (data) => {
  const response = await client.post('/api/catalog', data);
  return response.data;
};

/**
 * Update catalog item
 * @param {number|string} id - Catalog item ID
 * @param {Object} data - Updated data
 * @returns {Promise<Object>}
 */
export const updateCatalogItem = async (id, data) => {
  const response = await client.put(`/api/catalog/${id}`, data);
  return response.data;
};

/**
 * Delete catalog item
 * @param {number|string} id - Catalog item ID
 * @returns {Promise<void>}
 */
export const deleteCatalogItem = async (id) => {
  await client.delete(`/api/catalog/${id}`);
};
