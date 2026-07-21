import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import NotFound from './components/NotFound';

export default function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dashboard />} />

          {/* rota que captura qualquer caminho que nao foi definido acima */}
          <Route path='*' element={<NotFound />} />
        </Routes>
    </BrowserRouter>
  );
}
