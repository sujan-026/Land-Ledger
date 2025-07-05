import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/layout/Header';

export default function SecondaryDesk() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Secondary Trading Desk</h1>
          <Card>
            <CardHeader>
              <CardTitle>🏗️ Coming Soon</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Secondary trading market for tokenized real estate</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}