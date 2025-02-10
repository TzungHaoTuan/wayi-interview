"use client";

import { Task } from "@/types";
import Todo from "./Todo";
import { useState } from "react";

export default function Todos({
  optimisticTasks,
  handleDeleteOptimisticTask,
  handleToggleTaskCompletion,
}: {
  optimisticTasks: Task[];
  handleDeleteOptimisticTask: (task: Task) => void;
  handleToggleTaskCompletion: (task: Task) => void;
}) {
  const [isDeleting, setIsDeleting] = useState<number | null>(null);

  const handleTaskDelete = async (task: Task) => {
    const { id } = task;
    setIsDeleting(id);
    handleDeleteOptimisticTask(task);
    setIsDeleting(null);
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
              onComplete={() => handleToggleTaskCompletion(task)}
              isDeleting={isDeleting === task.id}
              onDelete={() => handleTaskDelete(task)}
            />
          ))}
      </div>
      <h2 className="text-xl font-bold">Completed</h2>
      <div>
        {optimisticTasks
          .filter((task: Task) => task.is_completed)
          .map((task: Task) => (
            <Todo
              key={task.id}
              name={task.name}
              description={task.description}
              isCompleted={task.is_completed}
              onComplete={() => handleToggleTaskCompletion(task)}
              isDeleting={isDeleting === task.id}
              onDelete={() => handleTaskDelete(task)}
            />
          ))}
      </div>
    </>
  );
}
