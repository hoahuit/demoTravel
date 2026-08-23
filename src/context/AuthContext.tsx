import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import {
  AuthUser,
  getStoredToken,
  getStoredUser,
  setAuthSession,
  clearAuthSession,
  loginApi,
  getMeApi,
  hasSectionPermission,
  UserRole,
} from '../services/authService';

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (usernameOrEmail: string, password: string) => Promise<AuthUser>;
  logout: () => void;
  canAccess: (sectionId: string) => boolean;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => getStoredUser());
  const [token, setToken] = useState<string | null>(() => getStoredToken());
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Validate and refresh profile with backend on initial mount
  const verifySession = useCallback(async () => {
    const activeToken = getStoredToken();
    if (!activeToken) {
      setUser(null);
      setToken(null);
      setIsLoading(false);
      return;
    }

    try {
      const freshUser = await getMeApi();
      setUser(freshUser);
      setToken(activeToken);
    } catch {
      // Token expired or invalid
      clearAuthSession();
      setUser(null);
      setToken(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    verifySession();
  }, [verifySession]);

  const login = async (usernameOrEmail: string, password: string): Promise<AuthUser> => {
    setIsLoading(true);
    try {
      const result = await loginApi(usernameOrEmail, password);
      setUser(result.user);
      setToken(result.token);
      setAuthSession(result.token, result.user);
      return result.user;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    clearAuthSession();
    setUser(null);
    setToken(null);
  };

  const canAccess = useCallback(
    (sectionId: string): boolean => {
      if (!user) return false;
      return hasSectionPermission(user.role, sectionId);
    },
    [user],
  );

  const refreshProfile = async () => {
    await verifySession();
  };

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: Boolean(user && token),
    isLoading,
    login,
    logout,
    canAccess,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
