
import React, { useState } from 'react';
import { createCategory } from '../../api/categoryApi';
import { useNavigate } from 'react-router-dom';

const CreateCategoryPage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await createCategory(name ,description );
      navigate('/dashboard');
    } catch (err) {
      setError('Erreur lors de la création de la catégorie.');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6">🎨 Nouvelle Catégorie</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && <p className="text-red-600 text-center">{error}</p>}
        <div>
          <label className="block font-semibold mb-1">Nom de la Catégorie</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
          <div>
          <label className="block font-semibold mb-1">Description de la Catégorie</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={name}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          ✅ Créer la Catégorie
        </button>
      </form>
    </div>
  );
};

export default CreateCategoryPage;
