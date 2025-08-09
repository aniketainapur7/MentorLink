import type React from "react"
import { Outlet, Link, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import {
    Home,
    Users,
    Calendar,
    MessageCircle,
    User,
    Settings,
    DollarSign,
    BarChart3,
    Clock,
    LogOut,
    Menu,
    X,
    Bell,
    Search,
    Moon,
    Sun,
} from "lucide-react"
import { useState, useEffect } from "react"
import { useAppStore } from "../stores/AuthStore"

const MentorLayout: React.FC = () => {
    const location = useLocation()
    const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024)

    // open by default only on desktop

    const { logout, toggleTheme } = useAppStore()
    const state = useAppStore.getState()

    const handleLogout = () => {
        logout();
    };

    const sidebarItems = [
        { icon: Home, label: "Dashboard", path: "/mentor/dashboard" },
        { icon: Users, label: "My Students", path: "/mentor/students" },
        { icon: Calendar, label: "Schedule", path: "/mentor/schedule" },
        { icon: MessageCircle, label: "Messages", path: "/mentor/messages" },
        { icon: Clock, label: "Session History", path: "/mentor/history" },
        { icon: BarChart3, label: "Analytics", path: "/mentor/analytics" },
        { icon: DollarSign, label: "Earnings", path: "/mentor/earnings" },
        { icon: User, label: "Profile", path: "/mentor/profile" },
        { icon: Settings, label: "Settings", path: "/mentor/settings" },
    ]

    // Close sidebar on mobile when route changes
    useEffect(() => {
        if (window.innerWidth < 1024) {
            setSidebarOpen(false)
        }
    }, [location.pathname])

    // Handle resizing between mobile/desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setSidebarOpen(true)
            } else {
                setSidebarOpen(false)
            }
        }
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
            {/* Mobile sidebar overlay */}
            {sidebarOpen && window.innerWidth < 1024 && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
            )}

            {/* Sidebar */}
            <motion.div
                initial={false}
                animate={{
                    x: sidebarOpen || window.innerWidth >= 1024 ? 0 : "-100%",
                }}
                className="fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg lg:translate-x-0 transition-transform duration-300 ease-in-out lg:transition-none"
            >
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-bold text-purple-600 dark:text-purple-400">MentorLink</h2>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <nav className="mt-6 px-4">
                    {sidebarItems.map((item) => {
                        const Icon = item.icon
                        const isActive = location.pathname === item.path
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center px-4 py-3 mb-2 rounded-lg transition-colors duration-200 ${isActive
                                        ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    }`}
                            >
                                <Icon className="w-5 h-5 mr-3" />
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        )
                    })}
                </nav>
            </motion.div>

            {/* Main content */}
            <div className="flex-1 lg:ml-0">
                {/* Navbar */}
                <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                <Menu className="w-6 h-6" />
                            </button>
                            <div className="hidden lg:block">
                                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Welcome back, Mentor!</h1>
                            </div>
                        </div>

                        {/* Search Bar */}
                        <div className="hidden md:flex flex-1 max-w-md mx-8">
                            <div className="relative w-full">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Search students, sessions..."
                                    className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                                />
                            </div>
                        </div>

                        {/* Right side items */}
                        <div className="flex items-center gap-4">
                            {/* Quick Stats */}
                            <div className="hidden xl:flex items-center gap-4 px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <div className="text-center">
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Today's Earnings</p>
                                    <p className="text-sm font-semibold text-gray-900 dark:text-white">$240</p>
                                </div>
                                <div className="w-px h-8 bg-gray-200 dark:bg-gray-600"></div>
                                <div className="text-center">
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Sessions</p>
                                    <p className="text-sm font-semibold text-gray-900 dark:text-white">5</p>
                                </div>
                            </div>

                            {/* Notifications */}
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => toggleTheme()}
                                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                            >
                                {state.theme === 'light' ? (
                                    <Moon className="w-5 h-5" />
                                ) : (
                                    <Sun className="w-5 h-5" />
                                )}
                            </motion.button>

                            {/* User Menu */}
                            <div className="flex items-center gap-3">
                                <div className="hidden sm:block text-right">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">{state.user?.name}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{"Maths Mentor"}</p>
                                </div>
                                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center cursor-pointer hover:shadow-lg transition-shadow">
                                    <span className="text-white font-medium text-sm">{state.user?.name.charAt(0).toUpperCase()}</span>
                                </div>
                            </div>

                            <button onClick={handleLogout} className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                <LogOut className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                            </button>

                        </div>
                    </div>
                </div>

                {/* Page content */}
                <main className="p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default MentorLayout
