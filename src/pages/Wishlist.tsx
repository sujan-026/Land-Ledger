import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '@/contexts/WishlistContext';
import { Header } from '@/components/layout/Header';

export default function Wishlist() {
  const navigate = useNavigate();
  const { items, removeFromWishlist, clearWishlist, isLoading } = useWishlist();

  // Mock property data for wishlist items
  const wishlistProperties = [
    {
      id: 'prop1',
      title: 'Luxury Apartment Complex - Downtown Miami',
      city: 'Miami',
      state: 'FL',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00',
      tokenPrice: 100,
      annualYield: 8.5,
      estimatedValue: 1000000,
      monthlyRent: 75000,
      totalTokens: 10000,
      soldTokens: 7500,
    },
    {
      id: 'prop3',
      title: 'Resort Property - San Diego',
      city: 'San Diego',
      state: 'CA',
      image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9',
      tokenPrice: 200,
      annualYield: 9.1,
      estimatedValue: 3000000,
      monthlyRent: 120000,
      totalTokens: 15000,
      soldTokens: 8000,
    },
  ].filter(property => items.includes(property.id));

  const handleViewProperty = (propertyId: string) => {
    navigate(`/properties/${propertyId}`);
  };

  const handleRemoveFromWishlist = (propertyId: string) => {
    removeFromWishlist(propertyId);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="text-2xl mb-4">Loading...</div>
              <p className="text-muted-foreground">Loading your wishlist</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
              <h1 className="text-4xl font-bold">My Wishlist</h1>
              <p className="text-muted-foreground">
                Properties you're interested in investing in
              </p>
            </div>
            <div className="flex gap-4">
              {items.length > 0 && (
                <Button variant="outline" onClick={clearWishlist}>
                  Clear All
                </Button>
              )}
              <Button onClick={() => navigate('/properties')}>
                Browse Properties
              </Button>
            </div>
          </div>

          {/* Wishlist Content */}
          {wishlistProperties.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-6">❤️</div>
              <h3 className="text-2xl font-semibold mb-4">Your Wishlist is Empty</h3>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Start building your wishlist by saving properties you're interested in. 
                You can add properties by clicking the heart icon on any property card.
              </p>
              <Button onClick={() => navigate('/properties')} size="lg">
                Explore Properties
              </Button>
            </motion.div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-lg px-4 py-2">
                  {wishlistProperties.length} propert{wishlistProperties.length === 1 ? 'y' : 'ies'} saved
                </Badge>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistProperties.map((property, index) => (
                  <motion.div
                    key={property.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="group hover:shadow-lg transition-all duration-300">
                      <div className="relative">
                        <img
                          src={property.image}
                          alt={property.title}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <Badge className="absolute top-3 right-3 yield-badge-high">
                          {property.annualYield}% APY
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-3 left-3 w-8 h-8 p-0 bg-background/80 hover:bg-background"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveFromWishlist(property.id);
                          }}
                        >
                          ❤️
                        </Button>
                        <div className="absolute bottom-3 left-3 right-3">
                          <div className="bg-black/50 backdrop-blur-sm rounded-lg p-2 text-white text-sm">
                            {Math.round((property.totalTokens - property.soldTokens) / property.totalTokens * 100)}% Available
                          </div>
                        </div>
                      </div>
                      
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                          {property.title}
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          {property.city}, {property.state}
                        </p>
                        
                        <div className="space-y-3 mb-4">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Token Price</span>
                            <span className="font-semibold">${property.tokenPrice}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Monthly Rent/Token</span>
                            <span className="font-semibold text-rent-positive">
                              ${(property.monthlyRent / property.totalTokens).toFixed(2)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Total Value</span>
                            <span className="font-semibold">
                              ${(property.estimatedValue).toLocaleString()}
                            </span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button 
                            className="flex-1"
                            onClick={() => handleViewProperty(property.id)}
                          >
                            View Details
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveFromWishlist(property.id);
                            }}
                          >
                            Remove
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Comparison Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Property Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">Property</th>
                          <th className="text-right py-2">Token Price</th>
                          <th className="text-right py-2">Yield</th>
                          <th className="text-right py-2">Monthly Income</th>
                          <th className="text-right py-2">Available</th>
                        </tr>
                      </thead>
                      <tbody>
                        {wishlistProperties.map((property) => (
                          <tr key={property.id} className="border-b last:border-0">
                            <td className="py-3">
                              <div className="flex items-center space-x-3">
                                <img
                                  src={property.image}
                                  alt={property.title}
                                  className="w-8 h-8 rounded object-cover"
                                />
                                <span className="font-medium">{property.title}</span>
                              </div>
                            </td>
                            <td className="text-right py-3">${property.tokenPrice}</td>
                            <td className="text-right py-3">{property.annualYield}%</td>
                            <td className="text-right py-3">
                              ${(property.monthlyRent / property.totalTokens).toFixed(2)}
                            </td>
                            <td className="text-right py-3">
                              {Math.round((property.totalTokens - property.soldTokens) / property.totalTokens * 100)}%
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}