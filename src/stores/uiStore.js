import { create } from 'zustand';

export const useUIStore = create((set) => ({
  sidebarOpen: true,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  
  // Modal states
  modals: {},
  openModal: (modalId) =>
    set((state) => ({
      modals: { ...state.modals, [modalId]: true },
    })),
  closeModal: (modalId) =>
    set((state) => ({
      modals: { ...state.modals, [modalId]: false },
    })),
  isModalOpen: (modalId) => (get) => get().modals[modalId] || false,
  
  // Theme
  theme: 'light',
  setTheme: (theme) => set({ theme }),
}));
