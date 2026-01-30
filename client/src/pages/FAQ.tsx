import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const faqs = [
  {
    question: 'How do I place an order?',
    answer: 'Simply browse our products, select the fragrance you love, and click "Buy with Cash on Delivery". Fill in your details (Name, WhatsApp, Address, City) and submit. Our team will confirm your order via WhatsApp.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We currently accept Cash on Delivery (COD) across Pakistan. You pay when the order arrives at your doorstep. No advance payment required!'
  },
  {
    question: 'How long does delivery take?',
    answer: 'Delivery typically takes 2-4 business days for major cities like Islamabad, Lahore, and Karachi. Remote areas may take 5-7 business days.'
  },
  {
    question: 'Is shipping free?',
    answer: 'Yes! We offer FREE shipping on all orders across Pakistan. No minimum order required.'
  },
  {
    question: 'Are your products authentic?',
    answer: 'Absolutely! All our perfumes are 100% authentic and sourced directly from trusted suppliers. We guarantee the quality of every product we sell.'
  },
  {
    question: 'Can I return or exchange a product?',
    answer: 'Yes, we offer a 7-day return policy for unopened products. If you receive a damaged or wrong product, please contact us immediately via WhatsApp and we will arrange a replacement.'
  },
  {
    question: 'How can I track my order?',
    answer: 'Once your order is dispatched, we will share the tracking details via WhatsApp. You can track your parcel using the provided courier tracking link.'
  },
  {
    question: 'Do you deliver to all cities in Pakistan?',
    answer: 'Yes, we deliver nationwide across Pakistan. Whether you are in a major city or a remote area, we will get your order to you!'
  },
  {
    question: 'How do I contact customer support?',
    answer: 'You can reach us via WhatsApp at +92 300 1234567 or email us at hello@afnanperfumes.pk. We typically respond within a few hours during business hours.'
  },
  {
    question: 'Can I order multiple products?',
    answer: 'Absolutely! You can add multiple products to your order. During checkout, you can also add more products as add-ons to increase your order value and get everything delivered together.'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-12 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10 md:mb-16"
          >
            <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">
              Help Center
            </p>
            <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
              Find answers to common questions about ordering, shipping, and our products.
            </p>
          </motion.div>

          <div className="space-y-3 md:space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border border-border rounded-xl overflow-hidden"
              >
                <button
                  data-testid={`faq-${index}`}
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 md:p-6 text-left hover:bg-accent/50 transition-colors"
                >
                  <span className="font-medium text-sm md:text-base pr-4">{faq.question}</span>
                  <ChevronDown 
                    className={`w-5 h-5 flex-shrink-0 text-muted-foreground transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`} 
                  />
                </button>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-4 md:px-6 pb-4 md:pb-6"
                  >
                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 md:mt-16 p-6 md:p-8 bg-muted/50 rounded-2xl text-center"
          >
            <h2 className="font-serif text-xl md:text-2xl mb-3 md:mb-4">Still have questions?</h2>
            <p className="text-muted-foreground mb-4 md:mb-6 text-sm md:text-base">
              Can't find what you're looking for? Reach out to our team.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 bg-primary text-primary-foreground font-medium tracking-wide uppercase text-sm hover:bg-primary/90 transition-colors"
            >
              Contact Us
            </a>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
