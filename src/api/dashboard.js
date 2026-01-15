import client from './client';

/**
 * Get dashboard statistics
 * @returns {Promise<Object>}
 */
export const getDashboardStats = async () => {
  const response = await client.get('/api/dashboard/stats');
  return response.data;
};

/**
 * Get recent activity feed
 * @param {number} [limit=10] - Number of items to retrieve
 * @returns {Promise<Array>}
 */
export const getRecentActivity = async (limit = 10) => {
  const response = await client.get('/api/dashboard/activity', {
    params: { limit },
  });
  return response.data;
};
