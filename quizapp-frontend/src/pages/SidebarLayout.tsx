// src/layouts/SidebarLayout.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface SidebarLayoutProps {
  children: React.ReactNode;
}

const SidebarLayout: React.FC<SidebarLayoutProps> = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname.startsWith(path);

  const adminLinks = [
    { to: '/manage-users', label: 'Gestion utilisateurs' },
    { to: '/create-category', label: 'Créer une catégorie' },
    { to: '/create-quiz', label: 'Créer un quiz' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md p-4">
        <nav className="space-y-2">
          
       
          {user?.role === 'ADMIN' && (
            
            <>
                 <h2 className="text-lg font-semibold mb-4">Admin menu</h2>
              <hr className="my-4" />
              {adminLinks.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className={`block px-3 py-2 rounded hover:bg-blue-50 text-sm ${
                    isActive(to) ? 'bg-blue-100 text-blue-600 font-semibold' : 'text-gray-700'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </>
          )}
        </nav>
      </aside>

      <main className="flex-1 p-6">{children}</main>
    </div>
  );
};

export default SidebarLayout;
