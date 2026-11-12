import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Tag, Check, Sparkles } from 'lucide-react';
import { CartItem } from '../types/shoes';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, delta: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart?: () => void;
  onProceedToCheckout: () => void;
}

const AVAILABLE_COUPONS = [
  { code: 'KADAM10', discountPercent: 10, label: '10% OFF' },
  { code: 'FESTIVE20', discountPercent: 20, label: '20% Festive' },
  { code: 'FIRST500', flatDiscount: 500, minOrder: 2500, label: '₹500 OFF' }
];

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToCheckout
}) => {
  const [couponInput, setCouponInput] = React.useState('');
  const [appliedCoupon, setAppliedCoupon] = React.useState<{ code: string; discountAmount: number } | null>(null);
  const [couponError, setCouponError] = React.useState('');

  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 1999;
  const rawSubtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Recalculate discount
  let discountValue = 0;
  if (appliedCoupon) {
    if (appliedCoupon.code === 'KADAM10') {
      discountValue = Math.round(rawSubtotal * 0.10);
    } else if (appliedCoupon.code === 'FESTIVE20') {
      discountValue = Math.round(rawSubtotal * 0.20);
    } else if (appliedCoupon.code === 'FIRST500') {
      discountValue = rawSubtotal >= 2500 ? 500 : 0;
    }
  }

  const subtotalAfterDiscount = Math.max(0, rawSubtotal - discountValue);
  const isFreeShipping = subtotalAfterDiscount >= FREE_SHIPPING_THRESHOLD;
  const progressPercent = Math.min(100, (subtotalAfterDiscount / FREE_SHIPPING_THRESHOLD) * 100);
  const remainingForFree = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotalAfterDiscount);
  const shippingCharge = isFreeShipping ? 0 : 150;
  const finalPayable = subtotalAfterDiscount + (items.length > 0 ? shippingCharge : 0);

  const formatPrice = (val: number) => {
    return '₹' + val.toLocaleString('en-IN');
  };

  const handleApplyCoupon = (codeToApply?: string) => {
    const code = (codeToApply || couponInput).trim().toUpperCase();
    setCouponError('');

    if (!code) {
      setCouponError('Please enter a coupon code');
      return;
    }

    if (code === 'KADAM10') {
      const discount = Math.round(rawSubtotal * 0.10);
      setAppliedCoupon({ code: 'KADAM10', discountAmount: discount });
      setCouponInput('');
    } else if (code === 'FESTIVE20') {
      const discount = Math.round(rawSubtotal * 0.20);
      setAppliedCoupon({ code: 'FESTIVE20', discountAmount: discount });
      setCouponInput('');
    } else if (code === 'FIRST500') {
      if (rawSubtotal < 2500) {
        setCouponError('FIRST500 requires minimum order of ₹2,500');
        return;
      }
      setAppliedCoupon({ code: 'FIRST500', discountAmount: 500 });
      setCouponInput('');
    } else {
      setCouponError('Invalid code. Try KADAM10 or FESTIVE20');
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponError('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/60 backdrop-blur-xs flex justify-end animate-fadeIn">
      <div 
        className="w-full max-w-md bg-white dark:bg-stone-900 h-full flex flex-col justify-between shadow-2xl border-l border-stone-200 dark:border-stone-800 animate-slideLeft"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-stone-900 dark:text-stone-100" />
            <h2 className="text-base font-bold text-stone-900 dark:text-stone-100">
              Shopping Bag ({items.reduce((acc, i) => acc + i.quantity, 0)})
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {items.length > 0 && onClearCart && (
              <button
                onClick={onClearCart}
                className="text-xs text-stone-400 hover:text-rose-600 cursor-pointer transition-colors"
                title="Empty shopping bag"
              >
                Clear All
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Free Shipping Progress Indicator (₹1,999) */}
        <div className="px-5 py-3 bg-stone-50 dark:bg-stone-800/50 border-b border-stone-200 dark:border-stone-800 text-xs">
          {isFreeShipping ? (
            <p className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
              <span>&#10003;</span>
              <span>You&apos;ve unlocked Free Express Pan-India Delivery!</span>
            </p>
          ) : (
            <p className="text-stone-600 dark:text-stone-300">
              Add <strong className="font-mono tabular-nums font-bold text-stone-900 dark:text-stone-100">{formatPrice(remainingForFree)}</strong> more for Free Delivery Across India.
            </p>
          )}
          <div className="w-full bg-stone-200 dark:bg-stone-700 h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-amber-600 dark:bg-amber-500 h-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 divide-y divide-stone-100 dark:divide-stone-800">
          {items.length > 0 ? (
            <>
              {items.map((item, index) => (
                <div key={`${item.product.id}-${item.selectedSize.ukIndia}-${item.selectedColor.name}-${index}`} className="py-4 first:pt-0 last:pb-0 flex gap-4">
                  {/* Thumbnail */}
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-stone-100 dark:bg-stone-800 shrink-0 border border-stone-200 dark:border-stone-700">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 leading-tight">
                          {item.product.name}
                        </h3>
                        <button
                          onClick={() => onRemoveItem(index)}
                          className="text-stone-400 hover:text-rose-600 transition-colors cursor-pointer p-0.5"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-xs text-stone-500 dark:text-stone-400 space-x-1">
                        <span>{item.selectedColor.name}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono font-semibold">
                          {item.product.gender === 'kids' && item.selectedSize.ukIndia >= 8 ? 'Ind Kids ' : 'Ind '}
                          {item.selectedSize.ukIndia}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{item.selectedWidth}</span>
                      </div>
                    </div>

                    {/* Quantity and Price */}
                    <div className="flex items-center justify-between mt-2 pt-2">
                      <div className="flex items-center border border-stone-300 dark:border-stone-700 rounded-lg">
                        <button
                          onClick={() => onUpdateQuantity(index, -1)}
                          className="p-1 text-stone-600 dark:text-stone-400 hover:text-stone-900 cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 text-xs font-mono tabular-nums font-semibold text-stone-900 dark:text-stone-100">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(index, 1)}
                          className="p-1 text-stone-600 dark:text-stone-400 hover:text-stone-900 cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <span className="text-sm font-bold font-mono tabular-nums text-stone-900 dark:text-stone-100">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Coupon / Promo Code Section */}
              <div className="pt-4 mt-2">
                <div className="p-3 bg-stone-50 dark:bg-stone-800/40 rounded-xl border border-stone-200 dark:border-stone-700 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-800 dark:text-stone-200">
                    <Tag className="w-3.5 h-3.5 text-amber-600" />
                    <span>Apply Atelier Discount Coupon</span>
                  </div>

                  {appliedCoupon ? (
                    <div className="flex items-center justify-between bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 rounded-lg px-3 py-2 text-xs">
                      <div className="flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300 font-medium">
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span>Code <strong>{appliedCoupon.code}</strong> applied (-{formatPrice(discountValue)})</span>
                      </div>
                      <button
                        onClick={handleRemoveCoupon}
                        className="text-stone-500 hover:text-rose-600 text-[11px] underline cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Enter coupon (e.g. KADAM10)"
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                          className="flex-1 text-xs bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-600 rounded-lg px-3 py-2 uppercase font-mono outline-none"
                        />
                        <button
                          onClick={() => handleApplyCoupon()}
                          className="px-3.5 py-2 text-xs font-semibold bg-stone-900 text-white hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 rounded-lg cursor-pointer"
                        >
                          Apply
                        </button>
                      </div>

                      {couponError && (
                        <p className="text-[11px] text-rose-600 dark:text-rose-400 font-medium">
                          {couponError}
                        </p>
                      )}

                      {/* Clickable quick pills */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        <span className="text-[10px] text-stone-400">Available:</span>
                        {AVAILABLE_COUPONS.map((cp) => (
                          <button
                            key={cp.code}
                            onClick={() => handleApplyCoupon(cp.code)}
                            className="px-2 py-0.5 text-[10px] bg-white dark:bg-stone-800 border border-amber-300/80 dark:border-stone-600 rounded text-amber-800 dark:text-amber-300 font-mono hover:bg-amber-50 cursor-pointer flex items-center gap-1"
                          >
                            <Sparkles className="w-2.5 h-2.5" />
                            <span>{cp.code}</span>
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="py-20 text-center space-y-3">
              <ShoppingBag className="w-12 h-12 mx-auto text-stone-300 dark:text-stone-600" />
              <p className="text-sm font-medium text-stone-700 dark:text-stone-300">Your bag is empty</p>
              <p className="text-xs text-stone-400">Discover handcrafted Juttis, Kids footwear, and Formal Oxfords to begin.</p>
              <button
                onClick={onClose}
                className="mt-3 px-4 py-2 text-xs font-semibold text-stone-900 dark:text-stone-100 bg-stone-100 dark:bg-stone-800 rounded-lg hover:bg-stone-200 transition-colors cursor-pointer"
              >
                Explore Collection
              </button>
            </div>
          )}
        </div>

        {/* Drawer Footer with Subtotal and Checkout Button */}
        {items.length > 0 && (
          <div className="p-5 border-t border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-900 space-y-4">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-stone-500 dark:text-stone-400">
                <span>Subtotal (Inclusive of GST)</span>
                <span className="font-mono tabular-nums font-medium text-stone-900 dark:text-stone-100">
                  {formatPrice(rawSubtotal)}
                </span>
              </div>

              {discountValue > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium">
                  <span>Coupon Discount ({appliedCoupon?.code})</span>
                  <span className="font-mono tabular-nums">
                    -{formatPrice(discountValue)}
                  </span>
                </div>
              )}

              <div className="flex justify-between text-stone-500 dark:text-stone-400">
                <span>Blue Dart Express Shipping</span>
                <span className="font-mono tabular-nums text-stone-900 dark:text-stone-100">
                  {isFreeShipping ? 'FREE' : '₹150'}
                </span>
              </div>

              <div className="flex justify-between text-sm font-bold text-stone-900 dark:text-stone-100 pt-2 border-t border-stone-200 dark:border-stone-800">
                <span>Final Payable</span>
                <span className="font-mono tabular-nums">
                  {formatPrice(finalPayable)}
                </span>
              </div>
            </div>

            <button
              onClick={onProceedToCheckout}
              className="w-full py-3.5 px-4 bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white text-white font-semibold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-stone-400 text-center">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
              <span>Free 7-day doorstep size exchange across 19,000+ PIN codes</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
