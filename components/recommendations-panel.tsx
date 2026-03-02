'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import RecommendationCard from './recommendation-card';
import { fetchProducts } from '@/lib/api';
import { Skeleton } from './ui/skeleton';

const MOCK_RECOMMENDATIONS: any[] = [];

interface RecommendationsPanelProps {
  onBrowseAll?: () => void;
  onSelectProduct?: (product: any) => void;
}

export default function RecommendationsPanel({ onBrowseAll, onSelectProduct }: RecommendationsPanelProps) {
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getRecommendations = async () => {
      setIsLoading(true);
      try {
        const fetchedProducts = await fetchProducts();
        if (fetchedProducts && Array.isArray(fetchedProducts) && fetchedProducts.length > 0) {
          // Take first 3 for recommendations
          setRecommendations(fetchedProducts.slice(0, 3));
        }
      } catch (error) {
        console.error('Failed to load recommendations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getRecommendations();
  }, []);

  return (
    <motion.div
      className="glass-panel flex flex-col h-full"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {/* Header */}
      <div className="p-6 border-b border-border/30">
        <motion.div
          className="flex items-center gap-2"
          animate={{ 
            textShadow: [
              '0 0 0px rgba(102, 204, 255, 0)',
              '0 0 15px rgba(102, 204, 255, 0.5)',
              '0 0 0px rgba(102, 204, 255, 0)',
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Zap className="w-5 h-5 text-secondary" />
          <h2 className="text-lg font-semibold text-foreground">
            Recommended Upgrades
          </h2>
        </motion.div>
        <p className="text-xs text-muted-foreground mt-1">
          Personalized for your setup
        </p>
      </div>

      {/* Recommendations list */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {isLoading ? (
          // Skeleton loader for 3 items
          [1, 2, 3].map((i) => (
            <div key={i} className="p-3 rounded-xl bg-card/50 border border-border/30 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <Skeleton className="w-10 h-10 rounded-md" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
              <Skeleton className="h-3 w-full" />
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-6 w-12 rounded-full" />
              </div>
            </div>
          ))
        ) : (
          recommendations.map((rec, idx) => (
            <RecommendationCard
              key={rec.id}
              recommendation={rec}
              index={idx}
              onSelectProduct={() => onSelectProduct?.(rec)}
            />
          ))
        )}
      </div>

      {/* Footer CTA */}
      <div className="p-4 border-t border-border/30 bg-gradient-to-t from-card/40 to-transparent">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            onClick={onBrowseAll}
            className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-lg font-medium flex items-center justify-center gap-2 button-neon"
          >
            View Full Catalog
            <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
