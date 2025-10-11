import { createContext, useContext, useState, useEffect, ReactNode } from "react";

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

interface CartContextType {
  cart: Cart;
  addToCart: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getCartItemCount: () => number;
  getProductQuantity: (productId: number) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "corzhify_cart";
const DEFAULT_USER_ID = 2; // TODO: Replace with actual user ID after auth

const getDefaultCart = (): Cart => ({
  id: 1,
  userId: DEFAULT_USER_ID,
  date: new Date().toISOString(),
  products: [],
});

const loadCartFromStorage = (): Cart => {
  if (typeof window === "undefined") return getDefaultCart();

  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Failed to load cart from storage:", error);
  }
  return getDefaultCart();
};

const saveCartToStorage = (cart: Cart) => {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error("Failed to save cart to storage:", error);
  }
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart>(getDefaultCart);

  // Load cart from localStorage on mount
  useEffect(() => {
    setCart(loadCartFromStorage());
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    saveCartToStorage(cart);
  }, [cart]);

  const addToCart = (productId: number, quantity: number) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.products.findIndex(
        (p) => p.productId === productId
      );

      const updatedProducts = [...prevCart.products];

      if (existingProductIndex >= 0) {
        // Update quantity if product already exists
        updatedProducts[existingProductIndex] = {
          ...updatedProducts[existingProductIndex],
          quantity: updatedProducts[existingProductIndex].quantity + quantity,
        };
      } else {
        // Add new product
        updatedProducts.push({ productId, quantity });
      }

      return {
        ...prevCart,
        products: updatedProducts,
        date: new Date().toISOString(),
      };
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => ({
      ...prevCart,
      products: prevCart.products.filter((p) => p.productId !== productId),
      date: new Date().toISOString(),
    }));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prevCart) => {
      const updatedProducts = prevCart.products.map((p) =>
        p.productId === productId ? { ...p, quantity } : p
      );

      return {
        ...prevCart,
        products: updatedProducts,
        date: new Date().toISOString(),
      };
    });
  };

  const clearCart = () => {
    setCart(getDefaultCart());
  };

  const getCartItemCount = () => {
    return cart.products.reduce((total, item) => total + item.quantity, 0);
  };

  const getProductQuantity = (productId: number) => {
    const product = cart.products.find((p) => p.productId === productId);
    return product ? product.quantity : 0;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartItemCount,
        getProductQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
