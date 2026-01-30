import { useState, createContext, useContext } from 'react';
import { Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, X, ShoppingBag, ArrowRight, Check, Package } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { products } from '@/data/products';
import { BRAND } from '@/lib/brand';

interface CartItem {
  product: typeof products[0];
  quantity: number;
}

interface OrderForm {
  name: string;
  whatsapp: string;
  address: string;
  city: string;
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCODModal, setShowCODModal] = useState(false);
  const [showUpsellModal, setShowUpsellModal] = useState(false);
  const [orderForm, setOrderForm] = useState<OrderForm>({
    name: '',
    whatsapp: '',
    address: '',
    city: ''
  });
  const [formSelectedAddOns, setFormSelectedAddOns] = useState<string[]>([]);

  const updateQuantity = (productId: string, delta: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (productId: string) => {
    setCartItems((items) => items.filter((item) => item.product.id !== productId));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = 0;
  const total = subtotal + shipping;

  const cartProductIds = cartItems.map(item => item.product.id);
  const addOnProducts = products.filter(p => !cartProductIds.includes(p.id));

  const toggleFormAddOn = (productId: string) => {
    setFormSelectedAddOns(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const calculateFormTotal = () => {
    let formTotal = total;
    formSelectedAddOns.forEach(addOnId => {
      const addOn = addOnProducts.find(a => a.id === addOnId);
      if (addOn) formTotal += addOn.price;
    });
    return formTotal;
  };

  const handleCODSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowCODModal(false);
    setShowUpsellModal(true);
  };

  const handleUpsellOrder = (upsellProductId: string) => {
    alert(`Added ${products.find(p => p.id === upsellProductId)?.name} to your order!`);
  };

  const upsellProducts = products.filter(p => !cartProductIds.includes(p.id) && !formSelectedAddOns.includes(p.id));

  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-8 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-3xl md:text-5xl text-center mb-8 md:mb-12"
          >
            Shopping Bag
          </motion.h1>

          {cartItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 md:py-16"
            >
              <ShoppingBag className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 md:mb-6 text-muted-foreground" />
              <h2 className="font-serif text-xl md:text-2xl mb-3 md:mb-4">Your bag is empty</h2>
              <p className="text-muted-foreground mb-6 md:mb-8 text-sm md:text-base">
                Discover our collection of luxury fragrances
              </p>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-primary text-primary-foreground font-medium tracking-wide uppercase text-sm hover:bg-primary/90 transition-colors"
              >
                Shop Now
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
              <div className="lg:col-span-2">
                <div className="border-b border-border pb-4 mb-6 hidden md:grid grid-cols-12 gap-4 text-sm text-muted-foreground uppercase tracking-wider">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-right">Price</div>
                  <div className="col-span-2 text-right">Total</div>
                </div>

                <div className="space-y-4 md:space-y-6">
                  {cartItems.map((item, index) => (
                    <motion.div
                      key={item.product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex flex-col md:grid md:grid-cols-12 gap-4 items-start md:items-center py-4 md:py-6 border-b border-border"
                    >
                      <div className="w-full md:col-span-6 flex gap-4">
                        <div className="w-20 h-20 md:w-24 md:h-24 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                            {item.product.subtitle}
                          </p>
                          <Link
                            href={`/product/${item.product.id}`}
                            className="font-serif text-base md:text-lg hover:text-primary transition-colors"
                          >
                            {item.product.name}
                          </Link>
                          <p className="text-sm text-muted-foreground">{item.product.size}</p>
                          <p className="text-sm font-medium mt-1 md:hidden">Rs. {item.product.price.toLocaleString()}</p>
                        </div>
                        <button
                          data-testid={`button-remove-${item.product.id}`}
                          onClick={() => removeItem(item.product.id)}
                          className="p-2 text-muted-foreground hover:text-destructive transition-colors md:hidden"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="w-full md:col-span-2 flex justify-between md:justify-center items-center">
                        <span className="text-sm text-muted-foreground md:hidden">Quantity:</span>
                        <div className="flex items-center border border-border rounded-lg">
                          <button
                            data-testid={`button-cart-minus-${item.product.id}`}
                            onClick={() => updateQuantity(item.product.id, -1)}
                            className="p-2 hover:bg-accent transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <button
                            data-testid={`button-cart-plus-${item.product.id}`}
                            onClick={() => updateQuantity(item.product.id, 1)}
                            className="p-2 hover:bg-accent transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      <div className="hidden md:block md:col-span-2 text-right">
                        Rs. {item.product.price.toLocaleString()}
                      </div>

                      <div className="w-full md:col-span-2 flex justify-between md:justify-end items-center gap-4">
                        <span className="text-sm text-muted-foreground md:hidden">Total:</span>
                        <span className="font-medium">
                          Rs. {(item.product.price * item.quantity).toLocaleString()}
                        </span>
                        <button
                          data-testid={`button-remove-desktop-${item.product.id}`}
                          onClick={() => removeItem(item.product.id)}
                          className="hidden md:block p-2 text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-card border border-border rounded-xl p-5 md:p-6 sticky top-24"
                >
                  <h2 className="font-serif text-lg md:text-xl mb-4 md:mb-6">Order Summary</h2>

                  <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>Rs. {subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>Free</span>
                    </div>
                    <div className="border-t border-border pt-4 flex justify-between">
                      <span className="font-medium">Total</span>
                      <span className="font-serif text-lg md:text-xl">Rs. {total.toLocaleString()}</span>
                    </div>
                  </div>

                  <button
                    data-testid="button-checkout"
                    onClick={() => setShowCODModal(true)}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-green-600 text-white font-medium tracking-wide uppercase text-xs md:text-sm hover:bg-green-700 transition-colors mb-3 md:mb-4"
                  >
                    <Package className="w-4 h-4" />
                    Checkout (COD)
                  </button>

                  <Link
                    href="/products"
                    className="block text-center text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Continue Shopping
                  </Link>
                </motion.div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />

      {/* COD Modal */}
      <AnimatePresence>
        {showCODModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setShowCODModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] md:w-full max-w-lg max-h-[90vh] overflow-y-auto bg-background rounded-2xl shadow-2xl z-50 p-4 md:p-6"
            >
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <h2 className="font-serif text-xl md:text-2xl">Cash on Delivery</h2>
                <button
                  data-testid="button-close-cod"
                  onClick={() => setShowCODModal(false)}
                  className="p-2 hover:bg-accent rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mb-4 md:mb-6 p-3 md:p-4 bg-muted rounded-lg space-y-2">
                {cartItems.map(item => (
                  <div key={item.product.id} className="flex items-center gap-3 md:gap-4">
                    <img src={item.product.image} alt={item.product.name} className="w-10 h-10 md:w-12 md:h-12 object-cover rounded-lg" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-xs md:text-sm truncate">{item.product.name}</p>
                      <p className="text-muted-foreground text-xs">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-primary font-medium text-xs md:text-sm">Rs. {(item.product.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>

              <form onSubmit={handleCODSubmit}>
                <div className="space-y-3 md:space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5 md:mb-2">Full Name *</label>
                    <input
                      type="text"
                      required
                      data-testid="input-name"
                      value={orderForm.name}
                      onChange={(e) => setOrderForm({ ...orderForm, name: e.target.value })}
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5 md:mb-2">WhatsApp Number *</label>
                    <input
                      type="tel"
                      required
                      data-testid="input-whatsapp"
                      value={orderForm.whatsapp}
                      onChange={(e) => setOrderForm({ ...orderForm, whatsapp: e.target.value })}
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                      placeholder="03XX-XXXXXXX"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5 md:mb-2">Complete Address *</label>
                    <textarea
                      required
                      data-testid="input-address"
                      value={orderForm.address}
                      onChange={(e) => setOrderForm({ ...orderForm, address: e.target.value })}
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[70px] md:min-h-[80px] text-sm"
                      placeholder="House #, Street, Area"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5 md:mb-2">City *</label>
                    <input
                      type="text"
                      required
                      data-testid="input-city"
                      value={orderForm.city}
                      onChange={(e) => setOrderForm({ ...orderForm, city: e.target.value })}
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                      placeholder="e.g., Lahore, Karachi, Islamabad"
                    />
                  </div>

                  {/* Add-ons in Form */}
                  {addOnProducts.length > 0 && (
                    <div className="pt-3 md:pt-4">
                      <h3 className="font-medium mb-2 md:mb-3 text-sm">Add More to Your Order</h3>
                      <div className="space-y-2">
                        {addOnProducts.map((addOn) => (
                          <div
                            key={addOn.id}
                            data-testid={`form-addon-${addOn.id}`}
                            onClick={() => toggleFormAddOn(addOn.id)}
                            className={`flex items-center gap-2 md:gap-3 p-2.5 md:p-3 border rounded-lg cursor-pointer transition-all ${
                              formSelectedAddOns.includes(addOn.id)
                                ? 'border-primary bg-primary/5'
                                : 'border-border hover:border-primary/50'
                            }`}
                          >
                            <img
                              src={addOn.image}
                              alt={addOn.name}
                              className="w-10 h-10 md:w-12 md:h-12 object-cover rounded-lg"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-xs md:text-sm truncate">{addOn.name}</p>
                              <p className="text-primary text-xs md:text-sm">Rs. {addOn.price.toLocaleString()}</p>
                            </div>
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
                              formSelectedAddOns.includes(addOn.id)
                                ? 'border-primary bg-primary text-white'
                                : 'border-muted-foreground'
                            }`}>
                              {formSelectedAddOns.includes(addOn.id) && <Check className="w-3 h-3" />}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-3 md:pt-4 border-t border-border">
                    <div className="flex justify-between items-center mb-3 md:mb-4">
                      <span className="font-medium text-sm">Order Total:</span>
                      <span className="font-serif text-xl md:text-2xl text-primary">Rs. {calculateFormTotal().toLocaleString()}</span>
                    </div>
                    <button
                      type="submit"
                      data-testid="button-complete-order"
                      className="w-full py-3 md:py-4 bg-green-600 text-white font-medium tracking-wide uppercase text-sm hover:bg-green-700 transition-colors rounded-lg"
                    >
                      Complete Order
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Upsell Modal */}
      <AnimatePresence>
        {showUpsellModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setShowUpsellModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] md:w-full max-w-lg max-h-[90vh] overflow-y-auto bg-background rounded-2xl shadow-2xl z-50 p-4 md:p-6"
            >
              <div className="text-center mb-4 md:mb-6">
                <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="w-7 h-7 md:w-8 md:h-8 text-green-600" />
                </div>
                <h2 className="font-serif text-xl md:text-2xl mb-2">Order Placed Successfully!</h2>
                <p className="text-muted-foreground text-sm">Thank you for shopping with {BRAND.name}</p>
              </div>

              {upsellProducts.length > 0 && (
                <div className="mb-4 md:mb-6">
                  <h3 className="font-medium mb-3 md:mb-4 text-center text-sm">Complete Your Collection</h3>
                  <p className="text-xs md:text-sm text-muted-foreground text-center mb-3 md:mb-4">
                    Add another fragrance to your order instantly!
                  </p>
                  <div className="space-y-2 md:space-y-3">
                    {upsellProducts.map((upsellProduct) => (
                      <div
                        key={upsellProduct.id}
                        className="flex items-center gap-3 md:gap-4 p-3 md:p-4 border border-border rounded-lg"
                      >
                        <img
                          src={upsellProduct.image}
                          alt={upsellProduct.name}
                          className="w-14 h-14 md:w-16 md:h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{upsellProduct.name}</p>
                          <p className="text-primary font-medium text-sm">Rs. {upsellProduct.price.toLocaleString()}</p>
                        </div>
                        <button
                          data-testid={`button-upsell-${upsellProduct.id}`}
                          onClick={() => handleUpsellOrder(upsellProduct.id)}
                          className="px-3 md:px-4 py-2 bg-primary text-primary-foreground text-xs md:text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors flex-shrink-0"
                        >
                          Add
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                data-testid="button-close-upsell"
                onClick={() => setShowUpsellModal(false)}
                className="w-full py-3 border border-border rounded-lg font-medium hover:bg-accent transition-colors text-sm"
              >
                No Thanks, I'm Done
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
