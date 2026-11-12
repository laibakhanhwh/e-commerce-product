import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { ShoeProduct } from '../types/shoes';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: ShoeProduct[];
  onRemoveFromWishlist: (product: ShoeProduct) => void;
  onSelectProduct: (product: ShoeProduct) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveFromWishlist,
  onSelectProduct
}) => {
  if (!isOpen) return null;

  const formatPrice = (val: number) => {
    return '₹' + val.toLocaleString('en-IN');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/60 backdrop-blur-xs flex justify-end animate-fadeIn">
      <div 
        className="w-full max-w-md bg-white dark:bg-stone-900 h-full flex flex-col justify-between shadow-2xl border-l border-stone-200 dark:border-stone-800 animate-slideLeft"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            <h2 className="text-base font-bold text-stone-900 dark:text-stone-100">
              Wishlist ({wishlistProducts.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors cursor-pointer"
            aria-label="Close wishlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 divide-y divide-stone-100 dark:divide-stone-800">
          {wishlistProducts.length > 0 ? (
            wishlistProducts.map((product) => (
              <div key={product.id} className="py-4 first:pt-0 last:pb-0 flex gap-4">
                <div 
                  onClick={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                  className="w-20 h-20 rounded-lg overflow-hidden bg-stone-100 dark:bg-stone-800 shrink-0 cursor-pointer border border-stone-200 dark:border-stone-700"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-start justify-between gap-2">
                      <h3 
                        onClick={() => {
                          onSelectProduct(product);
                          onClose();
                        }}
                        className="text-sm font-semibold text-stone-900 dark:text-stone-100 hover:underline cursor-pointer"
                      >
                        {product.name}
                      </h3>
                      <button
                        onClick={() => onRemoveFromWishlist(product)}
                        className="text-stone-400 hover:text-rose-600 transition-colors cursor-pointer p-0.5"
                        aria-label="Remove from wishlist"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="text-xs text-stone-500 dark:text-stone-400">
                      <span>{product.gender}&apos;s {product.category}</span>
                    </div>
                    <div className="text-sm font-mono font-bold text-stone-900 dark:text-stone-100 mt-1">
                      {formatPrice(product.price)}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onSelectProduct(product);
                      onClose();
                    }}
                    className="mt-2 text-xs font-semibold py-1.5 px-3 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-900 dark:text-stone-100 rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Select Indian Size &amp; Add</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 text-center space-y-3">
              <Heart className="w-12 h-12 mx-auto text-stone-300 dark:text-stone-600" />
              <p className="text-sm font-medium text-stone-700 dark:text-stone-300">Your wishlist is currently empty</p>
              <p className="text-xs text-stone-400">Click the heart icon on any pair of Juttis or Kolhapuris to save them.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
