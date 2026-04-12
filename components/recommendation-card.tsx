'use client';

import { motion } from 'framer-motion';
import { formatIDR } from '@/lib/utils';

interface RecommendationCardProps {
  recommendation: {
    id: string;
    name: string;
    category?: string;
    description?: string;
    price?: string | number;
  };
  index: number;
}

export default function RecommendationCard({
  recommendation,
  index,
}: RecommendationCardProps) {
  return (
    <motion.div
      className="group relative p-3 rounded-xl bg-card/50 border border-border/30 transition-all duration-300"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          background: 'radial-gradient(circle at center, rgba(85, 111, 255, 0.1), transparent)',
          pointerEvents: 'none',
        }}
      />

      <div className="relative z-10">
        {/* Product info */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-foreground truncate">
              {recommendation.name}
            </h3>
            {recommendation.category && (
              <p className="text-xs text-primary font-medium mt-0.5">
                {recommendation.category}
              </p>
            )}
          </div>
        </div>

        {/* Description */}
        {recommendation.description && (
          <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
            {recommendation.description}
          </p>
        )}

        {/* Price */}
        {recommendation.price !== undefined && recommendation.price !== null && (
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-foreground">
              {formatIDR(recommendation.price)}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
