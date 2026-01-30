import { Link } from 'wouter';
import { Instagram, Facebook, Twitter, Mail, MapPin, Phone } from 'lucide-react';
import { BRAND } from '@/lib/brand';

const footerLinks = {
  shop: [
    { label: 'All Products', href: '/products' },
    { label: 'New Arrivals', href: '/products' },
    { label: 'Bestsellers', href: '/products' },
  ],
  about: [
    { label: 'Our Story', href: '/about' },
    { label: 'Why Recipe Kits?', href: '/why-afnan' },
  ],
  support: [
    { label: 'Contact Us', href: '/contact' },
    { label: 'Shipping & Returns', href: '/shipping' },
    { label: 'FAQ', href: '/faq' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms & Conditions', href: '/terms' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 md:py-20">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
            <div className="col-span-2 md:col-span-1">
              <Link href="/" data-testid="link-footer-logo">
                <h2 className="font-serif text-lg md:text-xl tracking-[0.1em] mb-4 md:mb-6">{BRAND.name}</h2>
              </Link>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed mb-4 md:mb-6">
                {BRAND.tagline}
              </p>
              <div className="flex gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="link-social-instagram"
                  className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="link-social-facebook"
                  className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="link-social-twitter"
                  className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-xs md:text-sm uppercase tracking-wider mb-3 md:mb-4">Shop</h3>
              <ul className="space-y-2 md:space-y-3">
                {footerLinks.shop.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      data-testid={`link-footer-${link.label.toLowerCase().replace(/\s/g, '-')}`}
                      className="text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-xs md:text-sm uppercase tracking-wider mb-3 md:mb-4">About</h3>
              <ul className="space-y-2 md:space-y-3">
                {footerLinks.about.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      data-testid={`link-footer-${link.label.toLowerCase().replace(/\s/g, '-')}`}
                      className="text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-xs md:text-sm uppercase tracking-wider mb-3 md:mb-4">Support</h3>
              <ul className="space-y-2 md:space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      data-testid={`link-footer-${link.label.toLowerCase().replace(/\s/g, '-')}`}
                      className="text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-xs md:text-sm uppercase tracking-wider mb-3 md:mb-4">Contact</h3>
              <ul className="space-y-3 md:space-y-4">
                <li className="flex items-start gap-2 md:gap-3">
                  <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-xs md:text-sm text-muted-foreground">
                    {BRAND.addressLines.map((line, index) => (
                      <span key={line}>
                        {line}
                        {index < BRAND.addressLines.length - 1 ? <br /> : null}
                      </span>
                    ))}
                  </span>
                </li>
                <li className="flex items-center gap-2 md:gap-3">
                  <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-xs md:text-sm text-muted-foreground">{BRAND.whatsapp}</span>
                </li>
                <li className="flex items-center gap-2 md:gap-3">
                  <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-xs md:text-sm text-muted-foreground">{BRAND.email}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="py-4 md:py-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs md:text-sm text-muted-foreground">
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                data-testid={`link-footer-${link.label.toLowerCase().replace(/\s/g, '-')}`}
                className="text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
