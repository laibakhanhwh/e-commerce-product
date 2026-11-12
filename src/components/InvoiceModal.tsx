import React from 'react';
import { X, Printer, CheckCircle, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types/shoes';

interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderNumber: string;
  items: CartItem[];
  customerDetails: {
    fullName: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    paymentMethod: string;
  };
  totalAmount: number;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({
  isOpen,
  onClose,
  orderNumber,
  items,
  customerDetails,
  totalAmount
}) => {
  if (!isOpen) return null;

  const invoiceDate = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const gstAmount = Math.round(subtotal * 0.18 / 1.18); // 18% inclusive GST
  const taxableValue = subtotal - gstAmount;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div 
        className="relative bg-white text-stone-900 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Toolbar */}
        <div className="flex items-center justify-between border-b border-stone-200 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-widest uppercase">
              KADAM<span className="font-light text-amber-700 ml-1">ATELIER</span>
            </span>
            <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-medium flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              Tax Invoice (Paid)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Invoice</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-500 hover:text-stone-900 rounded-lg cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Invoice Metadata */}
        <div className="grid grid-cols-2 gap-4 text-xs pb-6 border-b border-stone-200">
          <div>
            <div className="text-stone-500">Billed &amp; Dispatched by:</div>
            <div className="font-bold text-stone-900 mt-0.5">KADAM Footwear India Pvt. Ltd.</div>
            <div className="text-stone-600">GSTIN: 27AABCK4819Q1ZP</div>
            <div className="text-stone-600">Johari Bazaar, Jaipur / Agra Atelier Hub</div>
            <div className="text-stone-600">Support: care@kadamfootwear.in</div>
          </div>

          <div className="text-right space-y-1">
            <div>Invoice No: <strong className="font-mono">INV-{orderNumber}</strong></div>
            <div>Order ID: <strong className="font-mono">{orderNumber}</strong></div>
            <div>Invoice Date: <span className="font-mono">{invoiceDate}</span></div>
            <div>Payment: <span className="uppercase font-semibold text-emerald-700">{customerDetails.paymentMethod}</span></div>
          </div>
        </div>

        {/* Customer Details */}
        <div className="py-4 text-xs border-b border-stone-200">
          <div className="text-stone-500 font-semibold mb-1">Delivered To:</div>
          <div className="font-bold text-stone-900">{customerDetails.fullName}</div>
          <div className="text-stone-600">{customerDetails.address}</div>
          <div className="text-stone-600">{customerDetails.city}, {customerDetails.state} - {customerDetails.postalCode}</div>
          <div className="text-stone-600">Phone: {customerDetails.phone}</div>
        </div>

        {/* Items Table */}
        <div className="py-4 overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-stone-300 text-stone-500">
                <th className="py-2">Item Description</th>
                <th className="py-2 text-center">HSN/SAC</th>
                <th className="py-2 text-center">Size</th>
                <th className="py-2 text-center">Qty</th>
                <th className="py-2 text-right">Price</th>
                <th className="py-2 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {items.map((item, idx) => (
                <tr key={idx}>
                  <td className="py-2 font-medium">
                    {item.product.name} ({item.selectedColor.name})
                  </td>
                  <td className="py-2 text-center font-mono text-stone-500">640320</td>
                  <td className="py-2 text-center font-mono">Ind {item.selectedSize.ukIndia}</td>
                  <td className="py-2 text-center font-mono">{item.quantity}</td>
                  <td className="py-2 text-right font-mono">₹{item.product.price.toLocaleString('en-IN')}</td>
                  <td className="py-2 text-right font-mono font-semibold">₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Financial Totals */}
        <div className="pt-4 border-t border-stone-200 space-y-1.5 text-xs text-right font-mono">
          <div className="flex justify-between text-stone-500">
            <span>Taxable Subtotal:</span>
            <span>₹{taxableValue.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between text-stone-500">
            <span>Integrated GST (IGST 18%):</span>
            <span>₹{gstAmount.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between text-stone-500">
            <span>Blue Dart Express Shipping:</span>
            <span>FREE</span>
          </div>
          <div className="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-stone-300">
            <span>Total Payable Amount:</span>
            <span>₹{totalAmount.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Footer Guarantee */}
        <div className="mt-6 pt-4 border-t border-stone-200 flex items-center justify-between text-[11px] text-stone-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Zero Shoe-Bite Guarantee &middot; 7-Day Doorstep Replacement</span>
          </div>
          <div>Computer-generated digital tax invoice</div>
        </div>
      </div>
    </div>
  );
};
