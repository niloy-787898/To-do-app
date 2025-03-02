'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getTodos() {
  try {
    const todos = await prisma.task.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })
    return todos
  } catch (error) {
    console.error('Error fetching todos:', error)
    throw new Error('Failed to fetch todos')
  }
}

export async function addTodo(title: string, description?: string) {
  try {
    await prisma.task.create({
      data: {
        title,
        description,
      },
    })
    revalidatePath('/')
  } catch (error) {
    console.error('Error adding todo:', error)
    throw new Error('Failed to add todo')
  }
}

export async function toggleTodo(id: number) {
  try {
    const todo = await prisma.task.findUnique({ where: { id } })
    await prisma.task.update({
      where: { id },
      data: { completed: !todo?.completed },
    })
    revalidatePath('/')
  } catch (error) {
    console.error('Error toggling todo:', error)
    throw new Error('Failed to toggle todo')
  }
}

export async function deleteTodo(id: number) {
  try {
    await prisma.task.delete({
      where: { id },
    })
    revalidatePath('/')
  } catch (error) {
    console.error('Error deleting todo:', error)
    throw new Error('Failed to delete todo')
  }
}

export async function updateTodo(id: number, title: string, description: string) {
  try {
    await prisma.task.update({
      where: { id },
      data: { title, description },
    })
    revalidatePath('/')
  } catch (error) {
    console.error('Error updating todo:', error)
    throw new Error('Failed to update todo')
  }
} 