import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import { usePortfolio } from '@/contexts/PortfolioContext';
import { Header } from '@/components/layout/Header';

export default function Dashboard() {
  const navigate = useNavigate();
  const { stats } = usePortfolio();
  
  // Mock dashboard data
  const dashboardStats = {
    totalInvestment: 125000,
    currentValue: 132500,
    totalReturn: 7500,
    returnPercentage: 6.0,
    monthlyIncome: 2400,
    propertiesOwned: 8,
    averageYield: 8.2,
    nextPayment: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
  };

  const recentActivity = [
    {
      id: 1,
      type: 'income',
      description: 'Monthly rent payment received',
      amount: 425.50,
      property: 'Luxury Apartment Complex - Miami',
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
    {
      id: 2,
      type: 'purchase',
      description: 'Purchased 50 tokens',
      amount: -5000,
      property: 'Commercial Office Building - Austin',
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    },
    {
      id: 3,
      type: 'income',
      description: 'Monthly rent payment received',
      amount: 320.75,
      property: 'Resort Property - San Diego',
      date: new Date(Date.now() - 32 * 24 * 60 * 60 * 1000),
    },
  ];

  const topPerformers = [
    {
      id: 'prop1',
      name: 'Luxury Apartment Complex - Miami',
      yield: 9.2,
      value: 45000,
      change: 5.2,
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00',
    },
    {
      id: 'prop2',
      name: 'Commercial Office Building - Austin', 
      yield: 8.8,
      value: 35000,
      change: 3.1,
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab',
    },
    {
      id: 'prop3',
      name: 'Resort Property - San Diego',
      yield: 7.5,
      value: 28000,
      change: 2.8,
      image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold">Investment Dashboard</h1>
              <p className="text-muted-foreground">
                Track your real estate portfolio performance
              </p>
            </div>
            <Button onClick={() => navigate('/properties')}>
              Explore More Properties
            </Button>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Investment</CardTitle>
                <span className="text-2xl">💰</span>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${dashboardStats.totalInvestment.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  Across {dashboardStats.propertiesOwned} properties
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Current Value</CardTitle>
                <span className="text-2xl">📈</span>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${dashboardStats.currentValue.toLocaleString()}
                </div>
                <p className="text-xs text-success">
                  +${dashboardStats.totalReturn.toLocaleString()} ({dashboardStats.returnPercentage}%)
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monthly Income</CardTitle>
                <span className="text-2xl">💸</span>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${dashboardStats.monthlyIncome.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  {dashboardStats.averageYield}% average yield
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Next Payment</CardTitle>
                <span className="text-2xl">📅</span>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.ceil((dashboardStats.nextPayment.getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days
                </div>
                <p className="text-xs text-muted-foreground">
                  Est. ${(dashboardStats.monthlyIncome * 0.9).toFixed(0)}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Portfolio Performance Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Portfolio Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    📊 Interactive chart showing portfolio value over time
                    <br />
                    (Chart component would be implemented here)
                  </div>
                </CardContent>
              </Card>

              {/* Top Performing Properties */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Properties</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {topPerformers.map((property, index) => (
                    <motion.div
                      key={property.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
                      onClick={() => navigate(`/properties/${property.id}`)}
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={property.image}
                          alt={property.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-medium">{property.name}</p>
                          <p className="text-sm text-muted-foreground">
                            ${property.value.toLocaleString()} invested
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className="yield-badge-high mb-1">
                          {property.yield}% APY
                        </Badge>
                        <p className="text-sm text-success">
                          +{property.change}%
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => navigate('/properties')}
                  >
                    🏢 Browse Properties
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => navigate('/account/portfolio')}
                  >
                    📊 View Full Portfolio
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => navigate('/trade')}
                  >
                    💱 Secondary Trading
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => navigate('/wishlist')}
                  >
                    ❤️ View Wishlist
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        activity.type === 'income' ? 'bg-success' : 'bg-primary'
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.description}</p>
                        <p className="text-xs text-muted-foreground">
                          {activity.property}
                        </p>
                        <div className="flex items-center justify-between mt-1">
                          <span className={`text-sm font-semibold ${
                            activity.amount > 0 ? 'text-success' : 'text-muted-foreground'
                          }`}>
                            {activity.amount > 0 ? '+' : ''}${Math.abs(activity.amount).toLocaleString()}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {activity.date.toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Investment Goals */}
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Goal</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Income Target</span>
                      <span>$2,400 / $3,000</span>
                    </div>
                    <Progress value={80} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      $600 to reach monthly goal
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}