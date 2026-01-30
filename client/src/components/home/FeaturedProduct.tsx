import { Link, useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Droplets, Clock, Sparkles, ShoppingBag } from 'lucide-react';
import { featuredProduct } from '@/data/products';

export function FeaturedProduct() {
  const product = featuredProduct;
  const [, setLocation] = useLocation();

  const handleAddToBag = () => {
    setLocation(`/product/${product.id}?checkout=true`);
  };

  return (
    <section className="py-20 md:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 md:w-40 md:h-40 bg-primary rounded-2xl flex items-center justify-center">
              <div className="text-center text-primary-foreground">
                <p className="text-xs uppercase tracking-wider mb-1">Special</p>
                <p className="font-serif text-3xl md:text-4xl">
                  20%
                </p>
                <p className="text-xs uppercase tracking-wider">Off</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">
              Featured Fragrance
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-4">
              {product.name}
            </h2>
            <p className="text-muted-foreground text-lg mb-6">
              {product.subtitle} · {product.size}
            </p>

            <div className="flex items-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-primary text-primary"
                />
              ))}
              <span className="ml-2 text-muted-foreground text-sm">
                4.9 (128 reviews)
              </span>
            </div>

            <p className="text-foreground/80 leading-relaxed mb-8">
              {product.description}
            </p>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center p-4 bg-background rounded-lg">
                <Droplets className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Intensity</p>
                <p className="font-medium capitalize">{product.intensity}</p>
              </div>
              <div className="text-center p-4 bg-background rounded-lg">
                <Clock className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Longevity</p>
                <p className="font-medium">12+ Hours</p>
              </div>
              <div className="text-center p-4 bg-background rounded-lg">
                <Sparkles className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Sillage</p>
                <p className="font-medium">Heavy</p>
              </div>
            </div>

            <div className="mb-8">
              <p className="text-sm font-medium mb-3">Fragrance Notes</p>
              <div className="flex flex-wrap gap-2">
                {[...product.notes.top, ...product.notes.heart, ...product.notes.base].map((note) => (
                  <span
                    key={note}
                    className="px-3 py-1 bg-background rounded-full text-sm text-muted-foreground"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-end gap-4 mb-8">
              <div>
                <p className="text-muted-foreground line-through text-lg">
                  Rs. {product.originalPrice?.toLocaleString()}
                </p>
                <div className="flex items-baseline gap-2">
                  <p className="font-serif text-4xl text-primary">Rs. {product.price.toLocaleString()}</p>
                  <span className="text-green-600 font-medium text-sm">(Rs. 600 Off)</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`/product/${product.id}`}
                data-testid="link-featured-product"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-medium tracking-wide uppercase text-sm hover:bg-primary/90 transition-colors group"
              >
                View Details
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button
                data-testid="button-add-cart-featured"
                onClick={handleAddToBag}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-600 text-white font-medium tracking-wide uppercase text-sm hover:bg-green-700 transition-colors"
              >
                <ShoppingBag className="w-4 h-4" />
                Buy Now (COD)
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
