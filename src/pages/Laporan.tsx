import React from 'react';
import { useOrders } from '../context/OrderContext';
import { groupOrdersByDate } from '../utils/dateUtils';
import DailyReport from '../components/DailyReport';

const Laporan: React.FC = () => {
  const { orders } = useOrders();
  const groupedOrders = groupOrdersByDate(orders);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Laporan Penjualan</h2>
      <div className="space-y-6">
        {groupedOrders.map(([date, dailyOrders]) => (
          <DailyReport key={date} date={date} orders={dailyOrders} />
        ))}
      </div>
    </div>
  );
};

export default Laporan;