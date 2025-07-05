import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Property } from '@/types';
import { useSuggestions } from '@/contexts/SuggestionContext';
import { SuggestionCard } from '@/components/ai/SuggestionCard';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';

export default function Marketplace() {
  const navigate = useNavigate();
  const { smartPicks, dismissSuggestion } = useSuggestions();
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [yieldRange, setYieldRange] = useState([0, 15]);
  const [sortBy, setSortBy] = useState('yield');
  const [showMapView, setShowMapView] = useState(false);

  // Mock properties data
  const properties: Property[] = [
    // Miami Metropolitan Area
    {
      id: 'prop1',
      title: 'Luxury Apartment Complex - Downtown Miami',
      description: 'Modern luxury apartment complex in the heart of Miami\'s financial district',
      address: '123 Biscayne Blvd',
      city: 'Miami',
      state: 'FL',
      zipCode: '33132',
      country: 'USA',
      coordinates: { lat: 25.7617, lng: -80.1918 },
      images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00'],
      totalTokens: 10000,
      tokenPrice: 100,
      soldTokens: 7500,
      monthlyRent: 75000,
      annualYield: 8.5,
      estimatedValue: 1000000,
      tokenStandard: 'ERC-1400',
      partitions: [],
      compliance: {
        regulations: ['SEC Regulation D'],
        restrictions: ['Accredited investors only'],
        disclosures: [],
        riskRating: 'medium',
      },
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'prop2',
      title: 'Beachfront Condos - Miami Beach',
      description: 'Premium beachfront condominiums with ocean views',
      address: '456 Ocean Dr',
      city: 'Miami Beach',
      state: 'FL',
      zipCode: '33139',
      country: 'USA',
      coordinates: { lat: 25.7907, lng: -80.1300 },
      images: ['https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9'],
      totalTokens: 8000,
      tokenPrice: 150,
      soldTokens: 6000,
      monthlyRent: 60000,
      annualYield: 9.2,
      estimatedValue: 1200000,
      tokenStandard: 'ERC-1400',
      partitions: [],
      compliance: {
        regulations: ['SEC Regulation D'],
        restrictions: ['Minimum $5,000 investment'],
        disclosures: [],
        riskRating: 'medium',
      },
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'prop3',
      title: 'Office Tower - Fort Lauderdale',
      description: 'Class A office building in Fort Lauderdale business district',
      address: '789 Las Olas Blvd',
      city: 'Fort Lauderdale',
      state: 'FL',
      zipCode: '33301',
      country: 'USA',
      coordinates: { lat: 26.1224, lng: -80.1373 },
      images: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab'],
      totalTokens: 15000,
      tokenPrice: 200,
      soldTokens: 12000,
      monthlyRent: 120000,
      annualYield: 7.8,
      estimatedValue: 2500000,
      tokenStandard: 'ERC-1400',
      partitions: [],
      compliance: {
        regulations: ['SEC Regulation D'],
        restrictions: ['Minimum $10,000 investment'],
        disclosures: [],
        riskRating: 'low',
      },
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    },

    // Austin Metropolitan Area
    {
      id: 'prop4',
      title: 'Tech Campus - Downtown Austin',
      description: 'Modern tech campus in Austin\'s thriving innovation district',
      address: '456 Congress Ave',
      city: 'Austin',
      state: 'TX',
      zipCode: '78701',
      country: 'USA',
      coordinates: { lat: 30.2672, lng: -97.7431 },
      images: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab'],
      totalTokens: 20000,
      tokenPrice: 250,
      soldTokens: 15000,
      monthlyRent: 150000,
      annualYield: 7.2,
      estimatedValue: 5000000,
      tokenStandard: 'ERC-1400',
      partitions: [],
      compliance: {
        regulations: ['SEC Regulation D'],
        restrictions: ['Minimum $10,000 investment'],
        disclosures: [],
        riskRating: 'low',
      },
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'prop5',
      title: 'Student Housing - Round Rock',
      description: 'Premium student housing complex near University of Texas',
      address: '123 University Blvd',
      city: 'Round Rock',
      state: 'TX',
      zipCode: '78665',
      country: 'USA',
      coordinates: { lat: 30.5083, lng: -97.6789 },
      images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00'],
      totalTokens: 12000,
      tokenPrice: 80,
      soldTokens: 9000,
      monthlyRent: 72000,
      annualYield: 10.5,
      estimatedValue: 1800000,
      tokenStandard: 'ERC-1400',
      partitions: [],
      compliance: {
        regulations: ['SEC Regulation D'],
        restrictions: ['Minimum $2,000 investment'],
        disclosures: [],
        riskRating: 'medium',
      },
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    },

    // San Diego Metropolitan Area
    {
      id: 'prop6',
      title: 'Resort Property - La Jolla',
      description: 'Beachfront resort with vacation rental income',
      address: '789 Ocean View Dr',
      city: 'La Jolla',
      state: 'CA',
      zipCode: '92037',
      country: 'USA',
      coordinates: { lat: 32.8328, lng: -117.2713 },
      images: ['https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9'],
      totalTokens: 15000,
      tokenPrice: 200,
      soldTokens: 8000,
      monthlyRent: 120000,
      annualYield: 9.1,
      estimatedValue: 3000000,
      tokenStandard: 'ERC-1400',
      partitions: [],
      compliance: {
        regulations: ['SEC Regulation D'],
        restrictions: ['Minimum $5,000 investment'],
        disclosures: [],
        riskRating: 'medium',
      },
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'prop7',
      title: 'Medical Office Complex - Carlsbad',
      description: 'State-of-the-art medical office complex',
      address: '456 Medical Center Dr',
      city: 'Carlsbad',
      state: 'CA',
      zipCode: '92008',
      country: 'USA',
      coordinates: { lat: 33.1581, lng: -117.3506 },
      images: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab'],
      totalTokens: 18000,
      tokenPrice: 180,
      soldTokens: 14000,
      monthlyRent: 135000,
      annualYield: 8.2,
      estimatedValue: 4000000,
      tokenStandard: 'ERC-1400',
      partitions: [],
      compliance: {
        regulations: ['SEC Regulation D'],
        restrictions: ['Minimum $8,000 investment'],
        disclosures: [],
        riskRating: 'low',
      },
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    },

    // Los Angeles Metropolitan Area
    {
      id: 'prop8',
      title: 'Hollywood Studio Complex',
      description: 'Modern film studio and production facility',
      address: '123 Hollywood Blvd',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90028',
      country: 'USA',
      coordinates: { lat: 34.1016, lng: -118.3267 },
      images: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab'],
      totalTokens: 25000,
      tokenPrice: 300,
      soldTokens: 20000,
      monthlyRent: 200000,
      annualYield: 6.8,
      estimatedValue: 8000000,
      tokenStandard: 'ERC-1400',
      partitions: [],
      compliance: {
        regulations: ['SEC Regulation D'],
        restrictions: ['Minimum $15,000 investment'],
        disclosures: [],
        riskRating: 'low',
      },
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'prop9',
      title: 'Luxury Apartments - Beverly Hills',
      description: 'Ultra-luxury residential complex in Beverly Hills',
      address: '456 Rodeo Dr',
      city: 'Beverly Hills',
      state: 'CA',
      zipCode: '90210',
      country: 'USA',
      coordinates: { lat: 34.0736, lng: -118.4004 },
      images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00'],
      totalTokens: 12000,
      tokenPrice: 400,
      soldTokens: 8000,
      monthlyRent: 180000,
      annualYield: 7.5,
      estimatedValue: 6000000,
      tokenStandard: 'ERC-1400',
      partitions: [],
      compliance: {
        regulations: ['SEC Regulation D'],
        restrictions: ['Accredited investors only'],
        disclosures: [],
        riskRating: 'low',
      },
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'prop10',
      title: 'Tech Campus - Irvine',
      description: 'Innovation campus for tech companies',
      address: '789 Innovation Way',
      city: 'Irvine',
      state: 'CA',
      zipCode: '92618',
      country: 'USA',
      coordinates: { lat: 33.6846, lng: -117.8265 },
      images: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab'],
      totalTokens: 22000,
      tokenPrice: 220,
      soldTokens: 18000,
      monthlyRent: 165000,
      annualYield: 7.8,
      estimatedValue: 5500000,
      tokenStandard: 'ERC-1400',
      partitions: [],
      compliance: {
        regulations: ['SEC Regulation D'],
        restrictions: ['Minimum $12,000 investment'],
        disclosures: [],
        riskRating: 'low',
      },
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    },

    // New York Metropolitan Area
    {
      id: 'prop11',
      title: 'Manhattan Office Tower',
      description: 'Class A office building in Midtown Manhattan',
      address: '123 Park Ave',
      city: 'New York',
      state: 'NY',
      zipCode: '10022',
      country: 'USA',
      coordinates: { lat: 40.7589, lng: -73.9851 },
      images: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab'],
      totalTokens: 30000,
      tokenPrice: 500,
      soldTokens: 25000,
      monthlyRent: 300000,
      annualYield: 6.5,
      estimatedValue: 15000000,
      tokenStandard: 'ERC-1400',
      partitions: [],
      compliance: {
        regulations: ['SEC Regulation D'],
        restrictions: ['Accredited investors only'],
        disclosures: [],
        riskRating: 'low',
      },
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'prop12',
      title: 'Brooklyn Residential Complex',
      description: 'Modern residential complex in trendy Brooklyn',
      address: '456 Williamsburg St',
      city: 'Brooklyn',
      state: 'NY',
      zipCode: '11211',
      country: 'USA',
      coordinates: { lat: 40.7182, lng: -73.9584 },
      images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00'],
      totalTokens: 16000,
      tokenPrice: 180,
      soldTokens: 12000,
      monthlyRent: 144000,
      annualYield: 8.2,
      estimatedValue: 3200000,
      tokenStandard: 'ERC-1400',
      partitions: [],
      compliance: {
        regulations: ['SEC Regulation D'],
        restrictions: ['Minimum $8,000 investment'],
        disclosures: [],
        riskRating: 'medium',
      },
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'prop13',
      title: 'Jersey City Waterfront',
      description: 'Luxury waterfront apartments across from Manhattan',
      address: '789 Hudson St',
      city: 'Jersey City',
      state: 'NJ',
      zipCode: '07302',
      country: 'USA',
      coordinates: { lat: 40.7178, lng: -74.0431 },
      images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00'],
      totalTokens: 14000,
      tokenPrice: 200,
      soldTokens: 10000,
      monthlyRent: 140000,
      annualYield: 8.8,
      estimatedValue: 3500000,
      tokenStandard: 'ERC-1400',
      partitions: [],
      compliance: {
        regulations: ['SEC Regulation D'],
        restrictions: ['Minimum $10,000 investment'],
        disclosures: [],
        riskRating: 'medium',
      },
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    },

    // Chicago Metropolitan Area
    {
      id: 'prop14',
      title: 'Loop Office Building',
      description: 'Historic office building in Chicago\'s financial district',
      address: '123 LaSalle St',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60602',
      country: 'USA',
      coordinates: { lat: 41.8781, lng: -87.6298 },
      images: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab'],
      totalTokens: 20000,
      tokenPrice: 280,
      soldTokens: 16000,
      monthlyRent: 180000,
      annualYield: 7.1,
      estimatedValue: 6000000,
      tokenStandard: 'ERC-1400',
      partitions: [],
      compliance: {
        regulations: ['SEC Regulation D'],
        restrictions: ['Minimum $12,000 investment'],
        disclosures: [],
        riskRating: 'low',
      },
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'prop15',
      title: 'Evanston Student Housing',
      description: 'Premium student housing near Northwestern University',
      address: '456 Sheridan Rd',
      city: 'Evanston',
      state: 'IL',
      zipCode: '60208',
      country: 'USA',
      coordinates: { lat: 42.0451, lng: -87.6877 },
      images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00'],
      totalTokens: 10000,
      tokenPrice: 90,
      soldTokens: 7000,
      monthlyRent: 63000,
      annualYield: 10.2,
      estimatedValue: 1500000,
      tokenStandard: 'ERC-1400',
      partitions: [],
      compliance: {
        regulations: ['SEC Regulation D'],
        restrictions: ['Minimum $3,000 investment'],
        disclosures: [],
        riskRating: 'medium',
      },
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    },

    // Seattle Metropolitan Area
    {
      id: 'prop16',
      title: 'Seattle Tech Campus',
      description: 'Modern tech campus in Seattle\'s South Lake Union',
      address: '123 Denny Way',
      city: 'Seattle',
      state: 'WA',
      zipCode: '98109',
      country: 'USA',
      coordinates: { lat: 47.6062, lng: -122.3321 },
      images: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab'],
      totalTokens: 25000,
      tokenPrice: 320,
      soldTokens: 20000,
      monthlyRent: 200000,
      annualYield: 6.9,
      estimatedValue: 8000000,
      tokenStandard: 'ERC-1400',
      partitions: [],
      compliance: {
        regulations: ['SEC Regulation D'],
        restrictions: ['Minimum $15,000 investment'],
        disclosures: [],
        riskRating: 'low',
      },
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'prop17',
      title: 'Bellevue Luxury Apartments',
      description: 'High-end residential complex in Bellevue',
      address: '456 Bellevue Way NE',
      city: 'Bellevue',
      state: 'WA',
      zipCode: '98004',
      country: 'USA',
      coordinates: { lat: 47.6101, lng: -122.2015 },
      images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00'],
      totalTokens: 12000,
      tokenPrice: 250,
      soldTokens: 9000,
      monthlyRent: 120000,
      annualYield: 8.1,
      estimatedValue: 3000000,
      tokenStandard: 'ERC-1400',
      partitions: [],
      compliance: {
        regulations: ['SEC Regulation D'],
        restrictions: ['Minimum $10,000 investment'],
        disclosures: [],
        riskRating: 'medium',
      },
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    },

    // Denver Metropolitan Area
    {
      id: 'prop18',
      title: 'Denver Tech Center',
      description: 'Modern office complex in Denver Tech Center',
      address: '789 DTC Blvd',
      city: 'Denver',
      state: 'CO',
      zipCode: '80237',
      country: 'USA',
      coordinates: { lat: 39.7392, lng: -104.9903 },
      images: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab'],
      totalTokens: 18000,
      tokenPrice: 200,
      soldTokens: 14000,
      monthlyRent: 135000,
      annualYield: 7.8,
      estimatedValue: 4000000,
      tokenStandard: 'ERC-1400',
      partitions: [],
      compliance: {
        regulations: ['SEC Regulation D'],
        restrictions: ['Minimum $8,000 investment'],
        disclosures: [],
        riskRating: 'low',
      },
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'prop19',
      title: 'Boulder Student Housing',
      description: 'Premium student housing near University of Colorado',
      address: '123 Pearl St',
      city: 'Boulder',
      state: 'CO',
      zipCode: '80302',
      country: 'USA',
      coordinates: { lat: 40.0150, lng: -105.2705 },
      images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00'],
      totalTokens: 8000,
      tokenPrice: 120,
      soldTokens: 6000,
      monthlyRent: 72000,
      annualYield: 11.2,
      estimatedValue: 1200000,
      tokenStandard: 'ERC-1400',
      partitions: [],
      compliance: {
        regulations: ['SEC Regulation D'],
        restrictions: ['Minimum $4,000 investment'],
        disclosures: [],
        riskRating: 'medium',
      },
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    },

    // Phoenix Metropolitan Area
    {
      id: 'prop20',
      title: 'Scottsdale Resort',
      description: 'Luxury resort and spa in Scottsdale',
      address: '456 Camelback Rd',
      city: 'Scottsdale',
      state: 'AZ',
      zipCode: '85251',
      country: 'USA',
      coordinates: { lat: 33.4942, lng: -111.9261 },
      images: ['https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9'],
      totalTokens: 16000,
      tokenPrice: 180,
      soldTokens: 12000,
      monthlyRent: 144000,
      annualYield: 8.9,
      estimatedValue: 3500000,
      tokenStandard: 'ERC-1400',
      partitions: [],
      compliance: {
        regulations: ['SEC Regulation D'],
        restrictions: ['Minimum $8,000 investment'],
        disclosures: [],
        riskRating: 'medium',
      },
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'prop21',
      title: 'Tempe Student Housing',
      description: 'Modern student housing near Arizona State University',
      address: '789 University Dr',
      city: 'Tempe',
      state: 'AZ',
      zipCode: '85281',
      country: 'USA',
      coordinates: { lat: 33.4255, lng: -111.9400 },
      images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00'],
      totalTokens: 10000,
      tokenPrice: 100,
      soldTokens: 7500,
      monthlyRent: 75000,
      annualYield: 10.8,
      estimatedValue: 1500000,
      tokenStandard: 'ERC-1400',
      partitions: [],
      compliance: {
        regulations: ['SEC Regulation D'],
        restrictions: ['Minimum $3,000 investment'],
        disclosures: [],
        riskRating: 'medium',
      },
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    },

    // Dallas-Fort Worth Metropolitan Area
    {
      id: 'prop22',
      title: 'Dallas Uptown Office',
      description: 'Class A office building in Dallas Uptown',
      address: '123 McKinney Ave',
      city: 'Dallas',
      state: 'TX',
      zipCode: '75201',
      country: 'USA',
      coordinates: { lat: 32.7767, lng: -96.7970 },
      images: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab'],
      totalTokens: 20000,
      tokenPrice: 220,
      soldTokens: 16000,
      monthlyRent: 160000,
      annualYield: 7.5,
      estimatedValue: 4500000,
      tokenStandard: 'ERC-1400',
      partitions: [],
      compliance: {
        regulations: ['SEC Regulation D'],
        restrictions: ['Minimum $10,000 investment'],
        disclosures: [],
        riskRating: 'low',
      },
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'prop23',
      title: 'Fort Worth Stockyards',
      description: 'Historic mixed-use development in Fort Worth Stockyards',
      address: '456 Stockyards Blvd',
      city: 'Fort Worth',
      state: 'TX',
      zipCode: '76164',
      country: 'USA',
      coordinates: { lat: 32.7555, lng: -97.3308 },
      images: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab'],
      totalTokens: 14000,
      tokenPrice: 150,
      soldTokens: 10000,
      monthlyRent: 105000,
      annualYield: 8.3,
      estimatedValue: 2800000,
      tokenStandard: 'ERC-1400',
      partitions: [],
      compliance: {
        regulations: ['SEC Regulation D'],
        restrictions: ['Minimum $6,000 investment'],
        disclosures: [],
        riskRating: 'medium',
      },
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    },

    // Houston Metropolitan Area
    {
      id: 'prop24',
      title: 'Houston Medical Center',
      description: 'Medical office complex in Texas Medical Center',
      address: '789 Fannin St',
      city: 'Houston',
      state: 'TX',
      zipCode: '77030',
      country: 'USA',
      coordinates: { lat: 29.7604, lng: -95.3698 },
      images: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab'],
      totalTokens: 18000,
      tokenPrice: 200,
      soldTokens: 14000,
      monthlyRent: 140000,
      annualYield: 7.9,
      estimatedValue: 4000000,
      tokenStandard: 'ERC-1400',
      partitions: [],
      compliance: {
        regulations: ['SEC Regulation D'],
        restrictions: ['Minimum $10,000 investment'],
        disclosures: [],
        riskRating: 'low',
      },
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'prop25',
      title: 'The Woodlands Resort',
      description: 'Luxury resort and conference center in The Woodlands',
      address: '456 Waterway Square',
      city: 'The Woodlands',
      state: 'TX',
      zipCode: '77380',
      country: 'USA',
      coordinates: { lat: 30.1654, lng: -95.4652 },
      images: ['https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9'],
      totalTokens: 12000,
      tokenPrice: 180,
      soldTokens: 9000,
      monthlyRent: 108000,
      annualYield: 8.7,
      estimatedValue: 2500000,
      tokenStandard: 'ERC-1400',
      partitions: [],
      compliance: {
        regulations: ['SEC Regulation D'],
        restrictions: ['Minimum $8,000 investment'],
        disclosures: [],
        riskRating: 'medium',
      },
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    },

    // Atlanta Metropolitan Area
    {
      id: 'prop26',
      title: 'Buckhead Office Tower',
      description: 'Luxury office tower in Atlanta\'s Buckhead district',
      address: '123 Peachtree Rd',
      city: 'Atlanta',
      state: 'GA',
      zipCode: '30305',
      country: 'USA',
      coordinates: { lat: 33.7490, lng: -84.3880 },
      images: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab'],
      totalTokens: 22000,
      tokenPrice: 250,
      soldTokens: 18000,
      monthlyRent: 180000,
      annualYield: 7.2,
      estimatedValue: 5500000,
      tokenStandard: 'ERC-1400',
      partitions: [],
      compliance: {
        regulations: ['SEC Regulation D'],
        restrictions: ['Minimum $12,000 investment'],
        disclosures: [],
        riskRating: 'low',
      },
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'prop27',
      title: 'Alpharetta Tech Campus',
      description: 'Modern tech campus in Alpharetta',
      address: '456 Technology Pkwy',
      city: 'Alpharetta',
      state: 'GA',
      zipCode: '30005',
      country: 'USA',
      coordinates: { lat: 34.0754, lng: -84.2941 },
      images: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab'],
      totalTokens: 16000,
      tokenPrice: 200,
      soldTokens: 12000,
      monthlyRent: 120000,
      annualYield: 7.8,
      estimatedValue: 3500000,
      tokenStandard: 'ERC-1400',
      partitions: [],
      compliance: {
        regulations: ['SEC Regulation D'],
        restrictions: ['Minimum $8,000 investment'],
        disclosures: [],
        riskRating: 'low',
      },
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    },

    // Nashville Metropolitan Area
    {
      id: 'prop28',
      title: 'Nashville Music Row',
      description: 'Historic music industry office complex',
      address: '789 Music Row',
      city: 'Nashville',
      state: 'TN',
      zipCode: '37203',
      country: 'USA',
      coordinates: { lat: 36.1627, lng: -86.7816 },
      images: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab'],
      totalTokens: 14000,
      tokenPrice: 160,
      soldTokens: 10000,
      monthlyRent: 112000,
      annualYield: 8.4,
      estimatedValue: 2800000,
      tokenStandard: 'ERC-1400',
      partitions: [],
      compliance: {
        regulations: ['SEC Regulation D'],
        restrictions: ['Minimum $6,000 investment'],
        disclosures: [],
        riskRating: 'medium',
      },
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'prop29',
      title: 'Franklin Historic District',
      description: 'Mixed-use development in historic Franklin',
      address: '456 Main St',
      city: 'Franklin',
      state: 'TN',
      zipCode: '37064',
      country: 'USA',
      coordinates: { lat: 35.9251, lng: -86.8689 },
      images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00'],
      totalTokens: 10000,
      tokenPrice: 120,
      soldTokens: 7000,
      monthlyRent: 70000,
      annualYield: 9.2,
      estimatedValue: 1800000,
      tokenStandard: 'ERC-1400',
      partitions: [],
      compliance: {
        regulations: ['SEC Regulation D'],
        restrictions: ['Minimum $4,000 investment'],
        disclosures: [],
        riskRating: 'medium',
      },
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    },

    // Charlotte Metropolitan Area
    {
      id: 'prop30',
      title: 'Charlotte Uptown Office',
      description: 'Class A office building in Charlotte Uptown',
      address: '123 Tryon St',
      city: 'Charlotte',
      state: 'NC',
      zipCode: '28202',
      country: 'USA',
      coordinates: { lat: 35.2271, lng: -80.8431 },
      images: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab'],
      totalTokens: 20000,
      tokenPrice: 220,
      soldTokens: 16000,
      monthlyRent: 160000,
      annualYield: 7.6,
      estimatedValue: 4500000,
      tokenStandard: 'ERC-1400',
      partitions: [],
      compliance: {
        regulations: ['SEC Regulation D'],
        restrictions: ['Minimum $10,000 investment'],
        disclosures: [],
        riskRating: 'low',
      },
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'prop31',
      title: 'Huntersville Mixed-Use',
      description: 'Modern mixed-use development in Huntersville',
      address: '456 Birkdale Village Dr',
      city: 'Huntersville',
      state: 'NC',
      zipCode: '28078',
      country: 'USA',
      coordinates: { lat: 35.4107, lng: -80.8428 },
      images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00'],
      totalTokens: 12000,
      tokenPrice: 140,
      soldTokens: 9000,
      monthlyRent: 90000,
      annualYield: 8.8,
      estimatedValue: 2200000,
      tokenStandard: 'ERC-1400',
      partitions: [],
      compliance: {
        regulations: ['SEC Regulation D'],
        restrictions: ['Minimum $6,000 investment'],
        disclosures: [],
        riskRating: 'medium',
      },
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    },

    // Orlando Metropolitan Area
    {
      id: 'prop32',
      title: 'Orlando Theme Park Resort',
      description: 'Luxury resort near major theme parks',
      address: '789 International Dr',
      city: 'Orlando',
      state: 'FL',
      zipCode: '32819',
      country: 'USA',
      coordinates: { lat: 28.5383, lng: -81.3792 },
      images: ['https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9'],
      totalTokens: 18000,
      tokenPrice: 160,
      soldTokens: 14000,
      monthlyRent: 144000,
      annualYield: 8.9,
      estimatedValue: 3500000,
      tokenStandard: 'ERC-1400',
      partitions: [],
      compliance: {
        regulations: ['SEC Regulation D'],
        restrictions: ['Minimum $8,000 investment'],
        disclosures: [],
        riskRating: 'medium',
      },
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'prop33',
      title: 'Winter Park Historic',
      description: 'Historic mixed-use development in Winter Park',
      address: '456 Park Ave',
      city: 'Winter Park',
      state: 'FL',
      zipCode: '32789',
      country: 'USA',
      coordinates: { lat: 28.6000, lng: -81.3392 },
      images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00'],
      totalTokens: 8000,
      tokenPrice: 120,
      soldTokens: 6000,
      monthlyRent: 72000,
      annualYield: 10.1,
      estimatedValue: 1500000,
      tokenStandard: 'ERC-1400',
      partitions: [],
      compliance: {
        regulations: ['SEC Regulation D'],
        restrictions: ['Minimum $4,000 investment'],
        disclosures: [],
        riskRating: 'medium',
      },
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    },

    // Tampa Metropolitan Area
    {
      id: 'prop34',
      title: 'Tampa Bay Waterfront',
      description: 'Luxury waterfront condominiums',
      address: '123 Bayshore Blvd',
      city: 'Tampa',
      state: 'FL',
      zipCode: '33606',
      country: 'USA',
      coordinates: { lat: 27.9506, lng: -82.4572 },
      images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00'],
      totalTokens: 14000,
      tokenPrice: 180,
      soldTokens: 10000,
      monthlyRent: 120000,
      annualYield: 8.6,
      estimatedValue: 3000000,
      tokenStandard: 'ERC-1400',
      partitions: [],
      compliance: {
        regulations: ['SEC Regulation D'],
        restrictions: ['Minimum $8,000 investment'],
        disclosures: [],
        riskRating: 'medium',
      },
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'prop35',
      title: 'St. Petersburg Beach Resort',
      description: 'Beachfront resort in St. Petersburg',
      address: '456 Gulf Blvd',
      city: 'St. Petersburg',
      state: 'FL',
      zipCode: '33706',
      country: 'USA',
      coordinates: { lat: 27.7731, lng: -82.6400 },
      images: ['https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9'],
      totalTokens: 12000,
      tokenPrice: 150,
      soldTokens: 9000,
      monthlyRent: 108000,
      annualYield: 9.3,
      estimatedValue: 2500000,
      tokenStandard: 'ERC-1400',
      partitions: [],
      compliance: {
        regulations: ['SEC Regulation D'],
        restrictions: ['Minimum $6,000 investment'],
        disclosures: [],
        riskRating: 'medium',
      },
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    },

    // Las Vegas Metropolitan Area
    {
      id: 'prop36',
      title: 'Las Vegas Strip Resort',
      description: 'Luxury resort and casino on the Las Vegas Strip',
      address: '789 Las Vegas Blvd',
      city: 'Las Vegas',
      state: 'NV',
      zipCode: '89109',
      country: 'USA',
      coordinates: { lat: 36.1699, lng: -115.1398 },
      images: ['https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9'],
      totalTokens: 25000,
      tokenPrice: 300,
      soldTokens: 20000,
      monthlyRent: 240000,
      annualYield: 7.8,
      estimatedValue: 8000000,
      tokenStandard: 'ERC-1400',
      partitions: [],
      compliance: {
        regulations: ['SEC Regulation D'],
        restrictions: ['Accredited investors only'],
        disclosures: [],
        riskRating: 'medium',
      },
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'prop37',
      title: 'Henderson Tech Campus',
      description: 'Modern tech campus in Henderson',
      address: '456 Innovation Way',
      city: 'Henderson',
      state: 'NV',
      zipCode: '89014',
      country: 'USA',
      coordinates: { lat: 36.0395, lng: -114.9817 },
      images: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab'],
      totalTokens: 16000,
      tokenPrice: 200,
      soldTokens: 12000,
      monthlyRent: 120000,
      annualYield: 7.9,
      estimatedValue: 3500000,
      tokenStandard: 'ERC-1400',
      partitions: [],
      compliance: {
        regulations: ['SEC Regulation D'],
        restrictions: ['Minimum $8,000 investment'],
        disclosures: [],
        riskRating: 'low',
      },
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    },

    // Portland Metropolitan Area
    {
      id: 'prop38',
      title: 'Portland Pearl District',
      description: 'Modern mixed-use development in Pearl District',
      address: '123 NW 10th Ave',
      city: 'Portland',
      state: 'OR',
      zipCode: '97209',
      country: 'USA',
      coordinates: { lat: 45.5152, lng: -122.6784 },
      images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00'],
      totalTokens: 14000,
      tokenPrice: 180,
      soldTokens: 10000,
      monthlyRent: 126000,
      annualYield: 8.4,
      estimatedValue: 3200000,
      tokenStandard: 'ERC-1400',
      partitions: [],
      compliance: {
        regulations: ['SEC Regulation D'],
        restrictions: ['Minimum $8,000 investment'],
        disclosures: [],
        riskRating: 'medium',
      },
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'prop39',
      title: 'Beaverton Tech Campus',
      description: 'Tech campus in Beaverton near Nike headquarters',
      address: '456 SW Murray Blvd',
      city: 'Beaverton',
      state: 'OR',
      zipCode: '97005',
      country: 'USA',
      coordinates: { lat: 45.4871, lng: -122.8037 },
      images: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab'],
      totalTokens: 18000,
      tokenPrice: 220,
      soldTokens: 14000,
      monthlyRent: 140000,
      annualYield: 7.6,
      estimatedValue: 4000000,
      tokenStandard: 'ERC-1400',
      partitions: [],
      compliance: {
        regulations: ['SEC Regulation D'],
        restrictions: ['Minimum $10,000 investment'],
        disclosures: [],
        riskRating: 'low',
      },
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    },

    // Salt Lake City Metropolitan Area
    {
      id: 'prop40',
      title: 'Salt Lake City Downtown',
      description: 'Mixed-use development in downtown Salt Lake City',
      address: '789 Main St',
      city: 'Salt Lake City',
      state: 'UT',
      zipCode: '84111',
      country: 'USA',
      coordinates: { lat: 40.7608, lng: -111.8910 },
      images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00'],
      totalTokens: 16000,
      tokenPrice: 160,
      soldTokens: 12000,
      monthlyRent: 120000,
      annualYield: 8.1,
      estimatedValue: 3200000,
      tokenStandard: 'ERC-1400',
      partitions: [],
      compliance: {
        regulations: ['SEC Regulation D'],
        restrictions: ['Minimum $6,000 investment'],
        disclosures: [],
        riskRating: 'medium',
      },
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ];

  const cities = ['all', ...Array.from(new Set(properties.map(p => p.city)))];

  const filteredProperties = useMemo(() => {
    return properties.filter(property => {
      const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           property.city.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCity = selectedCity === 'all' || property.city === selectedCity;
      const matchesPrice = property.tokenPrice >= priceRange[0] && property.tokenPrice <= priceRange[1];
      const matchesYield = property.annualYield >= yieldRange[0] && property.annualYield <= yieldRange[1];
      
      return matchesSearch && matchesCity && matchesPrice && matchesYield;
    }).sort((a, b) => {
      switch (sortBy) {
        case 'price': return a.tokenPrice - b.tokenPrice;
        case 'yield': return b.annualYield - a.annualYield;
        case 'created': return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        default: return 0;
      }
    });
  }, [properties, searchQuery, selectedCity, priceRange, yieldRange, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Header */}
      <div className="bg-gradient-primary text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Property Marketplace
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Discover tokenized real estate opportunities with guaranteed rental yields
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Filters
                  <Button variant="ghost" size="sm" onClick={() => {
                    setSearchQuery('');
                    setSelectedCity('all');
                    setPriceRange([0, 1000]);
                    setYieldRange([0, 15]);
                  }}>
                    Clear
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Search</label>
                  <Input
                    placeholder="Search properties..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                {/* City Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">City</label>
                  <Select value={selectedCity} onValueChange={setSelectedCity}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map(city => (
                        <SelectItem key={city} value={city}>
                          {city === 'all' ? 'All Cities' : city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Token Price: ${priceRange[0]} - ${priceRange[1]}
                  </label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={1000}
                    step={10}
                    className="mt-2"
                  />
                </div>

                {/* Yield Range */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Annual Yield: {yieldRange[0]}% - {yieldRange[1]}%
                  </label>
                  <Slider
                    value={yieldRange}
                    onValueChange={setYieldRange}
                    max={15}
                    step={0.1}
                    className="mt-2"
                  />
                </div>

                <Separator />

                {/* Map View Toggle */}
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Map View</label>
                  <Switch 
                    checked={showMapView} 
                    onCheckedChange={setShowMapView} 
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* AI Smart Picks */}
            {smartPicks.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  🤖 AI Smart Picks
                  <Badge variant="secondary">Personalized</Badge>
                </h2>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  {smartPicks.slice(0, 2).map((property, index) => (
                    <motion.div
                      key={property.id}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="property-card cursor-pointer"
                      onClick={() => navigate(`/properties/${property.id}`)}
                    >
                      <div className="relative">
                        <img
                          src={property.images[0]}
                          alt={property.title}
                          className="w-full h-32 object-cover"
                        />
                        <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground">
                          AI Pick
                        </Badge>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold mb-1">{property.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{property.city}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">${property.tokenPrice}/token</span>
                          <Badge className="yield-badge-high text-xs">
                            {property.annualYield}% APY
                          </Badge>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Sort and View Controls */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">
                  {filteredProperties.length} properties found
                </span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yield">Highest Yield</SelectItem>
                    <SelectItem value="price">Lowest Price</SelectItem>
                    <SelectItem value="created">Newest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Properties Grid */}
            <motion.div
              layout
              className="grid md:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              {filteredProperties.map((property, index) => (
                <motion.div
                  key={property.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="property-card cursor-pointer"
                  onClick={() => navigate(`/properties/${property.id}`)}
                >
                  <div className="relative">
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="w-full h-48 object-cover"
                    />
                    <Badge className="absolute top-3 right-3 yield-badge-high">
                      {property.annualYield}% APY
                    </Badge>
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="bg-black/50 backdrop-blur-sm rounded-lg p-2 text-white text-sm">
                        {Math.round((property.totalTokens - property.soldTokens) / property.totalTokens * 100)}% Available
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
                    <p className="text-muted-foreground mb-4">{property.address}</p>
                    
                    <div className="space-y-3">
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

                    <Button className="w-full mt-4 interactive-scale">
                      View Details
                    </Button>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {filteredProperties.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="text-6xl mb-4">🏢</div>
                <h3 className="text-xl font-semibold mb-2">No Properties Found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your filters to see more results
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}