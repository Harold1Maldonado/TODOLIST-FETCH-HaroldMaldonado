import React, { useState } from "react";

const TodoItem = ({ task, onDelete }) => {
  const [hover, setHover] = useState(false);

  return (
    <li
      className="flex justify-between items-center bg-gray-50 p-2 border-b border-gray-200 rounded hover:bg-gray-100"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <span className="text-gray-700">{task}</span>
      {hover && (
        <button
          onClick={onDelete}
          className="text-red-500 hover:text-red-700 font-bold text-lg"
        >
          ✕
        </button>
      )}
    </li>
  );
};

export default TodoItem;
