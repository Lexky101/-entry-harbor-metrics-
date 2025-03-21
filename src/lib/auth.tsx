import React, { createContext, useContext, useState, useEffect } from 'react';
import GoTrue from 'gotrue-js';
import type { GoTrueUser } from 'gotrue-js';

interface AuthContextType {
  user: GoTrueUser | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, fullName: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

// Get the base URL for the current environment
const getBaseUrl = () => {
  if (import.meta.env.DEV) {
    return 'http://localhost:3000';
  }
  return window.location.origin;
};

const auth = new GoTrue({
  APIUrl: `${getBaseUrl()}/.netlify/identity`,
  audience: '',
  setCookie: true,
});

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<GoTrueUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const currentUser = auth.currentUser();
    setUser(currentUser);
    setIsLoading(false);

    const onAuthChange = (user: GoTrueUser | null) => {
      setUser(user);
    };

    // Subscribe to auth changes
    const { data: { subscription } } = auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        onAuthChange(session?.user || null);
      } else if (event === 'SIGNED_OUT') {
        onAuthChange(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await auth.login(email, password, true);
      setUser(response);
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    try {
      const { data, error } = await auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${getBaseUrl()}/dashboard`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        }
      });
      
      if (error) throw error;
    } catch (error) {
      console.error('Error logging in with Google:', error);
      throw error;
    }
  };

  const signup = async (email: string, password: string, fullName: string) => {
    try {
      const response = await auth.signup(email, password, {
        full_name: fullName,
      });
      setUser(response);
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await auth.currentUser()?.logout();
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, loginWithGoogle, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 