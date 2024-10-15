'use server'

import { db } from "@/lib/db";
import { deleteSchema, editSchema, todoSchema } from "@/schemas";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function createTodo(values: z.infer<typeof todoSchema>) {
  const validatedFields = todoSchema.safeParse(values);

  if (!validatedFields.success) {
    return {success: false, error: 'Invalid Fields'}
  }

  const { description, isCompleted, title } = validatedFields.data;

  try {
    const todo = await db.todos.create({
      data: {
        title,
        description,
        isCompleted
      }
    })

    revalidatePath('/')

    return {success: 'Created', todo}
  } catch (error) {
    console.log(error);
    return {error: 'Error while creating Todo'}
  }
}

export async function deleteTodo(values: z.infer<typeof deleteSchema>) {
  const validatedFields = deleteSchema.safeParse(values);

  if (!validatedFields.success) {
    return { success: false, error: validatedFields.error.flatten().fieldErrors };
  }

  const { id } = validatedFields.data;

  try {
    await db.todos.delete({
      where: { id }
    });

    revalidatePath('/')

    return {success: 'Deleted!'}
  } catch (error) {
    console.error(error);
    return {error: 'Something went wrong'}
  }
}

export async function editTodo(values: z.infer<typeof editSchema>) {
  const validatedFields = editSchema.safeParse(values);

  if (!validatedFields.success) {
    return { success: false, error: validatedFields.error.flatten().fieldErrors };
  }

  const { id, description, isCompleted, title } = validatedFields.data

  const existingTodo = await db.todos.findUnique({
    where: { id }
  });

  if (!existingTodo) {
    return {error: 'Todo not Found!'}
  }

  await db.todos.update({
    where: { id },
    data: { title, isCompleted, description }
  });

  revalidatePath('/')

  return {success: 'Updated!'}
}

export async function getTodoById(id: string) {
  try {
    const todo = await db.todos.findUnique({
      where: { id }
    });
    
    return todo;
  } catch (error) {
    console.error("Erro ao buscar a tarefa:", error);
    throw new Error("Não foi possível buscar a tarefa");
  }
}