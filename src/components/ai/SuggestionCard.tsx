import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AIInsight } from '@/types';
import { cn } from '@/lib/utils';

interface SuggestionCardProps {
  suggestion: AIInsight;
  onDismiss: (id: string) => void;
  onViewProperty?: (propertyId: string) => void;
  className?: string;
}

export function SuggestionCard({ 
  suggestion, 
  onDismiss, 
  onViewProperty, 
  className 
}: SuggestionCardProps) {
  const getTypeIcon = (type: AIInsight['type']) => {
    switch (type) {
      case 'opportunity':
        return '💡';
      case 'suggestion':
        return '🎯';
      case 'alert':
        return '⚠️';
      default:
        return '💭';
    }
  };

  const getTypeColor = (type: AIInsight['type']) => {
    switch (type) {
      case 'opportunity':
        return 'bg-success text-success-foreground';
      case 'suggestion':
        return 'bg-primary text-primary-foreground';
      case 'alert':
        return 'bg-warning text-warning-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-success';
    if (confidence >= 0.6) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.02 }}
      className={className}
    >
      <Card className="crypto-card">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">{getTypeIcon(suggestion.type)}</span>
              <Badge className={getTypeColor(suggestion.type)}>
                {suggestion.type.toUpperCase()}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Badge 
                variant="outline" 
                className={cn('text-xs', getConfidenceColor(suggestion.confidence))}
              >
                {Math.round(suggestion.confidence * 100)}% confidence
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDismiss(suggestion.id)}
                className="h-6 w-6 p-0 hover:bg-destructive/10"
              >
                ✕
              </Button>
            </div>
          </div>
          <CardTitle className="text-lg">{suggestion.title}</CardTitle>
        </CardHeader>
        
        <CardContent>
          <p className="text-muted-foreground mb-4">
            {suggestion.description}
          </p>
          
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              {new Date(suggestion.createdAt).toLocaleDateString()}
            </p>
            
            {suggestion.propertyId && onViewProperty && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onViewProperty(suggestion.propertyId!)}
                className="interactive-scale"
              >
                View Property
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}