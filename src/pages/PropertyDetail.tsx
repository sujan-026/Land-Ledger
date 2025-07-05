import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { ARViewport } from '@/components/ar/ARViewport';
import { TokenTag } from '@/components/property/TokenTag';
import { RentStreamBadge } from '@/components/property/RentStreamBadge';
import { ComplianceAlert } from '@/components/compliance/ComplianceAlert';
import { TransferRestrictionChip } from '@/components/compliance/TransferRestrictionChip';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Header } from '@/components/layout/Header';

export default function PropertyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [tokenAmount, setTokenAmount] = useState(1);
  const [showARView, setShowARView] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  // Mock property data
  const property = {
    id: id || 'prop1',
    title: 'Luxury Apartment Complex - Downtown Miami',
    description: 'Modern luxury apartment complex in the heart of Miami\'s financial district with premium amenities and guaranteed rental income.',
    address: '123 Biscayne Blvd, Miami, FL 33132',
    city: 'Miami',
    state: 'FL',
    coordinates: { lat: 25.7617, lng: -80.1918 },
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00',
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab'
    ],
    video: 'property-tour-video.mp4',
    totalTokens: 10000,
    tokenPrice: 100,
    soldTokens: 7500,
    monthlyRent: 75000,
    annualYield: 8.5,
    estimatedValue: 1000000,
    tokenStandard: 'ERC-1400' as const,
    compliance: {
      regulations: ['SEC Regulation D', 'State Securities Laws'],
      restrictions: ['Accredited investors only', 'Minimum 12-month holding period'],
      disclosures: ['Property management fees apply', 'Market risk disclaimer'],
      riskRating: 'medium' as const,
    },
    status: 'active' as const,
    propertyDetails: {
      yearBuilt: 2022,
      totalUnits: 120,
      occupancyRate: 95,
      propertyType: 'Residential',
      totalSqFt: 150000,
      parkingSpaces: 150,
      amenities: ['Pool', 'Gym', 'Concierge', 'Rooftop Deck', 'EV Charging']
    }
  };

  const handlePurchase = () => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }

    toast({
      title: 'Purchase Initiated',
      description: `Starting purchase of ${tokenAmount} tokens for $${(tokenAmount * property.tokenPrice).toLocaleString()}`,
    });
    
    // Start escrow checkout wizard
    setCurrentStep(1);
  };

  const progress = (property.soldTokens / property.totalTokens) * 100;
  const remainingTokens = property.totalTokens - property.soldTokens;
  const monthlyRentPerToken = property.monthlyRent / property.totalTokens;
  const totalCost = tokenAmount * property.tokenPrice;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Navigation */}
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Button variant="ghost" onClick={() => navigate('/properties')}>
            ← Back to Marketplace
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="relative mb-4">
                <img
                  src={property.images[selectedImageIndex]}
                  alt={property.title}
                  className="w-full h-96 object-cover rounded-xl"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button
                    onClick={() => setShowARView(true)}
                    className="bg-accent hover:bg-accent-light text-accent-foreground"
                  >
                    🥽 AR View
                  </Button>
                  <Button variant="secondary">
                    ▶️ Virtual Tour
                  </Button>
                </div>
              </div>
              
              <div className="flex gap-2 overflow-x-auto">
                {property.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImageIndex === index ? 'border-primary' : 'border-transparent'
                    }`}
                  >
                    <img src={image} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Property Info Tabs */}
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="financials">Financials</TabsTrigger>
                <TabsTrigger value="compliance">Compliance</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Property Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{property.description}</p>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2">Property Information</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Year Built</span>
                            <span>{property.propertyDetails.yearBuilt}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Total Units</span>
                            <span>{property.propertyDetails.totalUnits}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Occupancy Rate</span>
                            <span>{property.propertyDetails.occupancyRate}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Total Sq Ft</span>
                            <span>{property.propertyDetails.totalSqFt.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">Amenities</h4>
                        <div className="flex flex-wrap gap-2">
                          {property.propertyDetails.amenities.map((amenity) => (
                            <Badge key={amenity} variant="outline">
                              {amenity}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="financials" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Financial Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Rent Stream</h4>
                          <RentStreamBadge
                            amount={monthlyRentPerToken}
                            period="monthly"
                            status="active"
                          />
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-2">Token Information</h4>
                          <TokenTag
                            type={property.tokenStandard}
                            partition="standard"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Key Metrics</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Annual Yield</span>
                              <span className="font-semibold text-success">
                                {property.annualYield}%
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Cap Rate</span>
                              <span>6.8%</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Cash-on-Cash Return</span>
                              <span>8.2%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="compliance" className="space-y-6">
                <ComplianceAlert
                  compliance={property.compliance}
                  showActions
                  onViewDetails={() => console.log('View compliance details')}
                />
                
                <Card>
                  <CardHeader>
                    <CardTitle>Transfer Restrictions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <TransferRestrictionChip
                      restrictions={property.compliance.restrictions}
                      detailed
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="documents" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Property Documents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        'Property Prospectus.pdf',
                        'Financial Statements.pdf',
                        'Property Inspection Report.pdf',
                        'Legal Due Diligence.pdf',
                        'Environmental Assessment.pdf'
                      ].map((doc) => (
                        <div key={doc} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
                              📄
                            </div>
                            <span className="font-medium">{doc}</span>
                          </div>
                          <Button variant="outline" size="sm">
                            Download
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar - Purchase Widget */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="sticky top-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{property.title}</span>
                    <Badge className="yield-badge-high">
                      {property.annualYield}% APY
                    </Badge>
                  </CardTitle>
                  <p className="text-muted-foreground">{property.address}</p>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {/* Token Availability */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Token Sale Progress</span>
                      <span className="text-sm text-muted-foreground">
                        {property.soldTokens.toLocaleString()} / {property.totalTokens.toLocaleString()} sold
                      </span>
                    </div>
                    <Progress value={progress} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">
                      {remainingTokens.toLocaleString()} tokens remaining
                    </p>
                  </div>

                  <Separator />

                  {/* Purchase Form */}
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Number of Tokens
                      </label>
                      <Input
                        type="number"
                        min="1"
                        max={remainingTokens}
                        value={tokenAmount}
                        onChange={(e) => setTokenAmount(parseInt(e.target.value) || 1)}
                        className="text-center text-lg"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Token Price</span>
                        <span className="font-semibold">${property.tokenPrice}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tokens</span>
                        <span>{tokenAmount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Monthly Rent/Token</span>
                        <span className="text-success">${monthlyRentPerToken.toFixed(2)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-lg font-semibold">
                        <span>Total Cost</span>
                        <span>${totalCost.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Monthly Income</span>
                        <span className="text-success">
                          ${(monthlyRentPerToken * tokenAmount).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <Button
                      onClick={handlePurchase}
                      className="w-full text-lg py-6 wallet-button"
                      disabled={remainingTokens === 0}
                    >
                      {remainingTokens === 0 ? 'Sold Out' : 'Start Purchase'}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      Secure escrow checkout • KYC verification required
                    </p>
                  </div>

                  <Separator />

                  {/* Quick Actions */}
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => navigate(`/valuation/${property.id}`)}
                    >
                      📊 View AI Valuation
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setShowARView(true)}
                    >
                      🥽 AR Property View
                    </Button>
                    <Button variant="outline" className="w-full">
                      💾 Save to Watchlist
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      {/* AR Viewport Modal */}
      <ARViewport
        isOpen={showARView}
        onClose={() => setShowARView(false)}
        propertyId={property.id}
      />
    </div>
  );
}