export interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
  description: string;
}

export interface CartProduct extends Product {
  count: number;
}

export interface CartItem {
  productId: number;
  quantity: number;
}

export interface Cart {
  id: number;
  userId: number;
  date: string;
  products: CartItem[];
}

export interface ProductCardProps {
  product: {
    id: string | number;
    title: string;
    image?: string;
    href: string;
    price?: number;
  };
}
