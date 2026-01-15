import { hasPermission } from '@/lib/permissions';
import { useAuthStore } from '@/stores/authStore';

/**
 * Component that renders children only if user has required permission
 */
export const RoleGuard = ({ children, requiredPermission }) => {
  const { role } = useAuthStore();

  if (!requiredPermission || hasPermission(role, requiredPermission)) {
    return children;
  }

  return null;
};
