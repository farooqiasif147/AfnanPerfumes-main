import { motion } from "framer-motion";
import { Truck, RefreshCw, Package, Clock, Globe, Shield } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function Shipping() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">
              Delivery Information
            </p>
            <h1 className="font-serif text-4xl md:text-5xl mb-4">
              Shipping & Returns
            </h1>
            <p className="text-muted-foreground text-lg">
              Everything you need to know about delivery and our return policy
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              {
                icon: Truck,
                title: "Free Shipping",
                description: "On orders over $75",
              },
              {
                icon: Clock,
                title: "3-5 Days",
                description: "Standard delivery time",
              },
              {
                icon: RefreshCw,
                title: "30-Day Returns",
                description: "Hassle-free returns",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 bg-card border border-border rounded-xl"
              >
                <item.icon className="w-8 h-8 mx-auto mb-4 text-primary" />
                <h3 className="font-medium mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-12"
          >
            <section>
              <div className="flex items-center gap-3 mb-6">
                <Package className="w-6 h-6 text-primary" />
                <h2 className="font-serif text-2xl">Shipping Options</h2>
              </div>
              <div className="bg-card border border-border rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left py-4 px-6 font-medium">
                        Shipping Method
                      </th>
                      <th className="text-left py-4 px-6 font-medium">
                        Delivery Time
                      </th>
                      <th className="text-right py-4 px-6 font-medium">Cost</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr>
                      <td className="py-4 px-6">Standard Shipping</td>
                      <td className="py-4 px-6 text-muted-foreground">
                        3-5 business days
                      </td>
                      <td className="py-4 px-6 text-right">
                        $10 (Free over $75)
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6">Express Shipping</td>
                      <td className="py-4 px-6 text-muted-foreground">
                        1-2 business days
                      </td>
                      <td className="py-4 px-6 text-right">$25</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6">Next Day Delivery</td>
                      <td className="py-4 px-6 text-muted-foreground">
                        Next business day
                      </td>
                      <td className="py-4 px-6 text-right">$40</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-6">
                <Globe className="w-6 h-6 text-primary" />
                <h2 className="font-serif text-2xl">International Shipping</h2>
              </div>
              <div className="bg-card border border-border rounded-xl p-6 space-y-4 text-foreground/80">
                <p className="leading-relaxed">
                  We ship to over 50 countries worldwide. International shipping
                  rates are calculated at checkout based on your location and
                  order weight.
                </p>
                <p className="leading-relaxed">
                  Please note that international orders may be subject to import
                  duties and taxes, which are the responsibility of the
                  recipient. Delivery times vary by location and typically range
                  from 7-14 business days.
                </p>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-6">
                <RefreshCw className="w-6 h-6 text-primary" />
                <h2 className="font-serif text-2xl">Return Policy</h2>
              </div>
              <div className="bg-card border border-border rounded-xl p-6 space-y-4 text-foreground/80">
                <p className="leading-relaxed">
                  We want you to be completely satisfied with your purchase. If
                  you're not happy with your order, you may return it within 30
                  days of delivery.
                </p>
                <div className="space-y-2">
                  <p className="font-medium text-foreground">
                    Return Conditions:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Products must be unopened and in original packaging</li>
                    <li>Include original receipt or proof of purchase</li>
                    <li>Items must be returned within 30 days of delivery</li>
                    <li>
                      Opened or used products cannot be returned due to hygiene
                      reasons
                    </li>
                  </ul>
                </div>
                <p className="leading-relaxed">
                  To initiate a return, please contact our customer service team
                  at returns@lumiere.com or call +33 1 23 45 67 89. We will
                  provide you with a prepaid return label for domestic orders.
                </p>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-6 h-6 text-primary" />
                <h2 className="font-serif text-2xl">Secure Packaging</h2>
              </div>
              <div className="bg-card border border-border rounded-xl p-6 space-y-4 text-foreground/80">
                <p className="leading-relaxed">
                  Every Afnan Perfumes fragrance is carefully packaged to ensure
                  it arrives in perfect condition. Our luxury packaging
                  includes:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Protective foam inserts</li>
                  <li>Signature Afnan Perfumes gift box</li>
                  <li>Tissue paper wrapping</li>
                  <li>Sealed outer shipping box</li>
                </ul>
              </div>
            </section>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
