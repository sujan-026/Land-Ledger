import React, { createContext, useContext, useState, useEffect } from 'react';
import { KYCStatus, KYCDocument } from '@/types';
import { useAuth } from './AuthContext';

interface KYCContextType {
  kycStatus: KYCStatus;
  documents: KYCDocument[];
  isLoading: boolean;
  error: string | null;
  uploadDocument: (file: File, type: KYCDocument['type']) => Promise<void>;
  deleteDocument: (documentId: string) => Promise<void>;
  submitForReview: () => Promise<void>;
  checkRequirements: () => boolean;
}

const KYCContext = createContext<KYCContextType | undefined>(undefined);

export function KYCProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [kycStatus, setKycStatus] = useState<KYCStatus>('not_started');
  const [documents, setDocuments] = useState<KYCDocument[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setKycStatus(user.kycStatus);
      loadDocuments();
    }
  }, [user]);

  const loadDocuments = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      // TODO: Fetch user's KYC documents from API
      const mockDocuments: KYCDocument[] = [
        {
          id: '1',
          type: 'passport',
          fileName: 'passport.pdf',
          uploadedAt: new Date(),
          status: 'approved',
        }
      ];
      setDocuments(mockDocuments);
    } catch (error) {
      setError('Failed to load documents');
    } finally {
      setIsLoading(false);
    }
  };

  const uploadDocument = async (file: File, type: KYCDocument['type']) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // TODO: Upload document to secure storage
      const newDocument: KYCDocument = {
        id: Date.now().toString(),
        type,
        fileName: file.name,
        uploadedAt: new Date(),
        status: 'pending',
      };
      
      setDocuments(prev => [...prev, newDocument]);
      
      // Auto-update status if we have required documents
      if (checkRequirements()) {
        setKycStatus('pending');
      }
    } catch (error) {
      setError('Failed to upload document');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteDocument = async (documentId: string) => {
    try {
      // TODO: Delete document from storage
      setDocuments(prev => prev.filter(doc => doc.id !== documentId));
    } catch (error) {
      setError('Failed to delete document');
    }
  };

  const submitForReview = async () => {
    if (!checkRequirements()) {
      setError('Please upload all required documents');
      return;
    }
    
    setIsLoading(true);
    try {
      // TODO: Submit KYC for review
      setKycStatus('pending');
    } catch (error) {
      setError('Failed to submit for review');
    } finally {
      setIsLoading(false);
    }
  };

  const checkRequirements = (): boolean => {
    // Check if user has uploaded required documents
    const hasIdDocument = documents.some(doc => 
      ['passport', 'drivers_license'].includes(doc.type)
    );
    const hasAddressProof = documents.some(doc => 
      ['utility_bill', 'bank_statement'].includes(doc.type)
    );
    
    return hasIdDocument && hasAddressProof;
  };

  const value: KYCContextType = {
    kycStatus,
    documents,
    isLoading,
    error,
    uploadDocument,
    deleteDocument,
    submitForReview,
    checkRequirements,
  };

  return (
    <KYCContext.Provider value={value}>
      {children}
    </KYCContext.Provider>
  );
}

export function useKYC() {
  const context = useContext(KYCContext);
  if (context === undefined) {
    throw new Error('useKYC must be used within a KYCProvider');
  }
  return context;
}