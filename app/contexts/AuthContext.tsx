import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  image?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email: string, password: string, firstName: string, lastName: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = "corzhify_auth";

// Mock users database
const MOCK_USERS: Array<User & { password: string }> = [
  {
    id: 1,
    email: "demo@corzhify.com",
    password: "demo123",
    firstName: "Demo",
    lastName: "User",
    image: "https://i.pravatar.cc/150?u=demo",
  },
  {
    id: 2,
    email: "john@example.com",
    password: "password",
    firstName: "John",
    lastName: "Doe",
    image: "https://i.pravatar.cc/150?u=john",
  },
];

const loadAuthFromStorage = (): User | null => {
  if (typeof window === "undefined") return null;

  try {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Failed to load auth from storage:", error);
  }
  return null;
};

const saveAuthToStorage = (user: User | null) => {
  if (typeof window === "undefined") return;

  try {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  } catch (error) {
    console.error("Failed to save auth to storage:", error);
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = loadAuthFromStorage();
    setUser(storedUser);
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const foundUser = MOCK_USERS.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      saveAuthToStorage(userWithoutPassword);
      return { success: true };
    }

    return { success: false, error: "Invalid email or password" };
  };

  const signup = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ): Promise<{ success: boolean; error?: string }> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Check if email already exists
    const existingUser = MOCK_USERS.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (existingUser) {
      return { success: false, error: "Email already registered" };
    }

    // Create new user (in real app, this would be saved to backend)
    const newUser: User = {
      id: MOCK_USERS.length + 1,
      email,
      firstName,
      lastName,
      image: `https://i.pravatar.cc/150?u=${email}`,
    };

    // Add to mock database
    MOCK_USERS.push({ ...newUser, password });

    setUser(newUser);
    saveAuthToStorage(newUser);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    saveAuthToStorage(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
