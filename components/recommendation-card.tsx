'use client';

import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { formatIDR } from '@/lib/utils';

interface RecommendationCardProps {
  recommendation: {
    id: string;
    name: string;
    category: string;
    description: string;
    price: string;
    image: string;
  };
  index: number;
  onSelectProduct?: () => void;
}

export default function RecommendationCard({
  recommendation,
  index,
  onSelectProduct,
}: RecommendationCardProps) {
  return (
    <motion.div
      onClick={onSelectProduct}
      className="group relative p-3 rounded-xl bg-card/50 border border-border/30 hover:border-primary/50 cursor-pointer transition-all duration-300"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={{
        scale: 1.02,
      }}
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
        {/* Product image emoji and info row */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="text-2xl w-10 h-10 flex items-center justify-center overflow-hidden">
            {recommendation.image.startsWith('http') || recommendation.image.startsWith('/') ? (
              <img src={recommendation.image} alt={recommendation.name} className="w-full h-full object-cover rounded-md" />
            ) : (
              recommendation.image
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-sm font-semibold text-foreground truncate">
                {recommendation.name}
              </h3>
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
            </div>
            <p className="text-xs text-primary font-medium mt-0.5">
              {recommendation.category}
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
          {recommendation.description}
        </p>

        {/* Price */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-foreground">
            {formatIDR(recommendation.price)}
          </span>
          <motion.div
            className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20 transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            View
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
