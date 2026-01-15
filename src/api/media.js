import client from './client';

/**
 * Create media item
 * @param {Object} data - Media item data
 * @param {string} data.title - Title
 * @param {string} data.media_type - Media type (music, video, series, movie, podcast)
 * @param {string} data.file_path - File path
 * @param {string} [data.description] - Description
 * @param {string} [data.media_metadata] - Metadata as JSON string
 * @returns {Promise<Object>}
 */
export const createMediaItem = async (data) => {
  const response = await client.post('/api/v1/media/media', data);
  return response.data;
};

/**
 * Get media items with filters
 * @param {Object} [filters]
 * @param {number} [filters.skip=0] - Number of records to skip
 * @param {number} [filters.limit=100] - Number of records to return
 * @param {string} [filters.media_type] - Media type filter (music, video, series, movie, podcast)
 * @param {string} [filters.state] - State filter (ingested, organized, error, disabled)
 * @returns {Promise<Array>}
 */
export const getMediaFiles = async (filters = {}) => {
  const response = await client.get('/api/v1/media/media', { params: filters });
  return response.data;
};

/**
 * Get single media item by ID
 * @param {number} id - Media item ID
 * @returns {Promise<Object>}
 */
export const getMediaFile = async (id) => {
  const response = await client.get(`/api/v1/media/media/${id}`);
  return response.data;
};

/**
 * Update media item
 * @param {number} id - Media item ID
 * @param {Object} data - Updated data
 * @returns {Promise<Object>}
 */
export const updateMediaFile = async (id, data) => {
  const response = await client.put(`/api/v1/media/media/${id}`, data);
  return response.data;
};

/**
 * Delete media item
 * @param {number} id - Media item ID
 * @returns {Promise<void>}
 */
export const deleteMediaFile = async (id) => {
  await client.delete(`/api/v1/media/media/${id}`);
};

/**
 * Upload media file
 * @param {File} file - File to upload
 * @param {string} [title] - Optional title
 * @param {string} [media_type] - Optional media type (music, video, series, movie, podcast)
 * @param {Function} [onProgress] - Progress callback
 * @returns {Promise<Object>}
 */
export const uploadMediaFile = async (file, title, media_type, onProgress) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const params = {};
  if (title) params.title = title;
  if (media_type) params.media_type = media_type;
  
  const response = await client.post('/api/v1/ingest/ingest/upload', formData, {
    params,
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
 * @param {string} data.directory_path - Directory path to scan
 * @param {boolean} [data.recursive=true] - Whether to scan recursively
 * @returns {Promise<Object>}
 */
export const triggerDirectoryScan = async (data) => {
  const response = await client.post('/api/v1/ingest/ingest/scan', data);
  return response.data;
};

/**
 * List ingestion jobs
 * @param {Object} [params]
 * @param {number} [params.skip=0] - Number of records to skip
 * @param {number} [params.limit=100] - Number of records to return
 * @returns {Promise<Array>}
 */
export const getIngestionJobs = async (params = {}) => {
  const response = await client.get('/api/v1/ingest/ingest/jobs', { params });
  return response.data;
};

/**
 * Get ingestion job by ID
 * @param {number} jobId - Job ID
 * @returns {Promise<Object>}
 */
export const getIngestionJob = async (jobId) => {
  const response = await client.get(`/api/v1/ingest/ingest/jobs/${jobId}`);
  return response.data;
};
