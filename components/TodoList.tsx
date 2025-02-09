"use client";

import { Task } from "@/types";
import Todos from "./Todos";
import AddTodoForm from "./AddTodoForm";
import { useOptimistic } from "react";

export default function TodoList({ initialTasks }: { initialTasks: Task[] }) {
  const [optimisticTasks, addOptimisticTask] = useOptimistic(
    initialTasks,
    (state, newTask: Task) => {
      return [...state, newTask];
    }
  );

  return (
    <>
      <h1 className="text-4xl font-bold mb-8">Todo List</h1>
      <div className="flex flex-col gap-8">
        <AddTodoForm addOptimisticTask={addOptimisticTask} />
        <Todos initialTasks={optimisticTasks} />
      </div>
    </>
  );
}
