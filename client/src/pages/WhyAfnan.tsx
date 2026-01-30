import { motion } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Check, Award, Truck, Shield, Heart, Star } from 'lucide-react';

const reasons = [
  {
    icon: Award,
    title: 'Balanced Spice Mix',
    description: 'Pre-measured spice blends tuned for Pakistani taste—consistent results every time.'
  },
  {
    icon: Heart,
    title: 'Made for Home Cooks',
    description: 'Simple steps, clear quantities, and no guesswork. Anyone can cook these dishes.'
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Quick delivery across Pakistan with Cash on Delivery available in major cities.'
  },
  {
    icon: Shield,
    title: 'Carefully Packed',
    description: 'Ingredients are packed neatly and labeled so you can prep quickly and cook confidently.'
  },
  {
    icon: Star,
    title: 'Customer First',
    description: 'Support on WhatsApp if you need help cooking or have an issue with delivery.'
  },
  {
    icon: Check,
    title: 'Great Value',
    description: 'Save time, avoid multiple store trips, and still get a restaurant-style result.'
  }
];

export default function WhyAfnan() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h1 className="font-serif text-4xl md:text-5xl mb-4">Why Recipe Kits?</h1>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Discover what makes our kits the easiest way to cook Pakistani dishes at home.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {reasons.map((reason, index) => (
                <motion.div
                  key={reason.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-card border border-border rounded-xl p-8 text-center hover:shadow-lg transition-shadow"
                >
                  <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <reason.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl mb-3">{reason.title}</h3>
                  <p className="text-muted-foreground">{reason.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-20 bg-muted/50 rounded-2xl p-8 md:p-12 text-center"
            >
              <h2 className="font-serif text-3xl mb-4">Ready to Cook?</h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Browse the kits and order with Cash on Delivery. Your ingredients and spice mix arrive together, ready to cook.
              </p>
              <a
                href="/products"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-medium tracking-wide uppercase text-sm hover:bg-primary/90 transition-colors"
              >
                View Kits
              </a>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
