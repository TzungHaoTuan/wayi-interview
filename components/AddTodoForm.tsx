"use client";

import { addTask } from "@/app/actions/actions";
import { useActionState } from "react";

export default function AddTodoForm() {
  const [error, action, isPending] = useActionState(addTask, null);

  return (
    <form
      action={action}
      className="border bg-base-200 border-gray-700 shadow-xl rounded-md"
    >
      <div className="flex flex-col gap-4 justify-center items-center p-8 px-12">
        <div className="w-full">
          <label htmlFor="name">
            Name<span className="ml-4 text-xs text-green-600">*required</span>
          </label>
          <input
            required
            id="name"
            name="name"
            type="text"
            maxLength={10}
            className="bg-base-200 p-2 pl-4 mt-2 w-full border border-gray-600 focus:outline-2 focus:outline-gray-500 focus:-outline-offset-1 rounded-md"
          />
        </div>
        <div className="w-full">
          <label htmlFor="description">Description</label>
          <input
            id="description"
            name="description"
            type="text"
            maxLength={30}
            className="bg-base-200 p-2 pl-4 mt-2 w-full border border-gray-600 focus:outline-2 focus:outline-gray-500 focus:-outline-offset-1 rounded-md"
          />
        </div>
        <button
          disabled={isPending}
          type="submit"
          className="ml-auto mt-4 rounded-md px-4 py-2 font-semibold border border-gray-600 shadow-xs bg-base-300 hover:bg-gray-500 hover:text-gray-900"
        >
          Add Todo
        </button>
      </div>
      {error && <div className="text-red-500">{error}</div>}
    </form>
  );
}
