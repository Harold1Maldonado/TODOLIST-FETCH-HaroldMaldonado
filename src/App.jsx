import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import {
  getTodos,
  addTodo,
  deleteTodo,
  clearAllTodos,
  createUserIfNotExists,
} from "./services/todoService";
import "./index.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    if (currentUser) {
      createUserIfNotExists(currentUser).then(fetchTodos);
    }
  }, [currentUser]);

  const fetchTodos = async () => {
    if (!currentUser) return;
    try {
      const data = await getTodos(currentUser);
      setTasks(Array.isArray(data) ? data : []);
    } catch {
      setTasks([]);
    }
  };

  const handleAddTask = async (text) => {
    if (!currentUser) return alert("Selecciona un usuario primero");
    if (!text.trim()) return;
    await addTodo(currentUser, text);
    setTimeout(fetchTodos, 300);
  };

  const handleDeleteTask = async (id) => {
    const deleted = await deleteTodo(currentUser, id);
    if (deleted) fetchTodos();
  };

  const handleClearAll = async () => {
    await clearAllTodos(currentUser);
    setTasks([]);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar onSync={fetchTodos} onUserChange={setCurrentUser} />
      <div className="flex flex-col items-center py-10 px-4">
        <h1 className="text-3xl font-bold text-gray-700 mb-6 text-center">
          Lista de Tareas {currentUser && `de ${currentUser}`}
        </h1>
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
          <TodoInput addTask={handleAddTask} />
          <TodoList tasks={tasks} deleteTask={handleDeleteTask} />
          {tasks.length > 0 && (
            <button
              onClick={handleClearAll}
              className="mt-4 w-full bg-red-500 text-white py-2 rounded"
            >
              Eliminar todas las tareas
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
