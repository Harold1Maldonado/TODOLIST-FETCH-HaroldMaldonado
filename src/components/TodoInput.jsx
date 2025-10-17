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
      value={task}
      onChange={(e) => setTask(e.target.value)}
      onKeyDown={handleKeyDown}
      className="w-full p-2 border border-gray-400 rounded focus:outline-none"
    />
  );
};

export default TodoInput;
