import { TodoList } from "@/components/todo-list";
import { Button } from "@/components/ui/button";
import { AddTodo } from "@/components/ui/modal";
import { PlusIcon } from 'lucide-react';

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto p-10 flex flex-col gap-10">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Todos</h1>
        <AddTodo />
      </div>
      <TodoList />
    </main>
  )
}
