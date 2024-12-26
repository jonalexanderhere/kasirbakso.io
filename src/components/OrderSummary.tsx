import React from 'react';
import { OrderItem } from '../types';

interface OrderSummaryProps {
  orderItems: OrderItem[];
  updateQuantity: (id: string, quantity: number) => void;
  removeFromOrder: (id: string) => void;
  total: number;
  paymentAmount: string;
  setPaymentAmount: (amount: string) => void;
  handlePayment: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  orderItems,
  updateQuantity,
  removeFromOrder,
  total,
  paymentAmount,
  setPaymentAmount,
  handlePayment,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Pesanan</h2>
      <div className="space-y-4 mb-6">
        {orderItems.map(item => (
          <div key={item.id} className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-green-600">Rp {item.price.toLocaleString()}</p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="bg-green-100 text-green-600 px-2 rounded"
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="bg-green-100 text-green-600 px-2 rounded"
              >
                +
              </button>
              <button
                onClick={() => removeFromOrder(item.id)}
                className="text-red-500 ml-2"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between mb-4">
          <span className="font-bold">Total:</span>
          <span className="font-bold">Rp {total.toLocaleString()}</span>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Jumlah Pembayaran
          </label>
          <input
            type="number"
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Masukkan jumlah pembayaran"
          />
        </div>

        {paymentAmount && (
          <div className="mb-4">
            <span className="block text-sm font-medium mb-1">Kembalian:</span>
            <span className="text-lg font-bold text-green-600">
              Rp {Math.max(0, parseFloat(paymentAmount) - total).toLocaleString()}
            </span>
          </div>
        )}

        <button
          onClick={handlePayment}
          disabled={orderItems.length === 0 || !paymentAmount}
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Proses Pembayaran
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;