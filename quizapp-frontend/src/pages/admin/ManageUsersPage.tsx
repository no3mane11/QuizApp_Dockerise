
import React, { useEffect, useState } from 'react';
import { fetchUsers, deleteUserById } from '../../api/userApi';

const ManageUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

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
              <td className="p-3 text-center">
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
    </div>
  );
};

export default ManageUsersPage;
