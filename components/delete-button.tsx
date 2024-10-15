'use client'

import { TrashIcon } from "lucide-react"
import { Button } from "./ui/button"
import { deleteTodo } from "@/actions/todo"
import { useToast } from "@/hooks/use-toast"

interface DeleteButtonProps{
  id: string
}

export function DeleteButton({id}: DeleteButtonProps) {
  const { toast } = useToast()
  async function onClick() {
    try {
      const data = await deleteTodo({id});
      if (data.error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: data.error as string
        })
      } else if (data.success) {
        toast({
          variant: 'success',
          title: data.success as string
        })
      }
    } catch (error) {
      console.error(error)
      toast({
        variant: 'destructive',
        title: 'An unnexpected error ocurred'
      })
    }
  }

  return (
    <Button variant='destructive' size='icon' onClick={onClick}>
      <TrashIcon className="size-4" />
    </Button>
  )
}