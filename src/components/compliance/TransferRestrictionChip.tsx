import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface TransferRestrictionChipProps {
  restrictions: string[];
  className?: string;
  detailed?: boolean;
}

export function TransferRestrictionChip({ 
  restrictions, 
  className, 
  detailed = false 
}: TransferRestrictionChipProps) {
  const getRestrictionLevel = () => {
    if (restrictions.length === 0) return 'none';
    if (restrictions.length <= 2) return 'low';
    if (restrictions.length <= 4) return 'medium';
    return 'high';
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'none':
        return 'bg-success text-success-foreground';
      case 'low':
        return 'bg-success text-success-foreground';
      case 'medium':
        return 'bg-warning text-warning-foreground';
      case 'high':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getLevelText = (level: string) => {
    switch (level) {
      case 'none':
        return '🟢 No Restrictions';
      case 'low':
        return '🟡 Limited';
      case 'medium':
        return '🟠 Restricted';
      case 'high':
        return '🔴 Highly Restricted';
      default:
        return 'Unknown';
    }
  };

  const level = getRestrictionLevel();

  if (detailed && restrictions.length > 0) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className={className}>
            <Badge className={cn(getLevelColor(level), 'mr-2')}>
              {getLevelText(level)}
            </Badge>
            View Details
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="space-y-3">
            <h4 className="font-semibold">Transfer Restrictions</h4>
            <div className="space-y-2">
              {restrictions.map((restriction, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="text-destructive text-sm">•</span>
                  <p className="text-sm text-muted-foreground">{restriction}</p>
                </div>
              ))}
            </div>
            <div className="pt-2 border-t">
              <p className="text-xs text-muted-foreground">
                These restrictions apply to all token transfers for compliance purposes.
              </p>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Badge className={cn(getLevelColor(level), className)}>
      {getLevelText(level)}
    </Badge>
  );
}