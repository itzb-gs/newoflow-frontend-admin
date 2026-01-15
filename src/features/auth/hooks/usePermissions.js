import { useAuthStore } from '@/stores/authStore';
import { hasPermission, hasAnyRole, PERMISSIONS } from '@/lib/permissions';

/**
 * Hook for checking permissions
 */
export const usePermissions = () => {
  const { role } = useAuthStore();

  return {
    hasPermission: (permissionKey) => {
      // If it's a string key like 'CATALOG_VIEW', look it up in PERMISSIONS
      if (typeof permissionKey === 'string' && PERMISSIONS[permissionKey]) {
        return PERMISSIONS[permissionKey].includes(role);
      }
      // If it's already an array or something else, use the old logic
      return hasPermission(role, permissionKey);
    },
    hasAnyRole: (roles) => hasAnyRole(role, roles),
    role,
  };
};
