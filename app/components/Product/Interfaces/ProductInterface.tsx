export interface ProductInterface {
  id: number;
  title: string;
  image: string;
  price: number;
  category: string;
  rating: { rate: number; count: number };
  description: string;
}

export interface CartInterface extends ProductInterface {
  count: number;
}
