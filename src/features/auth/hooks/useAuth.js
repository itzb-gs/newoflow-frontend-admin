import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { login as loginApi, getCurrentUser } from '@/api/auth';
import { useAuthStore } from '@/stores/authStore';
import { toast } from '@/hooks/use-toast';

/**
 * Hook for authentication operations
 */
export const useAuth = () => {
  const navigate = useNavigate();
  const { setAuth, clearAuth, isAuthenticated, user, role } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: loginApi,
    onSuccess: async (data) => {
      // Login returns { access_token, token_type }
      // Store token first, then fetch user info
      try {
        // Temporarily store token to use in getCurrentUser request
        const token = data.access_token;
        
        // Store token in auth store so it gets used in API requests
        useAuthStore.setState({ token });
        
        // Fetch user information
        const userData = await getCurrentUser();
        
        // Store both token and user data
        setAuth(token, userData);
        toast.success('Login successful');
        navigate('/dashboard');
      } catch {
        clearAuth();
        toast.error('Failed to fetch user information');
      }
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.detail || 'Login failed. Please try again.'
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
