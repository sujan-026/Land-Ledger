import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

import { useAuth } from '@/contexts/AuthContext';
import { useSuggestions } from '@/contexts/SuggestionContext';
import { SuggestionCard } from '@/components/ai/SuggestionCard';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';

export default function Landing() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { smartPicks } = useSuggestions();
  const [videoPlaying, setVideoPlaying] = useState(false);

  const features = [
    {
      icon: '🏢',
      title: 'Tokenized Real Estate',
      description: 'Own fractions of premium properties through blockchain technology'
    },
    {
      icon: '💰',
      title: 'Monthly Rent Streams',
      description: 'Receive automated rental income directly to your wallet'
    },
    {
      icon: '🔗',
      title: 'ERC-1400 Security',
      description: 'Compliant security tokens with built-in transfer restrictions'
    },
    {
      icon: '🤖',
      title: 'AI-Powered Insights',
      description: 'Smart recommendations and market analysis powered by AI'
    }
  ];

  const stats = [
    { label: 'Total Value Locked', value: '$127M+' },
    { label: 'Properties Tokenized', value: '850+' },
    { label: 'Active Investors', value: '12,500+' },
    { label: 'Average APY', value: '8.7%' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
        
        <div className="max-w-7xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
              🚀 Web3 Real Estate Revolution
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent leading-tight">
              Own Real Estate.
              <br />
              One Token at a Time.
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Invest in premium real estate with as little as $100. 
              Earn monthly rent through blockchain technology.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                size="lg" 
                className="wallet-button text-lg px-8 py-6"
                onClick={() => navigate('/properties')}
              >
                Explore Properties
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="text-lg px-8 py-6 interactive-scale"
                onClick={() => setVideoPlaying(true)}
              >
                ▶️ Watch Demo
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ERC-1400 Explainer */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Why ERC-1400 Security Tokens?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our platform uses ERC-1400 standard for compliant, regulated real estate investments
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="property-card h-full">
                  <CardHeader className="text-center">
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-center">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Smart Picks Preview */}
      {smartPicks.length > 0 && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4">AI Smart Picks</h2>
              <p className="text-xl text-muted-foreground">
                Curated investment opportunities based on market analysis
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {smartPicks.slice(0, 2).map((property, index) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="property-card cursor-pointer"
                  onClick={() => navigate(`/properties/${property.id}`)}
                >
                  <div className="relative">
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="w-full h-48 object-cover"
                    />
                    <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">
                      🤖 AI Recommended
                    </Badge>
                    <Badge className="absolute top-3 right-3 yield-badge-high">
                      {property.annualYield}% APY
                    </Badge>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
                    <p className="text-muted-foreground mb-4">{property.address}</p>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-muted-foreground">Token Price</p>
                        <p className="text-lg font-semibold">${property.tokenPrice}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Available</p>
                        <p className="text-lg font-semibold">
                          {((property.totalTokens - property.soldTokens) / property.totalTokens * 100).toFixed(0)}%
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button 
                onClick={() => navigate('/properties')} 
                className="interactive-scale"
              >
                View All Properties →
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-glass"></div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center px-6 relative z-10"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Investing?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Join thousands of investors earning passive income through tokenized real estate
          </p>
          
          <Button 
            onClick={() => navigate('/properties')}
            className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6"
          >
            Start Investing Now
          </Button>
        </motion.div>
      </section>

      {/* Video Modal */}
      {videoPlaying && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setVideoPlaying(false)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="max-w-4xl w-full bg-black rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative pb-[56.25%] h-0">
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-primary">
                <div className="text-white text-center">
                  <div className="text-6xl mb-4">🎬</div>
                  <p className="text-xl">Demo video would play here</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => setVideoPlaying(false)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}