import React from "react";

const TodoItem = ({ task, onDelete }) => {
  return (
    <li className="flex justify-between items-center bg-gray-50 hover:bg-gray-100 p-2 rounded mb-2">
      <span className={task.is_done ? "line-through text-gray-400" : ""}>
        {task.label}
      </span>
      <button
        onClick={() => onDelete(task.id)}
        className="text-red-500 hover:text-red-700 font-bold border border-gray-300 rounded px-2"
      >
        ✖
      </button>
    </li>
  );
};

export default TodoItem;
