import { createContext, useState, useContext, useEffect, ReactNode, useCallback } from "react";
import { AuthState, UserProfile } from "../types"; // Assuming types are defined here
import { toast } from "sonner";
import { playSound } from "../utils/soundUtils"; // Assuming soundUtils is correct
import { supabase } from "@/integrations/supabase/client"; // Assuming Supabase client is correctly configured
import type { User, Session, PostgrestSingleResponse } from "@supabase/supabase-js"; // Import PostgrestSingleResponse

// Define a more specific type for your profile data based on your table
interface ProfileData {
  id: string;
  username: string;
  rank: string;
  avatar: string;
  level: number;
  completed_levels: string[]; // or any[] if it can vary
  score: number;
  last_login: string; // Assuming ISO string
  // Add other fields like attempts, time_taken if they are always present
  attempts?: Record<string, any>; // Assuming Json means an object
  time_taken?: Record<string, any>; // Assuming Json means an object
}


interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, username: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper function for promise with timeout
function promiseWithTimeout<T>(
  promise: Promise<T>,
  ms: number,
  timeoutErrorMsg = 'Operation timed out'
): Promise<T> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  const timeoutPromise = new Promise<T>((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(new Error(timeoutErrorMsg));
    }, ms);
  });

  return Promise.race([
    promise,
    timeoutPromise
  ]).finally(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  });
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  const convertToUserProfile = useCallback(async (user: User): Promise<UserProfile> => {
    const userIdForLog = user?.id || 'unknown_user';
    try {
      console.log(`[AuthProvider] convertToUserProfile: START for user ${userIdForLog}`);

      // The Supabase query builder itself returns a "thenable" object that can be awaited
      // to get the Promise<PostgrestSingleResponse<ProfileData>>
      const profileQuery = supabase
        .from("profiles")
        .select("*") // You can be more specific with columns if needed
        .eq("id", user.id)
        .single<ProfileData>(); // Specify the expected shape of a single profile

      // Now, pass the actual promise (by awaiting profileQuery inside promiseWithTimeout, or let promiseWithTimeout handle it)
      // It's better to let promiseWithTimeout take the promise directly.
      // The key is that profileQuery is already a "Promise-like" object (thenable).
      // The type of `profileQuery` is PostgrestBuilder, which is Thenable.
      // So, `promiseWithTimeout` should correctly handle it if its signature accepts Thenable<T>.
      // Let's adjust promiseWithTimeout slightly or cast if needed, but usually it works.
      // The error you got suggests `promiseWithTimeout` is strictly typed for `Promise<T>`.
      // The most straightforward way is to await it first to get the actual response object,
      // but then the timeout applies to nothing.

      // CORRECTED APPROACH:
      // The `profileQuery` is "thenable". The `promiseWithTimeout` should ideally accept `PromiseLike<T>`.
      // If it only accepts `Promise<T>`, we can wrap the execution.
      // However, the simplest fix is to ensure the `promiseWithTimeout` function receives a real Promise.
      // The builder itself resolves to the response object.

      // const supabaseResponsePromise: Promise<PostgrestSingleResponse<ProfileData>> = profileQuery; // This assignment is fine as PostgrestBuilder is Thenable

       const response: PostgrestSingleResponse<ProfileData> = await promiseWithTimeout(
        // Wrap the execution of the Supabase query in a new Promise
        // or an async IIFE that returns the promise from the query.
        // The query builder itself becomes a promise when awaited or .then() is called.
        (async () => {
            return profileQuery; // When profileQuery is returned from an async function,
                                 // and then awaited by promiseWithTimeout, it works.
                                 // The PostgrestBuilder is "thenable".
        })(), // Immediately invoke the async function
        7000,
        `Fetching profile for user ${user.id} timed out after 7s`
      );

      // const { data: profile, error } = response;
      // const response: PostgrestSingleResponse<ProfileData> = await promiseWithTimeout(
      //   supabaseResponsePromise, // Pass the actual promise from the query
      //   7000,
      //   `Fetching profile for user ${user.id} timed out after 7s`
      // );

      const { data: profile, error } = response; // Destructure from the resolved response

      console.log(`[AuthProvider] convertToUserProfile: Profile query finished for user ${userIdForLog}`, { profile, error });

      if (error) {
        if (error.code !== 'PGRST116' && !error.message?.includes('timed out')) { // PGRST116: "Searched for a single row, but found no rows"
          console.error(`[AuthProvider] convertToUserProfile: Error fetching profile for user ${userIdForLog}:`, error);
        } else if (error.message?.includes('timed out')) {
          console.warn(`[AuthProvider] convertToUserProfile: Profile fetch timed out for user ${userIdForLog}. Using defaults.`);
        }
      }

      return {
        id: user.id,
        username: profile?.username || user.email?.split("@")[0] || "User",
        email: user.email || "",
        rank: profile?.rank || "Cyber Commander",
        avatar: profile?.avatar || "https://i.pravatar.cc/150?img=68",
        level: profile?.level ?? 1, // Use ?? for nullish coalescing
        completedLevels: profile?.completed_levels || [],
        score: profile?.score ?? 0,
        lastLogin: new Date(profile?.last_login || Date.now()), // Ensure lastLogin is a Date
      };

    } catch (catchAllError: any) {
      console.error(`[AuthProvider] convertToUserProfile: CATCH ALL block for user ${userIdForLog}`, catchAllError);
      return {
        id: user?.id || 'fallback_id',
        username: user?.email?.split("@")[0] || "User (Fallback)",
        email: user?.email || "",
        rank: "Cyber Commander (Fallback)",
        avatar: "https://i.pravatar.cc/150?img=1",
        level: 1,
        completedLevels: [],
        score: 0,
        lastLogin: new Date()
      };
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    const processSession = async (session: Session | null, event?: string) => {
      if (!mounted) {
        console.log("[AuthProvider] processSession: Not mounted, exiting.");
        return;
      }
      const eventUserLog = session?.user?.id || 'no_user';
      console.log(`[AuthProvider] processSession: Event: ${event || 'INITIAL_LOAD'}, User: ${eventUserLog}`);

      if (session?.user) {
        try {
          const userProfile = await convertToUserProfile(session.user);
          if (mounted) {
            setAuthState({
              user: userProfile,
              isAuthenticated: true,
              isLoading: false,
            });
            if (event === 'SIGNED_IN' || (event === undefined && !authState.isAuthenticated)) {
              playSound("startup", 0.3);
            }
          }
        } catch (profileError) {
          console.error(`[AuthProvider] processSession: Error processing profile for ${session.user.id}`, profileError);
          if (mounted) {
            setAuthState({ user: null, isAuthenticated: false, isLoading: false });
          }
        }
      } else {
        if (mounted) {
          setAuthState({ user: null, isAuthenticated: false, isLoading: false });
        }
      }
      console.log(`[AuthProvider] processSession: Handler finished for event: ${event || 'INITIAL_LOAD'}, User: ${eventUserLog}`);
    };
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        await processSession(session, event);
      }
    );

    const initializeAuth = async () => {
        try {
            const { data: { session: initialSess }, error: initialErr } = await supabase.auth.getSession(); // Renamed to avoid conflict
            if (initialErr) {
                console.error("[AuthProvider] initializeAuth: Error getting initial session:", initialErr);
            }
            await processSession(initialSess);
        } catch (initError) {
            console.error("[AuthProvider] initializeAuth: Catch block error:", initError);
            if(mounted) {
                setAuthState({ user: null, isAuthenticated: false, isLoading: false });
            }
        }
    };

    initializeAuth();

    return () => {
      mounted = false;
      if (subscription) {
        subscription.unsubscribe();
        console.log("[AuthProvider] Unsubscribed from onAuthStateChange.");
      }
    };
  }, [convertToUserProfile, authState.isAuthenticated]);

  const login = async (email: string, password: string): Promise<void> => {
    console.log("[AuthProvider] login: Attempting login for:", email);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      console.log("[AuthProvider] login: Supabase signInWithPassword response:", { data, error });
      if (error) {
        console.error("[AuthProvider] login: Error from Supabase:", error);
        playSound("error", 0.5);
        toast.error("Authentication failed", { description: error.message });
        throw error;
      } 
      if (data.user) {
        console.log("[AuthProvider] login: Login successful for user:", data.user.id);
        return
      } else if (!data.session && !data.user) {
        console.warn("[AuthProvider] login: Login call succeeded but no user/session in immediate response. Awaiting onAuthStateChange.");
      }
    } catch (error: any) {
      console.error("[AuthProvider] login: CATCH block error:", error);
      if (!(error instanceof Error && error.message.includes("Authentication failed"))) {
          playSound("error", 0.5);
          toast.error("Login failed", { description: error.message || "Please check your credentials and try again." });
      }
      throw error;
    }
  };

  const signup = async (email: string, password: string, username: string): Promise<void> => {
    console.log("[AuthProvider] signup: Attempting signup for:", email);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { username } },
      });
      console.log("[AuthProvider] signup: Supabase signUp response:", { data, error });
      if (error) {
        console.error("[AuthProvider] signup: Error from Supabase:", error);
        playSound("error", 0.5);
        toast.error("Signup failed", { description: error.message });
        throw error;
      }
      if (data.user) {
        console.log("[AuthProvider] signup: Signup successful for user:", data.user.id);
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
          console.error("[AuthProvider] signup: Profile creation/upsert error:", profileError);
        }
        // playSound("success", 0.5); // SIGNED_IN will handle sound if session is immediate
        toast.success("Account created", { description: data.session ? "Welcome to Cyber Command!" : "Please check your email to verify your account." });
      } else {
        console.warn("[AuthProvider] signup: Signup call succeeded but no user/session in immediate response. Awaiting onAuthStateChange or email verification.");
         toast.info("Signup initiated", { description: "Please check your email to verify your account if required." });
      }
    } catch (error: any) {
      console.error("[AuthProvider] signup: CATCH block error:", error);
      if (!(error instanceof Error && error.message.includes("Signup failed"))) {
          playSound("error", 0.5);
          toast.error("Signup failed", { description: error.message || "An unexpected error occurred. Please try again." });
      }
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    console.log("[AuthProvider] logout: Attempting logout.");
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("[AuthProvider] logout: Error from Supabase:", error);
        toast.error("Logout failed", { description: error.message });
        return; 
      }
      console.log("[AuthProvider] logout: Supabase signOut successful.");
      // playSound("buttonClick", 0.5); // onAuthStateChange handles state, this can be direct
      // toast.success("Logged out", { description: "Session terminated successfully." });
    } catch (error: any) {
      console.error("[AuthProvider] logout: CATCH block error:", error);
      toast.error("Logout failed", { description: error.message || "An unexpected error occurred." });
    }
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};