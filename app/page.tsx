'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/header';
import ChatInterface from '@/components/chat-interface';
import RecommendationsPanel from '@/components/recommendations-panel';
import CatalogView from '@/components/catalog-view';
import ProductDetail from '@/components/product-detail';

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  image: string;
  description: string;
  specs?: string[];
  rating?: number;
  reviews?: number;
}

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [view, setView] = useState<'home' | 'catalog'>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct({
      ...product,
      specs: [
        'Premium build quality',
        'Easy installation',
        'Warranty included',
        'Expert support',
      ],
      rating: 4.5,
      reviews: 128,
    });
  };

  return (
    <main className="min-h-screen bg-background dark overflow-hidden">
      {/* Animated background gradient */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 soundwave" />
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            background: [
              'radial-gradient(at 20% 50%, rgba(85, 111, 255, 0.15) 0%, transparent 50%)',
              'radial-gradient(at 80% 50%, rgba(102, 204, 255, 0.15) 0%, transparent 50%)',
              'radial-gradient(at 20% 50%, rgba(85, 111, 255, 0.15) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          style={{ pointerEvents: 'none' }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col h-screen">
        <Header />
        
        {/* Two-column layout */}
        <div className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            {view === 'home' ? (
              <motion.div
                key="home"
                className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Chat Interface - Takes up 2 columns on desktop */}
                <div className="lg:col-span-2 flex flex-col min-h-0">
                  <ChatInterface />
                </div>

                {/* Recommendations Panel - Takes up 1 column on desktop */}
                <div className="flex flex-col min-h-0">
                  <RecommendationsPanel onBrowseAll={() => setView('catalog')} />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="catalog"
                className="h-full p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <CatalogView
                  onBack={() => setView('home')}
                  onSelectProduct={handleSelectProduct}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductDetail
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
