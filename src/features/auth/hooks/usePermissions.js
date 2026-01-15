import { useAuthStore } from '@/stores/authStore';
import { hasPermission, hasAnyRole } from '@/lib/permissions';

/**
 * Hook for checking permissions
 */
export const usePermissions = () => {
  const { role } = useAuthStore();

  return {
    hasPermission: (permission) => hasPermission(role, permission),
    hasAnyRole: (roles) => hasAnyRole(role, roles),
    role,
  };
};
