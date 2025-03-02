import { getTodos } from './actions'
import TodoList from '@/components/TodoList'

export default async function Home() {
  const todos = await getTodos()

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 py-16 px-4 sm:px-6 lg:px-8 font-['Inter']">
      <div className="max-w-[600px] mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
            Todo List
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 tracking-wide">
            Keep track of your tasks efficiently
          </p>
        </div>
        <TodoList initialTodos={todos} />
      </div>
    </main>
  )
}
