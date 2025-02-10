"use client";

import { Task } from "@/types";
import { CiTrash } from "react-icons/ci";

type TodoProps = Pick<Task, "name" | "description"> & {
  isCompleted: boolean;
  onComplete: () => void;
  isDeleting: boolean;
  onDelete: () => void;
};

export default function Todo({
  name,
  description,
  isCompleted,
  onComplete,
  isDeleting,
  onDelete,
}: TodoProps) {
  return (
    <div
      className={`flex justify-between items-top gap-4 ${
        isDeleting ? "opacity-50" : ""
      }`}
    >
      <div className="pt-[1rem]">
        <input
          defaultChecked={isCompleted}
          onClick={onComplete}
          type="checkbox"
          className="checkbox"
        />
      </div>
      <div className="collapse collapse-arrow">
        <input type="checkbox" />
        <div className="collapse-title font-semibold">{name} </div>
        <div className="collapse-content">
          <p>{description}</p>
        </div>
      </div>
      <div
        onClick={onDelete}
        className="pt-[1rem] cursor-pointer hover:text-red-600"
      >
        <CiTrash size={20} />
      </div>
    </div>
  );
}
