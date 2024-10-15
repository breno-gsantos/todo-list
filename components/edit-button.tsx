'use client'

import { useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Edit2Icon } from "lucide-react";
import { EditTodoForm } from "./edit-todo-form";

interface EditButtonProps{
  id: string;
}

export function EditButton({id}: EditButtonProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function onDialogClose() {
    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant='outline' size='icon'>
          <Edit2Icon className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Todo</DialogTitle>
        </DialogHeader>
        <EditTodoForm id={id} onSuccess={onDialogClose} />
      </DialogContent>
    </Dialog>
  )
}