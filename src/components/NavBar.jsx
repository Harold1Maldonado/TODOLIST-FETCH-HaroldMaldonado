import React, { useState, useEffect } from "react";
import { getAllUsers, createUserIfNotExists, deleteUser } from "../services/todoService";

const NavBar = ({ onUserChange, onSync }) => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);

  const fetchUsers = async () => {
    const data = await getAllUsers();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newUser.trim()) return;

    await createUserIfNotExists(newUser);
    setNewUser("");
    setIsAdmin(false);
    fetchUsers();
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return alert("Selecciona un usuario para eliminar");
    if (!confirmDelete) return alert("Debes confirmar la eliminación marcando el checkbox");

    await deleteUser(selectedUser);
    setSelectedUser("");
    setConfirmDelete(false);
    fetchUsers();
    onUserChange("");
  };

  const handleSelect = (e) => {
    const user = e.target.value;
    setSelectedUser(user);
    onUserChange(user);
  };

  return (
    <nav className="flex flex-col md:flex-row justify-between items-center gap-3 bg-white p-4 shadow">
      <div className="flex items-center gap-2">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Nuevo usuario"
            value={newUser}
            onChange={(e) => setNewUser(e.target.value)}
            className="border border-gray-400 rounded p-2"
          />

          <label className="flex items-center gap-1 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
              className="border border-gray-400"
              required
            />
            Admin
          </label>

          <button
            type="submit"
            className="border border-gray-400 px-3 py-2 rounded hover:bg-gray-100"
          >
            Agregar
          </button>
        </form>
      </div>

      <div className="flex items-center gap-2">
        <select
          value={selectedUser}
          onChange={handleSelect}
          className="border border-gray-400 rounded p-2"
        >
          <option value="">Selecciona un usuario</option>
          {users.map((user) => (
            <option key={user.id} value={user.name}>
              {user.name}
            </option>
          ))}
        </select>

        <label className="flex items-center gap-1 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={confirmDelete}
            onChange={(e) => setConfirmDelete(e.target.checked)}
            className="border border-gray-400"
            required
          />
          Confirmar eliminación
        </label>

        <button
          onClick={handleDeleteUser}
          className="border border-gray-400 text-red-600 px-3 py-2 rounded hover:bg-red-100"
        >
          Eliminar
        </button>

        <button
          onClick={onSync}
          className="border border-gray-400 px-3 py-2 rounded hover:bg-gray-100"
        >
          Sincronizar
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
