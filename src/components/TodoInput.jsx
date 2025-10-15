import React, { useState } from "react";

const TodoInput = ({ addTask }) => {
  const [task, setTask] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addTask(task);
      setTask("");
    }
  };

  return (
    <input
      type="text"
      placeholder="Añadir nueva tarea..."
      className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
      value={task}
      onChange={(e) => setTask(e.target.value)}
      onKeyDown={handleKeyDown}
    />
  );
};

export default TodoInput;
