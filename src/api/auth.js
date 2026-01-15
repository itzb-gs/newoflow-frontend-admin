import client from './client';

/**
 * Register new user
 * @param {Object} userData
 * @param {string} userData.username
 * @param {string} userData.email
 * @param {string} userData.password
 * @param {string} [userData.role] - User role (admin, editor, viewer, artist)
 * @returns {Promise<Object>}
 */
export const register = async (userData) => {
  const response = await client.post('/api/v1/auth/register', userData);
  return response.data;
};

/**
 * Login user
 * @param {Object} credentials
 * @param {string} credentials.username
 * @param {string} credentials.password
 * @returns {Promise<{access_token: string, token_type: string}>}
 */
export const login = async (credentials) => {
  const response = await client.post('/api/v1/auth/login', credentials);
  return response.data;
};

/**
 * Get current user info
 * @returns {Promise<Object>}
 */
export const getCurrentUser = async () => {
  const response = await client.get('/api/v1/auth/me');
  return response.data;
};

/**
 * List all users (admin only)
 * @param {Object} [params]
 * @param {number} [params.skip=0] - Number of records to skip
 * @param {number} [params.limit=100] - Number of records to return
 * @returns {Promise<Array>}
 */
export const listUsers = async (params = {}) => {
  const response = await client.get('/api/v1/auth/users', { params });
  return response.data;
};

/**
 * Get user by ID
 * @param {number} userId - User ID
 * @returns {Promise<Object>}
 */
export const getUser = async (userId) => {
  const response = await client.get(`/api/v1/auth/users/${userId}`);
  return response.data;
};

/**
 * Update user
 * @param {number} userId - User ID
 * @param {Object} userData - Updated user data
 * @returns {Promise<Object>}
 */
export const updateUser = async (userId, userData) => {
  const response = await client.put(`/api/v1/auth/users/${userId}`, userData);
  return response.data;
};

/**
 * Delete user
 * @param {number} userId - User ID
 * @returns {Promise<void>}
 */
export const deleteUser = async (userId) => {
  await client.delete(`/api/v1/auth/users/${userId}`);
};
