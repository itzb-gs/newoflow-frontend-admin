export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
export const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT) || 30000;
export const MAX_UPLOAD_SIZE = parseInt(import.meta.env.VITE_MAX_UPLOAD_SIZE) || 524288000;

export const CONTENT_TYPES = {
  MUSIC: 'music',
  VIDEO: 'video',
  CONCERT: 'concert',
  SERIES: 'series',
  MOVIE: 'movie',
  PODCAST: 'podcast',
};

export const LIFECYCLE_STATES = {
  INGESTED: 'ingested',
  ORGANIZED: 'organized',
  ERROR: 'error',
  DISABLED: 'disabled',
};

export const FILE_TYPES = {
  AUDIO: 'audio',
  VIDEO: 'video',
  IMAGE: 'image',
};

export const STATE_COLORS = {
  ingested: 'bg-blue-100 text-blue-800',
  organized: 'bg-green-100 text-green-800',
  error: 'bg-red-100 text-red-800',
  disabled: 'bg-gray-100 text-gray-800',
};

export const ROLE_COLORS = {
  admin: 'bg-purple-100 text-purple-800',
  editor: 'bg-orange-100 text-orange-800',
  viewer: 'bg-green-100 text-green-800',
  artist: 'bg-blue-100 text-blue-800',
};
