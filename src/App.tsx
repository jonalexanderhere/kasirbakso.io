import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Kasir from './pages/Kasir';
import Laporan from './pages/Laporan';
import KelolaMenu from './pages/KelolaMenu';
import { MenuProvider } from './context/MenuContext';
import { OrderProvider } from './context/OrderContext';

function App() {
  return (
    <BrowserRouter>
      <MenuProvider>
        <OrderProvider>
          <div className="min-h-screen bg-gray-100">
            <Header />
            <Routes>
              <Route path="/" element={<Kasir />} />
              <Route path="/laporan" element={<Laporan />} />
              <Route path="/kelola-menu" element={<KelolaMenu />} />
            </Routes>
          </div>
          <Toaster position="top-right" />
        </OrderProvider>
      </MenuProvider>
    </BrowserRouter>
  );
}

export default App;