export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: 'makanan' | 'minuman';
  image: string;
}

export interface OrderItem extends MenuItem {
  quantity: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  paymentAmount: number;
  change: number;
  timestamp: string;
}