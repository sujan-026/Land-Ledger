import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface TokenTagProps {
  type: 'ERC-1400' | 'ERC-20';
  partition?: string;
  className?: string;
}

export function TokenTag({ type, partition, className }: TokenTagProps) {
  const getVariant = () => {
    switch (type) {
      case 'ERC-1400':
        return 'default';
      case 'ERC-20':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const getDescription = () => {
    switch (type) {
      case 'ERC-1400':
        return 'Security Token with transfer restrictions';
      case 'ERC-20':
        return 'Standard utility token';
      default:
        return 'Token standard';
    }
  };

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <Badge variant={getVariant()} className="w-fit">
        {type}
        {partition && ` • ${partition}`}
      </Badge>
      <p className="text-xs text-muted-foreground">
        {getDescription()}
      </p>
    </div>
  );
}