'use client';

import { motion } from 'framer-motion';
import { ChevronLeft, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import CatalogCard from './catalog-card';
import { fetchProducts } from '@/lib/api';

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  image: string;
  description: string;
}

interface CatalogViewProps {
  onBack: () => void;
  onSelectProduct: (product: Product) => void;
}

const MOCK_PRODUCTS: Product[] = [];

export default function CatalogView({ onBack, onSelectProduct }: CatalogViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      setIsLoading(true);
      try {
        const fetchedProducts = await fetchProducts();
        if (fetchedProducts && Array.isArray(fetchedProducts) && fetchedProducts.length > 0) {
          setProducts(fetchedProducts);
        }
      } catch (error) {
        console.error('Failed to load products from API:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getProducts();
  }, []);

  const categories = Array.from(new Set(products.map(p => p.category)));

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <motion.div
      className="glass-panel h-full flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Header */}
      <div className="p-4 border-b border-border/30 space-y-4">
        <div className="flex items-center gap-3">
          <motion.button
            onClick={onBack}
            className="p-2 rounded-lg bg-card/50 hover:bg-card border border-border/50 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </motion.button>
          <h2 className="text-xl font-bold text-foreground">Full Catalog</h2>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-input border border-border/50 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50"
          />
        </div>

        {/* Category filter */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          <motion.button
            onClick={() => setSelectedCategory(null)}
            className={`px-3 py-1 rounded-full font-medium whitespace-nowrap transition-all ${
              !selectedCategory
                ? 'bg-primary text-primary-foreground'
                : 'bg-card/50 text-muted-foreground border border-border/30 hover:border-border'
            }`}
            whileHover={{ scale: 1.05 }}
          >
            All
          </motion.button>
          {categories.map(category => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1 rounded-full font-medium whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card/50 text-muted-foreground border border-border/30 hover:border-border'
              }`}
              whileHover={{ scale: 1.05 }}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filteredProducts.map((product, idx) => (
            <CatalogCard
              key={product.id}
              product={product}
              index={idx}
              onClick={() => onSelectProduct(product)}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <motion.div
            className="h-full flex items-center justify-center text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div>
              <p className="text-muted-foreground text-lg mb-2">No products found</p>
              <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
