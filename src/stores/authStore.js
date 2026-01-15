import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      role: null,
      
      setAuth: (token, user) => set({ token, user, role: user.role }),
      clearAuth: () => set({ token: null, user: null, role: null }),
      
      isAuthenticated: () => !!get().token,
      hasRole: (role) => get().role === role,
    }),
    {
      name: 'newoflow-auth',
    }
  )
);
