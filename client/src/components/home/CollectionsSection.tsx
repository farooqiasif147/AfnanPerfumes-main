import { motion } from 'framer-motion';
import { CollectionCard } from './CollectionCard';
import { collections } from '@/data/products';

export function CollectionsSection() {
  return (
    <section className="py-20 md:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">
            Explore Our World
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-4">
            Collections
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From timeless classics to bold contemporary creations, find the perfect fragrance for every moment.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {collections.map((collection, index) => (
            <CollectionCard key={collection.id} collection={collection} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
