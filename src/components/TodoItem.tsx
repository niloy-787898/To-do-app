'use client'

import { useState } from 'react'

interface TodoItemProps {
  id: number
  title: string
  description: string | null
  completed: boolean
  onToggle: (id: number) => void
  onDelete: (id: number) => void
  onEdit: (id: number, title: string, description: string) => void
}

export default function TodoItem({
  id,
  title,
  description,
  completed,
  onToggle,
  onDelete,
  onEdit,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(title)
  const [editedDescription, setEditedDescription] = useState(description || '')

  const handleSubmit = () => {
    onEdit(id, editedTitle, editedDescription)
    setIsEditing(false)
  }

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 transition-all duration-200 mt-4 ${completed ? 'opacity-75' : ''}`}>
      {!isEditing ? (
        <div className="flex items-center gap-6">
          <button
            onClick={() => onToggle(id)}
            className={`flex-shrink-0 w-7 h-7 rounded-xl border transition-all duration-200 ${
              completed
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 border-emerald-600'
                : 'border-violet-400 dark:border-violet-500 hover:border-emerald-500 hover:bg-emerald-50'
            }`}
          >
            {completed && (
              <svg className="w-full h-full text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </button>
          <div className="flex-grow min-w-0">
            <h3 className={`text-[18px] font-semibold mb-2 ${
              completed
                ? 'line-through text-gray-500 dark:text-gray-400'
                : 'text-gray-900 dark:text-gray-100'
            }`}>
              {title}
            </h3>
            {description && (
              <p className={`text-[14px] ${
                completed
                  ? 'line-through text-gray-400 dark:text-gray-500'
                  : 'text-gray-600 dark:text-gray-300'
              }`}>
                {description}
              </p>
            )}
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <button
              onClick={() => setIsEditing(true)}
              className="px-5 py-2.5 text-[14px] font-medium text-white bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 rounded-2xl shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 focus:outline-none"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(id)}
              className="px-5 py-2.5 text-[14px] font-medium text-white bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 rounded-2xl shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 focus:outline-none"
            >
              Delete
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="mb-4">
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="w-full p-4 text-[16px] rounded-2xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none transition-all duration-200 border border-gray-100 dark:border-gray-600 focus:border-gray-200 dark:focus:border-gray-500"
              placeholder="Task title"
            />
          </div>
          <div className="mb-6">
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="w-full p-4 text-[16px] rounded-2xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none min-h-[120px] transition-all duration-200 border border-gray-100 dark:border-gray-600 focus:border-gray-200 dark:focus:border-gray-500"
              placeholder="Task description"
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              onClick={handleSubmit}
              className="px-6 py-3 text-[14px] font-medium text-white bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 rounded-2xl shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 focus:outline-none"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-6 py-3 text-[14px] font-medium text-white bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 rounded-2xl shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 focus:outline-none"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
} 