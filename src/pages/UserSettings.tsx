import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/layout/Header';

export default function UserSettings() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-8">Account Settings</h1>
        <Card>
          <CardHeader>
            <CardTitle>⚙️ User Preferences</CardTitle>
          </CardHeader>
          <CardContent>
            <p>KYC, wallet management, and account settings</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}