"use client";

import { Task } from "@/types";
import Todo from "./Todo";
import { Key, useEffect, useOptimistic, useState, useTransition } from "react";

export default function Todos({ initialTasks }: { initialTasks: Task[] }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [, startTransition] = useTransition();
  const [optimisticTasks, toggleTaskCompletion] = useOptimistic(
    tasks,
    (currentTasks, updatedTask: { id: Key; is_completed: boolean }) =>
      currentTasks.map((task: Task) =>
        task.id === updatedTask.id
          ? { ...task, is_completed: updatedTask.is_completed }
          : task
      )
  );

  useEffect(() => {
    setTasks(initialTasks);
  }, [initialTasks]);

  const handleToggleTaskCompletion = (id: Key, isCompleted: boolean) => {
    startTransition(async () => {
      toggleTaskCompletion({ id: id, is_completed: !isCompleted });
      try {
        await fetch(`http://localhost:3000/api/task/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const updatedTasks = await fetchTasks();
        setTasks(updatedTasks);
      } catch (error) {
        console.error("Error updating task:", error);
        toggleTaskCompletion({ id, is_completed: isCompleted });
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
      <div>
        {optimisticTasks
          .filter((task: Task) => !task.is_completed)
          .map((task: Task) => (
            <Todo
              key={task.id}
              name={task.name}
              description={task.description}
              isCompleted={task.is_completed}
              onComplete={() =>
                handleToggleTaskCompletion(task.id, task.is_completed)
              }
            />
          ))}
      </div>
      <h2 className="text-xl font-bold mt-8">Completed</h2>
      <div>
        {optimisticTasks
          .filter((task: Task) => task.is_completed)
          .map((task: Task) => (
            <Todo
              key={task.id}
              name={task.name}
              description={task.description}
              isCompleted={task.is_completed}
              onComplete={() =>
                handleToggleTaskCompletion(task.id, task.is_completed)
              }
            />
          ))}
      </div>
    </>
  );
}
