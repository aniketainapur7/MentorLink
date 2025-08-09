import { create } from "zustand";
import { persist } from "zustand/middleware";
import axiosInstance from "../utils/axios";
import toast from "react-hot-toast";

export interface User {
    id: string;
    name: string;
    email: string;
    role: string | undefined;
    avatar?: string;
    bio?: string;
    subjects?: string[];
    rating?: number;
    hourlyRate?: number;
}

export interface AppState {
    user: User | null;
    isAuthenticated: boolean;
    theme: string;
    notifications: number;
    quickConnectAvailable: boolean;
    loading: boolean;
    isSigningUp: boolean;
    isLoggingIn: boolean;
    isCheckingAuth: boolean;
    isUpdatingProfile?: boolean;
}

interface AppActions {
    setUser: (user: User) => void;
    checkAuth: () => Promise<void>;
    signup: (data: any) => Promise<boolean | void>;
    login: (data: { email: string; password: string; role?: string }) => Promise<void>;
    logout: () => Promise<void>;
    updateProfile: (data: any) => Promise<void>;
    toggleTheme: () => void;
    setNotifications: (count: number) => void;
    toggleQuickConnect: () => void;
    setLoading: (loading: boolean) => void;
}

export const useAppStore = create<AppState & AppActions>()(
    persist(
        (set, get) => ({
            // ===== Initial State =====
            user: null,
            isAuthenticated: false,
            theme: "light",
            notifications: 0,
            quickConnectAvailable: true,
            loading: false,
            isSigningUp: false,
            isLoggingIn: false,
            isCheckingAuth: true,
            isUpdatingProfile: false,

            // ===== Actions =====
            setUser: (user) => set({ user, isAuthenticated: true }),

            checkAuth: async () => {
                try {
                    const res = await axiosInstance.get("/user/check-auth");
                    set({ user: res.data.user, isAuthenticated: true });
                } catch (error) {
                    console.error("Error in checkAuth:", error);
                    set({ user: null, isAuthenticated: false });
                } finally {
                    set({ isCheckingAuth: false });
                }
            },

            signup: async (data) => {
                set({ isSigningUp: true });
                try {
                    const res = await axiosInstance.post("/user/signup", data);
                    set({ user: res.data.user, isAuthenticated: true });
                    toast.success("Account created successfully");
                    if (res.data.user.role === "student") {
                        window.location.href = "/student/dashboard";
                    } else if (res.data.user.role === "mentor") {
                        window.location.href = "/mentor/dashboard";
                    }
                    return true;
                } catch (error: any) {
                    toast.error(error?.response?.data?.message || "Signup failed");
                } finally {
                    set({ isSigningUp: false });
                }
            },

            login: async (data) => {
                set({ isLoggingIn: true });
                try {
                    const res = await axiosInstance.post("/user/login", data);
                    set({ user: res.data.user, isAuthenticated: true });
                    if (res.data.user.role === "student") {
                        window.location.href = "/student/dashboard";
                    } else if (res.data.user.role === "mentor") {
                        window.location.href = "/mentor/dashboard";
                    }
                    toast.success("Logged in successfully");
                } catch (error: any) {
                    toast.error(error?.response?.data?.message || "Login failed");
                } finally {
                    set({ isLoggingIn: false });
                }
            },

            logout: async () => {
                try {
                    await axiosInstance.get("/user/logout");
                    set({ user: null, isAuthenticated: false });
                    toast.success("Logged out successfully");
                } catch (error: any) {
                    toast.error(error?.response?.data?.message || "Logout failed");
                }
            },

            updateProfile: async (data) => {
                set({ isUpdatingProfile: true });
                try {
                    const res = await axiosInstance.put("/user/update-profile", data);
                    set({ user: res.data.user });
                    toast.success("Profile updated successfully");
                } catch (error: any) {
                    console.error("Error in update profile:", error);
                    toast.error(error?.response?.data?.message || "Profile update failed");
                } finally {
                    set({ isUpdatingProfile: false });
                }
            },

            toggleTheme: () => {
                const newTheme = get().theme === "light" ? "dark" : "light";
                set({ theme: newTheme });
                document.documentElement.classList.toggle("dark", newTheme === "dark");
            },

            setNotifications: (count) => set({ notifications: count }),

            toggleQuickConnect: () =>
                set((state) => ({
                    quickConnectAvailable: !state.quickConnectAvailable,
                })),

            setLoading: (loading) => set({ loading }),
        }),
        {
            name: "mentorlink-store",
            partialize: (state) => ({
                theme: state.theme,
                user: state.user,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);
