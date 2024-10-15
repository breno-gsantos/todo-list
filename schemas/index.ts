import { z } from "zod";

export const todoSchema = z.object({
  title: z.string().min(1, 'Title is required').max(50, 'Title must be 50 characters or less'),
  description: z.string().min(1).max(500, 'Description must be 500 characters os less'),
  isCompleted: z.boolean().default(false),
})

export const deleteSchema = z.object({
  id: z.string()
})

export const editSchema = todoSchema.extend({
  id: z.string()
})