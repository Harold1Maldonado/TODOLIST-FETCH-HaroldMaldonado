import React, { useState } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import "./index.css";

const App = () => {
  const [tasks, setTasks] = useState([]);

  const addTask = (newTask) => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, newTask]);
    }
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold text-gray-700 mb-6">To Do List</h1>
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <TodoInput addTask={addTask} />
        <TodoList tasks={tasks} deleteTask={deleteTask} />
      </div>
    </div>
  );
};

export default App;
