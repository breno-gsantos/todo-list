'use client'

import { PlusIcon } from "lucide-react";
import { Button } from "./button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./dialog";
import { CreateTodoForm } from "../create-todo-form";
import { useState } from "react";

export function AddTodo() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function onDialogClose() {
    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="gap-x-3">
          <PlusIcon className="size-4" />
          Add Todo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Todo</DialogTitle>
        </DialogHeader>
        <CreateTodoForm onSuccess={onDialogClose} />
      </DialogContent>
    </Dialog>
  )
}