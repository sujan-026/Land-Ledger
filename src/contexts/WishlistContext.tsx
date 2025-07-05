import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Property } from '@/types';
import { useAuth } from './AuthContext';

interface WishlistState {
  items: string[]; // Property IDs
  isLoading: boolean;
  error: string | null;
}

interface WishlistContextType extends WishlistState {
  addToWishlist: (propertyId: string) => void;
  removeFromWishlist: (propertyId: string) => void;
  isInWishlist: (propertyId: string) => boolean;
  clearWishlist: () => void;
  syncGuestWishlist: () => void;
}

type WishlistAction =
  | { type: 'ADD_ITEM'; payload: string }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'SET_WISHLIST'; payload: string[] }
  | { type: 'CLEAR_WISHLIST' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

const initialState: WishlistState = {
  items: [],
  isLoading: false,
  error: null,
};

function wishlistReducer(state: WishlistState, action: WishlistAction): WishlistState {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        items: state.items.includes(action.payload) 
          ? state.items 
          : [...state.items, action.payload],
        error: null,
      };
    
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(id => id !== action.payload),
        error: null,
      };
    
    case 'SET_WISHLIST':
      return {
        ...state,
        items: action.payload,
        error: null,
      };
    
    case 'CLEAR_WISHLIST':
      return {
        ...state,
        items: [],
        error: null,
      };
    
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    
    default:
      return state;
  }
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const GUEST_WISHLIST_KEY = 'landledger_guest_wishlist';

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);
  const { isAuthenticated, user } = useAuth();

  // Load wishlist on component mount
  useEffect(() => {
    if (isAuthenticated && user) {
      // Load user's wishlist from backend (mock)
      loadUserWishlist();
    } else {
      // Load guest wishlist from localStorage
      loadGuestWishlist();
    }
  }, [isAuthenticated, user]);

  const loadGuestWishlist = () => {
    try {
      const guestWishlist = localStorage.getItem(GUEST_WISHLIST_KEY);
      if (guestWishlist) {
        const items = JSON.parse(guestWishlist);
        dispatch({ type: 'SET_WISHLIST', payload: items });
      }
    } catch (error) {
      console.error('Failed to load guest wishlist:', error);
    }
  };

  const saveGuestWishlist = (items: string[]) => {
    try {
      localStorage.setItem(GUEST_WISHLIST_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Failed to save guest wishlist:', error);
    }
  };

  const loadUserWishlist = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      // TODO: Replace with actual API call
      // Simulate loading user's wishlist from backend
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock user wishlist
      const userWishlist = ['prop1', 'prop3']; // Mock data
      dispatch({ type: 'SET_WISHLIST', payload: userWishlist });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load wishlist' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const saveUserWishlist = async (items: string[]) => {
    try {
      // TODO: Replace with actual API call
      // Simulate saving to backend
      await new Promise(resolve => setTimeout(resolve, 200));
      console.log('Wishlist saved to backend:', items);
    } catch (error) {
      console.error('Failed to save wishlist to backend:', error);
    }
  };

  const addToWishlist = (propertyId: string) => {
    dispatch({ type: 'ADD_ITEM', payload: propertyId });
    
    const newItems = state.items.includes(propertyId) 
      ? state.items 
      : [...state.items, propertyId];
    
    if (isAuthenticated) {
      saveUserWishlist(newItems);
    } else {
      saveGuestWishlist(newItems);
    }
  };

  const removeFromWishlist = (propertyId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: propertyId });
    
    const newItems = state.items.filter(id => id !== propertyId);
    
    if (isAuthenticated) {
      saveUserWishlist(newItems);
    } else {
      saveGuestWishlist(newItems);
    }
  };

  const isInWishlist = (propertyId: string) => {
    return state.items.includes(propertyId);
  };

  const clearWishlist = () => {
    dispatch({ type: 'CLEAR_WISHLIST' });
    
    if (isAuthenticated) {
      saveUserWishlist([]);
    } else {
      saveGuestWishlist([]);
    }
  };

  const syncGuestWishlist = async () => {
    if (!isAuthenticated) return;
    
    try {
      const guestWishlist = localStorage.getItem(GUEST_WISHLIST_KEY);
      if (guestWishlist) {
        const guestItems = JSON.parse(guestWishlist);
        const combinedItems = [...new Set([...state.items, ...guestItems])];
        
        dispatch({ type: 'SET_WISHLIST', payload: combinedItems });
        await saveUserWishlist(combinedItems);
        
        // Clear guest wishlist after sync
        localStorage.removeItem(GUEST_WISHLIST_KEY);
      }
    } catch (error) {
      console.error('Failed to sync guest wishlist:', error);
    }
  };

  const value: WishlistContextType = {
    ...state,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist,
    syncGuestWishlist,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}