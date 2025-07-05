import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/layout/Header';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
        <Card>
          <CardHeader>
            <CardTitle>👨‍💼 Management Panel</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Property listings, user management, and analytics</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}