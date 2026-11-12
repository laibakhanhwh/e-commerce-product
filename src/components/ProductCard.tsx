import React from 'react';
import { Heart, Star, Eye } from 'lucide-react';
import { ShoeProduct, ShoeColor } from '../types/shoes';

interface ProductCardProps {
  product: ShoeProduct;
  onOpenProductModal: (product: ShoeProduct, initialColor?: ShoeColor) => void;
  onToggleWishlist: (product: ShoeProduct) => void;
  isWishlisted: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenProductModal,
  onToggleWishlist,
  isWishlisted
}) => {
  const [selectedColor, setSelectedColor] = React.useState(product.colors[0]);
  const [imageError, setImageError] = React.useState(false);

  // Sync selected color if product changes
  React.useEffect(() => {
    setSelectedColor(product.colors[0]);
  }, [product.id]);

  // Switch image when color changes if color has its own image
  const displayImage = selectedColor?.image || product.image;

  React.useEffect(() => {
    setImageError(false);
  }, [selectedColor]);

  // Format Indian currency with comma grouping
  const formatPrice = (val: number) => {
    return '₹' + val.toLocaleString('en-IN');
  };

  return (
    <article className="group bg-white dark:bg-stone-800/80 rounded-xl border border-stone-200/80 dark:border-stone-700/80 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      {/* Product Image Stage (65-75% visual prominence) */}
      <div 
        onClick={() => onOpenProductModal(product, selectedColor)}
        className="relative aspect-[4/3] bg-stone-100 dark:bg-stone-900/90 overflow-hidden cursor-pointer"
      >
        {!imageError ? (
          <img
            src={displayImage}
            alt={`${product.name} - ${selectedColor.name}`}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center transition-all duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-stone-200 dark:bg-stone-800 text-stone-500 text-center">
            <span className="text-xs uppercase font-mono tracking-wider">{product.category}</span>
            <span className="text-sm font-semibold mt-1 text-stone-700 dark:text-stone-300">{product.name}</span>
          </div>
        )}

        {/* Active Shade Badge Indicator on Image */}
        <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-md bg-stone-900/85 backdrop-blur-xs text-[10px] text-white flex items-center gap-1.5 shadow-sm pointer-events-none">
          <span
            className="w-2 h-2 rounded-full border border-white/70 shrink-0"
            style={{ backgroundColor: selectedColor.hex }}
          />
          <span className="truncate max-w-[120px] font-medium">{selectedColor.name}</span>
        </div>

        {/* Highlight Tag */}
        {product.highlightTag && (
          <div className="absolute top-3 left-3 bg-stone-900/85 backdrop-blur-xs text-white text-[11px] font-medium tracking-wide uppercase px-2.5 py-1 rounded">
            {product.highlightTag}
          </div>
        )}

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all cursor-pointer ${
            isWishlisted
              ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/80 dark:text-rose-400'
              : 'bg-white/80 dark:bg-stone-900/80 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Overlay on Hover */}
        <div className="absolute inset-x-0 bottom-3 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenProductModal(product, selectedColor);
            }}
            className="bg-stone-900/90 hover:bg-stone-900 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-md flex items-center gap-1.5 transition-transform translate-y-2 group-hover:translate-y-0 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View &amp; Sizes</span>
          </button>
        </div>
      </div>

      {/* Card Content & Metadata */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-4">
        <div className="space-y-1.5">
          {/* Metadata line with typographic separators */}
          <div className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400">
            <span className="capitalize font-medium">{product.gender}</span>
            <span aria-hidden="true">·</span>
            <span>{product.category}</span>
            <span aria-hidden="true">·</span>
            <span>{product.specs.origin.split(',')[0]}</span>
          </div>

          {/* Product Name */}
          <h2 
            onClick={() => onOpenProductModal(product, selectedColor)}
            className="text-base font-semibold text-stone-900 dark:text-stone-100 hover:text-stone-600 dark:hover:text-stone-300 transition-colors cursor-pointer line-clamp-1"
          >
            {product.name}
          </h2>

          {/* Tagline */}
          <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-1">
            {product.tagline}
          </p>
        </div>

        {/* Color Swatches and Price Row */}
        <div className="pt-2 border-t border-stone-100 dark:border-stone-700/60 flex items-center justify-between gap-2">
          {/* Color Swatches */}
          <div className="flex items-center gap-2" title={`Color: ${selectedColor.name}`}>
            <div className="flex items-center gap-1.5">
              {product.colors.map((color) => {
                const isSelected = selectedColor.name === color.name;
                return (
                  <button
                    key={color.name}
                    type="button"
                    title={color.name}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedColor(color);
                    }}
                    style={{ backgroundColor: color.hex }}
                    className={`w-5 h-5 rounded-full border transition-all duration-150 cursor-pointer flex items-center justify-center ${
                      isSelected
                        ? 'ring-2 ring-stone-900 dark:ring-stone-100 ring-offset-2 scale-110 border-stone-800 dark:border-white shadow-xs'
                        : 'border-stone-300 dark:border-stone-600 hover:scale-110 opacity-75 hover:opacity-100'
                    }`}
                    aria-label={`Select ${color.name} color`}
                    aria-pressed={isSelected}
                  >
                    {isSelected && (
                      <span
                        className={`block w-1.5 h-1.5 rounded-full ${
                          ['#ffffff', '#faf9f6', '#e6d7b8', '#d6c0b3', '#f3f4f6'].includes(color.hex.toLowerCase())
                            ? 'bg-stone-900'
                            : 'bg-white'
                        }`}
                      />
                    )}
                  </button>
                );
              })}
            </div>
            <span className="text-[11px] font-medium text-stone-700 dark:text-stone-300 truncate max-w-[100px]" title={selectedColor.name}>
              {selectedColor.name}
            </span>
          </div>

          {/* Price with Indian Rupee and Tabular Numerals */}
          <div className="flex items-baseline gap-1.5 text-right shrink-0">
            {product.originalPrice && (
              <span className="text-xs text-stone-400 line-through font-mono tabular-nums">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            <span className="text-base font-bold text-stone-900 dark:text-stone-100 font-mono tabular-nums">
              {formatPrice(product.price)}
            </span>
          </div>
        </div>

        {/* Action Button & Rating Strip */}
        <div className="flex items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-1 text-xs text-stone-600 dark:text-stone-300 font-medium">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="tabular-nums font-mono">{product.rating}</span>
            <span className="text-stone-400">({product.reviewCount})</span>
          </div>

          <button
            type="button"
            onClick={() => onOpenProductModal(product, selectedColor)}
            className="px-3 py-1.5 text-xs font-semibold text-stone-900 dark:text-stone-100 bg-stone-100 hover:bg-stone-200 dark:bg-stone-700/60 dark:hover:bg-stone-700 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
          >
            <span>Select Size</span>
            <span aria-hidden="true">&rarr;</span>
          </button>
        </div>

      </div>
    </article>
  );
};
