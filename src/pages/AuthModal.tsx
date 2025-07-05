import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { WalletButton } from '@/components/web3/WalletButton';

export default function AuthModal() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>🔐 Connect to LandLedger</CardTitle>
        </CardHeader>
        <CardContent>
          <WalletButton className="w-full" />
        </CardContent>
      </Card>
    </div>
  );
}