import React, { createContext, useContext, useState, useEffect } from 'react';
import { AIInsight, Property } from '@/types';
import { useAuth } from './AuthContext';

interface SuggestionContextType {
  suggestions: AIInsight[];
  smartPicks: Property[];
  isLoading: boolean;
  error: string | null;
  dismissSuggestion: (suggestionId: string) => Promise<void>;
  refreshSuggestions: () => Promise<void>;
  generateSmartPicks: (preferences?: SmartPickPreferences) => Promise<void>;
}

interface SmartPickPreferences {
  riskTolerance: 'low' | 'medium' | 'high';
  investmentRange: [number, number];
  preferredYield: number;
  preferredLocations: string[];
  propertyTypes: string[];
}

const SuggestionContext = createContext<SuggestionContextType | undefined>(undefined);

export function SuggestionProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [suggestions, setSuggestions] = useState<AIInsight[]>([]);
  const [smartPicks, setSmartPicks] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      loadSuggestions();
      generateSmartPicks();
    }
  }, [user]);

  const loadSuggestions = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      // TODO: Fetch AI-generated suggestions from API
      const mockSuggestions: AIInsight[] = [
        {
          id: '1',
          type: 'opportunity',
          title: 'High-Yield Property Available',
          description: 'A new luxury property in Miami is offering 9.2% annual yield - above your target of 8%.',
          confidence: 0.85,
          propertyId: 'prop_miami_001',
          userId: user.id,
          createdAt: new Date(),
          dismissed: false,
        },
        {
          id: '2',
          type: 'suggestion',
          title: 'Diversify Your Portfolio',
          description: 'Consider adding commercial properties to balance your residential holdings.',
          confidence: 0.72,
          userId: user.id,
          createdAt: new Date(),
          dismissed: false,
        },
        {
          id: '3',
          type: 'alert',
          title: 'Market Opportunity',
          description: 'Austin real estate market is experiencing strong growth. Consider increasing allocation.',
          confidence: 0.91,
          userId: user.id,
          createdAt: new Date(),
          dismissed: false,
        }
      ];
      
      setSuggestions(mockSuggestions.filter(s => !s.dismissed));
    } catch (error) {
      setError('Failed to load suggestions');
    } finally {
      setIsLoading(false);
    }
  };

  const generateSmartPicks = async (preferences?: SmartPickPreferences) => {
    setIsLoading(true);
    try {
      // TODO: Generate AI-powered property recommendations
      const mockSmartPicks: Property[] = [
        {
          id: 'smart_pick_1',
          title: 'AI Recommended: Tech Hub Office Complex',
          description: 'High-growth potential in emerging tech district',
          address: '789 Innovation Drive',
          city: 'Denver',
          state: 'CO',
          zipCode: '80202',
          country: 'USA',
          coordinates: { lat: 39.7392, lng: -104.9903 },
          images: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab'],
          totalTokens: 15000,
          tokenPrice: 200,
          soldTokens: 3000,
          monthlyRent: 120000,
          annualYield: 9.1,
          estimatedValue: 3000000,
          tokenStandard: 'ERC-1400',
          partitions: [],
          compliance: {
            regulations: ['SEC Regulation D'],
            restrictions: ['Accredited investors only'],
            disclosures: [],
            riskRating: 'medium',
          },
          status: 'active',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'smart_pick_2',
          title: 'AI Recommended: Luxury Resort Property',
          description: 'Stable income from high-end vacation rental',
          address: '456 Ocean View Blvd',
          city: 'San Diego',
          state: 'CA',
          zipCode: '92101',
          country: 'USA',
          coordinates: { lat: 32.7157, lng: -117.1611 },
          images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00'],
          totalTokens: 25000,
          tokenPrice: 150,
          soldTokens: 8000,
          monthlyRent: 180000,
          annualYield: 8.7,
          estimatedValue: 3750000,
          tokenStandard: 'ERC-1400',
          partitions: [],
          compliance: {
            regulations: ['SEC Regulation D'],
            restrictions: ['Minimum $5,000 investment'],
            disclosures: [],
            riskRating: 'low',
          },
          status: 'active',
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ];
      
      setSmartPicks(mockSmartPicks);
    } catch (error) {
      setError('Failed to generate smart picks');
    } finally {
      setIsLoading(false);
    }
  };

  const dismissSuggestion = async (suggestionId: string) => {
    try {
      // TODO: Mark suggestion as dismissed in API
      setSuggestions(prev => prev.filter(s => s.id !== suggestionId));
    } catch (error) {
      setError('Failed to dismiss suggestion');
    }
  };

  const refreshSuggestions = async () => {
    await Promise.all([
      loadSuggestions(),
      generateSmartPicks()
    ]);
  };

  const value: SuggestionContextType = {
    suggestions,
    smartPicks,
    isLoading,
    error,
    dismissSuggestion,
    refreshSuggestions,
    generateSmartPicks,
  };

  return (
    <SuggestionContext.Provider value={value}>
      {children}
    </SuggestionContext.Provider>
  );
}

export function useSuggestions() {
  const context = useContext(SuggestionContext);
  if (context === undefined) {
    throw new Error('useSuggestions must be used within a SuggestionProvider');
  }
  return context;
}