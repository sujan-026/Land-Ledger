// Core types for LandLedger Web3 Real Estate Platform

export interface User {
  id: string;
  walletAddress?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  kycStatus: KYCStatus;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export type UserRole = 'user' | 'admin' | 'moderator';
export type KYCStatus = 'pending' | 'approved' | 'rejected' | 'not_started';

export interface Property {
  id: string;
  title: string;
  description: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  images: string[];
  video?: string;
  arModel?: string;
  totalTokens: number;
  tokenPrice: number;
  soldTokens: number;
  monthlyRent: number;
  annualYield: number;
  estimatedValue: number;
  tokenStandard: 'ERC-1400' | 'ERC-20';
  partitions: PropertyPartition[];
  compliance: ComplianceInfo;
  escrowAddress?: string;
  status: PropertyStatus;
  createdAt: Date;
  updatedAt: Date;
}

export type PropertyStatus = 'draft' | 'active' | 'sold_out' | 'paused' | 'archived';

export interface PropertyPartition {
  id: string;
  name: string;
  minInvestment: number;
  maxInvestment: number;
  restrictions: string[];
  accreditationRequired: boolean;
}

export interface ComplianceInfo {
  regulations: string[];
  restrictions: string[];
  disclosures: string[];
  riskRating: 'low' | 'medium' | 'high';
}

export interface TokenHolding {
  id: string;
  propertyId: string;
  property: Property;
  userId: string;
  tokenAmount: number;
  purchasePrice: number;
  currentValue: number;
  monthlyRentShare: number;
  purchaseDate: Date;
  partition: string;
}

export interface RentPayment {
  id: string;
  propertyId: string;
  userId: string;
  amount: number;
  period: string;
  paidAt: Date;
  transactionHash: string;
}

export interface TradeOrder {
  id: string;
  propertyId: string;
  userId: string;
  type: 'buy' | 'sell';
  tokenAmount: number;
  pricePerToken: number;
  totalValue: number;
  status: OrderStatus;
  partition?: string;
  expiresAt?: Date;
  createdAt: Date;
}

export type OrderStatus = 'pending' | 'filled' | 'cancelled' | 'expired';

export interface ValuationReport {
  id: string;
  propertyId: string;
  currentValue: number;
  predictedValue: number;
  confidence: number;
  factors: ValuationFactor[];
  comparables: PropertyComparable[];
  generatedAt: Date;
  aiModel: string;
}

export interface ValuationFactor {
  name: string;
  impact: 'positive' | 'negative' | 'neutral';
  weight: number;
  description: string;
}

export interface PropertyComparable {
  address: string;
  distance: number;
  salePrice: number;
  saleDate: Date;
  similarity: number;
}

export interface AIInsight {
  id: string;
  type: 'suggestion' | 'alert' | 'opportunity';
  title: string;
  description: string;
  confidence: number;
  propertyId?: string;
  userId: string;
  createdAt: Date;
  dismissed: boolean;
}

export interface WalletInfo {
  address: string;
  balance: number;
  network: string;
  provider: 'metamask' | 'walletconnect' | 'coinbase';
  connected: boolean;
}

export interface AuthState {
  user: User | null;
  wallet: WalletInfo | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface KYCDocument {
  id: string;
  type: 'passport' | 'drivers_license' | 'utility_bill' | 'bank_statement';
  fileName: string;
  uploadedAt: Date;
  status: 'pending' | 'approved' | 'rejected';
  notes?: string;
}

export interface NotificationPreferences {
  rentPayments: boolean;
  propertyUpdates: boolean;
  tradeAlerts: boolean;
  aiInsights: boolean;
  email: boolean;
  push: boolean;
}

// Filter and search types
export interface PropertyFilters {
  city?: string;
  priceRange?: [number, number];
  yieldRange?: [number, number];
  tokenRange?: [number, number];
  status?: PropertyStatus[];
  propertyType?: string[];
}

export interface SearchParams {
  query?: string;
  filters?: PropertyFilters;
  sortBy?: 'price' | 'yield' | 'created' | 'popularity';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}