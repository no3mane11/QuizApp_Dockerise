import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchCategories, fetchQuizzesByCategory, Category } from '../api/categoryApi';
import { getAllQuizzes } from '../api/quizApi';

interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: any[] | null | undefined; // Pour être plus tolérant avec les retours API
}

// ✅ Page pour parcourir les quiz publics
const BrowseQuizzesPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error loading categories:', error);
      }
    };

    const loadQuizzes = async () => {
      setLoading(true);
      try {
        const data = await getAllQuizzes();
        setQuizzes(data);
      } catch (error) {
        console.error('Error loading quizzes:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
    loadQuizzes();
  }, []);

  const handleCategoryChange = async (categoryId: string) => {
    setSelectedCategory(categoryId);
    setLoading(true);

    try {
      let data;
      if (categoryId === 'all') {
        data = await getAllQuizzes();
      } else {
        data = await fetchQuizzesByCategory(categoryId);
      }
      setQuizzes(data);
    } catch (error) {
      console.error('Error fetching quizzes by category:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-700">
        📚 Browse Public Quizzes
      </h1>

      <div className="mb-6">
        <label htmlFor="category-select" className="block text-sm font-medium text-gray-700 mb-2">
          Filter by category:
        </label>
        <select
          id="category-select"
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
          <option value="all">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-700"></div>
        </div>
      ) : quizzes.length === 0 ? (
        <p className="text-gray-500 mt-4 text-center">No quizzes found.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz) => (
            <li key={quiz.id} className="bg-white p-4 rounded shadow hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold mb-2">{quiz.title}</h3>
              <p className="text-gray-600 mb-2">{quiz.description}</p>
          <p className="text-sm text-blue-600">
  Questions: {quiz.questions?.length ?? 0}
</p>
              <Link
                to={`/quiz/${quiz.id}`}
                className="inline-block mt-2 text-blue-500 hover:underline"
              >
                📘 Start this quiz
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BrowseQuizzesPage;