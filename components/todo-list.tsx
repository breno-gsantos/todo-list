import { db } from "@/lib/db"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Edit2Icon, TrashIcon } from "lucide-react";
import { DeleteButton } from "./delete-button";
import { UpdateIcon } from "@radix-ui/react-icons";
import { EditButton } from "./edit-button";

export async function TodoList() {
  const todos = await db.todos.findMany();

  return (
    <div className="space-y-4">
      {todos.length === 0 ? (
        <Card>
          <CardContent className="text-center py-10">
            <p className="text-muted-foreground">
              All done for today!
            </p>
          </CardContent>
        </Card>
      ) : (
        todos.map((todo) => (
          <Card key={todo.id} className="group relative">
            <div className="absolute top-2 right-2">
              <DeleteButton id={todo.id} />
            </div>
            <div className="absolute top-16 right-2">
              <EditButton id={todo.id} />
            </div>
            <CardHeader>
              <CardTitle>
                <span className={cn(todo.isCompleted ? 'line-through' : '')}>{todo.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>{todo.description}</p>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )
}