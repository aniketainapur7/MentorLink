import { create } from "zustand";
import { persist } from "zustand/middleware";
import axiosInstance from "../utils/axios";
import toast from "react-hot-toast";

export interface Message {
    id: string;
    senderId: string;
    receiverId: string;
    content: string;
    timestamp: string;
}

interface ChatState {
    messages: Message[];
    loading: boolean;
    error: string | null;
}

interface ChatActions {
    setMessages: (messages: Message[]) => void;
    fetchMessages: (conversationId: string) => Promise<void>;
    sendMessage: (receiverId: string, content: string) => Promise<void>;
}

export const useChatStore = create<ChatState & ChatActions>()(
    persist(
        (set, get) => ({
            messages: [],
            loading: false,
            error: null,

            setMessages: (messages) => set({ messages }),

            fetchMessages: async (conversationId) => {
                set({ loading: true });
                try {
                    const res = await axiosInstance.get(`/chat/${conversationId}`);
                    set({ messages: res.data, loading: false });
                } catch (error: any) {
                    toast.error(error?.response?.data?.message || "Failed to load messages");
                    set({ loading: false });
                }
            },

            sendMessage: async (receiverId, content) => {
                try {
                    const res = await axiosInstance.post(`/chat/send`, { receiverId, content });
                    set({ messages: [...get().messages, res.data] });
                } catch (error: any) {
                    toast.error(error?.response?.data?.message || "Failed to send message");
                }
            },
        }),
        {
            name: "chat-store",
            partialize: (state) => ({
                messages: state.messages,
            }),
        }
    )
);
