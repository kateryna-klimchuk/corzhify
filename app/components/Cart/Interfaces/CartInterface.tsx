interface CartProductInterface {
  productId: number;
  quantity: number;
}

export interface CartItemInterface {
  userId: number;
  id: number;
  date: string;
  products: CartProductInterface[];
}
