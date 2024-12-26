import React from 'react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { Order } from '../types';
import OrderDetails from './OrderDetails';

interface DailyReportProps {
  date: string;
  orders: Order[];
}

const DailyReport: React.FC<DailyReportProps> = ({ date, orders }) => {
  const calculateDailyTotal = (dailyOrders: Order[]) => {
    return dailyOrders.reduce((sum, order) => sum + order.total, 0);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold mb-4">
        {format(new Date(date), 'EEEE, d MMMM yyyy', { locale: id })}
      </h3>
      
      <div className="mb-4">
        <p className="text-lg font-semibold text-green-600">
          Total Pendapatan: Rp {calculateDailyTotal(orders).toLocaleString()}
        </p>
        <p className="text-gray-600">
          Jumlah Transaksi: {orders.length}
        </p>
      </div>

      <div className="space-y-4">
        {orders.map(order => (
          <OrderDetails key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default DailyReport;