import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { storyImageUrl } from '@/data/products';

export function OurStory() {
  return (
    <section className="py-16 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">
              How It Works
            </p>
            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl mb-6">
              From Video <br />
              <span className="text-gradient-gold">to Dinner</span>
            </h2>

            <p className="text-foreground/80 leading-relaxed mb-6 text-sm md:text-base">
              You see a dish you love in an ad, click to open the product page, and order the full kit in seconds.
            </p>

            <p className="text-foreground/80 leading-relaxed mb-8 text-sm md:text-base">
              We pack the key ingredients and a balanced spice mix, so you can cook authentic Pakistani recipes at home without hunting items in the supermarket.
            </p>

            <div className="grid grid-cols-3 gap-4 md:gap-8 mb-10">
              <div>
                <p className="font-serif text-2xl md:text-4xl text-primary mb-1">4</p>
                <p className="text-xs md:text-sm text-muted-foreground">Starter Kits</p>
              </div>
              <div>
                <p className="font-serif text-2xl md:text-4xl text-primary mb-1">COD</p>
                <p className="text-xs md:text-sm text-muted-foreground">Nationwide</p>
              </div>
              <div>
                <p className="font-serif text-2xl md:text-4xl text-primary mb-1">Easy</p>
                <p className="text-xs md:text-sm text-muted-foreground">Step-by-step</p>
              </div>
            </div>

            <Link
              href="/about"
              data-testid="link-story-about"
              className="inline-flex items-center gap-2 text-primary font-medium uppercase tracking-wide text-sm group"
            >
              Learn More
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                <img
                  src={storyImageUrl}
                  alt="Cooking ingredients"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 md:w-48 h-32 md:h-48 border-2 border-primary/30 rounded-2xl -z-10 hidden md:block" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
