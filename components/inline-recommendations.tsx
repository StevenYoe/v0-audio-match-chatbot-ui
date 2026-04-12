'use client';

import { motion } from 'framer-motion';
import { Package } from 'lucide-react';
import RecommendationCard from './recommendation-card';

interface Recommendation {
  id: string;
  name: string;
  category?: string;
  description?: string;
  price?: string | number;
}

interface InlineRecommendationsProps {
  recommendations: Recommendation[];
}

export default function InlineRecommendations({ recommendations }: InlineRecommendationsProps) {
  if (!recommendations || recommendations.length === 0) {
    return null;
  }

  return (
    <motion.div
      className="mt-4 space-y-3"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <div className="flex items-center gap-2 mb-3">
        <Package className="w-4 h-4 text-primary" />
        <h3 className="text-sm font-semibold text-foreground">
          Recommended Products
        </h3>
      </div>

      <div className="space-y-2">
        {recommendations.map((rec, idx) => (
          <RecommendationCard
            key={rec.id}
            recommendation={rec}
            index={idx}
          />
        ))}
      </div>
    </motion.div>
  );
}
