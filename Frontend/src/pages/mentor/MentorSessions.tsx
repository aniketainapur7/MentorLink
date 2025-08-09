import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Video, MessageCircle, CheckCircle, FileText } from "lucide-react";
import axios from "axios";
import axiosInstance from "../../utils/axios";

const MentorSessions: React.FC = () => {
    const [activeTab, setActiveTab] = useState("upcoming");
    const [upcomingSessions, setUpcomingSessions] = useState<any[]>([]);
    const [pastSessions, setPastSessions] = useState<any[]>([]);
    const [sessions, setSessions] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

useEffect(() => {
    const fetchSessions = async () => {
        try {
            setLoading(true);
            const res = await axiosInstance.get("/mentor/sessions");
            const allSessions = res.data.data || [];

            // Separate into upcoming & past
            const upcoming = allSessions.filter(
                (s: any) => (s.status !== "completed" && s.status !== "cancelled")
            );
            const past = allSessions.filter(
                (s: any) => s.status === "completed"
            );

            setUpcomingSessions(upcoming);
            setPastSessions(past);
            setSessions(allSessions);
        } catch (err: any) {
            console.error("Failed to fetch sessions:", err);
            setError("Unable to load sessions. Please try again later.");
        } finally {
            setLoading(false);
        }
    };
    fetchSessions();
}, []);

    // Helper: format date & time
    const formatDate = (dateStr: string) =>
        new Date(dateStr).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });

    const formatTime = (dateStr: string) =>
        new Date(dateStr).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Sessions</h2>
                <p className="text-gray-600 dark:text-gray-400">Manage your teaching sessions</p>
            </div>

            {/* Tabs */}
            <div className="bg-white dark:bg-gray-800 p-1 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 inline-flex">
                <button
                    onClick={() => setActiveTab("upcoming")}
                    className={`px-6 py-2 rounded-lg font-medium transition-colors ${activeTab === "upcoming"
                            ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                            : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                        }`}
                >
                    Upcoming
                </button>
                <button
                    onClick={() => setActiveTab("past")}
                    className={`px-6 py-2 rounded-lg font-medium transition-colors ${activeTab === "past"
                            ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                            : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                        }`}
                >
                    Past Sessions
                </button>
            </div>

            {/* Sessions List */}
            <div className="space-y-4">
                {activeTab === "upcoming" &&
                    upcomingSessions.map((session, index) => (
                        <motion.div
                            key={session._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{session.subject}</h3>
                                    <p className="text-blue-600 dark:text-blue-400 font-medium">{session.studentId.name}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{session.studentId.email}</p>
                                </div>
                                <span
                                    className={`px-3 py-1 rounded-full text-sm font-medium ${session.status === "accepted"
                                            ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                                            : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300"
                                        }`}
                                >
                                    {session.status}
                                </span>
                            </div>

                            <div className="flex items-center gap-6 mb-4 text-sm text-gray-600 dark:text-gray-400">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    <span>{formatDate(session.startTime)}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    <span>{formatTime(session.startTime)}</span>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                {session.meetingurl && (
                                    <a
                                        href={session.meetingurl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                                    >
                                        <Video className="w-4 h-4" />
                                        Start Session
                                    </a>
                                )}
                                <button className="flex items-center gap-2 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                    <MessageCircle className="w-4 h-4" />
                                    Message Student
                                </button>
                                <button className="text-blue-600 dark:text-blue-400 px-4 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                                    Send Reminder
                                </button>
                            </div>
                        </motion.div>
                    ))}

                {activeTab === "past" &&
                    pastSessions.map((session, index) => (
                        <motion.div
                            key={session._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{session.subject}</h3>
                                    <p className="text-blue-600 dark:text-blue-400 font-medium">{session.studentId.name}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{session.studentId.email}</p>
                                </div>
                                <CheckCircle className="w-5 h-5 text-green-500" />
                            </div>

                            <div className="flex items-center gap-6 mb-4 text-sm text-gray-600 dark:text-gray-400">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    <span>{formatDate(session.startTime)}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    <span>{formatTime(session.startTime)}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
            </div>
        </div>
    );
};

export default MentorSessions;
