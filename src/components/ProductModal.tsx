import React from 'react';
import { X, Star, Shield, Truck, RefreshCw, Ruler, Check, Heart, Share2, Plus, Minus, Send, ThumbsUp } from 'lucide-react';
import { ShoeProduct, ShoeColor, ShoeSize } from '../types/shoes';
import { SizeConversionChart } from './SizeConversionChart';

interface ProductModalProps {
  product: ShoeProduct | null;
  initialColor?: ShoeColor | null;
  onClose: () => void;
  onAddToCart: (product: ShoeProduct, color: ShoeColor, size: ShoeSize, width: string, quantity?: number) => void;
  onBuyNow?: (product: ShoeProduct, color: ShoeColor, size: ShoeSize, width: string, quantity?: number) => void;
  onToggleWishlist: (product: ShoeProduct) => void;
  isWishlisted: boolean;
  onOpenFitFinder: () => void;
}

interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  initialColor,
  onClose,
  onAddToCart,
  onBuyNow,
  onToggleWishlist,
  isWishlisted,
  onOpenFitFinder
}) => {
  const [selectedColor, setSelectedColor] = React.useState<ShoeColor | null>(null);
  const [selectedSize, setSelectedSize] = React.useState<ShoeSize | null>(null);
  const [selectedWidth, setSelectedWidth] = React.useState<string>('Regular Fit');
  const [quantity, setQuantity] = React.useState<number>(1);
  const [activeTab, setActiveTab] = React.useState<'specs' | 'story' | 'care' | 'reviews'>('specs');
  const [addedJustNow, setAddedJustNow] = React.useState(false);
  const [shareCopied, setShareCopied] = React.useState(false);
  const [showSizeChart, setShowSizeChart] = React.useState(false);

  // Review state
  const [reviews, setReviews] = React.useState<ReviewItem[]>([
    {
      id: 'rev-1',
      author: 'Aarav Malhotra',
      rating: 5,
      date: '2 weeks ago',
      comment: 'Wore these for 3 days of my brother’s wedding festivities in Udaipur. Absolutely zero shoe bites! The memory foam footbed is unbelievable.',
      verified: true
    },
    {
      id: 'rev-2',
      author: 'Sneha Kulkarni',
      rating: 5,
      date: '1 month ago',
      comment: 'Remarkable craftsmanship. The leather finish is top tier and fits true to UK/India size. Packaging arrived in pristine condition.',
      verified: true
    }
  ]);
  const [showReviewForm, setShowReviewForm] = React.useState(false);
  const [newReviewAuthor, setNewReviewAuthor] = React.useState('');
  const [newReviewRating, setNewReviewRating] = React.useState(5);
  const [newReviewComment, setNewReviewComment] = React.useState('');

  // Sync state whenever product or initialColor changes
  React.useEffect(() => {
    if (product) {
      setSelectedColor(initialColor || product.colors[0]);
      setSelectedSize(product.sizes.find((s) => s.inStock) || product.sizes[0]);
      setSelectedWidth(product.widths[0] || 'Regular Fit');
      setQuantity(1);
      setAddedJustNow(false);
      setShareCopied(false);
      setShowReviewForm(false);
    }
  }, [product, initialColor]);

  if (!product) return null;

  const currentColor = selectedColor || product.colors[0];
  const currentSize = selectedSize || product.sizes.find((s) => s.inStock) || product.sizes[0];
  const currentWidth = selectedWidth || product.widths[0] || 'Regular Fit';

  const formatPrice = (val: number) => {
    return '₹' + val.toLocaleString('en-IN');
  };

  const handleAddToCart = () => {
    onAddToCart(product, currentColor, currentSize, currentWidth, quantity);
    setAddedJustNow(true);
    setTimeout(() => setAddedJustNow(false), 2000);
  };

  const handleBuyNow = () => {
    if (onBuyNow) {
      onBuyNow(product, currentColor, currentSize, currentWidth, quantity);
    } else {
      onAddToCart(product, currentColor, currentSize, currentWidth, quantity);
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
      }
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2500);
    } catch {
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2500);
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) return;

    const newRev: ReviewItem = {
      id: `rev-${Date.now()}`,
      author: newReviewAuthor.trim(),
      rating: newReviewRating,
      date: 'Just now',
      comment: newReviewComment.trim(),
      verified: true
    };

    setReviews([newRev, ...reviews]);
    setNewReviewAuthor('');
    setNewReviewComment('');
    setShowReviewForm(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 lg:p-8 animate-fadeIn">
      {/* Modal Container */}
      <div 
        className="relative bg-white dark:bg-stone-900 rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl border border-stone-200 dark:border-stone-800 my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Action Buttons (Close and Share) */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
          <button
            onClick={handleShare}
            className="p-2.5 rounded-full bg-white/80 dark:bg-stone-800/80 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white backdrop-blur-md transition-colors cursor-pointer border border-stone-200 dark:border-stone-700"
            title="Share this design"
            aria-label="Share product"
          >
            <Share2 className="w-4 h-4" />
          </button>

          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-white/80 dark:bg-stone-800/80 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white backdrop-blur-md transition-colors cursor-pointer border border-stone-200 dark:border-stone-700"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {shareCopied && (
          <div className="absolute top-16 right-4 z-20 bg-stone-900 text-white text-xs px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-1.5 animate-fadeIn">
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span>Product link copied to clipboard!</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          {/* Left Column: Product Visual Stage */}
          <div className="md:col-span-6 bg-stone-100 dark:bg-stone-950 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-stone-200 dark:border-stone-800">
            <div>
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-stone-200 dark:bg-stone-900 shadow-inner">
                <img
                  src={currentColor.image || product.image}
                  alt={`${product.name} - ${currentColor.name}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-all duration-300"
                />

                {/* Active Shade Badge */}
                <div className="absolute bottom-3 left-3 bg-stone-900/85 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-1 rounded-md shadow flex items-center gap-1.5 pointer-events-none">
                  <span
                    className="w-2.5 h-2.5 rounded-full border border-white/70"
                    style={{ backgroundColor: currentColor.hex }}
                  />
                  <span>{currentColor.name}</span>
                </div>

                {product.highlightTag && (
                  <span className="absolute top-3 left-3 bg-stone-900 text-white text-[11px] font-semibold uppercase px-2.5 py-1 rounded tracking-wide">
                    {product.highlightTag}
                  </span>
                )}
              </div>

              {/* Shade indicator */}
              <div className="mt-4 flex items-center justify-between text-xs text-stone-500">
                <span>Selected Shade: <strong className="text-stone-900 dark:text-stone-100 font-semibold">{currentColor.name}</strong></span>
                <span className="capitalize">{product.gender}&apos;s Edition</span>
              </div>
            </div>

            {/* Guarantees Strip */}
            <div className="grid grid-cols-3 gap-2 mt-6 pt-4 border-t border-stone-200/80 dark:border-stone-800 text-center text-[11px] text-stone-500 dark:text-stone-400">
              <div className="flex flex-col items-center">
                <Truck className="w-4 h-4 text-amber-700 dark:text-amber-400 mb-1" />
                <span>Pan-India Courier</span>
              </div>
              <div className="flex flex-col items-center">
                <RefreshCw className="w-4 h-4 text-amber-700 dark:text-amber-400 mb-1" />
                <span>7-Day Exchange</span>
              </div>
              <div className="flex flex-col items-center">
                <Shield className="w-4 h-4 text-amber-700 dark:text-amber-400 mb-1" />
                <span>Anti-Bite Cushion</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              {/* Category & Origin Line */}
              <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 uppercase tracking-wider font-medium">
                <span className="capitalize">{product.gender}&apos;s footwear</span>
                <span aria-hidden="true">·</span>
                <span>{product.category}</span>
                <span aria-hidden="true">·</span>
                <span>{product.specs.origin}</span>
              </div>

              {/* Title & Tagline */}
              <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mt-1">
                {product.name}
              </h1>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                {product.tagline}
              </p>

              {/* Price & Rating */}
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-stone-100 dark:border-stone-800">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-stone-900 dark:text-stone-100 font-mono tabular-nums">
                    {formatPrice(product.price * quantity)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-stone-400 line-through font-mono tabular-nums">
                      {formatPrice(product.originalPrice * quantity)}
                    </span>
                  )}
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                    (GST Incl.)
                  </span>
                </div>

                <button
                  onClick={() => setActiveTab('reviews')}
                  className="flex items-center gap-1.5 text-xs font-medium text-stone-700 dark:text-stone-300 hover:text-amber-600 cursor-pointer"
                >
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-mono tabular-nums">{product.rating}</span>
                  <span className="text-stone-400 underline">({reviews.length + product.reviewCount} reviews)</span>
                </button>
              </div>

              {/* Color Selection */}
              <div className="mt-5 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                    <span>Shade:</span>
                    <span className="font-bold text-amber-800 dark:text-amber-400">{currentColor.name}</span>
                  </span>
                  <span className="text-[11px] text-stone-500">
                    {product.colors.length} {product.colors.length === 1 ? 'shade available' : 'shades available'}
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  {product.colors.map((color) => {
                    const isSelected = currentColor.name === color.name;
                    const isLightHex = ['#ffffff', '#faf9f6', '#e6d7b8', '#d6c0b3', '#f3f4f6'].includes(color.hex.toLowerCase());
                    return (
                      <button
                        key={color.name}
                        type="button"
                        onClick={() => setSelectedColor(color)}
                        style={{ backgroundColor: color.hex }}
                        className={`w-8 h-8 rounded-full border transition-all cursor-pointer flex items-center justify-center relative ${
                          isSelected
                            ? 'ring-2 ring-stone-900 dark:ring-stone-100 ring-offset-2 scale-110 border-stone-900 dark:border-white shadow-md'
                            : 'border-stone-300 dark:border-stone-700 hover:scale-105 opacity-80 hover:opacity-100'
                        }`}
                        title={color.name}
                        aria-label={`Select ${color.name}`}
                        aria-pressed={isSelected}
                      >
                        {isSelected && (
                          <Check className={`w-4 h-4 stroke-[2.5] ${isLightHex ? 'text-stone-900' : 'text-white'}`} />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Size Selection (Indian Sizing Standard) */}
              <div className="mt-5 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-stone-900 dark:text-stone-100">
                    Select Indian Size:{' '}
                    <span className="font-mono font-bold text-amber-800 dark:text-amber-400">
                      {product.gender === 'kids' && currentSize.ukIndia >= 8 ? `Ind Kids ${currentSize.ukIndia}` : `Ind ${currentSize.ukIndia}`}
                    </span>
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setShowSizeChart(!showSizeChart)}
                      className="inline-flex items-center gap-1 text-xs text-amber-800 dark:text-amber-400 hover:underline cursor-pointer font-medium"
                    >
                      <Ruler className="w-3.5 h-3.5" />
                      <span>{showSizeChart ? 'Hide Indian Size Guide' : 'Indian Size Guide'}</span>
                    </button>
                    <span className="text-stone-300 dark:text-stone-700">·</span>
                    <button
                      type="button"
                      onClick={onOpenFitFinder}
                      className="text-xs text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 cursor-pointer"
                    >
                      Fit Calculator
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz.ukIndia}
                      type="button"
                      disabled={!sz.inStock}
                      onClick={() => setSelectedSize(sz)}
                      className={`h-11 rounded-lg text-xs font-mono tabular-nums font-semibold flex flex-col items-center justify-center border transition-all cursor-pointer ${
                        !sz.inStock
                          ? 'opacity-35 bg-stone-100 dark:bg-stone-800 text-stone-400 border-stone-200 cursor-not-allowed line-through'
                          : currentSize.ukIndia === sz.ukIndia
                          ? 'bg-stone-900 text-white border-stone-900 dark:bg-stone-100 dark:text-stone-900 dark:border-stone-100 shadow-sm'
                          : 'bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 border-stone-300 dark:border-stone-700 hover:border-stone-400'
                      }`}
                    >
                      <span>Ind {sz.ukIndia}</span>
                      <span className="text-[10px] font-normal opacity-70">
                        {product.gender === 'kids' && sz.ukIndia >= 8 ? 'Kids' : 'Size'}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Stock warning */}
                {currentSize.stockCount && currentSize.stockCount <= 3 && (
                  <p className="text-[11px] text-amber-600 dark:text-amber-400 font-medium">
                    Low inventory: Only {currentSize.stockCount} pairs left in Indian Size {currentSize.ukIndia}
                  </p>
                )}

                {/* Indian Footwear Size Guide Accordion */}
                {showSizeChart && (
                  <div className="mt-3 pt-2">
                    <SizeConversionChart
                      product={product}
                      selectedSize={currentSize}
                      onSelectSize={(sz) => setSelectedSize(sz)}
                    />
                  </div>
                )}
              </div>

              {/* Width Selector */}
              {product.widths.length > 1 && (
                <div className="mt-4 space-y-1.5">
                  <span className="text-xs font-semibold text-stone-900 dark:text-stone-100">Toe Box Fit</span>
                  <div className="flex gap-2">
                    {product.widths.map((w) => (
                      <button
                        key={w}
                        onClick={() => setSelectedWidth(w)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                          currentWidth === w
                            ? 'bg-stone-900 text-white border-stone-900 dark:bg-stone-100 dark:text-stone-900'
                            : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-300 dark:border-stone-700'
                        }`}
                      >
                        {w}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="mt-4 flex items-center justify-between pt-2 border-t border-stone-100 dark:border-stone-800">
                <span className="text-xs font-semibold text-stone-900 dark:text-stone-100">Quantity</span>
                <div className="flex items-center border border-stone-300 dark:border-stone-700 rounded-lg">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="p-1.5 text-stone-600 dark:text-stone-300 hover:text-stone-900 disabled:opacity-30 cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-mono font-bold text-stone-900 dark:text-stone-100 tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(5, q + 1))}
                    disabled={quantity >= 5}
                    className="p-1.5 text-stone-600 dark:text-stone-300 hover:text-stone-900 disabled:opacity-30 cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Primary Action Buttons: Add to Bag & Buy Now */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-6">
                <button
                  onClick={handleAddToCart}
                  disabled={!currentSize.inStock}
                  className="flex-1 py-3 px-4 text-xs sm:text-sm font-semibold rounded-xl text-stone-900 bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-100 dark:hover:bg-stone-700 border border-stone-300 dark:border-stone-700 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {addedJustNow ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-500" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <span>Add to Bag</span>
                  )}
                </button>

                <button
                  onClick={handleBuyNow}
                  disabled={!currentSize.inStock}
                  className="flex-1 py-3 px-4 text-xs sm:text-sm font-semibold rounded-xl text-white bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>Buy Now &mdash; {formatPrice(product.price * quantity)}</span>
                </button>

                <button
                  onClick={() => onToggleWishlist(product)}
                  className={`p-3 rounded-xl border transition-colors cursor-pointer shrink-0 self-center ${
                    isWishlisted
                      ? 'bg-rose-50 border-rose-200 text-rose-600 dark:bg-rose-950 dark:border-rose-900 dark:text-rose-400'
                      : 'bg-white dark:bg-stone-800 border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:text-stone-900'
                  }`}
                  aria-label={isWishlisted ? 'Saved in wishlist' : 'Save to wishlist'}
                  title={isWishlisted ? 'In wishlist' : 'Add to wishlist'}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>

            {/* Tabbed Specifications, Craft Story & Reviews */}
            <div className="pt-4 border-t border-stone-200 dark:border-stone-800">
              <div className="flex items-center gap-3 sm:gap-4 text-xs font-semibold border-b border-stone-200 dark:border-stone-800 pb-2 overflow-x-auto">
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`pb-1 cursor-pointer transition-colors whitespace-nowrap ${
                    activeTab === 'specs'
                      ? 'border-b-2 border-stone-900 dark:border-stone-100 text-stone-900 dark:text-stone-100'
                      : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-300'
                  }`}
                >
                  Materials &amp; Specs
                </button>
                <button
                  onClick={() => setActiveTab('story')}
                  className={`pb-1 cursor-pointer transition-colors whitespace-nowrap ${
                    activeTab === 'story'
                      ? 'border-b-2 border-stone-900 dark:border-stone-100 text-stone-900 dark:text-stone-100'
                      : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-300'
                  }`}
                >
                  Artisan Provenance
                </button>
                <button
                  onClick={() => setActiveTab('care')}
                  className={`pb-1 cursor-pointer transition-colors whitespace-nowrap ${
                    activeTab === 'care'
                      ? 'border-b-2 border-stone-900 dark:border-stone-100 text-stone-900 dark:text-stone-100'
                      : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-300'
                  }`}
                >
                  Leather Care
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`pb-1 cursor-pointer transition-colors whitespace-nowrap flex items-center gap-1 ${
                    activeTab === 'reviews'
                      ? 'border-b-2 border-stone-900 dark:border-stone-100 text-stone-900 dark:text-stone-100'
                      : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-300'
                  }`}
                >
                  <span>Reviews</span>
                  <span className="text-[10px] bg-stone-200 dark:bg-stone-700 px-1.5 py-0.2 rounded-full">{reviews.length}</span>
                </button>
              </div>

              <div className="pt-3 text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                {activeTab === 'specs' && (
                  <dl className="grid grid-cols-2 gap-x-4 gap-y-2">
                    <div>
                      <dt className="text-stone-400 font-medium">Upper</dt>
                      <dd className="text-stone-900 dark:text-stone-100 font-medium">{product.specs.upper}</dd>
                    </div>
                    <div>
                      <dt className="text-stone-400 font-medium">Insole Cushion</dt>
                      <dd className="text-stone-900 dark:text-stone-100 font-medium">{product.specs.lining}</dd>
                    </div>
                    <div>
                      <dt className="text-stone-400 font-medium">Sole Craft</dt>
                      <dd className="text-stone-900 dark:text-stone-100 font-medium">{product.specs.sole}</dd>
                    </div>
                    <div>
                      <dt className="text-stone-400 font-medium">Karigar Hub</dt>
                      <dd className="text-stone-900 dark:text-stone-100 font-medium">{product.specs.origin}</dd>
                    </div>
                  </dl>
                )}

                {activeTab === 'story' && (
                  <p>{product.story}</p>
                )}

                {activeTab === 'care' && (
                  <ul className="space-y-1 list-disc pl-4 text-stone-500 dark:text-stone-400">
                    <li>Condition vegetable-tanned leather lightly with pure almond oil or shoe cream every 2 months.</li>
                    <li>For embroidered bridal and festive juttis, store in the provided breathable muslin potli pouch away from moisture.</li>
                    <li>Air dry naturally if exposed to monsoon rain; avoid direct artificial heat.</li>
                  </ul>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-stone-800 dark:text-stone-200">
                        Customer Feedback ({reviews.length})
                      </span>
                      <button
                        onClick={() => setShowReviewForm(!showReviewForm)}
                        className="text-xs text-amber-800 dark:text-amber-400 hover:underline font-semibold cursor-pointer"
                      >
                        {showReviewForm ? 'Cancel' : '+ Write a Review'}
                      </button>
                    </div>

                    {showReviewForm && (
                      <form onSubmit={handleSubmitReview} className="p-3 bg-stone-50 dark:bg-stone-800/60 rounded-xl border border-stone-200 dark:border-stone-700 space-y-2.5 animate-fadeIn">
                        <div>
                          <label className="text-[11px] font-medium text-stone-600 dark:text-stone-400 block mb-1">Your Name</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Ananya Sen"
                            value={newReviewAuthor}
                            onChange={(e) => setNewReviewAuthor(e.target.value)}
                            className="w-full text-xs p-2 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-medium text-stone-600 dark:text-stone-400 block mb-1">Star Rating</label>
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                onClick={() => setNewReviewRating(star)}
                                className="p-1 cursor-pointer"
                              >
                                <Star className={`w-4 h-4 ${star <= newReviewRating ? 'fill-amber-400 text-amber-400' : 'text-stone-300'}`} />
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="text-[11px] font-medium text-stone-600 dark:text-stone-400 block mb-1">Your Review</label>
                          <textarea
                            required
                            rows={2}
                            placeholder="Tell us about the comfort, fit, and craftsmanship..."
                            value={newReviewComment}
                            onChange={(e) => setNewReviewComment(e.target.value)}
                            className="w-full text-xs p-2 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 outline-none"
                          />
                        </div>

                        <button
                          type="submit"
                          className="px-4 py-1.5 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 rounded-lg cursor-pointer flex items-center gap-1.5"
                        >
                          <Send className="w-3 h-3" />
                          <span>Publish Review</span>
                        </button>
                      </form>
                    )}

                    <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                      {reviews.map((rev) => (
                        <div key={rev.id} className="p-2.5 bg-stone-50 dark:bg-stone-800/40 rounded-lg border border-stone-100 dark:border-stone-800 space-y-1">
                          <div className="flex items-center justify-between text-[11px]">
                            <div className="flex items-center gap-1.5 font-semibold text-stone-900 dark:text-stone-100">
                              <span>{rev.author}</span>
                              {rev.verified && (
                                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
                                  <ThumbsUp className="w-3 h-3" />
                                  <span>Verified Buyer</span>
                                </span>
                              )}
                            </div>
                            <span className="text-stone-400">{rev.date}</span>
                          </div>
                          <div className="flex items-center gap-0.5">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star key={s} className={`w-3 h-3 ${s <= rev.rating ? 'fill-amber-400 text-amber-400' : 'text-stone-300'}`} />
                            ))}
                          </div>
                          <p className="text-xs text-stone-600 dark:text-stone-300">{rev.comment}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
