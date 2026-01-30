import { Link, useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [, setLocation] = useLocation();

  const handleAddToBag = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLocation(`/product/${product.id}?checkout=true`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Link
        href={`/product/${product.id}`}
        data-testid={`card-product-${product.id}`}
        className="block"
      >
        <div className="relative aspect-[3/4] bg-muted rounded-lg overflow-hidden mb-4">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

          {product.isNew && (
            <span className="absolute top-4 left-4 px-3 py-1 bg-primary text-primary-foreground text-xs uppercase tracking-wider">
              New
            </span>
          )}

          {product.isBestseller && !product.isNew && (
            <span className="absolute top-4 left-4 px-3 py-1 bg-foreground text-background text-xs uppercase tracking-wider">
              Bestseller
            </span>
          )}

          {product.originalPrice && (
            <span className="absolute top-4 right-4 px-3 py-1 bg-destructive text-destructive-foreground text-xs uppercase tracking-wider">
              Sale
            </span>
          )}

          <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <button
              data-testid={`button-add-cart-${product.id}`}
              onClick={handleAddToBag}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              Buy Now
            </button>
          </div>
        </div>

        <div className="text-center">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
            {product.subtitle}
          </p>
          <h3 className="font-serif text-lg mb-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center justify-center gap-2">
            {product.originalPrice && (
              <span className="text-muted-foreground line-through text-sm">
                Rs. {product.originalPrice.toLocaleString()}
              </span>
            )}
            <span className="text-foreground font-medium">Rs. {product.price.toLocaleString()}</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">{product.size}</p>
        </div>
      </Link>
    </motion.div>
  );
}
