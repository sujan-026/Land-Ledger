import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AuthState, User, WalletInfo } from '@/types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  loginWithWallet: (walletAddress: string, signature: string) => Promise<void>;
  logout: () => Promise<void>;
  connectWallet: (provider: 'metamask' | 'walletconnect' | 'coinbase') => Promise<void>;
  disconnectWallet: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
}

type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: { user: User; wallet?: WalletInfo } }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'WALLET_CONNECTED'; payload: WalletInfo }
  | { type: 'WALLET_DISCONNECTED' }
  | { type: 'UPDATE_USER'; payload: Partial<User> };

const initialState: AuthState = {
  user: null,
  wallet: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, isLoading: true, error: null };
    
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        wallet: action.payload.wallet || state.wallet,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    
    case 'LOGIN_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        isAuthenticated: false,
        user: null,
      };
    
    case 'LOGOUT':
      return {
        ...initialState,
      };
    
    case 'WALLET_CONNECTED':
      return {
        ...state,
        wallet: action.payload,
      };
    
    case 'WALLET_DISCONNECTED':
      return {
        ...state,
        wallet: null,
      };
    
    case 'UPDATE_USER':
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null,
      };
    
    default:
      return state;
  }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Mock implementations - replace with actual Web3 and API calls
  const login = async (email: string, password: string) => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      // TODO: Implement actual login API call
      const mockUser: User = {
        id: '1',
        email,
        firstName: 'John',
        lastName: 'Doe',
        kycStatus: 'approved',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      dispatch({ type: 'LOGIN_SUCCESS', payload: { user: mockUser } });
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: 'Login failed' });
    }
  };

  const loginWithWallet = async (walletAddress: string, signature: string) => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      // TODO: Implement wallet authentication
      const mockUser: User = {
        id: '1',
        walletAddress,
        kycStatus: 'approved',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      const mockWallet: WalletInfo = {
        address: walletAddress,
        balance: 1.5, // ETH balance
        network: 'ethereum',
        provider: 'metamask',
        connected: true,
      };

      dispatch({ 
        type: 'LOGIN_SUCCESS', 
        payload: { user: mockUser, wallet: mockWallet } 
      });
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: 'Wallet authentication failed' });
    }
  };

  const logout = async () => {
    // TODO: Clear tokens, disconnect wallet
    dispatch({ type: 'LOGOUT' });
  };

  const connectWallet = async (provider: 'metamask' | 'walletconnect' | 'coinbase') => {
    try {
      // TODO: Implement actual wallet connection
      const mockWallet: WalletInfo = {
        address: '0x742d35Cc6634C0532925a3b8D404d9C3C6EE5b40',
        balance: 1.5,
        network: 'ethereum',
        provider,
        connected: true,
      };
      
      dispatch({ type: 'WALLET_CONNECTED', payload: mockWallet });
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  const disconnectWallet = async () => {
    dispatch({ type: 'WALLET_DISCONNECTED' });
  };

  const updateProfile = async (updates: Partial<User>) => {
    try {
      // TODO: Implement profile update API call
      dispatch({ type: 'UPDATE_USER', payload: updates });
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  // Check for existing session on mount
  useEffect(() => {
    const checkExistingSession = async () => {
      // TODO: Check for stored tokens or wallet connection
    };
    
    checkExistingSession();
  }, []);

  const value: AuthContextType = {
    ...state,
    login,
    loginWithWallet,
    logout,
    connectWallet,
    disconnectWallet,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
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