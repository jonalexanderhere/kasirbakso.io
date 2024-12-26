import React from 'react';
import { format } from 'date-fns';
import { Order } from '../types';

interface OrderDetailsProps {
  order: Order;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {
  return (
    <div className="border-t pt-4">
      <p className="text-gray-600 text-sm mb-2">
        {format(new Date(order.timestamp), 'HH:mm')}
      </p>
      <div className="space-y-2">
        {order.items.map(item => (
          <div key={item.id} className="flex justify-between">
            <span>{item.name} × {item.quantity}</span>
            <span>Rp {(item.price * item.quantity).toLocaleString()}</span>
          </div>
        ))}
      </div>
      <div className="mt-2 pt-2 border-t flex justify-between font-semibold">
        <span>Total</span>
        <span>Rp {order.total.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default OrderDetails;