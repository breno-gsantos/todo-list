import { db } from "@/lib/db";

export async function getTodosByDate() {
  const todo = await db.todos.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })

  return todo;
}