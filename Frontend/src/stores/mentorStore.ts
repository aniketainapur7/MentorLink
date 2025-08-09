import { create } from "zustand";
import { persist } from "zustand/middleware";
import axiosInstance from "../utils/axios";
import toast from "react-hot-toast";

export interface Mentor {
    _id: string;
    name: string;
    subjects: string[];
    rating: number;
    availability: string[];
    hourlyRate?: number;
    bio?: string;
    avatar?: string;
    isOnline?: boolean;
    reviews?: number;
    badges?: string[];
}

interface Session {
    _id: string;
    subject: string;
    mentor: string;
    date: string;
    rating: number;
}

interface MentorState {
    mentors: Mentor[];
    savedMentors: Mentor[];
    recentSessions: Session[];
    loading: boolean;
    error: string | null;
    isFetching: boolean;
}

interface MentorActions {
    setMentors: (mentors: Mentor[]) => void;
    fetchMentors: () => Promise<void>;
    filterMentors: (skill: string) => Mentor[];
    saveMentor: (mentor: Mentor) => void;
    removeSavedMentor: (mentorId: string) => void;
    fetchRecentSessions: () => Promise<void>;
    clearMentors: () => void;
}

export const useMentorStore = create<MentorState & MentorActions>()(
    persist(
        (set, get) => ({
            mentors: [],
            savedMentors: [],
            recentSessions: [],
            loading: false,
            error: null,
            isFetching: false,

            setMentors: (mentors) => set({ mentors }),

            fetchMentors: async () => {
                set({ isFetching: true, error: null });
                try {
                    const res = await axiosInstance.get("student/mentors");
                    set({ mentors: res.data.mentors, isFetching: false });
                    // console.log("Fetched mentors:", res.data.mentors);
                    // console.log("mentors", get().mentors);
                } catch (error: any) {
                    toast.error(error?.response?.data?.message || "Failed to load mentors");
                    set({ error: "Failed to load mentors", isFetching: false });
                }
            },

            filterMentors: (subject) =>
                get().mentors.filter((m) =>
                    m.subjects.some((s) => s.toLowerCase().includes(subject.toLowerCase()))
                ),

            saveMentor: (mentor) => {
                const exists = get().savedMentors.some((m) => m._id === mentor._id);
                if (!exists) {
                    set((state) => ({
                        savedMentors: [...state.savedMentors, mentor]
                    }));
                    toast.success(`${mentor.name} saved!`);
                } else {
                    toast("Already in saved mentors");
                }
            },

            removeSavedMentor: (mentorId) => {
                set((state) => ({
                    savedMentors: state.savedMentors.filter((m) => m._id !== mentorId)
                }));
                toast.success("Removed from saved mentors");
            },

            fetchRecentSessions: async () => {
                try {
                    const res = await axiosInstance.get("student/recent-sessions");
                    set({ recentSessions: res.data });
                } catch {
                    toast.error("Failed to load recent sessions");
                }
            },

            clearMentors: () => set({ mentors: [], savedMentors: [], recentSessions: [] })
        }),
        {
            name: "mentor-store",
            partialize: (state) => ({
                mentors: state.mentors,
                savedMentors: state.savedMentors,
                recentSessions: state.recentSessions
            })
        }
    )
);
