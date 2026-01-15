export const ROLES = {
  ADMIN: 'admin',
  EDITOR: 'editor',
  VIEWER: 'viewer',
  ARTIST: 'artist',
};

export const PERMISSIONS = {
  // Catalog
  CATALOG_VIEW: [ROLES.ADMIN, ROLES.EDITOR, ROLES.VIEWER, ROLES.ARTIST],
  CATALOG_CREATE: [ROLES.ADMIN, ROLES.EDITOR],
  CATALOG_EDIT: [ROLES.ADMIN, ROLES.EDITOR],
  CATALOG_DELETE: [ROLES.ADMIN],
  
  // Media
  MEDIA_VIEW: [ROLES.ADMIN, ROLES.EDITOR, ROLES.VIEWER, ROLES.ARTIST],
  MEDIA_UPLOAD: [ROLES.ADMIN, ROLES.EDITOR, ROLES.ARTIST],
  MEDIA_EDIT: [ROLES.ADMIN, ROLES.EDITOR],
  MEDIA_DELETE: [ROLES.ADMIN],
  
  // Plugins
  PLUGIN_VIEW: [ROLES.ADMIN],
  PLUGIN_MANAGE: [ROLES.ADMIN],
  
  // System
  SCAN_TRIGGER: [ROLES.ADMIN, ROLES.EDITOR],
  USER_MANAGE: [ROLES.ADMIN],
};

/**
 * Check if a user role has a specific permission
 * @param {string} userRole - User's role
 * @param {string} permission - Permission to check
 * @returns {boolean} True if user has permission
 */
export const hasPermission = (userRole, permission) => {
  return PERMISSIONS[permission]?.includes(userRole) ?? false;
};

/**
 * Check if user has any of the specified roles
 * @param {string} userRole - User's role
 * @param {string[]} roles - Roles to check
 * @returns {boolean} True if user has any of the roles
 */
export const hasAnyRole = (userRole, roles) => {
  return roles.includes(userRole);
};
