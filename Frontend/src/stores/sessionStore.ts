import { create } from "zustand";
import { persist } from "zustand/middleware";
import axiosInstance from "../utils/axios";
import toast from "react-hot-toast";

export interface Session {
    _id: string;
    studentId: string;
    mentorId: string;
    startTime: string;
    subject: string;
    status: string;
}

interface SessionState {
    sessions: Session[];
    loading: boolean;
    error: string | null;
}

interface SessionActions {
    setSessions: (sessions: Session[]) => void;
    fetchSessions: (userId: string) => Promise<void>;
    bookSession: (mentorId: string, subject: string, startTime: string) => Promise<void>;
    updateSessionStatus: (sessionId: string, status: Session["status"]) => Promise<void>;
}

export const useSessionStore = create<SessionState & SessionActions>()(
    persist(
        (set, get) => ({
            sessions: [],
            loading: false,
            error: null,

            setSessions: (sessions) => set({ sessions }),

            fetchSessions: async (userId) => {
                set({ loading: true, error: null });
                try {
                    const res = await axiosInstance.get(`/sessions?userId=${userId}`);
                    set({ sessions: res.data.sessions, loading: false });
                } catch (error: any) {
                    toast.error(error?.response?.data?.message || "Failed to load sessions");
                    set({ error: "Failed to load sessions", loading: false });
                }
            },

            bookSession: async (mentorId, subject, startTime) => {
                set({ loading: true });
                try {
                    const res = await axiosInstance.post(`/student/request-session`, { mentorId, startTime, subject });
                    set({ sessions: [...get().sessions, res.data.session], loading: false });
                    toast.success("Session booked successfully");
                } catch (error: any) {
                    toast.error(error?.response?.data?.message || "Failed to book session");
                    set({ loading: false });
                }
            },

            updateSessionStatus: async (sessionId, status) => {
                try {
                    await axiosInstance.put(`/sessions/${sessionId}`, { status });
                    set({
                        sessions: get().sessions.map((s) =>
                            s._id === sessionId ? { ...s, status } : s
                        ),
                    });
                    toast.success("Session status updated");
                } catch (error: any) {
                    toast.error(error?.response?.data?.message || "Failed to update status");
                }
            },
        }),
        {
            name: "session-store",
            partialize: (state) => ({
                sessions: state.sessions,
            }),
        }
    )
);
