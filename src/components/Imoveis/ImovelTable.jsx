import React, { useState, useMemo, useEffect } from 'react';
import { Search, MoreVertical, Trash2, CheckCircle, Clock, Tag, X, MapPin, DollarSign, ShieldCheck } from 'lucide-react';
import { mockImoveis as originalMockImoveis } from '../../mockData';

// Expandimos os dados mockados localmente para garantir as 4 imagens da galeria de exemplo se não existirem
const mockImoveisComGaleria = originalMockImoveis.map((item) => ({
  ...item,
  images: item.images || [
    item.image,
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=500&q=80',
  ]
}));

const ImovelTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [imoveis, setImoveis] = useState(mockImoveisComGaleria);
  const [activeMenuId, setActiveMenuId] = useState(null);
  
  // Estados para o Modal de Detalhes
  const [selectedImovel, setSelectedImovel] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Fechar menu de ações ao clicar em qualquer lugar fora da janela de ações
  useEffect(() => {
    const handleDocumentClick = (e) => {
      if (!e.target.closest('.menu-wrapper')) {
        setActiveMenuId(null);
      }
    };
    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, []);

  // Pesquisa em tempo real com useMemo
  const filteredImoveis = useMemo(() => {
    if (!searchTerm) return imoveis;
    return imoveis.filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, imoveis]);

  // Gestão direta das ações com atualização imediata do estado
  const handleAction = (id, action, e) => {
    if (e) e.stopPropagation(); // Evita abrir o modal ao clicar nas ações do menu
    if (action === 'eliminar') {
      setImoveis((prev) => prev.filter((item) => item.id !== id));
    } else {
      setImoveis((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: action } : item))
      );
    }
    setActiveMenuId(null);
  };

  const toggleMenu = (id, e) => {
    e.stopPropagation();
    setActiveMenuId(activeMenuId === id ? null : id);
  };

  const openModal = (imovel) => {
    setSelectedImovel(imovel);
    setActiveImageIndex(0); // Reseta para a primeira imagem ao abrir
  };

  const closeModal = () => {
    setSelectedImovel(null);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'vendido':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700">
            <CheckCircle size={12} /> Vendido
          </span>
        );
      case 'arrendado':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700">
            <Tag size={12} /> Arrendado
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700">
            <Clock size={12} /> Pendente
          </span>
        );
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden relative">
      {/* Cabeçalho fixo interno com barra de pesquisa */}
      <div className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-200 bg-white sticky top-0 z-10">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Gestão de Imóveis</h2>
          <p className="text-xs text-gray-500">Controlo de listagens e estados</p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Pesquisar por título ou local..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
          />
        </div>
      </div>

      {/* Container com Scrollbar customizada e altura limitada para scroll independente */}
      <div className="overflow-y-auto max-h-[calc(100vh-280px)] p-6 space-y-4 custom-scrollbar">
        {filteredImoveis.map((item) => (
          <div
            key={item.id}
            onClick={() => openModal(item)}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white border border-gray-200 rounded-2xl shadow-sm hover:border-emerald-500 hover:shadow-md transition-all gap-4 relative cursor-pointer group"
          >
            {/* Imagem e Detalhes */}
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 rounded-xl object-cover bg-gray-100 flex-shrink-0 group-hover:scale-105 transition-transform"
              />
              <div>
                <h3 className="font-bold text-gray-900 text-base group-hover:text-emerald-600 transition-colors">{item.title}</h3>
                <p className="text-sm font-semibold text-gray-700 mt-0.5">
                  {item.price} · <span className="font-normal text-gray-500">{item.location}</span>
                </p>
                <p className="text-xs text-gray-400 mt-1">Pago: {item.payment}</p>
              </div>
            </div>

            {/* Estado e Ações */}
            <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
              <div>{getStatusBadge(item.status)}</div>

              <div className="relative menu-wrapper" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={(e) => toggleMenu(item.id, e)}
                  className="p-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <MoreVertical size={20} />
                </button>

                {/* Menu de contexto das opções */}
                {activeMenuId === item.id && (
                  <div className="absolute right-0 top-10 w-44 bg-white border border-gray-200 rounded-xl shadow-xl py-1 z-20 text-left">
                    <button
                      onClick={(e) => handleAction(item.id, 'vendido', e)}
                      className="w-full flex items-center gap-2 px-4 py-2 text-xs font-medium text-emerald-600 hover:bg-emerald-50 transition-colors"
                    >
                      <CheckCircle size={14} /> Marcar Vendido
                    </button>
                    <button
                      onClick={(e) => handleAction(item.id, 'arrendado', e)}
                      className="w-full flex items-center gap-2 px-4 py-2 text-xs font-medium text-blue-600 hover:bg-blue-50 transition-colors"
                    >
                      <Tag size={14} /> Marcar Arrendado
                    </button>
                    <button
                      onClick={(e) => handleAction(item.id, 'pendente', e)}
                      className="w-full flex items-center gap-2 px-4 py-2 text-xs font-medium text-amber-600 hover:bg-amber-50 transition-colors"
                    >
                      <Clock size={14} /> Marcar Pendente
                    </button>
                    <div className="h-px bg-gray-100 my-1" />
                    <button
                      onClick={(e) => handleAction(item.id, 'eliminar', e)}
                      className="w-full flex items-center gap-2 px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 size={14} /> Eliminar
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {filteredImoveis.length === 0 && (
          <div className="py-12 text-center text-sm text-gray-500">
            Nenhum imóvel encontrado.
          </div>
        )}
      </div>

      {/* MODAL DE DETALHES DO IMÓVEL */}
      {selectedImovel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border border-gray-100 animate-in fade-in zoom-in duration-200 my-auto">
            
            {/* Cabeçalho do Modal */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
              <h3 className="font-bold text-gray-900 text-lg">Detalhes do Imóvel</h3>
              <button
                onClick={closeModal}
                className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-200/60 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Conteúdo do Modal */}
            <div className="p-6 space-y-6 max-h-[calc(80vh-120px)] overflow-y-auto">
              
              {/* Visualizador de Imagens */}
              <div className="space-y-3">
                {/* Imagem Principal Grande */}
                <div className="w-full h-72 rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 shadow-inner">
                  <img
                    src={selectedImovel.images[activeImageIndex]}
                    alt={selectedImovel.title}
                    className="w-full h-full object-cover transition-all duration-300"
                  />
                </div>

                {/* Array com 4 imagens secundárias (Miniaturas clicáveis) */}
                <div className="grid grid-cols-4 gap-3">
                  {selectedImovel.images.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`h-20 rounded-xl overflow-hidden border-2 transition-all ${
                        activeImageIndex === idx
                          ? 'border-emerald-600 ring-2 ring-emerald-500/20 scale-[1.02]'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={imgUrl} alt={`Miniatura ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Informações detalhadas */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h2 className="text-xl font-extrabold text-gray-900">{selectedImovel.title}</h2>
                  <div>{getStatusBadge(selectedImovel.status)}</div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="flex items-center gap-3 p-3.5 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="p-2.5 bg-emerald-100 text-emerald-700 rounded-xl">
                      <DollarSign size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Preço do Imóvel</p>
                      <p className="text-sm font-bold text-gray-900">{selectedImovel.price}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3.5 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="p-2.5 bg-blue-100 text-blue-700 rounded-xl">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Localização</p>
                      <p className="text-sm font-bold text-gray-900">{selectedImovel.location}</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="text-emerald-600" size={22} />
                    <div>
                      <p className="text-xs font-semibold text-emerald-900">Estado do Pagamento</p>
                      <p className="text-xs text-emerald-700">Método de pagamento: {selectedImovel.payment}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-200/60 px-3 py-1 rounded-lg">
                    Confirmado
                  </span>
                </div>
              </div>

            </div>

            {/* Rodapé do Modal com Botão de Fechar */}
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex justify-end">
              <button
                onClick={closeModal}
                className="px-5 py-2.5 bg-gray-900 text-white font-medium text-sm rounded-xl hover:bg-gray-800 transition-colors shadow-sm"
              >
                Fechar
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default ImovelTable;