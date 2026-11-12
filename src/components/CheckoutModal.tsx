import React from 'react';
import { X, CheckCircle2, ShieldCheck, Truck, Smartphone, Banknote, CreditCard, ArrowRight, QrCode, FileText, Check } from 'lucide-react';
import { CartItem } from '../types/shoes';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onClearCart: () => void;
  onOpenTrackingWithId?: (orderId: string) => void;
  onOpenInvoice?: (orderId: string, items: CartItem[], customerDetails: any, total: number) => void;
}

const INDIAN_STATES = [
  'Maharashtra',
  'Delhi NCR',
  'Karnataka',
  'Tamil Nadu',
  'West Bengal',
  'Telangana',
  'Gujarat',
  'Rajasthan',
  'Punjab',
  'Uttar Pradesh',
  'Kerala',
  'Haryana',
  'Madhya Pradesh'
];

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onClearCart,
  onOpenTrackingWithId,
  onOpenInvoice
}) => {
  const [step, setStep] = React.useState<'form' | 'success'>('form');
  const [formData, setFormData] = React.useState({
    fullName: 'Rohan Sharma',
    email: 'rohan.sharma@example.com',
    phone: '+91 98201 45892',
    address: 'Flat 402, Sea Crest Apartments, Bandra West',
    city: 'Mumbai',
    state: 'Maharashtra',
    postalCode: '400050',
    upiId: 'rohansharma@okaxis',
    cardNumber: '4532 •••• •••• 8912',
    cardExpiry: '08/29',
    cardCvv: '482',
    bankName: 'HDFC Bank',
    shippingMethod: 'standard', // standard or express
    paymentMethod: 'upi' // upi, cod, card, netbanking
  });

  const [orderNumber, setOrderNumber] = React.useState('');
  const [purchasedItems, setPurchasedItems] = React.useState<CartItem[]>([]);
  const [vpaVerified, setVpaVerified] = React.useState(true);

  React.useEffect(() => {
    if (isOpen && step === 'form') {
      setPurchasedItems(items);
    }
  }, [isOpen, items]);

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const isFreeDelivery = subtotal >= 1999;
  const shippingFee = formData.shippingMethod === 'express' ? 200 : isFreeDelivery ? 0 : 150;
  const total = subtotal + shippingFee;

  const formatPrice = (val: number) => {
    return '₹' + val.toLocaleString('en-IN');
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `KDM-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(generatedId);
    setPurchasedItems([...items]);

    // Save to user order history in localStorage
    try {
      const existing = localStorage.getItem('kadam_orders');
      const parsed = existing ? JSON.parse(existing) : [];
      const newOrder = {
        orderId: generatedId,
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        items: items.map((i) => ({
          name: i.product.name,
          size: i.selectedSize.ukIndia,
          price: i.product.price
        })),
        total: total,
        status: 'In Transit',
        carrierTracking: `BLUEDART-${generatedId.replace('KDM-', '')}IN`
      };
      localStorage.setItem('kadam_orders', JSON.stringify([newOrder, ...parsed]));
    } catch {}

    setStep('success');
    onClearCart();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div 
        className="relative bg-white dark:bg-stone-900 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors cursor-pointer"
          aria-label="Close checkout"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'form' ? (
          <div>
            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">
                KADAM Express Checkout
              </h2>
            </div>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Safe &amp; Encrypted Pan-India Delivery via Blue Dart Air Express.
            </p>

            <form onSubmit={handleSubmitOrder} className="mt-6 space-y-6">
              {/* Customer Contact */}
              <div className="space-y-3">
                <h3 className="text-xs uppercase font-semibold tracking-wider text-amber-800 dark:text-amber-400">
                  1. Delivery Address &amp; Contact
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-medium text-stone-600 dark:text-stone-400">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full text-xs bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-lg p-2.5 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-stone-600 dark:text-stone-400">WhatsApp / Mobile for OTP</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full text-xs bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-lg p-2.5 outline-none font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-medium text-stone-600 dark:text-stone-400">House / Flat No., Street, Landmark</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full text-xs bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-lg p-2.5 outline-none"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] font-medium text-stone-600 dark:text-stone-400">City</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full text-xs bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-lg p-2.5 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-stone-600 dark:text-stone-400">State</label>
                    <select
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full text-xs bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-lg p-2.5 outline-none cursor-pointer"
                    >
                      {INDIAN_STATES.map((st) => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-stone-600 dark:text-stone-400">PIN Code</label>
                    <input
                      type="text"
                      required
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      className="w-full text-xs bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-lg p-2.5 outline-none font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Speed */}
              <div className="space-y-2">
                <h3 className="text-xs uppercase font-semibold tracking-wider text-amber-800 dark:text-amber-400">
                  2. Courier Partner
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer text-xs ${
                    formData.shippingMethod === 'standard'
                      ? 'border-stone-900 dark:border-stone-100 bg-stone-50 dark:bg-stone-800 font-semibold'
                      : 'border-stone-200 dark:border-stone-700'
                  }`}>
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="shipping"
                        checked={formData.shippingMethod === 'standard'}
                        onChange={() => setFormData({ ...formData, shippingMethod: 'standard' })}
                        className="accent-stone-900"
                      />
                      <div>
                        <div>Blue Dart Express (2-4 Days)</div>
                        <div className="text-[10px] text-stone-400 font-normal">Dispatched from regional ateliers</div>
                      </div>
                    </div>
                    <span className="font-mono">{isFreeDelivery ? 'FREE' : '₹150'}</span>
                  </label>

                  <label className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer text-xs ${
                    formData.shippingMethod === 'express'
                      ? 'border-stone-900 dark:border-stone-100 bg-stone-50 dark:bg-stone-800 font-semibold'
                      : 'border-stone-200 dark:border-stone-700'
                  }`}>
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="shipping"
                        checked={formData.shippingMethod === 'express'}
                        onChange={() => setFormData({ ...formData, shippingMethod: 'express' })}
                        className="accent-stone-900"
                      />
                      <div>
                        <div>Priority Air Cargo (24-48 Hours)</div>
                        <div className="text-[10px] text-stone-400 font-normal">Direct metro air logistics</div>
                      </div>
                    </div>
                    <span className="font-mono">₹200</span>
                  </label>
                </div>
              </div>

              {/* Indian Payment Options */}
              <div className="space-y-2">
                <h3 className="text-xs uppercase font-semibold tracking-wider text-amber-800 dark:text-amber-400">
                  3. Indian Payment Options
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'upi' })}
                    className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 text-xs transition-colors cursor-pointer ${
                      formData.paymentMethod === 'upi'
                        ? 'border-stone-900 dark:border-stone-100 bg-stone-50 dark:bg-stone-800 font-semibold ring-1 ring-amber-600'
                        : 'border-stone-200 dark:border-stone-700'
                    }`}
                  >
                    <Smartphone className="w-4 h-4 text-emerald-600" />
                    <span>Instant UPI</span>
                    <span className="text-[10px] text-stone-400 font-normal">GPay / PhonePe</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                    className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 text-xs transition-colors cursor-pointer ${
                      formData.paymentMethod === 'cod'
                        ? 'border-stone-900 dark:border-stone-100 bg-stone-50 dark:bg-stone-800 font-semibold ring-1 ring-amber-600'
                        : 'border-stone-200 dark:border-stone-700'
                    }`}
                  >
                    <Banknote className="w-4 h-4 text-amber-600" />
                    <span>Cash on Delivery</span>
                    <span className="text-[10px] text-emerald-600 font-medium">₹0 Extra Fee</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                    className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 text-xs transition-colors cursor-pointer ${
                      formData.paymentMethod === 'card'
                        ? 'border-stone-900 dark:border-stone-100 bg-stone-50 dark:bg-stone-800 font-semibold ring-1 ring-amber-600'
                        : 'border-stone-200 dark:border-stone-700'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-blue-600" />
                    <span>Debit / Credit Card</span>
                    <span className="text-[10px] text-stone-400 font-normal">Visa &middot; RuPay</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'netbanking' })}
                    className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 text-xs transition-colors cursor-pointer ${
                      formData.paymentMethod === 'netbanking'
                        ? 'border-stone-900 dark:border-stone-100 bg-stone-50 dark:bg-stone-800 font-semibold ring-1 ring-amber-600'
                        : 'border-stone-200 dark:border-stone-700'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4 text-purple-600" />
                    <span>Net Banking</span>
                    <span className="text-[10px] text-stone-400 font-normal">HDFC, SBI, ICICI</span>
                  </button>
                </div>

                {formData.paymentMethod === 'upi' && (
                  <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs space-y-2 mt-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-emerald-900 dark:text-emerald-200">
                        Enter UPI VPA / ID:
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-emerald-700 font-mono">
                        <QrCode className="w-3.5 h-3.5" />
                        Dynamic QR enabled
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="mobileNumber@upi or name@okaxis"
                        value={formData.upiId}
                        onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                        className="flex-1 text-xs bg-white dark:bg-stone-800 border border-emerald-300 dark:border-emerald-700 rounded-lg p-2 font-mono outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setVpaVerified(true)}
                        className="px-3 bg-emerald-700 text-white rounded-lg text-xs font-semibold cursor-pointer flex items-center gap-1"
                      >
                        <Check className="w-3 h-3" />
                        <span>Verified</span>
                      </button>
                    </div>
                  </div>
                )}

                {formData.paymentMethod === 'card' && (
                  <div className="p-3.5 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-800 text-xs space-y-2 mt-2">
                    <div>
                      <label className="text-[11px] font-medium text-blue-900 dark:text-blue-200 block mb-1">Card Number (Visa / Mastercard / RuPay)</label>
                      <input
                        type="text"
                        value={formData.cardNumber}
                        onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                        className="w-full text-xs bg-white dark:bg-stone-800 border border-blue-300 dark:border-blue-700 rounded-lg p-2 font-mono outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-medium text-blue-900 dark:text-blue-200 block mb-1">Expiry MM/YY</label>
                        <input
                          type="text"
                          value={formData.cardExpiry}
                          onChange={(e) => setFormData({ ...formData, cardExpiry: e.target.value })}
                          className="w-full text-xs bg-white dark:bg-stone-800 border border-blue-300 dark:border-blue-700 rounded-lg p-2 font-mono outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-medium text-blue-900 dark:text-blue-200 block mb-1">CVV</label>
                        <input
                          type="password"
                          maxLength={4}
                          value={formData.cardCvv}
                          onChange={(e) => setFormData({ ...formData, cardCvv: e.target.value })}
                          className="w-full text-xs bg-white dark:bg-stone-800 border border-blue-300 dark:border-blue-700 rounded-lg p-2 font-mono outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {formData.paymentMethod === 'netbanking' && (
                  <div className="p-3.5 bg-purple-50 dark:bg-purple-950/40 rounded-xl border border-purple-200 dark:border-purple-800 text-xs space-y-2 mt-2">
                    <label className="text-[11px] font-medium text-purple-900 dark:text-purple-200 block mb-1">Select Bank</label>
                    <select
                      value={formData.bankName}
                      onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                      className="w-full text-xs bg-white dark:bg-stone-800 border border-purple-300 dark:border-purple-700 rounded-lg p-2 outline-none cursor-pointer"
                    >
                      <option value="HDFC Bank">HDFC Bank</option>
                      <option value="State Bank of India">State Bank of India</option>
                      <option value="ICICI Bank">ICICI Bank</option>
                      <option value="Axis Bank">Axis Bank</option>
                      <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Financial Recap */}
              <div className="bg-stone-100 dark:bg-stone-800/60 p-4 rounded-xl space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-stone-500">Cart Total ({items.length} items)</span>
                  <span className="font-mono tabular-nums">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">GST (18% - Included in Price)</span>
                  <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">Included</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Pan-India Express Delivery</span>
                  <span className="font-mono tabular-nums">{shippingFee === 0 ? 'FREE' : formatPrice(shippingFee)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold pt-2 border-t border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100">
                  <span>Grand Total</span>
                  <span className="font-mono tabular-nums">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-4 bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white text-white font-semibold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Confirm &amp; Place Order &mdash; {formatPrice(total)}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          /* Order Confirmation Success State */
          <div className="py-8 text-center space-y-4">
            <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto" />
            <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100">
              Shukriya! Your Order is Placed.
            </h2>
            <p className="text-xs font-mono uppercase tracking-wider text-amber-800 dark:text-amber-400 font-semibold">
              KADAM Order ID: <strong className="text-stone-900 dark:text-stone-100 font-bold">{orderNumber}</strong>
            </p>
            <p className="text-sm text-stone-600 dark:text-stone-300 max-w-md mx-auto leading-relaxed">
              We&apos;ve sent tracking details to <strong>{formData.phone}</strong> via WhatsApp. Handcrafted in our Agra/Jaipur ateliers with our 7-day doorstep exchange guarantee.
            </p>

            <div className="p-4 bg-stone-100 dark:bg-stone-800 rounded-xl text-xs text-left max-w-md mx-auto space-y-1.5 font-mono">
              <div className="flex justify-between">
                <span className="text-stone-500">Destination:</span>
                <span className="text-stone-900 dark:text-stone-100">{formData.city}, {formData.state} - {formData.postalCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Courier Partner:</span>
                <span className="text-stone-900 dark:text-stone-100">Blue Dart Air Cargo Express</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Payment:</span>
                <span className="text-stone-900 dark:text-stone-100 uppercase">{formData.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Total Paid:</span>
                <span className="text-emerald-600 font-bold">{formatPrice(total)}</span>
              </div>
            </div>

            {/* Action Buttons on Order Success */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
              <button
                onClick={() => {
                  onClose();
                  if (onOpenTrackingWithId) {
                    onOpenTrackingWithId(orderNumber);
                  }
                }}
                className="px-5 py-2.5 bg-amber-800 hover:bg-amber-900 text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Truck className="w-4 h-4" />
                <span>Track Shipment Now</span>
              </button>

              <button
                onClick={() => {
                  if (onOpenInvoice) {
                    onOpenInvoice(orderNumber, purchasedItems, formData, total);
                  }
                }}
                className="px-5 py-2.5 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 hover:bg-stone-50 text-stone-900 dark:text-stone-100 font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>View / Print GST Invoice</span>
              </button>

              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white dark:bg-stone-100 dark:text-stone-900 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
