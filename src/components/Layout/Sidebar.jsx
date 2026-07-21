import React from 'react';
import { Home, Users, ClipboardList, Settings, LogOut, Bell } from 'lucide-react';

const Sidebar = ({ isOpen, setActiveComponent }) => {
  const menuItems = [
    { name: 'Dashboard', icon: Home, component: 'DashboardHome' },
    { name: 'Imóveis', icon: ClipboardList, component: 'ImovelManager' },
    { name: 'Interesses', icon: Bell, component: 'NotificationManager' },
    { name: 'Utilizadores', icon: Users, component: 'UsersManager' },
    { name: 'Auditoria e Logs', icon: Settings, component: 'AuditLogs' },
  ];

  return (
    <aside className={`
      fixed top-16 bottom-0 left-0 z-20 w-64 bg-white border-r border-gray-200 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0
      ${isOpen ? 'translate-x-0 shadow-xl' : '-translate-x-full'}
    `}>
      <nav className="p-4 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.name}
            onClick={() => setActiveComponent(item.component)}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 rounded-xl hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
          >
            <item.icon size={20} />
            <span>{item.name}</span>
          </button>
        ))}
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 rounded-xl hover:bg-red-50 transition-colors">
          <LogOut size={20} />
          <span>Terminar Sessão</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;