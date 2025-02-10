import TodoList from "@/components/TodoList";
import { Task } from "@/types";

export default async function Home() {
  const res = await fetch("http://localhost:3000/api/task");
  const data = await res.json();
  const tasks: Task[] = data.data;

  return (
    <div className="px-16 py-16 sm:px-28 md:px-32 lg:px-56 xl:px-80">
      <TodoList initialTasks={tasks} />
    </div>
  );
}
