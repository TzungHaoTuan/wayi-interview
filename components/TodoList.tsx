"use client";

import { Task } from "@/types";
import Todos from "./Todos";
import AddTodoForm from "./AddTodoForm";
import { useOptimistic, useTransition } from "react";
import { deleteTask, updateTaskComplete } from "@/app/actions/actions";

type OptimisticAction =
  | { type: "add"; task: Task }
  | { type: "delete"; task: Task }
  | { type: "toggleComplete"; taskId: number; is_completed: boolean }
  | { type: "reset"; tasks: Task[] };

export default function TodoList({ initialTasks }: { initialTasks: Task[] }) {
  const [, startTransition] = useTransition();

  const [optimisticTasks, updateOptimisticTasks] = useOptimistic(
    initialTasks,
    (state, action: OptimisticAction) => {
      switch (action.type) {
        case "add":
          return [...state, action.task];
        case "delete":
          return state.filter((t) => t.id !== action.task.id);
        case "toggleComplete":
          return state.map((task) =>
            task.id === action.taskId
              ? { ...task, is_completed: !action.is_completed }
              : task
          );
        case "reset":
          return action.tasks;
        default:
          return state;
      }
    }
  );

  const handleAddOptimisticTask = (
    task: Task,
    taskPromise: Task | null | undefined
  ) => {
    startTransition(async () => {
      updateOptimisticTasks({ type: "add", task });
      const newTask = taskPromise;
      if (!newTask) {
        return;
      }
    });
  };

  const handleDeleteOptimisticTask = (task: Task) => {
    startTransition(async () => {
      updateOptimisticTasks({ type: "delete", task });
      const { id } = task;
      try {
        await deleteTask(id.toString());

        const updatedTasks = await fetchTasks();
        updateOptimisticTasks({ type: "reset", tasks: updatedTasks });
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    });
  };

  const handleToggleTaskCompletion = (task: Task) => {
    startTransition(async () => {
      updateOptimisticTasks({
        type: "toggleComplete",
        taskId: task.id,
        is_completed: task.is_completed,
      });
      const { id, name, description, is_completed } = task;
      const currentTime = new Date().toISOString();

      try {
        await updateTaskComplete(
          id.toString(),
          name,
          description,
          currentTime,
          !is_completed
        );

        const updatedTasks = await fetchTasks();
        updateOptimisticTasks({ type: "reset", tasks: updatedTasks });
      } catch (error) {
        console.error("Error toggling completion:", error);
        updateOptimisticTasks({
          type: "toggleComplete",
          taskId: task.id,
          is_completed: task.is_completed,
        });
      }
    });
  };

  const fetchTasks = async () => {
    const res = await fetch("http://localhost:3000/api/task");
    const data = await res.json();
    const tasks: Task[] = data.data;
    return tasks;
  };

  return (
    <>
      <h1 className="text-4xl font-bold mb-8">Todo List</h1>
      <div className="flex flex-col gap-8">
        <AddTodoForm handleAddOptimisticTask={handleAddOptimisticTask} />
        <Todos
          optimisticTasks={optimisticTasks}
          handleDeleteOptimisticTask={handleDeleteOptimisticTask}
          handleToggleTaskCompletion={handleToggleTaskCompletion}
        />
      </div>
    </>
  );
}
