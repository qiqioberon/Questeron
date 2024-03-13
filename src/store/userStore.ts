import { create } from 'zustand';

export const useUserStore = create((set) => ({
    accessToken: '',
    setUser: (accessToken: string) => set({ accessToken: accessToken }),
}));
