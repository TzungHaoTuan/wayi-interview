"use client";

import { Task } from "@/types";
import Todo from "./Todo";
import { Key, useEffect, useOptimistic, useState, useTransition } from "react";

export default function Todos({
  optimisticTasks,
  handleDeleteOptimisticTask,
}: {
  optimisticTasks: Task[];
  handleDeleteOptimisticTask: (task: Task) => void;
}) {
  const [tasks, setTasks] = useState<Task[]>(optimisticTasks);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const [, startTransition] = useTransition();
  const [optimisticCompletedTasks, toggleTaskCompletion] = useOptimistic(
    tasks,
    (currentTasks, updatedTask: { id: Key; is_completed: boolean }) =>
      currentTasks.map((task: Task) =>
        task.id === updatedTask.id
          ? { ...task, is_completed: updatedTask.is_completed }
          : task
      )
  );
  useEffect(() => {
    setTasks(optimisticTasks);
  }, [optimisticTasks]);

  const handleToggleTaskCompletion = (
    id: Key,
    name: string,
    description: string,
    isCompleted: boolean
  ) => {
    const currentTime = new Date().toISOString();

    startTransition(async () => {
      toggleTaskCompletion({ id: id, is_completed: !isCompleted });
      try {
        await fetch(`http://localhost:3000/api/task/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            description,
            updated_at: currentTime,
            is_completed: !isCompleted,
          }),
        });
        const updatedTasks = await fetchTasks();
        setTasks(updatedTasks);
      } catch (error) {
        console.error("Error updating task:", error);
        toggleTaskCompletion({ id, is_completed: isCompleted });
      }
    });
  };

  const handleTaskDelete = async (task: Task) => {
    const { id } = task;
    setIsDeleting(id);
    handleDeleteOptimisticTask(task);
    setIsDeleting(null);
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
        {optimisticCompletedTasks
          .filter((task: Task) => !task.is_completed)
          .map((task: Task) => (
            <Todo
              key={task.id}
              name={task.name}
              description={task.description}
              isCompleted={task.is_completed}
              onComplete={() =>
                handleToggleTaskCompletion(
                  task.id,
                  task.name,
                  task.description,
                  task.is_completed
                )
              }
              isDeleting={isDeleting === task.id}
              onDelete={() => handleTaskDelete(task)}
            />
          ))}
      </div>
      <h2 className="text-xl font-bold mt-8">Completed</h2>
      <div>
        {optimisticCompletedTasks
          .filter((task: Task) => task.is_completed)
          .map((task: Task) => (
            <Todo
              key={task.id}
              name={task.name}
              description={task.description}
              isCompleted={task.is_completed}
              onComplete={() =>
                handleToggleTaskCompletion(
                  task.id,
                  task.name,
                  task.description,
                  task.is_completed
                )
              }
              isDeleting={isDeleting === task.id}
              onDelete={() => handleTaskDelete(task)}
            />
          ))}
      </div>
    </>
  );
}
