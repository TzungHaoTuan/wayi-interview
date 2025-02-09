"use client";

import { Task } from "@/types";
import Todo from "./Todo";
import { Key, useEffect, useState } from "react";

export default function Todos({ initialTasks }: { initialTasks: Task[] }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  useEffect(() => {
    setTasks(initialTasks);
  }, [initialTasks]);

  const completedTasks = tasks.filter((task) => task.is_completed);
  const unCompletedTasks = tasks.filter((task) => !task.is_completed);

  const handleTaskComplete = async (id: Key) => {
    await fetch(`http://localhost:3000/api/task/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, is_completed: true } : task
      )
    );
  };

  return (
    <>
      <div>
        {unCompletedTasks.map((task: Task) => (
          <Todo
            key={task.id}
            name={task.name}
            description={task.description}
            onComplete={() => handleTaskComplete(task.id)}
          />
        ))}
      </div>
      <h2 className="text-xl font-bold mt-8">Completed</h2>
      <div>
        {completedTasks.map((task: Task) => (
          <Todo
            key={task.id}
            name={task.name}
            description={task.description}
            onComplete={() => handleTaskComplete(task.id)}
          />
        ))}
      </div>
    </>
  );
}
