import React from "react";

const TodoItem = ({ task, onDelete }) => {
  return (
    <li className="flex justify-between items-center bg-gray-50 hover:bg-gray-100 p-2 rounded mb-2 cursor-pointer">
      <span className={task.is_done ? "line-through text-gray-400" : ""}>
        {task.label}
      </span>
      <span
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="text-red-500 hover:text-red-700 cursor-pointer"
      >
        ✖
      </span>
    </li>
  );
};

export default TodoItem;
