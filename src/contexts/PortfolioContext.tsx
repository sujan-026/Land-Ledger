import React, { createContext, useContext, useState, useEffect } from 'react';
import { TokenHolding, RentPayment, Property } from '@/types';
import { useAuth } from './AuthContext';

interface PortfolioStats {
  totalValue: number;
  totalInvested: number;
  unrealizedGains: number;
  monthlyRentIncome: number;
  averageYield: number;
  propertyCount: number;
  tokenCount: number;
}

interface PortfolioContextType {
  holdings: TokenHolding[];
  rentPayments: RentPayment[];
  stats: PortfolioStats;
  isLoading: boolean;
  error: string | null;
  refreshPortfolio: () => Promise<void>;
  exportData: (format: 'csv' | 'pdf') => Promise<void>;
  filterHoldings: (filters: HoldingFilters) => TokenHolding[];
}

interface HoldingFilters {
  propertyId?: string;
  yieldRange?: [number, number];
  valueRange?: [number, number];
  dateRange?: [Date, Date];
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [holdings, setHoldings] = useState<TokenHolding[]>([]);
  const [rentPayments, setRentPayments] = useState<RentPayment[]>([]);
  const [stats, setStats] = useState<PortfolioStats>({
    totalValue: 0,
    totalInvested: 0,
    unrealizedGains: 0,
    monthlyRentIncome: 0,
    averageYield: 0,
    propertyCount: 0,
    tokenCount: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      loadPortfolioData();
    }
  }, [user]);

  const loadPortfolioData = async () => {
    if (!user) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // TODO: Fetch portfolio data from API/blockchain
      const mockHoldings: TokenHolding[] = [
        {
          id: '1',
          propertyId: 'prop1',
          property: {
            id: 'prop1',
            title: 'Luxury Apartment Complex - Downtown Miami',
            description: 'Modern luxury apartment complex',
            address: '123 Biscayne Blvd',
            city: 'Miami',
            state: 'FL',
            zipCode: '33132',
            country: 'USA',
            coordinates: { lat: 25.7617, lng: -80.1918 },
            images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00'],
            totalTokens: 10000,
            tokenPrice: 100,
            soldTokens: 7500,
            monthlyRent: 75000,
            annualYield: 8.5,
            estimatedValue: 1000000,
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
          } as Property,
          userId: user.id,
          tokenAmount: 50,
          purchasePrice: 5000,
          currentValue: 5250,
          monthlyRentShare: 375,
          purchaseDate: new Date('2024-01-15'),
          partition: 'standard',
        },
        {
          id: '2',
          propertyId: 'prop2',
          property: {
            id: 'prop2',
            title: 'Commercial Office Building - Austin',
            description: 'Premium office space in tech district',
            address: '456 Congress Ave',
            city: 'Austin',
            state: 'TX',
            zipCode: '78701',
            country: 'USA',
            coordinates: { lat: 30.2672, lng: -97.7431 },
            images: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab'],
            totalTokens: 20000,
            tokenPrice: 250,
            soldTokens: 15000,
            monthlyRent: 150000,
            annualYield: 7.2,
            estimatedValue: 5000000,
            tokenStandard: 'ERC-1400',
            partitions: [],
            compliance: {
              regulations: ['SEC Regulation D'],
              restrictions: ['Minimum $10,000 investment'],
              disclosures: [],
              riskRating: 'low',
            },
            status: 'active',
            createdAt: new Date(),
            updatedAt: new Date(),
          } as Property,
          userId: user.id,
          tokenAmount: 20,
          purchasePrice: 5000,
          currentValue: 5400,
          monthlyRentShare: 150,
          purchaseDate: new Date('2024-02-20'),
          partition: 'premium',
        }
      ];

      const mockRentPayments: RentPayment[] = [
        {
          id: '1',
          propertyId: 'prop1',
          userId: user.id,
          amount: 375,
          period: '2024-03',
          paidAt: new Date('2024-03-01'),
          transactionHash: '0x123...abc',
        },
        {
          id: '2',
          propertyId: 'prop2',
          userId: user.id,
          amount: 150,
          period: '2024-03',
          paidAt: new Date('2024-03-01'),
          transactionHash: '0x456...def',
        }
      ];

      setHoldings(mockHoldings);
      setRentPayments(mockRentPayments);
      
      // Calculate portfolio stats
      const totalValue = mockHoldings.reduce((sum, h) => sum + h.currentValue, 0);
      const totalInvested = mockHoldings.reduce((sum, h) => sum + h.purchasePrice, 0);
      const monthlyRentIncome = mockHoldings.reduce((sum, h) => sum + h.monthlyRentShare, 0);
      const averageYield = mockHoldings.reduce((sum, h) => sum + h.property.annualYield, 0) / mockHoldings.length;
      
      setStats({
        totalValue,
        totalInvested,
        unrealizedGains: totalValue - totalInvested,
        monthlyRentIncome,
        averageYield,
        propertyCount: mockHoldings.length,
        tokenCount: mockHoldings.reduce((sum, h) => sum + h.tokenAmount, 0),
      });
      
    } catch (error) {
      setError('Failed to load portfolio data');
    } finally {
      setIsLoading(false);
    }
  };

  const refreshPortfolio = async () => {
    await loadPortfolioData();
  };

  const exportData = async (format: 'csv' | 'pdf') => {
    try {
      // TODO: Generate and download portfolio export
      console.log(`Exporting portfolio data as ${format}`);
    } catch (error) {
      setError(`Failed to export data as ${format}`);
    }
  };

  const filterHoldings = (filters: HoldingFilters): TokenHolding[] => {
    return holdings.filter(holding => {
      if (filters.propertyId && holding.propertyId !== filters.propertyId) {
        return false;
      }
      
      if (filters.yieldRange) {
        const yield_ = holding.property.annualYield;
        if (yield_ < filters.yieldRange[0] || yield_ > filters.yieldRange[1]) {
          return false;
        }
      }
      
      if (filters.valueRange) {
        if (holding.currentValue < filters.valueRange[0] || holding.currentValue > filters.valueRange[1]) {
          return false;
        }
      }
      
      if (filters.dateRange) {
        if (holding.purchaseDate < filters.dateRange[0] || holding.purchaseDate > filters.dateRange[1]) {
          return false;
        }
      }
      
      return true;
    });
  };

  const value: PortfolioContextType = {
    holdings,
    rentPayments,
    stats,
    isLoading,
    error,
    refreshPortfolio,
    exportData,
    filterHoldings,
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}