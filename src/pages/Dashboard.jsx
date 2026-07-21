import React, { useState } from 'react';
import Header from '../components/Layout/Header';
import Sidebar from '../components/Layout/Sidebar';
import StatsCards from '../components/Stats/StatsCards';
import { Shield } from 'lucide-react';
import UserTablePage from '../components/Users/UsertablePage';
import ImovelTable from '../components/Imoveis/ImovelTable';
import NotificationTable from '../components/Notifications/NotificationTable';



const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState('DashboardHome');

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleSetActiveComponent = (componentName) => {
    setActiveComponent(componentName);
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  const renderMainContent = () => {
    switch (activeComponent) {
      case 'UsersManager':
        return <UserTablePage />;
      case 'ImovelManager':
        return <ImovelTable />;
      case 'NotificationManager':
        return <NotificationTable />;
      case 'DashboardHome':
      default:
        return (
          <>
            <div className="flex items-center gap-4 mb-8 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <div className="p-4 bg-gray-900 text-white rounded-2xl">
                <Shield size={32} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-950">Painel de Administração</h2>
                <p className="text-sm text-gray-500 font-medium">Controlo total da plataforma</p>
              </div>
            </div>
            <StatsCards />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header toggleSidebar={toggleSidebar} />
      
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)} 
          className="fixed inset-0 bg-black/20 z-10 lg:hidden"
        />
      )}

      <div className="flex flex-1 pt-16">
        <Sidebar isOpen={sidebarOpen} setActiveComponent={handleSetActiveComponent} />
        
        <main className="flex-1 lg:pl-64 p-6 sm:p-8 max-w-7xl mx-auto w-full transition-all">
          {renderMainContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;