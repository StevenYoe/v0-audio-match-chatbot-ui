'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import RecommendationCard from './recommendation-card';

const mockRecommendations = [
  {
    id: '1',
    name: 'Alpine iLX-F511',
    category: 'Head Unit',
    description: 'Premium touchscreen with CarPlay support',
    price: 'Rp 13.485.000',
    image: '🎛️',
  },
  {
    id: '2',
    name: 'Pioneer TS-A2000',
    category: 'Speakers',
    description: 'High-performance component speakers',
    price: 'Rp 8.985.000',
    image: '🔊',
  },
  {
    id: '3',
    name: 'JBL GTR 12SL',
    category: 'Subwoofer',
    description: 'Compact powered subwoofer with 500W',
    price: 'Rp 5.235.000',
    image: '📦',
  },
];

interface RecommendationsPanelProps {
  onBrowseAll?: () => void;
  onSelectProduct?: (product: any) => void;
}

export default function RecommendationsPanel({ onBrowseAll, onSelectProduct }: RecommendationsPanelProps) {
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
        {mockRecommendations.map((rec, idx) => (
          <RecommendationCard
            key={rec.id}
            recommendation={rec}
            index={idx}
            onSelectProduct={() => onSelectProduct?.(rec)}
          />
        ))}
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
