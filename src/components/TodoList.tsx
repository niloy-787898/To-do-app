'use client'

import { useState } from 'react'
import TodoItem from './TodoItem'
import { addTodo, deleteTodo, toggleTodo, updateTodo } from '@/app/actions'
import { Task } from '@prisma/client'

interface TodoListProps {
  initialTodos: Task[]
}

type FilterType = 'all' | 'active' | 'completed'

export default function TodoList({ initialTodos }: TodoListProps) {
  const [todos, setTodos] = useState(initialTodos)
  const [newTitle, setNewTitle] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [filter, setFilter] = useState<FilterType>('all')

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle.trim()) return

    try {
      await addTodo(newTitle, newDescription)
      const updatedTodos = [
        {
          id: Math.max(...todos.map((t) => t.id), 0) + 1,
          title: newTitle,
          description: newDescription,
          completed: false,
          createdAt: new Date(),
        },
        ...todos,
      ]
      setTodos(updatedTodos)
      setNewTitle('')
      setNewDescription('')
    } catch (error) {
      console.error('Failed to add todo:', error)
    }
  }

  const handleToggle = async (id: number) => {
    try {
      await toggleTodo(id)
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      )
    } catch (error) {
      console.error('Failed to toggle todo:', error)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteTodo(id)
      setTodos(todos.filter((todo) => todo.id !== id))
    } catch (error) {
      console.error('Failed to delete todo:', error)
    }
  }

  const handleEdit = async (id: number, title: string, description: string) => {
    try {
      await updateTodo(id, title, description)
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, title, description } : todo
        )
      )
    } catch (error) {
      console.error('Failed to update todo:', error)
    }
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 space-y-12 px-4">
      {/* Add Todo Form */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-8">
        <form onSubmit={handleAddTodo} className="space-y-6">
          <div className="mb-6">
            <input
              id="title"
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="What needs to be done?"
              className="w-full p-4 text-[16px] rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-400 focus:border-purple-500 transition-all duration-200"
              required
            />
          </div>
          <div className="mb-6">
            <textarea
              id="description"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Add details (optional)"
              className="w-full p-4 text-[16px] rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-400 focus:border-purple-500 min-h-[120px] transition-all duration-200"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-[18px] font-semibold py-5 px-8 rounded-2xl hover:from-violet-600 hover:to-fuchsia-600 transform hover:scale-[1.02] transition-all duration-200 ease-in-out focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 shadow-lg"
          >
            Add Task
          </button>
        </form>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6 my-12">
        {['all', 'active', 'completed'].map((filterType) => (
          <button
            key={filterType}
            onClick={() => setFilter(filterType as FilterType)}
            className={`px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-medium text-[16px] transition-all duration-200 shadow-md transform hover:scale-[1.02] ${
              filter === filterType
                ? filterType === 'all'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                  : filterType === 'active'
                  ? 'bg-gradient-to-r from-orange-500 to-pink-600 text-white'
                  : 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 hover:shadow-lg'
            }`}
          >
            {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
          </button>
        ))}
      </div>

      {/* Todo List */}
      <div className="space-y-6">
        {filteredTodos.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-md">
            <p className="text-lg text-gray-500 dark:text-gray-400">
              No tasks found
            </p>
          </div>
        ) : (
          filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              {...todo}
              onToggle={handleToggle}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))
        )}
      </div>
    </div>
  )
} 