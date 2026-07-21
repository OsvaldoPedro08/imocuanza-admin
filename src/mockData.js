export const mockUsers = [
  {
    id: 1,
    name: 'isabelnaquindaantonio',
    email: 'isabelnaquindaantonio@gmail.com',
    location: 'Sambizanga, Ndalatando',
    phone: '924345689',
    role: 'user',
    status: 'ativo', // Pode ser 'ativo' ou 'banido'
  },
  {
    id: 2,
    name: 'Osvaldo Pedro',
    email: 'pedroosvaldo187@gmail.com',
    location: 'Sambizanga, Ndalatando',
    phone: '924345689',
    role: 'admin',
    status: 'ativo',
  },
  {
    id: 3,
    name: 'Carlos Manuel',
    email: 'carlos.manuel@hotmail.com',
    location: 'Centro, Dondo',
    phone: '912345678',
    role: 'user',
    status: 'banido',
  },
  {
    id: 4,
    name: 'Ana Silva',
    email: 'ana.silva@gmail.com',
    location: 'Bairro Novo, Cazengo',
    phone: '934567890',
    role: 'user',
    status: 'ativo',
  },
  {
    id: 5,
    name: 'Pedro Nogueira',
    email: 'pedro.nogueira@admin.co.ao',
    location: 'Alto dos Bendos, Ndalatando',
    phone: '998877665',
    role: 'admin',
    status: 'ativo',
  },
];

export const mockImoveis = [
  {
    id: 1,
    title: 'Casa T2 no centro da cidade.',
    price: '20 000 Kz',
    location: 'Rua dos Índios, Cazengo',
    payment: 'Sim · express',
    status: 'pendente', // 'pendente', 'arrendado', 'vendido'
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 2,
    title: 'Casa T3 com quintal no Cazenga',
    price: '8 500 000 Kz',
    location: 'Cazenga, Ndalatando',
    payment: 'Sim · express',
    status: 'vendido',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 3,
    title: 'Apartamento T2 moderno',
    price: '120 000 Kz',
    location: 'Centro, Dondo',
    payment: 'Sim · transferencia',
    status: 'arrendado',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 4,
    title: 'Terreno 500m² para construção',
    price: '2 500 000 Kz',
    location: 'Bairro Novo, Cazengo',
    payment: 'Sim · express',
    status: 'pendente',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 5,
    title: 'Casa T4 duplex com piscina',
    price: '15 000 000 Kz',
    location: 'Alto dos Bendos, Ndalatando',
    payment: 'Sim · transferencia',
    status: 'pendente',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 6,
    title: 'Vivenda T3 espaçosa',
    price: '9 000 000 Kz',
    location: 'Zango, Cazengo',
    payment: 'Sim · express',
    status: 'vendido',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=500&q=80',
  }
];

export const mockInteresses = [
  {
    id: 1,
    title: 'Casa T2 no centro da cidade.',
    interestedUser: 'isabelnaquindaantonio',
    contactShared: true,
    price: '20 000 Kz',
    location: 'Rua dos Índios, Cazengo',
    payment: 'Sim · express',
    status: 'approved', // 'approved', 'pending', 'rejected'
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=500&q=80',
    ]
  },
  {
    id: 2,
    title: 'Casa T3 com quintal no Cazenga',
    interestedUser: 'Osvaldo Pedro',
    contactShared: false,
    price: '8 500 000 Kz',
    location: 'Cazenga, Ndalatando',
    payment: 'Sim · express',
    status: 'pending',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=500&q=80',
    ]
  },
  {
    id: 3,
    title: 'Apartamento T2 moderno',
    interestedUser: 'Maria Silva',
    contactShared: true,
    price: '120 000 Kz',
    location: 'Centro, Dondo',
    payment: 'Sim · transferencia',
    status: 'approved',
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=500&q=80',
    ]
  },
  {
    id: 4,
    title: 'Terreno 500m² para construção',
    interestedUser: 'António Costa',
    contactShared: false,
    price: '2 500 000 Kz',
    location: 'Bairro Novo, Cazengo',
    payment: 'Sim · express',
    status: 'pending',
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=500&q=80',
    ]
  }
];