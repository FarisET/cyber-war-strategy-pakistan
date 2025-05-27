
import { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { AuthState, UserProfile } from "../types";
import { toast } from "sonner";
import { playSound } from "../utils/soundUtils";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

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

  // Convert Supabase user to our UserProfile format
  const convertToUserProfile = async (user: User): Promise<UserProfile> => {
    // Try to get profile data from our profiles table
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    return {
      id: user.id,
      username: profile?.username || user.email?.split("@")[0] || "User",
      email: user.email || "",
      rank: profile?.rank || "Cyber Commander",
      avatar: profile?.avatar || "https://i.pravatar.cc/150?img=68",
      level: profile?.level || 1,
      completedLevels: profile?.completed_levels || [],
      score: profile?.score || 0,
      lastLogin: new Date()
    };
  };

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        // Set up auth state listener
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (event, session) => {
            console.log("Auth state changed:", event, session);
            
            if (session?.user) {
              const userProfile = await convertToUserProfile(session.user);
              setAuthState({
                user: userProfile,
                isAuthenticated: true,
                isLoading: false,
              });
              
              if (event === 'SIGNED_IN') {
                playSound("startup", 0.3);
              }
            } else {
              setAuthState({
                user: null,
                isAuthenticated: false,
                isLoading: false,
              });
            }
          }
        );

        // Check for existing session
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const userProfile = await convertToUserProfile(session.user);
          setAuthState({
            user: userProfile,
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

        return () => {
          subscription.unsubscribe();
        };
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
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        playSound("error", 0.5);
        toast.error("Authentication failed", {
          description: error.message,
        });
        return;
      }

      if (data.user) {
        playSound("success", 0.5);
        toast.success("Login successful", {
          description: "Welcome back, Commander!",
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
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: username,
          }
        }
      });

      if (error) {
        playSound("error", 0.5);
        toast.error("Signup failed", {
          description: error.message,
        });
        return;
      }

      if (data.user) {
        // Create profile record manually since the trigger might not have fired yet
        const { error: profileError } = await supabase
          .from("profiles")
          .upsert({
            id: data.user.id,
            username: username,
            rank: "Cyber Commander",
            avatar: "https://i.pravatar.cc/150?img=68",
            level: 1,
            score: 0,
            completed_levels: [],
            attempts: {},
            time_taken: {},
            last_login: new Date().toISOString()
          });

        if (profileError) {
          console.error("Profile creation error:", profileError);
        }

        playSound("success", 0.5);
        toast.success("Account created", {
          description: "Welcome to Cyber Command!",
        });
      }
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
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error("Logout error:", error);
        return;
      }
      
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
