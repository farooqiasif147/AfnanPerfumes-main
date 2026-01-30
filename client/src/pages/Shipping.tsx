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
                description: "Across Pakistan",
              },
              {
                icon: Clock,
                title: "2-4 Days",
                description: "Major cities",
              },
              {
                icon: RefreshCw,
                title: "Issue Support",
                description: "Damaged/wrong items",
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
                        2-4 business days
                      </td>
                      <td className="py-4 px-6 text-right">
                        Free
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6">Express Shipping</td>
                      <td className="py-4 px-6 text-muted-foreground">
                        1-2 business days (select cities)
                      </td>
                      <td className="py-4 px-6 text-right">Rs. 299</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-6">
                <Globe className="w-6 h-6 text-primary" />
                <h2 className="font-serif text-2xl">Cash on Delivery (COD)</h2>
              </div>
              <div className="bg-card border border-border rounded-xl p-6 space-y-4 text-foreground/80">
                <p className="leading-relaxed">
                  We offer Cash on Delivery across Pakistan. You pay when the
                  parcel arrives at your doorstep.
                </p>
                <p className="leading-relaxed">
                  After you place an order, we may confirm it via WhatsApp
                  before dispatching.
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
                  you receive a damaged or wrong item, contact us and we’ll help
                  resolve it quickly.
                </p>
                <div className="space-y-2">
                  <p className="font-medium text-foreground">
                    Return Conditions:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Report any damage/wrong item within 48 hours</li>
                    <li>Include original receipt or proof of purchase</li>
                    <li>
                      Food/ingredient items may not be eligible for return after
                      opening
                    </li>
                  </ul>
                </div>
                <p className="leading-relaxed">
                  To initiate a return, please contact our customer service team
                  via WhatsApp or email (see Contact page). We will guide you on
                  the next steps.
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
                  Every kit is carefully packed and labeled to help you prep
                  quickly and cook confidently. Packaging typically includes:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Sealed ingredient packs</li>
                  <li>Recipe card with step-by-step cooking guide</li>
                  <li>Outer shipping box with protective padding</li>
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
