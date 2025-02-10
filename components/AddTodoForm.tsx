"use client";

import { addTask } from "@/app/actions/actions";
import { Task } from "@/types";
import { useActionState } from "react";

export default function AddTodoForm({
  handleAddOptimisticTask,
}: {
  handleAddOptimisticTask: (
    task: Task,
    taskPromise: Task | null | undefined
  ) => void;
}) {
  const [state, action, isPending] = useActionState(addTask, null);

  const buttonDisabledStyle = isPending ? "opacity-30 cursor-not-allowed" : "";

  return (
    <form
      action={(formData) => {
        const currentTime = new Date();

        const newTask = {
          id: Date.now(),
          name: formData.get("name") as string,
          description: formData.get("description") as string,
          is_completed: false,
          created_at: currentTime,
          updated_at: currentTime,
        };
        handleAddOptimisticTask(newTask, state);
        action(formData);
      }}
      className="border bg-base-200 border-gray-700 shadow-xl rounded-md"
    >
      <div className="flex flex-col gap-4 justify-center items-center p-8 px-12">
        <div className="w-full">
          <label htmlFor="name">
            Name<span className="ml-4 text-xs text-green-600">*required</span>
          </label>
          <input
            required
            disabled={isPending}
            id="name"
            name="name"
            type="text"
            maxLength={10}
            className="input input-bordered w-full bg-base-200 focus:outline-2 focus:outline-gray-500 focus:-outline-offset-1 mt-2"
          />
        </div>
        <div className="w-full">
          <label htmlFor="description">Description</label>
          <input
            disabled={isPending}
            id="description"
            name="description"
            type="text"
            maxLength={30}
            className="input input-bordered w-full bg-base-200 focus:outline-2 focus:outline-gray-500 focus:-outline-offset-1 mt-2"
          />
        </div>
        <button
          disabled={isPending}
          type="submit"
          className={`button ml-auto mt-4 rounded-md px-4 py-2 font-semibold border border-gray-600 shadow-xs bg-base-300 hover:bg-gray-500 hover:text-gray-900 ${buttonDisabledStyle}`}
        >
          Add Todo
        </button>
      </div>
      {/* {error && <div className="text-red-500">{error}</div>} */}
    </form>
  );
}
