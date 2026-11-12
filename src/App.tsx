/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SHOES_DATA } from './data/shoesData';
import { ShoeProduct, Gender, CartItem, ShoeColor, ShoeSize, ShoeCategory } from './types/shoes';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCatalog } from './components/ProductCatalog';
import { CraftsmanshipSection } from './components/CraftsmanshipSection';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { FitFinderModal } from './components/FitFinderModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { CustomerSupportModal } from './components/CustomerSupportModal';
import { UserAccountModal } from './components/UserAccountModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { InvoiceModal } from './components/InvoiceModal';

export default function App() {
  const [genderFilter, setGenderFilter] = React.useState<Gender>('all');
  const [selectedCategory, setSelectedCategory] = React.useState<ShoeCategory>('All');
  const [selectedProduct, setSelectedProduct] = React.useState<ShoeProduct | null>(null);
  const [selectedColorForModal, setSelectedColorForModal] = React.useState<ShoeColor | null>(null);
  const [isFitFinderOpen, setIsFitFinderOpen] = React.useState(false);
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = React.useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = React.useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = React.useState(false);
  const [trackingOrderId, setTrackingOrderId] = React.useState<string>('KDM-849201');
  const [isSupportOpen, setIsSupportOpen] = React.useState(false);
  const [isAccountOpen, setIsAccountOpen] = React.useState(false);
  const [isAdminOpen, setIsAdminOpen] = React.useState(false);
  const [isInvoiceOpen, setIsInvoiceOpen] = React.useState(false);
  const [invoiceData, setInvoiceData] = React.useState<{
    orderNumber: string;
    items: CartItem[];
    customerDetails: any;
    totalAmount: number;
  } | null>(null);

  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedSizeUK, setSelectedSizeUK] = React.useState<number | null>(null);

  // Cart state
  const [cart, setCart] = React.useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('kadam_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist state
  const [wishlistIds, setWishlistIds] = React.useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('kadam_wishlist');
      return saved ? JSON.parse(saved) : ['peshawari-royal-walnut', 'kids-chhotenawab-velvet-jutti'];
    } catch {
      return ['peshawari-royal-walnut', 'kids-chhotenawab-velvet-jutti'];
    }
  });

  // Persist cart
  React.useEffect(() => {
    try {
      localStorage.setItem('kadam_cart', JSON.stringify(cart));
    } catch {}
  }, [cart]);

  // Persist wishlist
  React.useEffect(() => {
    try {
      localStorage.setItem('kadam_wishlist', JSON.stringify(wishlistIds));
    } catch {}
  }, [wishlistIds]);

  // Cart handlers
  const handleAddToCart = (
    product: ShoeProduct,
    color: ShoeColor,
    size: ShoeSize,
    width: string,
    quantity: number = 1
  ) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (i) =>
          i.product.id === product.id &&
          i.selectedColor.name === color.name &&
          i.selectedSize.ukIndia === size.ukIndia &&
          i.selectedWidth === width
      );

      if (existingIndex >= 0) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity
        };
        return next;
      } else {
        return [
          ...prev,
          {
            product,
            selectedColor: color,
            selectedSize: size,
            selectedWidth: width,
            quantity
          }
        ];
      }
    });
  };

  const handleBuyNow = (
    product: ShoeProduct,
    color: ShoeColor,
    size: ShoeSize,
    width: string,
    quantity: number = 1
  ) => {
    handleAddToCart(product, color, size, width, quantity);
    setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  const handleUpdateQuantity = (index: number, delta: number) => {
    setCart((prev) => {
      const next = [...prev];
      const newQty = next[index].quantity + delta;
      if (newQty <= 0) {
        return next.filter((_, i) => i !== index);
      }
      next[index] = { ...next[index], quantity: newQty };
      return next;
    });
  };

  const handleRemoveFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Wishlist handler
  const handleToggleWishlist = (product: ShoeProduct) => {
    setWishlistIds((prev) => {
      if (prev.includes(product.id)) {
        return prev.filter((id) => id !== product.id);
      } else {
        return [...prev, product.id];
      }
    });
  };

  const handleRemoveFromWishlist = (product: ShoeProduct) => {
    setWishlistIds((prev) => prev.filter((id) => id !== product.id));
  };

  // Filter application from Fit Finder
  const handleApplySizeFromFitFinder = (sizeUK: number) => {
    setSelectedSizeUK(sizeUK);
  };

  const wishlistProducts = React.useMemo(() => {
    return SHOES_DATA.filter((p) => wishlistIds.includes(p.id));
  }, [wishlistIds]);

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 selection:bg-amber-800 selection:text-white">
      {/* Top Bar Navigation */}
      <Navbar
        genderFilter={genderFilter}
        onSelectGender={(g) => {
          setGenderFilter(g);
          const catalog = document.getElementById('catalog');
          catalog?.scrollIntoView({ behavior: 'smooth' });
        }}
        selectedCategory={selectedCategory}
        onSelectCategory={(c) => {
          setSelectedCategory(c);
          const catalog = document.getElementById('catalog');
          catalog?.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenFitFinder={() => setIsFitFinderOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenTracking={() => setIsTrackingOpen(true)}
        onOpenSupport={() => setIsSupportOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.length}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Hero Showcase with Indian Footwear */}
      <main className="flex-1">
        <Hero
          onSelectGender={(g) => {
            setGenderFilter(g);
          }}
          onSelectCategory={(c) => {
            setSelectedCategory(c);
          }}
          onOpenFitFinder={() => setIsFitFinderOpen(true)}
          onOpenSupport={() => setIsSupportOpen(true)}
        />

        {/* Product Catalog & Filter Architecture */}
        <ProductCatalog
          products={SHOES_DATA}
          genderFilter={genderFilter}
          onSelectGender={setGenderFilter}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onOpenProductModal={(p, color) => {
            setSelectedProduct(p);
            setSelectedColorForModal(color || p.colors[0]);
          }}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlistIds}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedSizeUK={selectedSizeUK}
          onSelectSizeUK={setSelectedSizeUK}
        />

        {/* Indian Craftsmanship & Karigari Explorer */}
        <CraftsmanshipSection />
      </main>

      {/* Footer */}
      <Footer
        onSelectGender={(g) => {
          setGenderFilter(g);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectCategory={(c) => {
          setSelectedCategory(c);
        }}
        onOpenFitFinder={() => setIsFitFinderOpen(true)}
        onOpenTracking={() => setIsTrackingOpen(true)}
        onOpenSupport={() => setIsSupportOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Modals & Slide-over Drawers */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          initialColor={selectedColorForModal}
          onClose={() => {
            setSelectedProduct(null);
            setSelectedColorForModal(null);
          }}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
          onToggleWishlist={handleToggleWishlist}
          isWishlisted={wishlistIds.includes(selectedProduct.id)}
          onOpenFitFinder={() => {
            setSelectedProduct(null);
            setIsFitFinderOpen(true);
          }}
        />
      )}

      {isFitFinderOpen && (
        <FitFinderModal
          isOpen={isFitFinderOpen}
          onClose={() => setIsFitFinderOpen(false)}
          onApplySize={handleApplySizeFromFitFinder}
        />
      )}

      {isCartOpen && (
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cart}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveFromCart}
          onClearCart={handleClearCart}
          onProceedToCheckout={() => {
            setIsCartOpen(false);
            setIsCheckoutOpen(true);
          }}
        />
      )}

      {isWishlistOpen && (
        <WishlistDrawer
          isOpen={isWishlistOpen}
          onClose={() => setIsWishlistOpen(false)}
          wishlistProducts={wishlistProducts}
          onRemoveFromWishlist={handleRemoveFromWishlist}
          onSelectProduct={(p) => setSelectedProduct(p)}
        />
      )}

      {isCheckoutOpen && (
        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          items={cart}
          onClearCart={handleClearCart}
          onOpenTrackingWithId={(ordId) => {
            setTrackingOrderId(ordId);
            setIsTrackingOpen(true);
          }}
          onOpenInvoice={(ordId, itms, details, tot) => {
            setInvoiceData({
              orderNumber: ordId,
              items: itms,
              customerDetails: details,
              totalAmount: tot
            });
            setIsInvoiceOpen(true);
          }}
        />
      )}

      {isTrackingOpen && (
        <OrderTrackingModal
          isOpen={isTrackingOpen}
          onClose={() => setIsTrackingOpen(false)}
          initialOrderId={trackingOrderId}
        />
      )}

      {isSupportOpen && (
        <CustomerSupportModal
          isOpen={isSupportOpen}
          onClose={() => setIsSupportOpen(false)}
        />
      )}

      {isAccountOpen && (
        <UserAccountModal
          isOpen={isAccountOpen}
          onClose={() => setIsAccountOpen(false)}
          onOpenTrackingWithId={(ordId) => {
            setTrackingOrderId(ordId);
            setIsTrackingOpen(true);
          }}
        />
      )}

      {isAdminOpen && (
        <AdminPanelModal
          isOpen={isAdminOpen}
          onClose={() => setIsAdminOpen(false)}
        />
      )}

      {isInvoiceOpen && invoiceData && (
        <InvoiceModal
          isOpen={isInvoiceOpen}
          onClose={() => setIsInvoiceOpen(false)}
          orderNumber={invoiceData.orderNumber}
          items={invoiceData.items}
          customerDetails={invoiceData.customerDetails}
          totalAmount={invoiceData.totalAmount}
        />
      )}
    </div>
  );
}
