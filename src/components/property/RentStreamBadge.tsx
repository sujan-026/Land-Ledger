import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface RentStreamBadgeProps {
  amount: number;
  period: 'monthly' | 'quarterly' | 'annual';
  status: 'active' | 'pending' | 'paused';
  className?: string;
}

export function RentStreamBadge({ amount, period, status, className }: RentStreamBadgeProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'active':
        return 'bg-rent-positive text-white';
      case 'pending':
        return 'bg-rent-neutral text-warning-foreground';
      case 'paused':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusText = () => {
    switch (status) {
      case 'active':
        return '🟢 Active';
      case 'pending':
        return '🟡 Pending';
      case 'paused':
        return '⏸️ Paused';
      default:
        return status;
    }
  };

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <Badge className={getStatusColor()}>
        {formatAmount(amount)} / {period}
      </Badge>
      <p className="text-xs text-muted-foreground">
        {getStatusText()} rent stream
      </p>
    </div>
  );
}