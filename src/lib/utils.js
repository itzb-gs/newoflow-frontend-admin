import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines class names with clsx and merges Tailwind classes
 * @param  {...any} inputs - Class names to combine
 * @returns {string} Merged class names
 */
export const cn = (...inputs) => twMerge(clsx(inputs));

/**
 * Format bytes to human-readable string
 * @param {number} bytes - Number of bytes
 * @param {number} [decimals=2] - Number of decimal places
 * @returns {string} Formatted string
 */
export const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

/**
 * Format date to readable string
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date string
 */
export const formatDate = (date) => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Format date and time to readable string
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date and time string
 */
export const formatDateTime = (date) => {
  const d = new Date(date);
  return d.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} length - Maximum length
 * @returns {string} Truncated text
 */
export const truncate = (text, length) => {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
};
