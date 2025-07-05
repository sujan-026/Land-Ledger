import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useKYC } from '@/contexts/KYCContext';
import { UserRole } from '@/types';

interface RouteGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireKYC?: boolean;
  requiredRole?: UserRole;
  redirectTo?: string;
}

export function RouteGuard({
  children,
  requireAuth = false,
  requireKYC = false,
  requiredRole,
  redirectTo = '/auth'
}: RouteGuardProps) {
  const { isAuthenticated, user } = useAuth();
  const { kycStatus } = useKYC();
  const location = useLocation();

  // Check authentication
  if (requireAuth && !isAuthenticated) {
    return (
      <Navigate 
        to={redirectTo} 
        state={{ from: location.pathname }} 
        replace 
      />
    );
  }

  // Check KYC status
  if (requireKYC && kycStatus !== 'approved') {
    return (
      <Navigate 
        to="/account/kyc" 
        state={{ from: location.pathname }} 
        replace 
      />
    );
  }

  // Check user role
  if (requiredRole && user?.role !== requiredRole) {
    if (requiredRole === 'admin' && user?.role !== 'admin') {
      return (
        <Navigate 
          to="/unauthorized" 
          state={{ from: location.pathname }} 
          replace 
        />
      );
    }
  }

  return <>{children}</>;
}