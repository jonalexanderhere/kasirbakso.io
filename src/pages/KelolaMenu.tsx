import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useMenu } from '../context/MenuContext';
import { MenuItem } from '../types';

const KelolaMenu: React.FC = () => {
  const { menu, addMenuItem, removeMenuItem } = useMenu();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState<'makanan' | 'minuman'>('makanan');
  const [image, setImage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !price || !image) {
      toast.error('Semua field harus diisi');
      return;
    }

    const newItem: MenuItem = {
      id: Date.now().toString(),
      name,
      price: parseFloat(price),
      category,
      image,
    };

    addMenuItem(newItem);
    toast.success('Menu berhasil ditambahkan');

    // Reset form
    setName('');
    setPrice('');
    setImage('');
    setCategory('makanan');
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus menu ini?')) {
      removeMenuItem(id);
      toast.success('Menu berhasil dihapus');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-6">Tambah Menu Baru</h2>
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Nama Menu
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Masukkan nama menu"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Harga
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Masukkan harga"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Kategori
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as 'makanan' | 'minuman')}
                className="w-full p-2 border rounded"
              >
                <option value="makanan">Makanan</option>
                <option value="minuman">Minuman</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                URL Gambar
              </label>
              <input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Masukkan URL gambar"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
            >
              Tambah Menu
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Daftar Menu</h2>
          <div className="space-y-4">
            {menu.map(item => (
              <div key={item.id} className="bg-white rounded-lg shadow-md p-4 flex items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg mr-4"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-green-600">Rp {item.price.toLocaleString()}</p>
                  <p className="text-gray-600 text-sm">
                    {item.category === 'makanan' ? 'Makanan' : 'Minuman'}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Hapus
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KelolaMenu;