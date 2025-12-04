import { create } from "zustand";

const useAuthStore = create<{
    user: any;
    login: (user: any) => void;
    logout: () => void;
    setUser: (user: any) => void;
}>((set) => ({
    user: localStorage.getItem("user-info")
        ? JSON.parse(localStorage.getItem("user-info") as string)
        : null,
    login: (user) => set({ user }),
    logout: () => set({ user: null }),
    setUser: (user) => set({ user }),
}));

export default useAuthStore;
