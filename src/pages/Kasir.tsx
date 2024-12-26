import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useMenu } from '../context/MenuContext';
import { useOrders } from '../context/OrderContext';
import { OrderItem, MenuItem } from '../types';
import MenuCard from '../components/MenuCard';
import OrderSummary from '../components/OrderSummary';

const Kasir: React.FC = () => {
  const { menu } = useMenu();
  const { addOrder } = useOrders();
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [paymentAmount, setPaymentAmount] = useState<string>('');

  const addToOrder = (menuItem: MenuItem) => {
    const existingItem = orderItems.find(item => item.id === menuItem.id);
    if (existingItem) {
      setOrderItems(orderItems.map(item =>
        item.id === menuItem.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setOrderItems([...orderItems, { ...menuItem, quantity: 1 }]);
    }
    toast.success(`${menuItem.name} ditambahkan ke pesanan`);
  };

  const removeFromOrder = (id: string) => {
    setOrderItems(orderItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    setOrderItems(orderItems.map(item =>
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const calculateTotal = () => {
    return orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const handlePayment = () => {
    const total = calculateTotal();
    const payment = parseFloat(paymentAmount);
    
    if (!payment || payment < total) {
      toast.error('Pembayaran kurang dari total pesanan');
      return;
    }

    const change = payment - total;
    const order = {
      id: Date.now().toString(),
      items: orderItems,
      total,
      paymentAmount: payment,
      change,
      timestamp: new Date().toISOString(),
    };

    addOrder(order);
    setOrderItems([]);
    setPaymentAmount('');
    toast.success('Pesanan berhasil diproses!');
  };

  const makanan = menu.filter(item => item.category === 'makanan');
  const minuman = menu.filter(item => item.category === 'minuman');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Menu Makanan</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {makanan.map(item => (
                <MenuCard key={item.id} item={item} onClick={addToOrder} />
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">Menu Minuman</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {minuman.map(item => (
                <MenuCard key={item.id} item={item} onClick={addToOrder} />
              ))}
            </div>
          </div>
        </div>

        <OrderSummary
          orderItems={orderItems}
          updateQuantity={updateQuantity}
          removeFromOrder={removeFromOrder}
          total={calculateTotal()}
          paymentAmount={paymentAmount}
          setPaymentAmount={setPaymentAmount}
          handlePayment={handlePayment}
        />
      </div>
    </div>
  );
};

export default Kasir;