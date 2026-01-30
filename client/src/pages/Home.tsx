import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/home/Hero';
import { ProductsSection } from '@/components/home/ProductsSection';
import { FeaturedProduct } from '@/components/home/FeaturedProduct';
import { OurStory } from '@/components/home/OurStory';
import { Newsletter } from '@/components/home/Newsletter';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <ProductsSection />
        <FeaturedProduct />
        <OurStory />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
