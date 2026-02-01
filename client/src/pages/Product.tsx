import { useState, useEffect } from 'react';
import { useParams, Link, useSearch } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Minus, Plus, Star, Truck, RefreshCw, Shield, ChevronRight, X, Check, Package, MessageCircle } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { products } from '@/data/products';

// WhatsApp contact for order issues
const WHATSAPP_NUMBER = '+923155657373';
const FAILED_ORDERS_KEY = 'afnan_failed_orders';

// Google Sheets Web App URL for direct order submission (static site compatible)
// Configure via env var (Cloudflare Pages): VITE_GOOGLE_SHEETS_URL
const GOOGLE_SHEETS_URL = import.meta.env.VITE_GOOGLE_SHEETS_URL as
  | string
  | undefined;

interface AddOn {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface OrderForm {
  name: string;
  whatsapp: string;
  address: string;
  city: string;
}

// Helper: Save failed order to localStorage
function saveFailedOrder(payload: any) {
  try {
    const existing = JSON.parse(localStorage.getItem(FAILED_ORDERS_KEY) || '[]');
    existing.push({ ...payload, savedAt: Date.now() });
    localStorage.setItem(FAILED_ORDERS_KEY, JSON.stringify(existing));
  } catch (e) {
    console.error('Failed to save order to localStorage:', e);
  }
}

// Helper: Get failed orders from localStorage
function getFailedOrders(): any[] {
  try {
    return JSON.parse(localStorage.getItem(FAILED_ORDERS_KEY) || '[]');
  } catch {
    return [];
  }
}

// Helper: Clear failed orders
function clearFailedOrders() {
  localStorage.removeItem(FAILED_ORDERS_KEY);
}

// Helper: Submit order directly to Google Sheets (static site compatible)
async function submitOrderWithRetry(payload: any, maxRetries = 3): Promise<{ success: boolean; orderCode?: string; error?: string }> {
  if (!GOOGLE_SHEETS_URL) {
    return {
      success: false,
      error:
        'Order system is not configured (missing VITE_GOOGLE_SHEETS_URL). Please contact support.',
    };
  }

  const orderCode = `AF-${new Date().getFullYear()}-${Date.now().toString().slice(-6)}`;
  
  // Convert addOns array to comma-separated string for Google Sheets
  const addOnsString = Array.isArray(payload.addOns) && payload.addOns.length > 0
    ? payload.addOns.join(', ')
    : '';
  
  const sheetsPayload = {
    customerName: payload.name,
    whatsapp: payload.whatsapp,
    address: payload.address,
    city: payload.city,
    product: payload.productName,
    quantity: payload.quantity,
    total: payload.totalAmount,
    addOns: addOnsString,
  };
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(GOOGLE_SHEETS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sheetsPayload),
        mode: 'no-cors', // Google Apps Script requires no-cors for POST
      });
      
      // With no-cors, we can't read the response, so we assume success if no error thrown
      // Google Apps Script will return opaque response
      return { success: true, orderCode };
    } catch (error) {
      // Network error, retry after delay
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, 1500 * attempt));
      }
    }
  }
  
  return { success: false, error: 'Unable to submit order after multiple attempts' };
}

