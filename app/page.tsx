import TodoList from "@/components/TodoList";
import AddTodoForm from "@/components/AddTodoForm";
import { Task } from "@/types";

export default async function Home() {
  const res = await fetch("http://localhost:3000/api/task");
  const data = await res.json();
  const tasks: Task[] = data.data;

  return (
    <div className="px-16 py-16 sm:px-28 lg:px-48">
      <h1 className="text-4xl font-bold mb-8">Todo List</h1>
      <div className="flex flex-col gap-8">
        <AddTodoForm />
        <TodoList initialTasks={tasks} />
      </div>
    </div>
  );
}
