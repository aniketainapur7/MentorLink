import { create } from "zustand";
import { persist } from "zustand/middleware";
import axiosInstance from "../utils/axios";
import toast from "react-hot-toast";

export interface StudentSession {
    _id: string;
    studentName: string;
    studentId: string;
    mentorId: object;
    meetingurl: string;
    subject: string;
    startTime: string;
    status: string; // "requested" | "accepted" | "completed"
}

interface StudentSessionState {
    studentSessions: StudentSession[];
    acceptedSessions: StudentSession[];
    completedSessions: StudentSession[];
    requestedSessions: StudentSession[];
    isFetching: boolean;
    error: string | null;
}

interface StudentSessionActions {
    fetchStudentSessions: () => Promise<void>;
    fetchStudentRequests: () => Promise<void>;
}

export const useStudentSessionStore = create<StudentSessionState & StudentSessionActions>()(
    persist(
        (set) => ({
            studentSessions: [],
            acceptedSessions: [],
            completedSessions: [],
            requestedSessions: [],
            isFetching: false,
            error: null,

            fetchStudentSessions: async () => {
                set({ isFetching: true });
                try {
                    const res = await axiosInstance.get("/student/sessions");
                    const allSessions: StudentSession[] = res.data.data || [];
                    console.log(allSessions)
                    set({
                        studentSessions: allSessions,
                        acceptedSessions: allSessions.filter((s) => s.status === "accepted"),
                        completedSessions: allSessions.filter((s) => s.status === "completed"),
                        isFetching: false,
                    });
                } catch (error: any) {
                    toast.error(error?.response?.data?.message || "Failed to load sessions");
                    set({ isFetching: false, error: "Failed to load sessions" });
                }
            },

            fetchStudentRequests: async () => {
                set({ isFetching: true });
                try {
                    const res = await axiosInstance.get("/student/requests");
                    set({ requestedSessions: res.data.data || [], isFetching: false });
                } catch (error: any) {
                    toast.error(error?.response?.data?.message || "Failed to load requests");
                    set({ isFetching: false, error: "Failed to load requests" });
                }
            },
        }),
        { name: "student-session-store" }
    )
);
