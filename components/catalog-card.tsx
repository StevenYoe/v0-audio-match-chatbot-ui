'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { formatIDR } from '@/lib/utils';

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  image: string;
  description: string;
}

interface CatalogCardProps {
  product: Product;
  index: number;
  onClick: () => void;
}

export default function CatalogCard({ product, index, onClick }: CatalogCardProps) {
  return (
    <motion.div
      onClick={onClick}
      className="group relative p-4 rounded-xl bg-card/40 border border-border/50 hover:border-primary/50 cursor-pointer transition-all overflow-hidden"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{
        scale: 1.02,
        boxShadow: '0 0 30px rgba(85, 111, 255, 0.2)',
      }}
    >
      {/* Hover glow background */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          background: 'radial-gradient(circle at center, rgba(85, 111, 255, 0.1), transparent)',
          pointerEvents: 'none',
        }}
      />

      <div className="relative z-10 space-y-3">
        {/* Image and Category */}
        <div className="flex items-start justify-between">
          <div className="text-4xl w-12 h-12 flex items-center justify-center overflow-hidden">
            {product.image.startsWith('http') || product.image.startsWith('/') ? (
              <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-lg" />
            ) : (
              product.image
            )}
          </div>
          <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/30 font-medium">
            {product.category}
          </span>
        </div>

        {/* Name */}
        <div>
          <h3 className="font-semibold text-foreground text-sm leading-tight group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{product.description}</p>
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between pt-2 border-t border-border/30">
          <span className="text-lg font-bold text-primary">{formatIDR(product.price)}</span>
          <motion.div
            className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all"
            whileHover={{ scale: 1.1 }}
          >
            <ArrowRight className="w-4 h-4" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
