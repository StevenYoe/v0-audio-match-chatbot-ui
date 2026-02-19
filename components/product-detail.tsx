'use client';

import { motion } from 'framer-motion';
import { X, Star, ShoppingCart, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  image: string;
  description: string;
  specs: string[];
  rating: number;
  reviews: number;
}

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
}

export default function ProductDetail({ product, onClose }: ProductDetailProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="glass-panel w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <motion.button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-card/50 hover:bg-card border border-border/50 transition-colors z-10"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <X className="w-5 h-5 text-foreground" />
        </motion.button>

        <div className="p-6 space-y-6">
          {/* Product Image and Title */}
          <div className="flex gap-6">
            <div className="text-6xl flex-shrink-0">{product.image}</div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-foreground mb-2">{product.name}</h2>
              <p className="text-primary text-lg font-medium mb-4">{product.category}</p>
              
              {/* Rating */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex gap-1">
                  {Array(5).fill(0).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="text-4xl font-bold text-primary">{product.price}</div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">Description</h3>
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>
          </div>

          {/* Specifications */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">Features</h3>
            <div className="grid grid-cols-2 gap-3">
              {product.specs.map((spec, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-lg bg-card/50 border border-border/30"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">{spec}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <motion.button
              onClick={onClose}
              className="flex-1 py-3 rounded-lg bg-card border border-border/50 hover:bg-card/80 text-foreground font-semibold transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Close
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
