import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Newsletter } from "@/components/home/Newsletter";
import { storyImageUrl, heroImageUrl } from "@/data/products";

export default function About() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="relative py-32 md:py-48">
          <div className="absolute inset-0 z-0">
            <img
              src={heroImageUrl}
              alt="AFNAN PERFUME Heritage"
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
                Our Story
              </p>
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white mb-6">
                The Art of Perfumery
              </h1>
              <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto">
                Since 1987, we've been crafting extraordinary fragrances that
                tell unique stories.
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
                  A Legacy of Excellence
                </h2>
                <p className="text-foreground/80 leading-relaxed mb-6">
                  AFNAN PERFUME was founded in Paris in 1987 by master perfumer
                  Jean-Claude Beaumont. With a vision to create fragrances that
                  transcend the ordinary, he established a maison dedicated to
                  the art of fine perfumery.
                </p>
                <p className="text-foreground/80 leading-relaxed mb-6">
                  Today, our team of master perfumers continues this tradition,
                  traveling the world to source the rarest and most precious
                  ingredients. From the jasmine fields of Grasse to the
                  sandalwood forests of Mysore, we spare no effort in our
                  pursuit of olfactory perfection.
                </p>
                <p className="text-foreground/80 leading-relaxed">
                  Each AFNAN PERFUME fragrance is a masterpiece, meticulously
                  crafted over months of careful development and refinement. We
                  believe that a truly great perfume should evoke emotion,
                  create memories, and become an extension of one's personality.
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
                    alt="Perfume craftsmanship"
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
                  title: "Uncompromising Quality",
                  description:
                    "We source only the finest natural ingredients, never compromising on quality for cost. Every drop of AFNAN PERFUME perfume reflects our commitment to excellence.",
                },
                {
                  title: "Artisanal Craftsmanship",
                  description:
                    "Our master perfumers bring decades of expertise to every creation. Each fragrance undergoes hundreds of iterations before achieving perfection.",
                },
                {
                  title: "Sustainable Luxury",
                  description:
                    "We believe luxury and responsibility go hand in hand. Our sustainable practices ensure we protect the precious resources we depend upon.",
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
                { number: "37+", label: "Years of Excellence" },
                { number: "150+", label: "Unique Fragrances" },
                { number: "50+", label: "Countries Worldwide" },
                { number: "1M+", label: "Happy Customers" },
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
