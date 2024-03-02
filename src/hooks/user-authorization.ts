import { useState } from 'react';

type AuthState = {
  isAuthenticated: boolean;
  userId: string | null;
}

export const useAuth = (): [AuthState, (usedId: string | null) => void, () => void] => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    userId: null
  });

  const login = (userId: string | null) => {
    setAuthState((prevState) => ({
      ...prevState,
      isAuthenticated: true,
      userId
    }));
  };

  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      userId: null
    });
  };

  return [authState, login, logout];
};
