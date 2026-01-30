import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { products } from '@/data/products';

export function ProductsSection() {
  const displayProducts = products.slice(0, 4);

  return (
    <section className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">
            Curated Selection
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-4">
            Bestselling Fragrances
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover our most beloved scents, crafted to perfection and cherished by fragrance connoisseurs worldwide.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12">
          {displayProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Link
            href="/products"
            data-testid="link-view-all-products"
            className="inline-flex items-center gap-2 text-primary font-medium uppercase tracking-wide text-sm group"
          >
            View All Fragrances
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
