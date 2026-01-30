import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Flame, ShoppingBag, Sparkles, Star, Timer } from "lucide-react";
import { featuredProduct } from "@/data/products";

export function FeaturedProduct() {
  const product = featuredProduct;
  const [, setLocation] = useLocation();

  const handleBuyNow = () => {
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
            {product.originalPrice ? (
              <div className="absolute -bottom-6 -right-6 w-32 h-32 md:w-40 md:h-40 bg-primary rounded-2xl flex items-center justify-center">
                <div className="text-center text-primary-foreground">
                  <p className="text-xs uppercase tracking-wider mb-1">Save</p>
                  <p className="font-serif text-3xl md:text-4xl">
                    Rs. {(product.originalPrice - product.price).toLocaleString()}
                  </p>
                  <p className="text-xs uppercase tracking-wider">Today</p>
                </div>
              </div>
            ) : null}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">
              Featured Kit
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-4">
              {product.name}
            </h2>
            <p className="text-muted-foreground text-lg mb-6">
              {product.subtitle} · {product.size}
            </p>

            <div className="flex items-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-primary text-primary" />
              ))}
              <span className="ml-2 text-muted-foreground text-sm">4.9 (128 reviews)</span>
            </div>

            <p className="text-foreground/80 leading-relaxed mb-8">
              {product.description}
            </p>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center p-4 bg-background rounded-lg">
                <Flame className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  Spice Level
                </p>
                <p className="font-medium capitalize">{product.intensity}</p>
              </div>
              <div className="text-center p-4 bg-background rounded-lg">
                <Timer className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  Cook Time
                </p>
                <p className="font-medium">45-90 min</p>
              </div>
              <div className="text-center p-4 bg-background rounded-lg">
                <Sparkles className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  Result
                </p>
                <p className="font-medium">Restaurant-style</p>
              </div>
            </div>

            <div className="mb-8">
              <p className="text-sm font-medium mb-3">What's Included</p>
              <div className="flex flex-wrap gap-2">
                {[...product.notes.top, ...product.notes.heart, ...product.notes.base].map(
                  (item) => (
                    <span
                      key={item}
                      className="px-3 py-1 bg-background rounded-full text-sm text-muted-foreground"
                    >
                      {item}
                    </span>
                  ),
                )}
              </div>
            </div>

            <div className="flex items-end gap-4 mb-8">
              <div>
                {product.originalPrice ? (
                  <p className="text-muted-foreground line-through text-lg">
                    Rs. {product.originalPrice.toLocaleString()}
                  </p>
                ) : null}
                <p className="font-serif text-4xl text-primary">
                  Rs. {product.price.toLocaleString()}
                </p>
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
                onClick={handleBuyNow}
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

