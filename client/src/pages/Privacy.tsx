import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BRAND } from "@/lib/brand";

export default function Privacy() {
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
              Privacy Policy
            </h1>
            <p className="text-muted-foreground">Last updated: January 2026</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="prose prose-lg max-w-none"
          >
            <div className="space-y-8 text-foreground/80">
              <section>
                <h2 className="font-serif text-2xl text-foreground mb-4">
                  Introduction
                </h2>
                <p className="leading-relaxed">
                  At {BRAND.name}, we are committed to protecting your privacy
                  and keeping your personal information secure. This Privacy
                  Policy explains how we collect, use, and safeguard your
                  information when you visit our website or place an order.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl text-foreground mb-4">
                  Information We Collect
                </h2>
                <p className="leading-relaxed mb-4">
                  We may collect information about you in various ways:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Personal data you provide when creating an account or making
                    a purchase (name, email, address, payment information)
                  </li>
                  <li>
                    Information automatically collected through cookies and
                    tracking technologies
                  </li>
                  <li>
                    Information you provide when contacting our customer service
                  </li>
                  <li>
                    Preferences and interests based on your browsing behavior
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="font-serif text-2xl text-foreground mb-4">
                  How We Use Your Information
                </h2>
                <p className="leading-relaxed mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Process and fulfill your orders</li>
                  <li>Send order confirmations and shipping updates</li>
                  <li>
                    Respond to your inquiries and customer service requests
                  </li>
                  <li>Send marketing communications (with your consent)</li>
                  <li>Improve our website and services</li>
                  <li>Prevent fraud and maintain security</li>
                </ul>
              </section>

              <section>
                <h2 className="font-serif text-2xl text-foreground mb-4">
                  Information Sharing
                </h2>
                <p className="leading-relaxed">
                  We do not sell, trade, or rent your personal information to
                  third parties. We may share your information with trusted
                  service providers who assist us in operating our website,
                  conducting our business, or servicing you, so long as those
                  parties agree to keep this information confidential.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl text-foreground mb-4">
                  Data Security
                </h2>
                <p className="leading-relaxed">
                  We implement appropriate technical and organizational security
                  measures to protect your personal information against
                  unauthorized access, alteration, disclosure, or destruction.
                  All payment transactions are encrypted using SSL technology.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl text-foreground mb-4">
                  Your Rights
                </h2>
                <p className="leading-relaxed mb-4">You have the right to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Data portability</li>
                </ul>
              </section>

              <section>
                <h2 className="font-serif text-2xl text-foreground mb-4">
                  Contact Us
                </h2>
                <p className="leading-relaxed">
                  If you have any questions about this Privacy Policy or our
                  data practices, please contact us at {BRAND.email}.
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
