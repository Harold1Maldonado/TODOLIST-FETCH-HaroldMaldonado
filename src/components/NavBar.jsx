import React, { useState, useEffect } from "react";
import {
  getAllUsers,
  createUserIfNotExists,
  deleteUser,
} from "../services/todoService";

const NavBar = ({ onSync, onUserChange }) => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState("");
  const [selectedUser, setSelectedUser] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const data = await getAllUsers();
    setUsers(data);
  };

  const handleCreateUser = async () => {
    if (!newUser.trim()) return alert("Ingresa un nombre de usuario");
    await createUserIfNotExists(newUser);
    setNewUser("");
    fetchUsers();
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return alert("Selecciona un usuario para eliminar");
    if (!confirm(`¿Eliminar el usuario "${selectedUser}"?`)) return;
    await deleteUser(selectedUser);
    setSelectedUser("");
    fetchUsers();
  };

  const handleSelectChange = (e) => {
    const username = e.target.value;
    setSelectedUser(username);
    onUserChange(username);
  };

  return (
    <nav className="w-full bg-gray-800 text-white p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
      <div className="text-lg font-semibold">ToDo Manager</div>

      <div className="flex flex-wrap items-center gap-3">
        <select
          value={selectedUser}
          onChange={handleSelectChange}
          className="text-black px-2 py-1 border border-gray-400 rounded"
        >
          <option value="">Seleccionar usuario</option>
          {users.map((u) => (
            <option key={u.id} value={u.name}>
              {u.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Nuevo usuario"
          value={newUser}
          onChange={(e) => setNewUser(e.target.value)}
          className="px-2 py-1 border border-gray-400 text-black rounded"
        />
        <button
          onClick={handleCreateUser}
          className="bg-green-500 text-white px-3 py-1 rounded"
        >
          Crear
        </button>

        <button
          onClick={handleDeleteUser}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Eliminar
        </button>

        <button
          onClick={onSync}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Sincronizar
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
