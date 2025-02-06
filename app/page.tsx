import TodoList from "@/components/TodoList";

export default function Home() {
  return (
    <div className="flex flex-col px-16 py-16 sm:px-28 lg:px-48">
      <TodoList />
    </div>
  );
}
