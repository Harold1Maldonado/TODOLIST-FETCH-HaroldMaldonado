import React, { useState, useEffect } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import "./index.css";
import {
  getTodos,
  addTodo,
  deleteTodo,
  clearAllTodos,
} from "./services/todoService";

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const data = await getTodos();
      setTasks(data);
    } catch (error) {
      console.error("Error cargando tareas:", error);
    }
  };

  const handleAddTask = async (text) => {
    if (!text.trim()) return;
    await addTodo(text);
    fetchTodos();
  };

  const handleDeleteTask = async (id) => {
    await deleteTodo(id);
    fetchTodos();
  };

  const handleClearAll = async () => {
    await clearAllTodos();
    setTasks([]);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold text-gray-700 mb-6">Lista de Tareas</h1>
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <TodoInput addTask={handleAddTask} />
        <TodoList tasks={tasks} deleteTask={handleDeleteTask} />
        {tasks.length > 0 && (
          <button
            onClick={handleClearAll}
            className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded transition"
          >
            Eliminar todas las tareas
          </button>
        )}
      </div>
    </div>
  );
};

export default App;
