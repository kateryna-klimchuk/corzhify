import { Product, Cart } from "~/types";

const API_BASE_URL = "https://dummyjson.com";

// Map DummyJSON product to our Product type
interface DummyJSONProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  thumbnail: string;
  images: string[];
  rating: number;
  stock: number;
}

function mapProduct(p: DummyJSONProduct): Product {
  return {
    id: p.id,
    title: p.title,
    description: p.description,
    price: p.price,
    category: p.category,
    image: p.thumbnail,
    rating: {
      rate: p.rating,
      count: p.stock,
    },
  };
}

export class ProductService {
  static async getAll(): Promise<Product[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/products?limit=20`);
      if (!response.ok) {
        throw new Error(`API returned ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      return data.products.map(mapProduct);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch products: ${error.message}`);
      }
      throw new Error("Failed to fetch products: Unknown error");
    }
  }

  static async getById(id: string | number): Promise<Product> {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch product ${id}`);
    }
    const data = await response.json();
    return mapProduct(data);
  }

  static async getByCategory(category: string): Promise<Product[]> {
    const response = await fetch(
      `${API_BASE_URL}/products/category/${category}`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch products in category ${category}`);
    }
    const data = await response.json();
    return data.products.map(mapProduct);
  }

  static async getCategories(): Promise<string[]> {
    const response = await fetch(`${API_BASE_URL}/products/categories`);
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    const data = await response.json();
    // DummyJSON returns categories as objects with slug and name
    return data.map((cat: { slug: string; name: string }) => cat.slug);
  }
}

export class CartService {
  static async getUserCart(userId: number): Promise<Cart[]> {
    const response = await fetch(`${API_BASE_URL}/carts/user/${userId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch cart for user ${userId}`);
    }
    const data = await response.json();
    return data.carts || [];
  }

  static async getUserProducts(userId: number): Promise<Product[]> {
    const carts = await this.getUserCart(userId);

    if (!carts || carts.length === 0 || !carts[0].products) {
      return [];
    }

    // DummyJSON cart products have 'id', our CartItem type uses 'productId'
    const productPromises = carts[0].products.map((product) =>
      ProductService.getById(product.productId)
    );

    const userProducts = await Promise.all(productPromises);
    return userProducts;
  }

  static async getCartProducts(cart: Cart): Promise<Product[]> {
    if (!cart.products || cart.products.length === 0) {
      return [];
    }

    const productPromises = cart.products.map((product) =>
      ProductService.getById(product.productId)
    );

    return await Promise.all(productPromises);
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
