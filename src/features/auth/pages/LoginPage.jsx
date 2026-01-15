import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { LoginForm } from '@/components/auth/LoginForm';

export const LoginPage = () => {
  const { token } = useAuthStore();

  // If already logged in, redirect to dashboard
  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <LoginForm />
    </div>
  );
};
