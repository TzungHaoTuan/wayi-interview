import { Task } from "@/types";

export default async function TodoList() {
  const res = await fetch("http://localhost:3000/api/task");
  const data = await res.json();
  const tasks = data.data;
  console.log(tasks);

  return (
    <div>
      {tasks.map((task: Task) => (
        <div key={task.id}>
          <h1>{task.name}</h1>
          <p>{task.description}</p>
        </div>
      ))}
    </div>
  );
}
