
import { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { AuthState, UserProfile } from "../types";
import { toast } from "sonner";
import { playSound } from "../utils/soundUtils";

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, username: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user for demonstration
const MOCK_USER: UserProfile = {
  id: "1",
  username: "CommanderPak",
  email: "commander@pak.defense",
  rank: "Cyber Commander",
  avatar: "https://i.pravatar.cc/150?img=68",
  level: 1,
  completedLevels: [],
  score: 0,
  lastLogin: new Date()
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        // In production, this would check with Supabase
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
          const user = JSON.parse(savedUser);
          setAuthState({
            user,
            isAuthenticated: true,
            isLoading: false,
          });
          playSound("startup", 0.3);
        } else {
          setAuthState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      } catch (error) {
        console.error("Session check error:", error);
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    };

    checkSession();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // In production, this would authenticate with Supabase
      if (email === "demo@example.com" && password === "password") {
        setAuthState({
          user: MOCK_USER,
          isAuthenticated: true,
          isLoading: false,
        });
        
        // Save to localStorage for persistence
        localStorage.setItem("user", JSON.stringify(MOCK_USER));
        
        playSound("success", 0.5);
        toast.success("Login successful", {
          description: "Welcome back, Commander!",
        });
      } else {
        // Simulate auth error
        playSound("error", 0.5);
        toast.error("Authentication failed", {
          description: "Invalid credentials provided.",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      playSound("error", 0.5);
      toast.error("Login failed", {
        description: "Please try again later.",
      });
    }
  };

  const signup = async (email: string, password: string, username: string) => {
    try {
      // In production, this would create an account with Supabase
      const newUser: UserProfile = {
        ...MOCK_USER,
        email,
        username,
      };
      
      setAuthState({
        user: newUser,
        isAuthenticated: true,
        isLoading: false,
      });
      
      // Save to localStorage for persistence
      localStorage.setItem("user", JSON.stringify(newUser));
      
      playSound("success", 0.5);
      toast.success("Account created", {
        description: "Welcome to Cyber Command!",
      });
    } catch (error) {
      console.error("Signup error:", error);
      playSound("error", 0.5);
      toast.error("Signup failed", {
        description: "Please try again later.",
      });
    }
  };

  const logout = async () => {
    try {
      // In production, this would sign out from Supabase
      localStorage.removeItem("user");
      
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
      
      playSound("buttonClick", 0.5);
      toast.success("Logged out", {
        description: "Session terminated successfully.",
      });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  
  return context;
};
