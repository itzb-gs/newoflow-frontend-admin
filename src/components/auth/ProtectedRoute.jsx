import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { hasPermission } from '@/lib/permissions';

/**
 * Protected route component that requires authentication and optionally a specific permission
 */
export const ProtectedRoute = ({ children, requiredPermission }) => {
  const { token, role } = useAuthStore();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (requiredPermission && !hasPermission(role, requiredPermission)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};
