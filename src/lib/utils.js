/**
 * Converts various input types to an array of class names
 * Similar to clsx functionality
 * @param  {...any} inputs - Class names to combine
 * @returns {string} Combined class names
 */
const classNames = (...inputs) => {
  const classes = [];

  for (const input of inputs) {
    if (!input) continue;

    const inputType = typeof input;

    if (inputType === 'string' || inputType === 'number') {
      classes.push(input);
    } else if (Array.isArray(input)) {
      if (input.length) {
        const inner = classNames(...input);
        if (inner) classes.push(inner);
      }
    } else if (inputType === 'object') {
      for (const key in input) {
        if (input[key]) {
          classes.push(key);
        }
      }
    }
  }

  return classes.join(' ');
};

/**
 * Merges Tailwind CSS classes, removing conflicts
 * @param {string} classString - Space-separated class names
 * @returns {string} Merged class names without conflicts
 */
const mergeTailwindClasses = (classString) => {
  if (!classString) return '';

  const classes = classString.split(' ').filter(Boolean);
  const classMap = new Map();

  // Tailwind class prefixes that conflict with each other
  const conflictGroups = [
    // Spacing
    /^(p|px|py|pt|pb|pl|pr)-/,
    /^(m|mx|my|mt|mb|ml|mr)-/,
    /^gap-/,
    /^space-(x|y)-/,
    // Sizing
    /^w-/,
    /^h-/,
    /^min-w-/,
    /^min-h-/,
    /^max-w-/,
    /^max-h-/,
    // Colors
    /^(bg|text|border|ring|shadow)-/,
    // Typography
    /^text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)/,
    /^font-(thin|extralight|light|normal|medium|semibold|bold|extrabold|black)/,
    /^leading-/,
    /^tracking-/,
    // Layout
    /^(flex|grid|block|inline|hidden)/,
    /^(static|fixed|absolute|relative|sticky)/,
    /^(top|bottom|left|right|inset)-/,
    /^z-/,
    // Flexbox & Grid
    /^(justify|items|content|self)-/,
    /^(flex-row|flex-col|grid-cols|grid-rows)/,
    /^order-/,
    // Borders
    /^rounded/,
    /^border-(\d|t-|b-|l-|r-|x-|y-)/,
    // Effects
    /^opacity-/,
    /^shadow/,
    // Transitions
    /^transition/,
    /^duration-/,
    /^ease-/,
  ];

  for (const className of classes) {
    let groupKey = className;

    // Find which conflict group this class belongs to
    for (const pattern of conflictGroups) {
      if (pattern.test(className)) {
        groupKey = className.match(pattern)[0];
        break;
      }
    }

    // Store the class, overwriting previous ones in the same group
    classMap.set(groupKey, className);
  }

  return Array.from(classMap.values()).join(' ');
};

/**
 * Combines class names and merges Tailwind classes
 * @param  {...any} inputs - Class names to combine
 * @returns {string} Merged class names
 */
export const cn = (...inputs) => mergeTailwindClasses(classNames(...inputs));

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
  if (!date) return 'Unknown date';
  
  const d = new Date(date);
  
  // Check if date is valid
  if (isNaN(d.getTime())) {
    return 'Invalid date';
  }
  
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
