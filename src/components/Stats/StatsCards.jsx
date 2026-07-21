import React from 'react';
import { Home, AlertTriangle, CheckCircle, Users } from 'lucide-react';

const StatsCards = () => {
  const stats = [
    { title: 'Total Imóveis', value: '6', icon: Home, bg: 'bg-blue-50', text: 'text-blue-600' },
    { title: 'Pendentes', value: '0', icon: AlertTriangle, bg: 'bg-amber-50', text: 'text-amber-600' },
    { title: 'Publicados', value: '6', icon: CheckCircle, bg: 'bg-emerald-50', text: 'text-emerald-600' },
    { title: 'Utilizadores', value: '2', icon: Users, bg: 'bg-indigo-50', text: 'text-indigo-600' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className={`p-4 rounded-xl ${stat.bg} ${stat.text}`}>
            <stat.icon size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
            <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;