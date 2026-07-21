import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Search, MoreVertical, Edit2, UserX, CheckCircle, Trash2 } from 'lucide-react';
import { mockUsers } from '../../mockData';

const UserTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState(mockUsers);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredUsers = useMemo(() => {
    if (!searchTerm) return users;
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, users]);

  const handleAction = (userId, action) => {
    if (action === 'banir' || action === 'ativo') {
      setUsers(
        users.map((u) =>
          u.id === userId ? { ...u, status: action === 'banir' ? 'banido' : 'ativo' } : u
        )
      );
    }
    if (action === 'eliminar') {
      setUsers(users.filter((u) => u.id !== userId));
    }
    setActiveMenuId(null);
  };

  const toggleMenu = (userId) => {
    setActiveMenuId(activeMenuId === userId ? null : userId);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-200">
        <h2 className="text-lg font-bold text-gray-900">Gestão de Utilizadores</h2>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Pesquisar por nome ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/75 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              <th className="py-3 px-6">Utilizador</th>
              <th className="py-3 px-6">Contacto</th>
              <th className="py-3 px-6">Função</th>
              <th className="py-3 px-6">Estado</th>
              <th className="py-3 px-6 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="py-4 px-6 flex items-center gap-3">
                  <img
                    src={`https://api.dicebear.com/8.x/initials/svg?seed=${user.name}`}
                    alt={user.name}
                    className="w-10 h-10 rounded-full bg-gray-100 object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <p className="text-gray-900">{user.phone}</p>
                  <p className="text-xs text-gray-500">{user.location}</p>
                </td>
                <td className="py-4 px-6">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${
                    user.role === 'admin' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${
                    user.status === 'ativo' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                  }`}>
                    {user.status === 'ativo' ? <CheckCircle size={12} /> : <UserX size={12} />}
                    {user.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-right relative">
                  <button 
                    onClick={() => toggleMenu(user.id)}
                    className="p-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <MoreVertical size={18} />
                  </button>

                  {activeMenuId === user.id && (
                    <div ref={menuRef} className="absolute right-6 top-14 w-40 bg-white border border-gray-200 rounded-xl shadow-lg py-1 z-10 text-left">
                      <button
                        onClick={() => handleAction(user.id, 'editar')}
                        className="w-full flex items-center gap-2 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50"
                      >
                        <Edit2 size={14} /> Editar
                      </button>
                      {user.status === 'ativo' ? (
                        <button
                          onClick={() => handleAction(user.id, 'banir')}
                          className="w-full flex items-center gap-2 px-4 py-2 text-xs font-medium text-amber-600 hover:bg-amber-50"
                        >
                          <UserX size={14} /> Banir
                        </button>
                      ) : (
                        <button
                          onClick={() => handleAction(user.id, 'ativo')}
                          className="w-full flex items-center gap-2 px-4 py-2 text-xs font-medium text-emerald-600 hover:bg-emerald-50"
                        >
                          <CheckCircle size={14} /> Ativo
                        </button>
                      )}
                      <div className="h-px bg-gray-100 my-1" />
                      <button
                        onClick={() => handleAction(user.id, 'eliminar')}
                        className="w-full flex items-center gap-2 px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-50"
                      >
                        <Trash2 size={14} /> Eliminar
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredUsers.length === 0 && (
          <div className="p-8 text-center text-sm text-gray-500">Nenhum utilizador encontrado.</div>
        )}
      </div>
    </div>
  );
};

export default UserTable;