import client from './client';

/**
 * Login user
 * @param {Object} credentials
 * @param {string} credentials.username
 * @param {string} credentials.password
 * @returns {Promise<{token: string, user: Object}>}
 */
export const login = async (credentials) => {
  const response = await client.post('/api/auth/login', credentials);
  return response.data;
};

/**
 * Logout user
 * @returns {Promise<void>}
 */
export const logout = async () => {
  await client.post('/api/auth/logout');
};

/**
 * Get current user info
 * @returns {Promise<Object>}
 */
export const getCurrentUser = async () => {
  const response = await client.get('/api/auth/me');
  return response.data;
};

/**
 * Refresh token
 * @returns {Promise<{token: string}>}
 */
export const refreshToken = async () => {
  const response = await client.post('/api/auth/refresh');
  return response.data;
};
