import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Newsletter } from "@/components/home/Newsletter";
import { storyImageUrl, heroImageUrl } from "@/data/products";
import { BRAND } from "@/lib/brand";

export default function About() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="relative py-32 md:py-48">
          <div className="absolute inset-0 z-0">
            <img
              src={heroImageUrl}
              alt="Pakistani recipe kits"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">
                About
              </p>
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white mb-6">
                How It Works
              </h1>
              <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto">
                Order a kit, get it delivered, and cook an iconic Pakistani dish at home.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-20 md:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="font-serif text-4xl md:text-5xl mb-6">
                  Cook Without the Supermarket Run
                </h2>
                <p className="text-foreground/80 leading-relaxed mb-6">
                  {BRAND.name} is built for people who love Pakistani food but
                  hate last-minute ingredient hunting. Each kit is designed to
                  make the dish easy, repeatable, and consistent.
                </p>
                <p className="text-foreground/80 leading-relaxed mb-6">
                  You’ll get a balanced spice mix, a simple recipe card, and the
                  key ingredients packed together. You add the basics from your
                  kitchen (like oil and water), and you’re ready to cook.
                </p>
                <p className="text-foreground/80 leading-relaxed">
                  Our goal is simple: click from a cooking video, order in
                  seconds, and cook a dish that tastes like you made it the
                  “proper” way.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                  <img
                    src={storyImageUrl}
                    alt="Cooking ingredients"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-32 bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="font-serif text-4xl md:text-5xl mb-4">
                Our Values
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Balanced Taste",
                  description:
                    "Our recipes are tested for Pakistani taste: spice balance, aroma, and that final restaurant-style finish.",
                },
                {
                  title: "Zero Guesswork",
                  description:
                    "No measuring 15 spices. No searching 6 shops. Everything is portioned and explained step-by-step.",
                },
                {
                  title: "Convenient Delivery",
                  description:
                    "Order today and get your kit delivered with Cash on Delivery available across Pakistan.",
                },
              ].map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center p-8"
                >
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="font-serif text-2xl text-primary">
                      {index + 1}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl mb-4">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="font-serif text-4xl md:text-5xl mb-4">
                By the Numbers
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: "4", label: "Starter Kits" },
                { number: "COD", label: "Nationwide" },
                { number: "3-4", label: "Servings Per Kit" },
                { number: "1", label: "Click to Order" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <p className="font-serif text-5xl md:text-6xl text-primary mb-2">
                    {stat.number}
                  </p>
                  <p className="text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
