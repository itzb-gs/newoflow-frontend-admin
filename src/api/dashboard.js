import client from './client';

/**
 * NOTE: Dashboard endpoints are not yet implemented in the backend OpenAPI spec.
 * These are placeholder functions that will need backend implementation.
 * 
 * For now, these endpoints return mock data or use available endpoints to aggregate data.
 */

/**
 * Get dashboard statistics
 * @returns {Promise<Object>}
 */
export const getDashboardStats = async () => {
  // TODO: Backend endpoint not yet available
  // This should aggregate data from multiple sources
  // For now, return mock structure or use media count
  try {
    const media = await client.get('/api/v1/media/media', { params: { limit: 1 } });
    // Return mock structure until backend implements this
    return {
      totalMedia: media.data?.length || 0,
      totalCatalog: 0,
      activePlugins: 0,
      failedOperations: 0,
    };
  } catch {
    return {
      totalMedia: 0,
      totalCatalog: 0,
      activePlugins: 0,
      failedOperations: 0,
    };
  }
};

/**
 * Get recent activity feed
 * @param {number} [limit=10] - Number of items to retrieve
 * @returns {Promise<Array>}
 */
export const getRecentActivity = async (limit = 10) => {
  // TODO: Backend endpoint not yet available
  // This should aggregate recent hook logs, media uploads, etc.
  // For now, fetch recent hook logs as activity
  try {
    const logs = await client.get('/api/v1/hooks/hooks/logs', {
      params: { limit },
    });
    return logs.data || [];
  } catch {
    return [];
  }
};
