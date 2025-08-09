import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Filter, Download, Eye, BookOpen, FileText, Video, ImageIcon, Star, Calendar } from "lucide-react"

const StudentMaterials: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedType, setSelectedType] = useState("all")

  const materials = [
    {
      id: 1,
      title: "Calculus Fundamentals - Derivatives",
      mentor: "Dr. Sarah Johnson",
      subject: "Mathematics",
      type: "pdf",
      category: "notes",
      size: "2.4 MB",
      uploadDate: "2024-01-10",
      downloads: 45,
      rating: 4.8,
      thumbnail: "/placeholder.svg?height=120&width=160",
    },
    {
      id: 2,
      title: "Quantum Mechanics Lecture Series",
      mentor: "Prof. Mike Chen",
      subject: "Physics",
      type: "video",
      category: "lectures",
      size: "156 MB",
      uploadDate: "2024-01-08",
      downloads: 23,
      rating: 4.9,
      thumbnail: "/placeholder.svg?height=120&width=160",
    },
    {
      id: 3,
      title: "Organic Chemistry Practice Problems",
      mentor: "Dr. Emily Davis",
      subject: "Chemistry",
      type: "pdf",
      category: "exercises",
      size: "1.8 MB",
      uploadDate: "2024-01-05",
      downloads: 67,
      rating: 4.7,
      thumbnail: "/placeholder.svg?height=120&width=160",
    },
    {
      id: 4,
      title: "Cell Biology Diagrams",
      mentor: "Dr. John Smith",
      subject: "Biology",
      type: "image",
      category: "diagrams",
      size: "5.2 MB",
      uploadDate: "2024-01-03",
      downloads: 34,
      rating: 4.6,
      thumbnail: "/placeholder.svg?height=120&width=160",
    },
    {
      id: 5,
      title: "Linear Algebra Cheat Sheet",
      mentor: "Dr. Sarah Johnson",
      subject: "Mathematics",
      type: "pdf",
      category: "reference",
      size: "0.8 MB",
      uploadDate: "2024-01-01",
      downloads: 89,
      rating: 4.9,
      thumbnail: "/placeholder.svg?height=120&width=160",
    },
  ]

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "notes", label: "Notes" },
    { value: "lectures", label: "Lectures" },
    { value: "exercises", label: "Exercises" },
    { value: "diagrams", label: "Diagrams" },
    { value: "reference", label: "Reference" },
  ]

  const types = [
    { value: "all", label: "All Types" },
    { value: "pdf", label: "PDF" },
    { value: "video", label: "Video" },
    { value: "image", label: "Image" },
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return FileText
      case "video":
        return Video
      case "image":
        return ImageIcon
      default:
        return BookOpen
    }
  }

  const filteredMaterials = materials.filter((material) => {
    const matchesSearch =
      material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.mentor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.subject.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || material.category === selectedCategory
    const matchesType = selectedType === "all" || material.type === selectedType
    return matchesSearch && matchesCategory && matchesType
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Study Materials</h2>
        <p className="text-gray-600 dark:text-gray-400">Access your learning resources and materials</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 p-4 lg:p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col gap-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search materials, mentors, or subjects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex items-center gap-2 flex-1">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="flex-1 sm:flex-none sm:w-32 px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              {types.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {filteredMaterials.map((material, index) => {
          const TypeIcon = getTypeIcon(material.type)
          return (
            <motion.div
              key={material.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Thumbnail */}
              <div className="relative h-32 sm:h-36 bg-gray-100 dark:bg-gray-700">
                <img
                  src={material.thumbnail || "/placeholder.svg"}
                  alt={material.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-white dark:bg-gray-800 p-1 rounded-lg shadow-sm">
                  <TypeIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 text-sm lg:text-base">
                  {material.title}
                </h3>
                <p className="text-sm text-blue-600 dark:text-blue-400 mb-1">{material.mentor}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{material.subject}</p>

                {/* Stats */}
                <div className="flex items-center justify-between text-xs lg:text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center gap-3">
                    <span>{material.size}</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span>{material.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span className="hidden sm:inline">{material.uploadDate}</span>
                    <span className="sm:hidden">
                      {material.uploadDate.split("-")[1]}/{material.uploadDate.split("-")[2]}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline">Download</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm">
                    <Eye className="w-4 h-4" />
                    <span className="hidden sm:inline">Preview</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {filteredMaterials.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">No materials found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}

export default StudentMaterials
