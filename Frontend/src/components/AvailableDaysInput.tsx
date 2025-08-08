import { useState } from "react";
import { User, X } from "lucide-react";

export default function AvailableDaysInput({ formData, setFormData, isLogin }: any) {
  const [subjectInput, setSubjectInput] = useState("");

  const handleAddDay = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && subjectInput.trim() !== "") {
      e.preventDefault();
      if (!formData.availability.includes(subjectInput.trim())) {
        setFormData({
          ...formData,
          availability: [...formData.availability, subjectInput.trim()],
        });
      }
      setSubjectInput("");
    }
  };

  const handleRemoveDay = (subject: string) => {
    setFormData({
      ...formData,
      availability: formData.avail.filter((s: string) => s !== subject),
    });
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Available Days
      </label>

      {/* Input field */}
      <div className="relative mb-3">
        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={subjectInput}
          onChange={(e) => setSubjectInput(e.target.value)}
          onKeyDown={handleAddDay}
          required={!isLogin}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
          placeholder="Type a day and press Enter"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {formData.availability.map((subject: string, index: number) => (
          <span
            key={index}
            className="flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
          >
            {subject}
            <X
              size={16}
              className="cursor-pointer hover:text-red-500"
              onClick={() => handleRemoveDay(subject)}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
