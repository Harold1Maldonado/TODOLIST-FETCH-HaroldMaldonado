// src/services/todoService.js

const USERNAME = "tu_usuario"; // 👈 cambia por tu usuario real
const BASE_URL = `https://playground.4geeks.com/todo/todos/${USERNAME}`;

/**
 * 🟢 Obtiene todas las tareas del servidor
 */
export const getTodos = async () => {
  try {
    const resp = await fetch(BASE_URL);
    if (!resp.ok) throw new Error("Error al obtener tareas");
    return await resp.json();
  } catch (error) {
    console.error("❌ Error en getTodos:", error);
    throw error;
  }
};

/**
 * ➕ Crea una nueva tarea en el servidor
 */
export const addTodo = async (label) => {
  try {
    const task = { label, is_done: false };

    const resp = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });

    if (!resp.ok) throw new Error("Error al agregar tarea");
    return await resp.json();
  } catch (error) {
    console.error("❌ Error en addTodo:", error);
    throw error;
  }
};

/**
 * ❌ Elimina una tarea individual por ID
 */
export const deleteTodo = async (id) => {
  try {
    const resp = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
    if (!resp.ok) throw new Error("Error al eliminar tarea");
    return true;
  } catch (error) {
    console.error("❌ Error en deleteTodo:", error);
    throw error;
  }
};

/**
 * 🧹 Elimina todas las tareas del usuario
 */
export const clearAllTodos = async () => {
  try {
    const resp = await fetch(`${BASE_URL}/all`, { method: "DELETE" });
    if (!resp.ok) throw new Error("Error al eliminar todas las tareas");
    return true;
  } catch (error) {
    console.error("❌ Error en clearAllTodos:", error);
    throw error;
  }
};

export const createUser = async () => {
  try {
    const resp = await fetch(`https://playground.4geeks.com/todo/users/${USERNAME}`, {
      method: "POST",
    });
    if (!resp.ok) console.warn("⚠️ El usuario ya existe o hubo un error");
    return await resp.json();
  } catch (error) {
    console.error("❌ Error en createUser:", error);
  }
};