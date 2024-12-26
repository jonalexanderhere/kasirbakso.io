import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { MenuItem } from '../types';

interface MenuCardProps {
  item: MenuItem;
  onClick: (item: MenuItem) => void;
}

const MenuCard: React.FC<MenuCardProps> = ({ item, onClick }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-green-600 mb-3">Rp {item.price.toLocaleString()}</p>
        <button
          onClick={() => onClick(item)}
          className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
        >
          <ShoppingCart size={18} />
          <span>Tambah ke Keranjang</span>
        </button>
      </div>
    </div>
  );
};

export default MenuCard;