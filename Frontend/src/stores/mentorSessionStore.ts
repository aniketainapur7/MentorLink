// stores/mentorSessionStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import axiosInstance from "../utils/axios";
import toast from "react-hot-toast";

export interface MentorSession {
    _id: string;
    studentName: string;
    studentId: Object;
    mentorId: string;
    meetingurl: string;
    subject: string;
    startTime: string;
    status: string;
}

interface MentorSessionState {
    mentorSessions: MentorSession[];
    helpRequests: MentorSession[];
    acceptedSessions: MentorSession[];
    isFetching: boolean;
    error: string | null;
}

interface MentorSessionActions {
    fetchMentorSessions: () => Promise<void>;
    fetchMentorRequests: () => Promise<void>;
    acceptRequest: (requestId: string) => Promise<void>;
    declineRequest: (requestId: string) => Promise<void>;
    updateSessionStatus: (sessionId: string, status: "confirmed" | "completed" | "declined") => Promise<void>;
}

export const useMentorSessionStore = create<MentorSessionState & MentorSessionActions>()(
    persist(
        (set, get) => ({
            mentorSessions: [],
            isFetching: false,
            acceptedSessions: [],
            error: null,
            helpRequests: [],

            fetchMentorSessions: async () => {
                set({ isFetching: true });
                try {
                    const res = await axiosInstance.get("/mentor/sessions");
                    set({ mentorSessions: res.data.data || [], isFetching: false });
                } catch (error: any) {
                    toast.error(error?.response?.data?.message || "Failed to load sessions");
                    set({ isFetching: false, error: "Failed to load sessions" });
                }
            },

            fetchMentorRequests: async () => {
                set({ isFetching: true });
                try {
                    const res = await axiosInstance.get("/mentor/requests");
                    set({ helpRequests: res.data.data || [], isFetching: false });
                } catch (error: any) {
                    toast.error(error?.response?.data?.message || "Failed to load sessions");
                    set({ isFetching: false, error: "Failed to load sessions" });
                }
            },

            updateSessionStatus: async (sessionId, status) => {
                // try {
                //     // const res = await axiosInstance.put(`/mentor/sessions/${sessionId}`, { status });
                //     set({
                //         mentorSessions: get().mentorSessions.map((session) =>
                //             session._id === sessionId
                //                 ? { ...session, status: res.data.status }
                //                 : session
                //         ),
                //     });
                //     toast.success(`Session ${status} successfully`);
                // } catch (error: any) {
                //     toast.error(error?.response?.data?.message || "Failed to update session");
                // }
            },

            acceptRequest: async (requestId) => {
                try {
                    await axiosInstance.post(`/mentor/${requestId}/accept`);
                    set((state) => ({
                        helpRequests: state.helpRequests.filter((req) => req._id !== requestId),
                        acceptedSessions: [...state.acceptedSessions, ...state.helpRequests.filter(req => req._id === requestId)]   
                    }));
                    toast.success("Request accepted");
                } catch (error: any) {
                    toast.error(error?.response?.data?.message || "Failed to accept request");
                }
            },

            declineRequest: async (requestId) => {
                try {
                    await axiosInstance.post(`/mentor/${requestId}/reject`);
                    set((state) => ({
                        helpRequests: state.helpRequests.filter((req) => req._id !== requestId),
                    }));
                    toast.success("Request declined");
                } catch (error: any) {
                    toast.error(error?.response?.data?.message || "Failed to decline request");
                }
            },
        }),
        { name: "mentor-session-store" }
    )
);
