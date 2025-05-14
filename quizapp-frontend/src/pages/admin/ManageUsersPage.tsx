import React, { useEffect, useState } from 'react';
import { fetchUsers, deleteUserById, updateUserById } from '../../api/userApi';

const ManageUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({ username: '', role: '' });

  const loadUsers = async () => {
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (err) {
      setError('Impossible de charger les utilisateurs.');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Confirmer la suppression de cet utilisateur ?')) {
      try {
        await deleteUserById(id);
        setUsers((prev) => prev.filter((u) => u.id !== id));
      } catch {
        alert('Erreur lors de la suppression.');
      }
    }
  };

  const openEditModal = (user) => {
    setEditingUser(user);
    setEditForm({ username: user.username, role: user.role });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };
const handleEditSubmit = async (e) => {
  e.preventDefault();

  const updatedData = {
    username: editForm.username,
    role: editForm.role,
    email: editingUser.email, // ➕ inclure l'email existant !
  };

  try {
    await updateUserById(editingUser.id, updatedData);
    setUsers((prev) =>
      prev.map((u) => (u.id === editingUser.id ? { ...u, ...updatedData } : u))
    );
    setEditingUser(null);
  } catch {
    alert('Erreur lors de la modification.');
  }
};

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">👥 Gestion des Utilisateurs</h1>
      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      <table className="w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 text-left">Nom</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Rôle</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-t hover:bg-gray-50">
              <td className="p-3">{u.username}</td>
              <td className="p-3">{u.email}</td>
              <td className="p-3">{u.role}</td>
              <td className="p-3 text-center space-x-4">
                <button
                  onClick={() => openEditModal(u)}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Modifier
                </button>
                <button
                  onClick={() => handleDelete(u.id)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal d'édition */}
      {editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Modifier l'utilisateur</h2>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Nom d'utilisateur</label>
                <input
                  type="text"
                  name="username"
                  value={editForm.username}
                  onChange={handleEditChange}
                  className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Rôle</label>
                <select
                  name="role"
                  value={editForm.role}
                  onChange={handleEditChange}
                  className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option value="USER">Utilisateur</option>
                  <option value="ADMIN">Administrateur</option>
                </select>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Sauvegarder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsersPage;
