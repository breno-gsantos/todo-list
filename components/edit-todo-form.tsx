'use client'

import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { z } from "zod"
import { editSchema } from "@/schemas";
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { editTodo, getTodoById } from "@/actions/todo";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "./ui/toast";
import { useEffect, useState } from "react";

interface EditTodoFormProps {
  id: string;
  onSuccess: () => void;
}

export function EditTodoForm({ id, onSuccess }: EditTodoFormProps) {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof editSchema>>({
    resolver: zodResolver(editSchema),
    defaultValues: async () => {
      try {
        const todo = await getTodoById(id);
        if (todo) {
          return {
            id: todo.id,
            title: todo.title,
            description: todo.description,
            isCompleted: todo.isCompleted
          };
        }
      } catch (error) {
        console.error("Erro ao carregar a tarefa:", error);
        toast({
          variant: 'destructive',
          title: 'Erro',
          description: 'Não foi possível carregar os dados da tarefa.'
        });
      }
      return {
        id: id,
        title: '',
        description: '',
        isCompleted: false
      };
    }
  });

  useEffect(() => {
    form.reset();
  }, [form]);

  async function onSubmit(values: z.infer<typeof editSchema>) {
    try {
      const data = await editTodo(values);

      if (data.error) {
        toast({
          variant: 'destructive',
          title: 'Erro',
          description: data.error as string
        });
      } else if (data.success) {
        onSuccess();
        toast({
          variant: 'success',
          title: 'Sucesso',
          description: data.success
        });
        router.refresh();
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Ocorreu um erro',
        description: 'Algo deu errado',
        action: <ToastAction altText="Tentar Novamente">Tentar Novamente</ToastAction>
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField control={form.control} name="title" render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input placeholder="Título..." type="text" disabled={form.formState.isSubmitting} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="description" render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea placeholder="Descrição..." className="resize-none" disabled={form.formState.isSubmitting} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="isCompleted" render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox checked={field.value} onCheckedChange={field.onChange} disabled={form.formState.isSubmitting} />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>Mark as completed</FormLabel>
            </div>
            <FormMessage />
          </FormItem>
        )} />
        <Button className="w-full" disabled={form.formState.isSubmitting}>Update</Button>
      </form>
    </Form>
  )
}