
import { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { AuthState, UserProfile } from "../types";
import { toast } from "sonner";
import { playSound } from "../utils/soundUtils";
import { supabase } from "@/integrations/supabase/client";

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, username: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

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
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
          const user = JSON.parse(savedUser);
          
          // Create or update profile in Supabase
          const { data: existingProfile } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single();

          if (!existingProfile) {
            // Create new profile
            await supabase.from("profiles").insert({
              id: user.id,
              username: user.username,
              rank: user.rank,
              avatar: user.avatar,
              level: user.level,
              score: user.score,
              completed_levels: user.completedLevels,
              attempts: {},
              time_taken: {},
              last_login: new Date().toISOString()
            });
          }

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
        const mockUser: UserProfile = {
          id: "550e8400-e29b-41d4-a716-446655440000", // Use a proper UUID format
          username: "CommanderPak",
          email: "commander@pak.defense",
          rank: "Cyber Commander",
          avatar: "https://i.pravatar.cc/150?img=68",
          level: 1,
          completedLevels: [],
          score: 0,
          lastLogin: new Date()
        };
        
        setAuthState({
          user: mockUser,
          isAuthenticated: true,
          isLoading: false,
        });
        
        // Save to localStorage for persistence
        localStorage.setItem("user", JSON.stringify(mockUser));
        
        // Create or update profile in Supabase
        await supabase.from("profiles").upsert({
          id: mockUser.id,
          username: mockUser.username,
          rank: mockUser.rank,
          avatar: mockUser.avatar,
          level: mockUser.level,
          score: mockUser.score,
          completed_levels: mockUser.completedLevels,
          attempts: {},
          time_taken: {},
          last_login: new Date().toISOString()
        });
        
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
        id: "550e8400-e29b-41d4-a716-446655440001", // Use a proper UUID format
        username,
        email,
        rank: "Cyber Commander",
        avatar: "https://i.pravatar.cc/150?img=68",
        level: 1,
        completedLevels: [],
        score: 0,
        lastLogin: new Date()
      };
      
      setAuthState({
        user: newUser,
        isAuthenticated: true,
        isLoading: false,
      });
      
      // Save to localStorage for persistence
      localStorage.setItem("user", JSON.stringify(newUser));
      
      // Create profile in Supabase
      await supabase.from("profiles").insert({
        id: newUser.id,
        username: newUser.username,
        rank: newUser.rank,
        avatar: newUser.avatar,
        level: newUser.level,
        score: newUser.score,
        completed_levels: newUser.completedLevels,
        attempts: {},
        time_taken: {},
        last_login: new Date().toISOString()
      });
      
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
