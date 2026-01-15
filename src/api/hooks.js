import client from './client';

/**
 * List hook execution logs
 * @param {Object} [filters]
 * @param {number} [filters.skip=0] - Number of records to skip
 * @param {number} [filters.limit=100] - Number of records to return
 * @param {string} [filters.hook_name] - Filter by hook name
 * @param {string} [filters.status] - Filter by status
 * @returns {Promise<Array>}
 */
export const getHookLogs = async (filters = {}) => {
  const response = await client.get('/api/v1/hooks/hooks/logs', { params: filters });
  return response.data;
};

/**
 * Get hook log by ID
 * @param {number} logId - Log ID
 * @returns {Promise<Object>}
 */
export const getHookLog = async (logId) => {
  const response = await client.get(`/api/v1/hooks/hooks/logs/${logId}`);
  return response.data;
};
