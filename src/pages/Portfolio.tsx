import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { usePortfolio } from '@/contexts/PortfolioContext';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';

export default function Portfolio() {
  const navigate = useNavigate();
  const { holdings, rentPayments, stats, exportData, refreshPortfolio, isLoading } = usePortfolio();
  const [selectedPeriod, setSelectedPeriod] = useState('all');

  const handleExport = (format: 'csv' | 'pdf') => {
    exportData(format);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Header */}
      <div className="bg-gradient-primary text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-between items-start"
          >
            <div>
              <h1 className="text-4xl font-bold mb-4">My Portfolio</h1>
              <p className="text-xl opacity-90">
                Track your real estate investments and rental income
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                onClick={() => handleExport('csv')}
              >
                📊 Export CSV
              </Button>
              <Button
                variant="secondary"
                onClick={() => handleExport('pdf')}
              >
                📄 Export PDF
              </Button>
              <Button
                variant="outline"
                onClick={refreshPortfolio}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                🔄 Refresh
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Portfolio Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8"
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Portfolio Value
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalValue.toLocaleString()}</div>
              <div className="text-sm text-success">
                +${(stats.unrealizedGains).toLocaleString()} ({((stats.unrealizedGains / stats.totalInvested) * 100).toFixed(1)}%)
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Monthly Rent Income
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">
                ${stats.monthlyRentIncome.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">
                ${(stats.monthlyRentIncome * 12).toLocaleString()}/year
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Average Yield
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.averageYield.toFixed(1)}%</div>
              <div className="text-sm text-muted-foreground">Annual percentage yield</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Properties Owned
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.propertyCount}</div>
              <div className="text-sm text-muted-foreground">
                {stats.tokenCount} total tokens
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="holdings" className="space-y-6">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="holdings">Holdings</TabsTrigger>
              <TabsTrigger value="rent-payments">Rent Payments</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="1y">Last Year</SelectItem>
                <SelectItem value="6m">Last 6 Months</SelectItem>
                <SelectItem value="3m">Last 3 Months</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <TabsContent value="holdings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Property Holdings</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Property</TableHead>
                      <TableHead>Tokens Owned</TableHead>
                      <TableHead>Purchase Price</TableHead>
                      <TableHead>Current Value</TableHead>
                      <TableHead>Monthly Rent</TableHead>
                      <TableHead>Yield</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {holdings.map((holding) => (
                      <TableRow key={holding.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <img
                              src={holding.property.images[0]}
                              alt={holding.property.title}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div>
                              <div className="font-medium">{holding.property.title}</div>
                              <div className="text-sm text-muted-foreground">
                                {holding.property.city}, {holding.property.state}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {holding.tokenAmount} tokens
                          </Badge>
                        </TableCell>
                        <TableCell>${holding.purchasePrice.toLocaleString()}</TableCell>
                        <TableCell>
                          <div className="font-medium">${holding.currentValue.toLocaleString()}</div>
                          <div className="text-sm text-success">
                            +${(holding.currentValue - holding.purchasePrice).toLocaleString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium text-success">
                            ${holding.monthlyRentShare.toLocaleString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className="yield-badge-high">
                            {holding.property.annualYield}%
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => navigate(`/properties/${holding.propertyId}`)}
                            >
                              View
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => navigate('/trade')}
                            >
                              Trade
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rent-payments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Rent Payment History</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Property</TableHead>
                      <TableHead>Period</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date Paid</TableHead>
                      <TableHead>Transaction</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rentPayments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell>
                          <div className="font-medium">Property #{payment.propertyId}</div>
                        </TableCell>
                        <TableCell>{payment.period}</TableCell>
                        <TableCell>
                          <div className="font-medium text-success">
                            ${payment.amount.toLocaleString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          {new Date(payment.paidAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="p-0 h-auto text-primary"
                            onClick={() => window.open(`https://etherscan.io/tx/${payment.transactionHash}`, '_blank')}
                          >
                            {payment.transactionHash.slice(0, 10)}...
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Portfolio Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-muted/30 rounded-lg">
                    <div className="text-center text-muted-foreground">
                      <div className="text-4xl mb-2">📈</div>
                      <p>Performance chart would be here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Rent Income Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-muted/30 rounded-lg">
                    <div className="text-center text-muted-foreground">
                      <div className="text-4xl mb-2">💰</div>
                      <p>Rent income chart would be here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Property Allocation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {holdings.map((holding, index) => {
                      const percentage = (holding.currentValue / stats.totalValue) * 100;
                      return (
                        <div key={holding.id} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>{holding.property.title}</span>
                            <span>{percentage.toFixed(1)}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full transition-all"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Investment Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Total Invested</span>
                      <span className="font-semibold">${stats.totalInvested.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Current Value</span>
                      <span className="font-semibold">${stats.totalValue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Unrealized Gains</span>
                      <span className="font-semibold text-success">
                        ${stats.unrealizedGains.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Return</span>
                      <span className="font-semibold text-success">
                        {((stats.unrealizedGains / stats.totalInvested) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Empty State */}
        {holdings.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🏢</div>
            <h3 className="text-xl font-semibold mb-2">No Investments Yet</h3>
            <p className="text-muted-foreground mb-6">
              Start building your real estate portfolio today
            </p>
            <Button onClick={() => navigate('/properties')}>
              Explore Properties
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}