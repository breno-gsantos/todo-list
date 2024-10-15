'use client'

import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { z } from "zod"
import { todoSchema } from "@/schemas";
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { createTodo } from "@/actions/todo";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "./ui/toast";

interface CreateTodoFormProps{
  onSuccess: () => void;
}

export function CreateTodoForm({onSuccess}: CreateTodoFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof todoSchema>>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      title: '',
      description: '',
      isCompleted: false
    }
  })

  async function onSubmit(values: z.infer<typeof todoSchema>) {
    try {
      const data = await createTodo(values);

      if (data.error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: data.error
        })
      } else if (data.success) {
        onSuccess();
        toast({
          variant: 'success',
          title: 'Success',
          description: data.success
        })
        router.push('/')
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'An error has ocurred',
        description: 'Something went wrong',
        action: <ToastAction altText="Try Again">Try Again</ToastAction>
      })
    } finally {
      form.reset();
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField control={form.control} name="title" render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input placeholder="Title..." type="text" disabled={form.formState.isSubmitting} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="description" render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea placeholder="Description..." className="resize-none" disabled={form.formState.isSubmitting} {...field} />
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
          <Button className="w-full" disabled={form.formState.isSubmitting}>Create</Button>
      </form>
    </Form>
  )
}