export default function Product() {
  const { id } = useParams<{ id: string }>();
  const searchString = useSearch();
  const product = products.find((p) => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'notes' | 'shipping'>('description');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [showCODModal, setShowCODModal] = useState(false);
  const [showUpsellModal, setShowUpsellModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [orderForm, setOrderForm] = useState<OrderForm>({
    name: '',
    whatsapp: '',
    address: '',
    city: ''
  });
  const [formSelectedAddOns, setFormSelectedAddOns] = useState<string[]>([]);
  const [orderCode, setOrderCode] = useState<string | null>(null);
  const [orderError, setOrderError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastOrderPayload, setLastOrderPayload] = useState<any>(null);

  useEffect(() => {
    if (searchString.includes('checkout=true') && product) {
      setShowCODModal(true);
      window.history.replaceState({}, '', `/product/${id}`);
    }
  }, [searchString, product, id]);

  // Auto-recover: Try to submit any saved failed orders in background (non-blocking)
  useEffect(() => {
    // Delay recovery by 5 seconds to not interfere with user's immediate actions
    const timeoutId = setTimeout(() => {
      const failedOrders = getFailedOrders();
      if (failedOrders.length === 0) return;
      
      // Process in background without blocking - fire and forget
      (async () => {
        let allSucceeded = true;
        for (const order of failedOrders) {
          const result = await submitOrderWithRetry(order);
          if (!result.success) {
            allSucceeded = false;
            break;
          }
        }
        if (allSucceeded) {
          clearFailedOrders();
        }
      })();
    }, 5000);
    
    return () => clearTimeout(timeoutId);
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="font-serif text-4xl mb-4">Product Not Found</h1>
            <Link href="/products" className="text-primary hover:underline">
              Browse our products
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const addOnProducts: AddOn[] = products
    .filter((p) => p.id !== product.id)
    .slice(0, 3)
    .map(p => ({ id: p.id, name: p.name, price: p.price, image: p.image }));

  const upsellProducts = products.filter((p) => p.id !== product.id);

  const toggleAddOn = (productId: string) => {
    setSelectedAddOns(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const toggleFormAddOn = (productId: string) => {
    setFormSelectedAddOns(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const calculateTotal = () => {
    let total = product.price * quantity;
    selectedAddOns.forEach(addOnId => {
      const addOn = addOnProducts.find(a => a.id === addOnId);
      if (addOn) total += addOn.price;
    });
    return total;
  };

  const calculateFormTotal = () => {
    let total = product.price * quantity;
    formSelectedAddOns.forEach(addOnId => {
      const addOn = addOnProducts.find(a => a.id === addOnId);
      if (addOn) total += addOn.price;
    });
    return total;
  };

  const handleCODSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setOrderError(null);

    const payload = {
      name: orderForm.name,
      whatsapp: orderForm.whatsapp,
      address: orderForm.address,
      city: orderForm.city,
      productId: product.id,
      productName: product.name,
      quantity: quantity,
      totalAmount: calculateFormTotal(),
      addOns: formSelectedAddOns.length > 0 ? formSelectedAddOns : [],
    };
    setLastOrderPayload(payload);

    // Use auto-retry (3 attempts with delays)
    const result = await submitOrderWithRetry(payload);
    
    if (result.success) {
      setOrderCode(result.orderCode || null);
      setShowCODModal(false);
      setShowUpsellModal(true);
    } else {
      // Save to localStorage as backup
      saveFailedOrder(payload);
      setOrderError('order_failed');
    }
    
    setIsSubmitting(false);
  };

  const handleRetryOrder = async () => {
    if (!lastOrderPayload) return;
    setIsSubmitting(true);
    setOrderError(null);

    const result = await submitOrderWithRetry(lastOrderPayload);
    
    if (result.success) {
      // Clear this order from localStorage if it was saved there
      clearFailedOrders();
      setOrderCode(result.orderCode || null);
      setOrderError(null);
      setShowCODModal(false);
      setShowUpsellModal(true);
    } else {
      setOrderError('order_failed');
    }
    
    setIsSubmitting(false);
  };

  const openWhatsApp = () => {
    const addOnsText = formSelectedAddOns.length > 0 
      ? `\nAdd-ons: ${formSelectedAddOns.map(id => {
          const addOn = addOnProducts.find(a => a.id === id);
          return addOn ? `${addOn.name} (Rs. ${addOn.price.toLocaleString()})` : '';
        }).filter(Boolean).join(', ')}`
      : '';
    
    const message = encodeURIComponent(
      `Hi, I tried to place an order on Afnan Perfumes but faced an issue.\n\nProduct: ${product.name}\nQuantity: ${quantity}${addOnsText}\nTotal: Rs. ${calculateFormTotal().toLocaleString()}\n\nPlease help me complete my order.`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}?text=${message}`, '_blank');
  };

  const [upsellSuccess, setUpsellSuccess] = useState<string[]>([]);
  const [upsellProcessing, setUpsellProcessing] = useState<string | null>(null);
  const [upsellError, setUpsellError] = useState<{ productId: string; productName: string } | null>(null);

  const handleUpsellOrder = async (upsellProductId: string) => {
    const upsellProduct = products.find(p => p.id === upsellProductId);
    if (!upsellProduct) return;

    setUpsellProcessing(upsellProductId);
    setUpsellError(null);

    const payload = {
      name: orderForm.name,
      whatsapp: orderForm.whatsapp,
      address: orderForm.address,
      city: orderForm.city,
      productId: upsellProduct.id,
      productName: upsellProduct.name,
      quantity: 1,
      totalAmount: upsellProduct.price,
      addOns: [],
    };

    const result = await submitOrderWithRetry(payload);
    
    if (result.success) {
      setUpsellSuccess(prev => [...prev, upsellProduct.name]);
    } else {
      saveFailedOrder(payload);
      setUpsellError({ productId: upsellProductId, productName: upsellProduct.name });
    }
    
    setUpsellProcessing(null);
  };

  const openUpsellWhatsApp = () => {
    if (!upsellError) return;
    const upsellProduct = products.find(p => p.id === upsellError.productId);
    const message = encodeURIComponent(
      `Hi, I tried to add a product to my order on Afnan Perfumes but faced an issue.\n\nProduct: ${upsellError.productName}\nPrice: Rs. ${upsellProduct?.price.toLocaleString() || 'N/A'}\n\nPlease help me complete this addition.`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}?text=${message}`, '_blank');
  };

  const handleUpsellRetry = async () => {
    if (!upsellError) return;
    await handleUpsellOrder(upsellError.productId);
  };

  const openCODModal = () => {
    setFormSelectedAddOns(selectedAddOns);
    setShowCODModal(true);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          <nav className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground mb-6 md:mb-8 overflow-x-auto">
            <Link href="/" className="hover:text-foreground transition-colors whitespace-nowrap">Home</Link>
            <ChevronRight className="w-4 h-4 flex-shrink-0" />
            <Link href="/products" className="hover:text-foreground transition-colors whitespace-nowrap">Products</Link>
            <ChevronRight className="w-4 h-4 flex-shrink-0" />
            <span className="text-foreground truncate">{product.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="sticky top-24">
                <div className="aspect-square rounded-2xl overflow-hidden bg-muted mb-4">
                  <img
                    src={product.images?.[selectedImage] || product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {product.images && product.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-2 md:gap-3">
                    {product.images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                          selectedImage === index
                            ? 'border-primary'
                            : 'border-transparent hover:border-primary/50'
                        }`}
                      >
                        <img
                          src={img}
                          alt={`${product.name} view ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-center gap-2 mb-3 md:mb-4">
                {product.isNew && (
                  <span className="px-2 md:px-3 py-1 bg-primary text-primary-foreground text-xs uppercase tracking-wider">
                    New
                  </span>
                )}
                {product.isBestseller && (
                  <span className="px-2 md:px-3 py-1 bg-foreground text-background text-xs uppercase tracking-wider">
                    Bestseller
                  </span>
                )}
              </div>

              <p className="text-muted-foreground uppercase tracking-wider text-xs md:text-sm mb-2">
                {product.subtitle}
              </p>
              <h1 className="font-serif text-3xl md:text-5xl mb-3 md:mb-4">{product.name}</h1>

              <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 md:w-4 md:h-4 fill-primary text-primary" />
                  ))}
                </div>
                <span className="text-muted-foreground text-xs md:text-sm">4.9 (128 reviews)</span>
              </div>

              <div className="flex items-baseline gap-2 md:gap-3 mb-6 md:mb-8">
                {product.originalPrice && (
                  <span className="text-muted-foreground line-through text-lg md:text-xl">
                    Rs. {product.originalPrice.toLocaleString()}
                  </span>
                )}
                <span className="font-serif text-3xl md:text-4xl">Rs. {product.price.toLocaleString()}</span>
                <span className="text-muted-foreground text-sm">/ {product.size}</span>
              </div>

              <div className="border-t border-b border-border py-4 md:py-6 mb-4 md:mb-6">
                <div className="flex items-center gap-4 mb-4 md:mb-6">
                  <span className="text-sm font-medium">Quantity:</span>
                  <div className="flex items-center border border-border rounded-lg">
                    <button
                      data-testid="button-quantity-minus"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 md:p-3 hover:bg-accent transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 md:w-12 text-center font-medium">{quantity}</span>
                    <button
                      data-testid="button-quantity-plus"
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 md:p-3 hover:bg-accent transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <button
                    data-testid="button-add-to-cart"
                    onClick={openCODModal}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-primary text-primary-foreground font-medium tracking-wide uppercase text-sm hover:bg-primary/90 transition-colors"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Add to Bag
                  </button>
                  <button
                    data-testid="button-cod"
                    onClick={openCODModal}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-green-600 text-white font-medium tracking-wide uppercase text-sm hover:bg-green-700 transition-colors"
                  >
                    <Package className="w-4 h-4" />
                    Buy with Cash on Delivery
                  </button>
                </div>
              </div>

              {/* Add-ons Section */}
              <div className="mb-6 md:mb-8">
                <h3 className="font-medium mb-3 md:mb-4 flex items-center gap-2 text-sm md:text-base">
                  <span>Complete Your Order</span>
                  <span className="text-xs text-muted-foreground">(Add to your order)</span>
                </h3>
                <div className="space-y-2 md:space-y-3">
                  {addOnProducts.map((addOn) => (
                    <div
                      key={addOn.id}
                      data-testid={`addon-${addOn.id}`}
                      onClick={() => toggleAddOn(addOn.id)}
                      className={`flex items-center gap-3 md:gap-4 p-2.5 md:p-3 border rounded-lg cursor-pointer transition-all ${
                        selectedAddOns.includes(addOn.id)
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <img
                        src={addOn.image}
                        alt={addOn.name}
                        className="w-14 h-14 md:w-16 md:h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm md:text-base truncate">{addOn.name}</p>
                        <p className="text-primary font-medium text-sm">Rs. {addOn.price.toLocaleString()}</p>
                      </div>
                      <div className={`w-5 h-5 md:w-6 md:h-6 rounded-full border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
                        selectedAddOns.includes(addOn.id)
                          ? 'border-primary bg-primary text-white'
                          : 'border-muted-foreground'
                      }`}>
                        {selectedAddOns.includes(addOn.id) && <Check className="w-3 h-3 md:w-4 md:h-4" />}
                      </div>
                    </div>
                  ))}
                </div>
                {selectedAddOns.length > 0 && (
                  <div className="mt-3 md:mt-4 p-3 md:p-4 bg-muted rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-sm md:text-base">Total:</span>
                      <span className="font-serif text-lg md:text-xl">Rs. {calculateTotal().toLocaleString()}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-3 gap-2 md:gap-4 mb-6 md:mb-8">
                <div className="flex flex-col md:flex-row items-center gap-1 md:gap-3 text-center md:text-left">
                  <Truck className="w-5 h-5 text-primary" />
                  <span className="text-muted-foreground text-xs md:text-sm">Free Shipping</span>
                </div>
                <div className="flex flex-col md:flex-row items-center gap-1 md:gap-3 text-center md:text-left">
                  <RefreshCw className="w-5 h-5 text-primary" />
                  <span className="text-muted-foreground text-xs md:text-sm">7-Day Returns</span>
                </div>
                <div className="flex flex-col md:flex-row items-center gap-1 md:gap-3 text-center md:text-left">
                  <Shield className="w-5 h-5 text-primary" />
                  <span className="text-muted-foreground text-xs md:text-sm">Authentic</span>
                </div>
              </div>

              <div className="border border-border rounded-xl overflow-hidden">
                <div className="flex border-b border-border">
                  {(['description', 'notes', 'shipping'] as const).map((tab) => (
                    <button
                      key={tab}
                      data-testid={`tab-${tab}`}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 py-3 md:py-4 text-xs md:text-sm font-medium capitalize transition-colors ${
                        activeTab === tab
                          ? 'bg-accent text-foreground'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {tab === 'notes' ? 'Notes' : tab}
                    </button>
                  ))}
                </div>
                <div className="p-4 md:p-6">
                  {activeTab === 'description' && (
                    <div className="space-y-3 md:space-y-4">
                      <div className="text-foreground/80 leading-relaxed text-sm md:text-base whitespace-pre-line">
                        {product.description.split('\n').map((line, i) => {
                          if (line.startsWith('**') && line.endsWith('**')) {
                            return <p key={i} className="font-bold mt-4">{line.replace(/\*\*/g, '')}</p>;
                          }
                          if (line.startsWith('• **')) {
                            return <p key={i} className="font-bold ml-4">{line.replace(/• \*\*|\*\*/g, '• ')}</p>;
                          }
                          return <p key={i}>{line}</p>;
                        })}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-2 md:px-3 py-1 bg-muted rounded-full text-xs md:text-sm capitalize">
                          {product.intensity} Intensity
                        </span>
                        {product.occasion.map((occ) => (
                          <span key={occ} className="px-2 md:px-3 py-1 bg-muted rounded-full text-xs md:text-sm">
                            {occ}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {activeTab === 'notes' && (
                    <div className="space-y-3 md:space-y-4">
                      <div>
                        <p className="font-medium text-xs md:text-sm mb-1 md:mb-2">Top Notes</p>
                        <p className="text-muted-foreground text-sm">{product.notes.top.join(', ')}</p>
                      </div>
                      <div>
                        <p className="font-medium text-xs md:text-sm mb-1 md:mb-2">Heart Notes</p>
                        <p className="text-muted-foreground text-sm">{product.notes.heart.join(', ')}</p>
                      </div>
                      <div>
                        <p className="font-medium text-xs md:text-sm mb-1 md:mb-2">Base Notes</p>
                        <p className="text-muted-foreground text-sm">{product.notes.base.join(', ')}</p>
                      </div>
                    </div>
                  )}
                  {activeTab === 'shipping' && (
                    <div className="space-y-3 md:space-y-4 text-foreground/80 text-sm">
                      <p>Free delivery across Pakistan.</p>
                      <p>Cash on Delivery available in all cities.</p>
                      <p>Delivery typically takes 2-4 business days.</p>
                      <p>7-day return policy for unopened products.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Reviews Section */}
              {product.reviews && product.reviews.length > 0 && (
                <div className="mt-6 md:mt-8">
                  <h3 className="font-serif text-xl md:text-2xl mb-4 md:mb-6 flex items-center gap-2">
                    Customer Reviews
                    <span className="text-sm font-normal text-muted-foreground">({product.reviews.length})</span>
                  </h3>
                  <div className="space-y-3 md:space-y-4 max-h-[500px] overflow-y-auto pr-2">
                    {product.reviews.map((review, index) => (
                      <div key={index} className="p-3 md:p-4 bg-muted/50 rounded-lg border border-border">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                              <span className="text-xs font-medium text-primary">{review.name.charAt(0)}</span>
                            </div>
                            <span className="font-medium text-sm">{review.name}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-primary text-primary" />
                            ))}
                          </div>
                        </div>
                        <p className="text-foreground/80 text-sm leading-relaxed">{review.text}</p>
                        <p className="text-xs text-muted-foreground mt-2">{review.date}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
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

              <div className="mb-4 md:mb-6 p-3 md:p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-3 md:gap-4">
                  <img src={product.image} alt={product.name} className="w-14 h-14 md:w-16 md:h-16 object-cover rounded-lg" />
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-sm md:text-base truncate">{product.name}</p>
                    <p className="text-muted-foreground text-xs md:text-sm">Qty: {quantity}</p>
                    <p className="text-primary font-medium text-sm">Rs. {(product.price * quantity).toLocaleString()}</p>
                  </div>
                </div>
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

                  {orderError && (
                    <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                      <p className="text-amber-800 text-sm mb-3">
                        We're having trouble submitting your order. Your order is saved. Please try again in a few minutes, or contact us directly on WhatsApp.
                      </p>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={handleRetryOrder}
                          disabled={isSubmitting}
                          data-testid="button-retry-order"
                          className="flex-1 py-2 px-3 bg-amber-600 text-white text-sm font-medium rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                          <RefreshCw className={`w-4 h-4 ${isSubmitting ? 'animate-spin' : ''}`} />
                          {isSubmitting ? 'Retrying...' : 'Try Again'}
                        </button>
                        <button
                          type="button"
                          onClick={openWhatsApp}
                          data-testid="button-whatsapp-order"
                          className="flex-1 py-2 px-3 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                        >
                          <MessageCircle className="w-4 h-4" />
                          WhatsApp
                        </button>
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
                      disabled={isSubmitting}
                      className="w-full py-3 md:py-4 bg-green-600 text-white font-medium tracking-wide uppercase text-sm hover:bg-green-700 transition-colors rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Processing...' : 'Complete Order'}
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
                {orderCode && (
                  <p className="text-primary font-medium text-lg mb-1">Order ID: {orderCode}</p>
                )}
                <p className="text-muted-foreground text-sm">Thank you for shopping with Afnan Perfumes</p>
                <p className="text-muted-foreground text-sm mt-1">Our Customer Support team will call you for Order confirmation in a short time.</p>

                {upsellSuccess.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {upsellSuccess.map((name, index) => (
                      <div
                        key={index}
                        className="p-3 bg-green-100 text-green-800 rounded-lg flex items-center gap-2 justify-center text-xs font-medium"
                      >
                        <Check className="w-4 h-4" />
                        Added {name} to your order!
                      </div>
                    ))}
                  </div>
                )}

                {upsellError && (
                  <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="text-amber-800 text-sm mb-3">
                      We're having trouble adding {upsellError.productName}. Your order is saved. Please try again or contact us on WhatsApp.
                    </p>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={handleUpsellRetry}
                        disabled={upsellProcessing !== null}
                        data-testid="button-upsell-retry"
                        className="flex-1 py-2 px-3 bg-amber-600 text-white text-sm font-medium rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        <RefreshCw className={`w-4 h-4 ${upsellProcessing ? 'animate-spin' : ''}`} />
                        {upsellProcessing ? 'Retrying...' : 'Try Again'}
                      </button>
                      <button
                        type="button"
                        onClick={openUpsellWhatsApp}
                        data-testid="button-upsell-whatsapp"
                        className="flex-1 py-2 px-3 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <MessageCircle className="w-4 h-4" />
                        WhatsApp
                      </button>
                    </div>
                  </div>
                )}
              </div>

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
                        disabled={upsellProcessing !== null || upsellSuccess.includes(upsellProduct.name)}
                        className="px-3 md:px-4 py-2 bg-primary text-primary-foreground text-xs md:text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        {upsellProcessing === upsellProduct.id ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            Adding...
                          </>
                        ) : upsellSuccess.includes(upsellProduct.name) ? (
                          <>
                            <Check className="w-4 h-4" />
                            Added
                          </>
                        ) : (
                          'Add'
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

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
