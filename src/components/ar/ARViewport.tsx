import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

interface ARViewportProps {
  isOpen: boolean;
  onClose: () => void;
  propertyId: string;
  className?: string;
}

export function ARViewport({ isOpen, onClose, propertyId, className }: ARViewportProps) {
  const [isARSupported, setIsARSupported] = useState(false);
  const [scale, setScale] = useState([1]);
  const [rotation, setRotation] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Check if WebXR is supported
    if ('xr' in navigator) {
      // @ts-ignore - WebXR types may not be fully available
      navigator.xr?.isSessionSupported('immersive-ar').then((supported: boolean) => {
        setIsARSupported(supported);
      });
    }
    
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleStartAR = async () => {
    if (!isARSupported) {
      alert('AR is not supported on this device');
      return;
    }

    try {
      // TODO: Implement actual WebXR AR session
      console.log('Starting AR session for property:', propertyId);
    } catch (error) {
      console.error('Failed to start AR session:', error);
    }
  };

  const handle3DModelInteraction = (action: 'rotate' | 'reset' | 'zoom') => {
    switch (action) {
      case 'rotate':
        setRotation(prev => prev + 45);
        break;
      case 'reset':
        setRotation(0);
        setScale([1]);
        break;
      case 'zoom':
        // Zoom handled by slider
        break;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
        >
          <div className={cn('absolute inset-4 flex flex-col', className)}>
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-gradient-glass rounded-t-xl">
              <h2 className="text-xl font-semibold text-white">AR Property View</h2>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleStartAR}
                  disabled={!isARSupported}
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  {isARSupported ? 'Start AR' : 'AR Not Available'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onClose}
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  ✕
                </Button>
              </div>
            </div>

            {/* Main AR Viewport */}
            <div className="flex-1 relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-b-xl overflow-hidden">
              {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
                  />
                </div>
              ) : (
                <>
                  {/* 3D Model Placeholder */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      transform: `scale(${scale[0]}) rotateY(${rotation}deg)`,
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  >
                    <div className="w-64 h-64 bg-gradient-to-br from-primary to-accent rounded-lg shadow-2xl flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="text-4xl mb-2">🏢</div>
                        <p className="text-sm">3D Property Model</p>
                        <p className="text-xs opacity-75">Property ID: {propertyId}</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* AR Overlay UI */}
                  <div className="absolute inset-0 pointer-events-none">
                    {/* AR Frame Corners */}
                    <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-primary"></div>
                    <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-primary"></div>
                    <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-primary"></div>
                    <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-primary"></div>
                  </div>
                </>
              )}
            </div>

            {/* Controls */}
            <Card className="m-4 p-4 bg-gradient-glass border-white/20">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <label className="text-sm font-medium text-white min-w-16">Scale:</label>
                  <Slider
                    value={scale}
                    onValueChange={setScale}
                    max={2}
                    min={0.5}
                    step={0.1}
                    className="flex-1"
                  />
                  <span className="text-sm text-white min-w-12">{scale[0].toFixed(1)}x</span>
                </div>

                <div className="flex items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handle3DModelInteraction('rotate')}
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    🔄 Rotate
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handle3DModelInteraction('reset')}
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    🔄 Reset View
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    className="bg-primary hover:bg-primary-glow"
                  >
                    📱 Add to Portfolio
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}