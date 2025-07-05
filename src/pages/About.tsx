import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';

export default function About() {
  const navigate = useNavigate();

  const teamMembers = [
    {
      name: 'Sujan P',
      role: 'Developer',
      image: '',
      bio: '6th sem Computer Science and Engineering Student',
    },
    {
      name: 'Dheemantha',
      role: 'Developer',
      image: '',
      bio: '6th sem Computer Science and Engineering Student',
    },
    {
      name: 'Vaishnavi P S',
      role: 'Developer',
      image: '',
      bio: '6th sem Computer Science and Engineering Student',
    },
    {
      name: 'Melody V L ',
      role: 'Developer',
      image: '',
      bio: '6th sem Computer Science and Engineering Student',
    },
  ];

  const features = [
    {
      icon: '🏗️',
      title: 'Fractional Ownership',
      description: 'Own a piece of premium real estate starting from just $100 through tokenization.',
    },
    {
      icon: '💰',
      title: 'Passive Income',
      description: 'Earn monthly rental income automatically distributed to your wallet.',
    },
    {
      icon: '🔐',
      title: 'SEC Compliant',
      description: 'All properties are fully regulated under SEC guidelines for investor protection.',
    },
    {
      icon: '🤖',
      title: 'AI-Powered Analytics',
      description: 'Get real-time property valuations and market insights powered by machine learning.',
    },
    {
      icon: '🌐',
      title: 'Global Access',
      description: 'Invest in premium real estate worldwide from anywhere with an internet connection.',
    },
    {
      icon: '⚡',
      title: 'Instant Liquidity',
      description: 'Trade your property tokens on our secondary marketplace anytime.',
    },
  ];

  const steps = [
    {
      step: 1,
      title: 'Create Account',
      description: 'Sign up with your email and complete KYC verification.',
    },
    {
      step: 2,
      title: 'Browse Properties',
      description: 'Explore our curated marketplace of tokenized real estate.',
    },
    {
      step: 3,
      title: 'Connect Wallet',
      description: 'Link your crypto wallet to start making investments.',
    },
    {
      step: 4,
      title: 'Invest & Earn',
      description: 'Buy property tokens and start earning monthly rental income.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Democratizing Real Estate Investment
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-8">
              LandLedger makes premium real estate accessible to everyone through blockchain technology 
              and fractional ownership.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => navigate('/properties')}
                className="text-lg px-8 py-6"
              >
                Explore Properties
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => navigate('/auth')}
                className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-primary"
              >
                Get Started
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">How LandLedger Works</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our platform leverages ERC-1400 security tokens to enable compliant, 
              fractional ownership of real estate with guaranteed rental yields.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center h-full">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-lg">{step.step}</span>
                    </div>
                    <CardTitle className="text-xl">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Platform Features</h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to invest in real estate with confidence
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-xl text-muted-foreground">
              Experienced professionals from finance, technology, and real estate
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="text-center group"
              >
                <div className="relative mb-6">
                  <div className="w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-background shadow-lg group-hover:shadow-xl transition-shadow">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute inset-0 rounded-full bg-gradient-primary opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <Badge variant="secondary" className="mb-4">
                  {member.role}
                </Badge>
                <p className="text-sm text-muted-foreground">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Ready to Start Your Real Estate Journey?
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Join thousands of investors already earning passive income through tokenized real estate.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => navigate('/auth')}
                className="text-lg px-8 py-6"
              >
                Create Account
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => navigate('/properties')}
                className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-primary"
              >
                View Properties
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}