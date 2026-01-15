import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { login as loginApi } from '@/api/auth';
import { useAuthStore } from '@/stores/authStore';
import { toast } from 'sonner';

/**
 * Hook for authentication operations
 */
export const useAuth = () => {
  const navigate = useNavigate();
  const { setAuth, clearAuth, isAuthenticated, user, role } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      setAuth(data.token, data.user);
      toast.success('Login successful');
      navigate('/dashboard');
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || 'Login failed. Please try again.'
      );
    },
  });

  const logout = () => {
    clearAuth();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return {
    login: loginMutation.mutate,
    logout,
    isLoading: loginMutation.isPending,
    isAuthenticated: isAuthenticated(),
    user,
    role,
  };
};
