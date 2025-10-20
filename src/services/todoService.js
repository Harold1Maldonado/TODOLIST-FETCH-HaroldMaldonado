const BASE_URL = "https://playground.4geeks.com/todo";

export const getAllUsers = async () => {
  try {
    const resp = await fetch(`${BASE_URL}/users`, {
      method: "GET",
      headers: { accept: "application/json" },
    });
    if (!resp.ok) throw new Error();
    const data = await resp.json();
    return data.users || [];
  } catch {
    return [];
  }
};

export const createUserIfNotExists = async (username) => {
  try {
    const resp = await fetch(`${BASE_URL}/users/${username}`, {
      method: "POST",
      headers: { accept: "application/json" },
    });
    return await resp.json();
  } catch {
    return null;
  }
};

export const deleteUser = async (username) => {
  try {
    const resp = await fetch(`${BASE_URL}/users/${username}`, {
      method: "DELETE",
      headers: { accept: "application/json" },
    });
    return resp.status === 204;
  } catch {
    return false;
  }
};

export const getTodos = async (username) => {
  try {
    const resp = await fetch(`${BASE_URL}/users/${username}`, {
      method: "GET",
      headers: { accept: "application/json" },
    });
    if (!resp.ok) throw new Error();
    const data = await resp.json();
    return data.todos || [];
  } catch {
    return [];
  }
};

export const addTodo = async (username, label) => {
  try {
    const newTask = { label, is_done: false };
    const resp = await fetch(`${BASE_URL}/todos/${username}`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    });
    if (!resp.ok) throw new Error();
    return await resp.json();
  } catch {
    return null;
  }
};

export const deleteTodo = async (taskId) => {
  try {
    const resp = await fetch(`${BASE_URL}/todos/${taskId}`, {
      method: "DELETE",
      headers: { accept: "application/json" },
    });
    return resp.status === 204;
  } catch {
    return false;
  }
};

export const clearAllTodos = async (tasks) => {
  try {
    if (!Array.isArray(tasks) || tasks.length === 0) return false;
    const deletePromises = tasks.map((task) =>
      fetch(`${BASE_URL}/todos/${task.id}`, {
        method: "DELETE",
        headers: { accept: "application/json" },
      })
    );
    const results = await Promise.all(deletePromises);
    const allDeleted = results.every((r) => r.status === 204);
    return allDeleted;
  } catch {
    return false;
  }
};
