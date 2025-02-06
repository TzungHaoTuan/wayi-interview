import { Task } from "@/types";
import Todo from "./Todo";

export default async function TodoList() {
  const res = await fetch("http://localhost:3000/api/task");
  const data = await res.json();
  const tasks: Task[] = data.data;

  const completedTasks = tasks.filter((task) => task.is_completed);
  const unCompletedTasks = tasks.filter((task) => !task.is_completed);

  return (
    <>
      <h1 className="text-4xl font-bold mb-8">Todo List</h1>
      <div>
        {unCompletedTasks.map((task: Task) => (
          <Todo key={task.id} name={task.name} description={task.description} />
        ))}
      </div>
      <h2 className="text-xl font-bold mt-8">Completed</h2>
      <div>
        {completedTasks.map((task: Task) => (
          <Todo key={task.id} name={task.name} description={task.description} />
        ))}
      </div>
    </>
  );
}
