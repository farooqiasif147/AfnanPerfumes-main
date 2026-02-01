import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function Terms() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="font-serif text-4xl md:text-5xl mb-4">
              Terms & Conditions
            </h1>
            <p className="text-muted-foreground">Last updated: January 2026</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-8 text-foreground/80"
          >
            <section>
              <h2 className="font-serif text-2xl text-foreground mb-4">
                1. Agreement to Terms
              </h2>
              <p className="leading-relaxed">
                By accessing or using the AFNAN PERFUME website, you agree to be
                bound by these Terms and Conditions. If you do not agree with
                any part of these terms, you may not access our website or use
                our services.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-foreground mb-4">
                2. Products and Pricing
              </h2>
              <p className="leading-relaxed mb-4">
                All products displayed on our website are subject to
                availability. We reserve the right to discontinue any product at
                any time. Prices for our products are subject to change without
                notice.
              </p>
              <p className="leading-relaxed">
                We make every effort to display as accurately as possible the
                colors and images of our products. However, we cannot guarantee
                that your computer monitor's display of any color will be
                accurate.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-foreground mb-4">
                3. Orders and Payment
              </h2>
              <p className="leading-relaxed mb-4">
                When you place an order, you offer to purchase the products at
                the prices indicated. We reserve the right to accept or decline
                your order for any reason, including unavailability of products,
                errors in pricing, or suspected fraudulent activity.
              </p>
              <p className="leading-relaxed">
                Payment must be made at the time of ordering. We accept major
                credit cards and other payment methods as indicated at checkout.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-foreground mb-4">
                4. Shipping and Delivery
              </h2>
              <p className="leading-relaxed">
                Shipping times are estimates only and are not guaranteed. We are
                not responsible for delays due to customs, local delivery
                services, or circumstances beyond our control. Risk of loss and
                title for items purchased pass to you upon delivery.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-foreground mb-4">
                5. Returns and Refunds
              </h2>
              <p className="leading-relaxed">
                You may return unopened products within 30 days of delivery for
                a full refund. Opened products cannot be returned due to the
                nature of fragrance products. Please see our Shipping & Returns
                page for complete details.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-foreground mb-4">
                6. Intellectual Property
              </h2>
              <p className="leading-relaxed">
                All content on this website, including text, graphics, logos,
                images, and software, is the property of AFNAN PERFUME and is
                protected by international copyright laws. You may not
                reproduce, distribute, or create derivative works without our
                written consent.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-foreground mb-4">
                7. Limitation of Liability
              </h2>
              <p className="leading-relaxed">
                AFNAN PERFUME shall not be liable for any indirect, incidental,
                special, consequential, or punitive damages resulting from your
                use of or inability to use our website or products. Our
                liability is limited to the amount you paid for the products.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-foreground mb-4">
                8. Governing Law
              </h2>
              <p className="leading-relaxed">
                These Terms shall be governed by and construed in accordance
                with the laws of France, without regard to its conflict of law
                provisions.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-foreground mb-4">
                9. Contact Information
              </h2>
              <p className="leading-relaxed">
                For questions about these Terms and Conditions, please contact
                us at legal@lumiere.com or write to us at 123 Fragrance Avenue,
                Paris, France 75008.
              </p>
            </section>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
