import client from './client';

/**
 * Get all plugins
 * @returns {Promise<Array>}
 */
export const getPlugins = async () => {
  const response = await client.get('/api/plugins');
  return response.data;
};

/**
 * Get single plugin by ID
 * @param {number|string} id - Plugin ID
 * @returns {Promise<Object>}
 */
export const getPlugin = async (id) => {
  const response = await client.get(`/api/plugins/${id}`);
  return response.data;
};

/**
 * Enable plugin
 * @param {number|string} id - Plugin ID
 * @returns {Promise<Object>}
 */
export const enablePlugin = async (id) => {
  const response = await client.post(`/api/plugins/${id}/enable`);
  return response.data;
};

/**
 * Disable plugin
 * @param {number|string} id - Plugin ID
 * @returns {Promise<Object>}
 */
export const disablePlugin = async (id) => {
  const response = await client.post(`/api/plugins/${id}/disable`);
  return response.data;
};

/**
 * Get hook execution logs
 * @param {Object} filters
 * @param {string} [filters.plugin] - Plugin name
 * @param {string} [filters.status] - Execution status
 * @param {number} [filters.mediaId] - Media file ID
 * @param {number} [filters.page] - Page number
 * @returns {Promise<{items: Array, total: number}>}
 */
export const getHookLogs = async (filters = {}) => {
  const response = await client.get('/api/hooks/logs', { params: filters });
  return response.data;
};

/**
 * Retry failed hook
 * @param {number|string} logId - Hook log ID
 * @returns {Promise<Object>}
 */
export const retryHook = async (logId) => {
  const response = await client.post(`/api/hooks/logs/${logId}/retry`);
  return response.data;
};
