import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface WalletButtonProps {
  className?: string;
  variant?: 'default' | 'outline' | 'secondary';
}

export function WalletButton({ className, variant = 'default' }: WalletButtonProps) {
  const { wallet, isAuthenticated, connectWallet, disconnectWallet } = useAuth();
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();

  const handleConnect = async (provider: 'metamask' | 'walletconnect' | 'coinbase') => {
    setIsConnecting(true);
    try {
      await connectWallet(provider);
      setShowWalletModal(false);
      toast({
        title: 'Wallet Connected',
        description: `Successfully connected to ${provider}`,
      });
    } catch (error) {
      toast({
        title: 'Connection Failed',
        description: 'Failed to connect wallet. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    await disconnectWallet();
    toast({
      title: 'Wallet Disconnected',
      description: 'Your wallet has been disconnected',
    });
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (isAuthenticated && wallet) {
    return (
      <div className="flex items-center gap-3">
        <div className="text-sm text-muted-foreground">
          {formatAddress(wallet.address)}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleDisconnect}
          className={className}
        >
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <>
      <Button
        onClick={() => setShowWalletModal(true)}
        className={`wallet-button ${className}`}
        variant={variant}
        disabled={isConnecting}
      >
        {isConnecting ? 'Connecting...' : 'Connect Wallet'}
      </Button>

      <Dialog open={showWalletModal} onOpenChange={setShowWalletModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Connect Your Wallet</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant="outline"
                className="w-full justify-start gap-3 p-4 h-auto"
                onClick={() => handleConnect('metamask')}
                disabled={isConnecting}
              >
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">M</span>
                </div>
                <div className="text-left">
                  <div className="font-semibold">MetaMask</div>
                  <div className="text-sm text-muted-foreground">Connect using browser wallet</div>
                </div>
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant="outline"
                className="w-full justify-start gap-3 p-4 h-auto"
                onClick={() => handleConnect('walletconnect')}
                disabled={isConnecting}
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">W</span>
                </div>
                <div className="text-left">
                  <div className="font-semibold">WalletConnect</div>
                  <div className="text-sm text-muted-foreground">Scan with mobile wallet</div>
                </div>
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant="outline"
                className="w-full justify-start gap-3 p-4 h-auto"
                onClick={() => handleConnect('coinbase')}
                disabled={isConnecting}
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">C</span>
                </div>
                <div className="text-left">
                  <div className="font-semibold">Coinbase Wallet</div>
                  <div className="text-sm text-muted-foreground">Connect using Coinbase</div>
                </div>
              </Button>
            </motion.div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}