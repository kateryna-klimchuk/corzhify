import { Product, Cart } from "~/types";

const API_BASE_URL = "https://fakestoreapi.com";

export class ProductService {
  static async getAll(): Promise<Product[]> {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    return response.json();
  }

  static async getById(id: string | number): Promise<Product> {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch product ${id}`);
    }
    return response.json();
  }

  static async getByCategory(category: string): Promise<Product[]> {
    const response = await fetch(
      `${API_BASE_URL}/products/category/${category}`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch products in category ${category}`);
    }
    return response.json();
  }

  static async getCategories(): Promise<string[]> {
    const response = await fetch(`${API_BASE_URL}/products/categories`);
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    return response.json();
  }
}

export class CartService {
  static async getUserCart(userId: number): Promise<Cart[]> {
    const response = await fetch(`${API_BASE_URL}/carts/user/${userId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch cart for user ${userId}`);
    }
    return response.json();
  }

  static async getUserProducts(userId: number): Promise<Product[]> {
    const carts = await this.getUserCart(userId);

    if (!carts || carts.length === 0 || !carts[0].products) {
      return [];
    }

    const productPromises = carts[0].products.map((product) =>
      ProductService.getById(product.productId)
    );

    const userProducts = await Promise.all(productPromises);
    return userProducts;
  }

  static getProductQuantities(carts: Cart[]): Record<number, number> {
    return carts
      .flatMap((cart) => cart.products)
      .reduce<Record<number, number>>((acc, product) => {
        acc[product.productId] = (acc[product.productId] || 0) + product.quantity;
        return acc;
      }, {});
  }
}
