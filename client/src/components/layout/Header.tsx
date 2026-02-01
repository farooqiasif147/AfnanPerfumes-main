import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/about', label: 'Our Story' },
  { href: '/why-afnan', label: 'Why Afnan?' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile Header */}
          <div className="flex lg:hidden items-center justify-between h-16">
            <button
              data-testid="button-mobile-menu"
              className="p-2 -ml-2 text-foreground/70 hover:text-foreground transition-colors"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>

            <Link href="/" data-testid="link-logo-mobile">
              <h1 className="font-serif text-lg tracking-[0.1em] text-foreground whitespace-nowrap">
                AFNAN PERFUMES
              </h1>
            </Link>

            <Link
              href="/cart"
              data-testid="link-cart-mobile"
              className="p-2 text-foreground/70 hover:text-foreground transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
            </Link>
          </div>

          {/* Desktop Header */}
          <div className="hidden lg:flex items-center justify-between h-20">
            {/* Left Nav */}
            <nav className="flex items-center gap-6">
              {navLinks.slice(0, 2).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  data-testid={`link-nav-${link.label.toLowerCase().replace(/\s/g, '-')}`}
                  className={`text-xs tracking-wide uppercase transition-colors hover:text-primary ${
                    location === link.href ? 'text-primary' : 'text-foreground/70'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Center Logo */}
            <Link href="/" data-testid="link-logo-desktop">
              <h1 className="font-serif text-2xl tracking-[0.15em] text-foreground whitespace-nowrap">
                AFNAN PERFUMES
              </h1>
            </Link>

            {/* Right Nav + Cart */}
            <nav className="flex items-center gap-6">
              {navLinks.slice(2).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  data-testid={`link-nav-${link.label.toLowerCase().replace(/\s/g, '-')}`}
                  className={`text-xs tracking-wide uppercase transition-colors hover:text-primary ${
                    location === link.href ? 'text-primary' : 'text-foreground/70'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/cart"
                data-testid="link-cart-desktop"
                className="p-2 text-foreground/70 hover:text-foreground transition-colors"
              >
                <ShoppingBag className="w-5 h-5" />
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-background z-50 lg:hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h2 className="font-serif text-lg tracking-wider">AFNAN PERFUMES</h2>
                <button
                  data-testid="button-close-menu"
                  className="p-2 text-foreground/70 hover:text-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="p-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    data-testid={`link-mobile-${link.label.toLowerCase().replace(/\s/g, '-')}`}
                    className="block py-3 text-lg text-foreground/70 hover:text-foreground border-b border-border/30 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label === 'Why Afnan?' ? 'Why Afnan Perfumes?' : link.label}
                  </Link>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="h-16 lg:h-20" />
    </>
  );
}
