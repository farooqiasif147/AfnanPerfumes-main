import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Collection } from '@/data/products';

interface CollectionCardProps {
  collection: Collection;
  index?: number;
}

export function CollectionCard({ collection, index = 0 }: CollectionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        href={`/collections/${collection.id}`}
        data-testid={`card-collection-${collection.id}`}
        className="group block relative aspect-[4/5] overflow-hidden rounded-lg"
      >
        <img
          src={collection.image}
          alt={collection.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
          <p className="text-white/60 text-xs uppercase tracking-wider mb-2">
            {collection.productCount} Kits
          </p>
          <h3 className="font-serif text-2xl md:text-3xl text-white mb-2">
            {collection.name}
          </h3>
          <p className="text-white/70 text-sm mb-4 line-clamp-2">
            {collection.description}
          </p>
          <div className="flex items-center gap-2 text-white text-sm font-medium group-hover:text-primary transition-colors">
            <span>Explore</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
