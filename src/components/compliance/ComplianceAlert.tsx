import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ComplianceInfo } from '@/types';
import { cn } from '@/lib/utils';

interface ComplianceAlertProps {
  compliance: ComplianceInfo;
  className?: string;
  showActions?: boolean;
  onViewDetails?: () => void;
}

export function ComplianceAlert({ 
  compliance, 
  className, 
  showActions = false,
  onViewDetails 
}: ComplianceAlertProps) {
  const getRiskColor = (rating: ComplianceInfo['riskRating']) => {
    switch (rating) {
      case 'low':
        return 'text-success';
      case 'medium':
        return 'text-warning';
      case 'high':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  const getRiskIcon = (rating: ComplianceInfo['riskRating']) => {
    switch (rating) {
      case 'low':
        return '🟢';
      case 'medium':
        return '🟡';
      case 'high':
        return '🔴';
      default:
        return '⚪';
    }
  };

  return (
    <Alert className={cn('border-l-4 border-l-primary', className)}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <AlertTitle className="flex items-center gap-2">
            Compliance Information
            <Badge variant="outline" className={getRiskColor(compliance.riskRating)}>
              {getRiskIcon(compliance.riskRating)} {compliance.riskRating.toUpperCase()} RISK
            </Badge>
          </AlertTitle>
          
          <AlertDescription className="mt-2 space-y-2">
            {compliance.regulations.length > 0 && (
              <div>
                <p className="font-medium text-sm">Regulations:</p>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                  {compliance.regulations.map((reg, index) => (
                    <li key={index}>{reg}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {compliance.restrictions.length > 0 && (
              <div>
                <p className="font-medium text-sm">Restrictions:</p>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                  {compliance.restrictions.map((restriction, index) => (
                    <li key={index}>{restriction}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {compliance.disclosures.length > 0 && (
              <div>
                <p className="font-medium text-sm">Important Disclosures:</p>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                  {compliance.disclosures.map((disclosure, index) => (
                    <li key={index}>{disclosure}</li>
                  ))}
                </ul>
              </div>
            )}
          </AlertDescription>
        </div>
        
        {showActions && onViewDetails && (
          <Button
            variant="outline"
            size="sm"
            onClick={onViewDetails}
            className="ml-4"
          >
            View Details
          </Button>
        )}
      </div>
    </Alert>
  );
}