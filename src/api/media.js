import client from './client';

/**
 * Get media files with filters
 * @param {Object} filters
 * @param {string} [filters.state] - Lifecycle state
 * @param {string} [filters.type] - File type
 * @param {number} [filters.page] - Page number
 * @param {number} [filters.perPage] - Items per page
 * @returns {Promise<{items: Array, total: number, page: number}>}
 */
export const getMediaFiles = async (filters = {}) => {
  const response = await client.get('/api/media', { params: filters });
  return response.data;
};

/**
 * Get single media file by ID
 * @param {number|string} id - Media file ID
 * @returns {Promise<Object>}
 */
export const getMediaFile = async (id) => {
  const response = await client.get(`/api/media/${id}`);
  return response.data;
};

/**
 * Upload media file
 * @param {FormData} formData - Form data with file
 * @param {Function} onProgress - Progress callback
 * @returns {Promise<Object>}
 */
export const uploadMediaFile = async (formData, onProgress) => {
  const response = await client.post('/api/media/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent) => {
      if (onProgress && progressEvent.total) {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        onProgress(percentCompleted);
      }
    },
  });
  return response.data;
};

/**
 * Trigger directory scan
 * @param {Object} data
 * @param {string} data.path - Directory path to scan
 * @returns {Promise<Object>}
 */
export const triggerDirectoryScan = async (data) => {
  const response = await client.post('/api/media/scan', data);
  return response.data;
};

/**
 * Update media file
 * @param {number|string} id - Media file ID
 * @param {Object} data - Updated data
 * @returns {Promise<Object>}
 */
export const updateMediaFile = async (id, data) => {
  const response = await client.put(`/api/media/${id}`, data);
  return response.data;
};

/**
 * Delete media file
 * @param {number|string} id - Media file ID
 * @returns {Promise<void>}
 */
export const deleteMediaFile = async (id) => {
  await client.delete(`/api/media/${id}`);
};

/**
 * Get media lifecycle history
 * @param {number|string} id - Media file ID
 * @returns {Promise<Array>}
 */
export const getMediaLifecycle = async (id) => {
  const response = await client.get(`/api/media/${id}/lifecycle`);
  return response.data;
};
