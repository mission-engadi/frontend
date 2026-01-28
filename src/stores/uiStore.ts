import { create } from 'zustand';

interface UIState {
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
  language: string;
  notifications: Notification[];
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setLanguage: (language: string) => void;
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
}

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  timestamp: Date;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  theme: 'dark',
  language: 'en',
  notifications: [],
  toggleSidebar: () => set((state: UIState) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open: boolean) => set({ sidebarOpen: open }),
  setTheme: (theme: 'light' | 'dark') => set({ theme }),
  setLanguage: (language: string) => set({ language }),
  addNotification: (notification: Omit<Notification, 'id'>) =>
    set((state: UIState) => ({
      notifications: [
        ...state.notifications,
        { ...notification, id: Math.random().toString(36), timestamp: new Date() },
      ],
    })),
  removeNotification: (id: string) =>
    set((state: UIState) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
}));
