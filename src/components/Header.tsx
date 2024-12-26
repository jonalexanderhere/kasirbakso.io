import React from 'react';
import { NavLink } from 'react-router-dom';
import { UtensilsCrossed } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-green-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <UtensilsCrossed size={32} />
            <h1 className="text-2xl font-bold">Bakso Urat Lumayan</h1>
          </div>
          <nav className="flex space-x-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `hover:text-green-200 transition-colors ${isActive ? 'text-green-200 font-bold' : ''}`
              }
            >
              Kasir
            </NavLink>
            <NavLink
              to="/laporan"
              className={({ isActive }) =>
                `hover:text-green-200 transition-colors ${isActive ? 'text-green-200 font-bold' : ''}`
              }
            >
              Laporan
            </NavLink>
            <NavLink
              to="/kelola-menu"
              className={({ isActive }) =>
                `hover:text-green-200 transition-colors ${isActive ? 'text-green-200 font-bold' : ''}`
              }
            >
              Kelola Menu
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;