import { Order } from '../types';

export const groupOrdersByDate = (orders: Order[]) => {
  const grouped = orders.reduce((acc, order) => {
    const date = order.timestamp.split('T')[0]; // Get YYYY-MM-DD
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(order);
    return acc;
  }, {} as Record<string, Order[]>);

  return Object.entries(grouped).sort((a, b) => b[0].localeCompare(a[0]));
};