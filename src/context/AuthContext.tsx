"use client";
import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type User = {
  userId?: string;
  username?: string;
  totalPoints?: number;
  capturedFlags?: number;
  challenge3Attempts?: number;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshUserData: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadUser = async () => {
      const userId = localStorage.getItem("userId");
      if (userId) {
        try {
          const response = await axios.post("/api/getTotalPoints", { userId });
          setUser(response.data);
        } catch (err) {
          console.error("Failed to load user:", err);
          setError("Failed to load user data");
        }
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/users/login", {
        email,
        password,
      });

      localStorage.setItem("userId", data.user.userId);

      setUser({
        userId: data.user.userId,
        username: data.user.username,
        totalPoints: data.user.totalPoints || 0,
        capturedFlags: data.user.capturedFlags || 0,
      });

      router.push("/challenges");
      toast.success("Login successful");
    } catch (error: any) {
      setError(error.response?.data?.message || "Login Failed");
      toast.error("Login Failed");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (username: string, email: string, password: string) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", {
        username,
        email,
        password,
      });

      if (response.data.user.userId) {
        localStorage.setItem("userId", response.data.user.userId);
      }
      toast.success("Signup successful");
    } catch (error: any) {
      setError(error.response?.data?.message || "Signup Failed");
      toast.error("Signup Failed");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("userId");
    setUser(null);
    router.push("/login");
    toast.success("Logged out successfully");
  };

  const refreshUserData = async () => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      try {
        const response = await axios.post("/api/getTotalPoints", { userId });
        setUser(response.data);
      } catch (err) {
        console.error("Failed to refresh user data:", err);
        setError("Failed to refresh user data");
        localStorage.removeItem("userId");
        router.push("/login");
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        signup,
        logout,
        refreshUserData,
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
