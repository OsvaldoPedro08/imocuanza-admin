import React from 'react';
import { Menu } from 'lucide-react';

const Header = ({ toggleSidebar }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between h-16 px-6 bg-white border-b border-gray-200">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-700 text-white font-bold">
          <img src="/logo.svg" alt="ImoCuanza Logo" className="w-6 h-6 object-contain" />
        </div>
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">ImoCuanza</h1>
      </div>
      <button 
        onClick={toggleSidebar} 
        className="p-2 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
        aria-label="Toggle Menu"
      >
        <Menu size={24} />
      </button>
    </header>
  );
};

export default Header;