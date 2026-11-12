import React from 'react';
import { SlidersHorizontal, RotateCcw, Search, Briefcase, Footprints, Activity, Shield, Sparkles, GraduationCap } from 'lucide-react';
import { ShoeProduct, Gender, ShoeCategory, ShoeColor } from '../types/shoes';
import { ProductCard } from './ProductCard';

interface ProductCatalogProps {
  products: ShoeProduct[];
  genderFilter: Gender;
  onSelectGender: (gender: Gender) => void;
  selectedCategory?: ShoeCategory;
  onSelectCategory?: (category: ShoeCategory) => void;
  onOpenProductModal: (product: ShoeProduct, initialColor?: ShoeColor) => void;
  onToggleWishlist: (product: ShoeProduct) => void;
  wishlistIds: string[];
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedSizeUK: number | null;
  onSelectSizeUK: (size: number | null) => void;
}

const MEN_QUICK_FILTERS: { label: string; category: ShoeCategory; icon: React.FC<{ className?: string }>; sub: string }[] = [
  { label: 'Formal Shoes', category: 'Formal Shoes', icon: Briefcase, sub: 'Oxfords & Monks' },
  { label: 'Casual Sneakers', category: 'Sneakers', icon: Footprints, sub: 'Leather Low-Tops' },
  { label: 'Sports & Running', category: 'Sports & Running', icon: Activity, sub: 'Road & Sprint' },
  { label: 'Crocs & Clogs', category: 'Crocs & Clogs', icon: Shield, sub: 'Waterproof Foam' }
];

const KIDS_QUICK_FILTERS: { label: string; category: ShoeCategory; icon: React.FC<{ className?: string }>; sub: string }[] = [
  { label: 'Festive Mojaris', category: 'Kids Festive & Ethnic', icon: Sparkles, sub: 'Wedding Velvet Juttis' },
  { label: 'School & Formal', category: 'Kids School & Formal', icon: GraduationCap, sub: 'Polished Black Derbies' },
  { label: 'Lightweight Runners', category: 'Kids Sports & Sneakers', icon: Activity, sub: 'Velcro Easy-Strap' },
  { label: 'Monsoon Clogs', category: 'Kids Clogs & Sandals', icon: Shield, sub: 'Waterproof EVA Foam' }
];

const WOMEN_QUICK_FILTERS: { label: string; category: ShoeCategory; icon: React.FC<{ className?: string }>; sub: string }[] = [
  { label: 'Formal Loafers & Pumps', category: 'Formal Shoes', icon: Briefcase, sub: 'Penny Loafers & Welts' },
  { label: 'Bridal Juttis', category: 'Juttis & Peshawaris', icon: Sparkles, sub: 'Jaipur Zardozi' },
  { label: 'Festive Heels', category: 'Festive Heels & Mules', icon: Footprints, sub: 'Block Heels & Mules' },
  { label: 'Urban Sneakers', category: 'Sneakers', icon: Activity, sub: 'Soft Milled Nappa' }
];

const ADULT_UK_SIZES = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const KIDS_UK_SIZES = [8, 9, 10, 11, 12, 13, 1, 2, 3];

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  genderFilter,
  onSelectGender,
  selectedCategory: propCategory,
  onSelectCategory: propOnSelectCategory,
  onOpenProductModal,
  onToggleWishlist,
  wishlistIds,
  searchQuery,
  onSearchChange,
  selectedSizeUK,
  onSelectSizeUK
}) => {
  const [localCategory, setLocalCategory] = React.useState<ShoeCategory>('All');
  const [sortBy, setSortBy] = React.useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [showFiltersPanel, setShowFiltersPanel] = React.useState(false);

  const selectedCategory = propCategory !== undefined ? propCategory : localCategory;
  const setSelectedCategory = (cat: ShoeCategory) => {
    if (propOnSelectCategory) {
      propOnSelectCategory(cat);
    } else {
      setLocalCategory(cat);
    }
  };

  // Dynamic categories based on active gender
  const activeCategories: ShoeCategory[] = React.useMemo(() => {
    if (genderFilter === 'kids') {
      return [
        'All',
        'Kids Festive & Ethnic',
        'Kids School & Formal',
        'Kids Sports & Sneakers',
        'Kids Clogs & Sandals'
      ];
    } else if (genderFilter === 'men') {
      return [
        'All',
        'Formal Shoes',
        'Sneakers',
        'Sports & Running',
        'Crocs & Clogs',
        'Juttis & Peshawaris',
        'Kolhapuris & Sandals'
      ];
    } else if (genderFilter === 'women') {
      return [
        'All',
        'Formal Shoes',
        'Festive Heels & Mules',
        'Juttis & Peshawaris',
        'Sneakers'
      ];
    }
    return [
      'All',
      'Formal Shoes',
      'Kids Festive & Ethnic',
      'Kids School & Formal',
      'Sneakers',
      'Sports & Running',
      'Crocs & Clogs',
      'Juttis & Peshawaris',
      'Kolhapuris & Sandals',
      'Festive Heels & Mules'
    ];
  }, [genderFilter]);

  // Filter products
  const filteredProducts = React.useMemo(() => {
    return products.filter((item) => {
      // Gender filter
      if (genderFilter !== 'all') {
        if (genderFilter === 'kids' && item.gender !== 'kids') return false;
        if (genderFilter === 'men' && item.gender !== 'men') return false;
        if (genderFilter === 'women' && item.gender !== 'women') return false;
        if (genderFilter === 'unisex' && item.gender !== 'unisex') return false;
      }

      // Category filter
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }

      // Size filter (UK/India)
      if (selectedSizeUK !== null) {
        const hasSize = item.sizes.some((s) => s.ukIndia === selectedSizeUK && s.inStock);
        if (!hasSize) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesCategory = item.category.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesTag = item.highlightTag?.toLowerCase().includes(q);
        const matchesUpper = item.specs.upper.toLowerCase().includes(q);
        const matchesOrigin = item.specs.origin.toLowerCase().includes(q);
        if (!matchesName && !matchesCategory && !matchesDesc && !matchesTag && !matchesUpper && !matchesOrigin) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default order
    });
  }, [products, genderFilter, selectedCategory, selectedSizeUK, searchQuery, sortBy]);

  const hasActiveFilters = genderFilter !== 'all' || selectedCategory !== 'All' || selectedSizeUK !== null || searchQuery !== '';

  const resetAllFilters = () => {
    onSelectGender('all');
    setSelectedCategory('All');
    onSelectSizeUK(null);
    onSearchChange('');
    setSortBy('featured');
  };

  const sizesToDisplay = genderFilter === 'kids' ? KIDS_UK_SIZES : ADULT_UK_SIZES;

  return (
    <section id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-24">
      {/* Header and Segmented Control */}
      <div className="space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-6">
          <div>
            <div className="text-xs font-semibold tracking-wider uppercase text-amber-800 dark:text-amber-400 mb-1 flex items-center gap-2">
              <span>Handcrafted in Indian Ateliers</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono">{filteredProducts.length} Pairs In Stock</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100">
              {genderFilter === 'kids'
                ? "Kids' Footwear Collection"
                : genderFilter === 'men'
                ? "Men's Footwear Collection" 
                : genderFilter === 'women' 
                ? "Women's Footwear Collection"
                : selectedCategory === 'Formal Shoes'
                ? "The Formal Shoes Edit"
                : "The Kadam Footwear Collection"}
            </h2>
          </div>

          {/* Interactive Audience Segmented Control */}
          <div className="flex flex-wrap items-center gap-1 p-1 bg-stone-200/70 dark:bg-stone-800 rounded-xl self-start lg:self-auto">
            <button
              onClick={() => {
                onSelectGender('all');
                setSelectedCategory('All');
              }}
              className={`px-3 sm:px-4 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                genderFilter === 'all' && selectedCategory !== 'Formal Shoes'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs font-semibold'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              All Shoes
            </button>
            <button
              onClick={() => {
                onSelectGender('men');
                setSelectedCategory('All');
              }}
              className={`px-3 sm:px-4 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                genderFilter === 'men'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs font-semibold'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              Men&apos;s
            </button>
            <button
              onClick={() => {
                onSelectGender('women');
                setSelectedCategory('All');
              }}
              className={`px-3 sm:px-4 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                genderFilter === 'women'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs font-semibold'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              Women&apos;s
            </button>
            <button
              onClick={() => {
                onSelectGender('kids');
                setSelectedCategory('All');
              }}
              className={`px-3 sm:px-4 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                genderFilter === 'kids'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs font-semibold'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              <Sparkles className="w-3 h-3 text-amber-600 dark:text-amber-400" />
              <span>Kids&apos; Wear</span>
            </button>
            <button
              onClick={() => {
                onSelectGender('all');
                setSelectedCategory('Formal Shoes');
              }}
              className={`px-3 sm:px-4 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                selectedCategory === 'Formal Shoes'
                  ? 'bg-amber-800 text-white shadow-xs font-semibold'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              <Briefcase className="w-3 h-3 text-amber-300" />
              <span>Formal Edit</span>
            </button>
          </div>
        </div>

        {/* Dedicated Quick Category Badges for Kids */}
        {genderFilter === 'kids' && (
          <div className="p-4 bg-amber-50/70 dark:bg-stone-800/60 rounded-xl border border-amber-200/80 dark:border-stone-700 space-y-2">
            <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-amber-900 dark:text-amber-400">
              <span>Kids&apos; Featured Categories (Ages 3 to 11):</span>
              <span className="font-normal lowercase text-stone-500">Zero shoe-bite soft padded collar</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {KIDS_QUICK_FILTERS.map((filter) => {
                const Icon = filter.icon;
                const isSelected = selectedCategory === filter.category;
                return (
                  <button
                    key={filter.label}
                    onClick={() => setSelectedCategory(isSelected ? 'All' : filter.category)}
                    className={`p-3 rounded-lg border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-stone-900 text-white border-stone-900 dark:bg-stone-100 dark:text-stone-900 dark:border-stone-100 shadow-sm'
                        : 'bg-white dark:bg-stone-800/90 text-stone-800 dark:text-stone-200 border-amber-200/70 dark:border-stone-700 hover:border-amber-400'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400" />
                    <div>
                      <div className="text-xs font-semibold leading-tight">{filter.label}</div>
                      <div className="text-[10px] opacity-70">{filter.sub}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Dedicated Quick Category Badges for Men */}
        {genderFilter === 'men' && (
          <div className="p-4 bg-amber-50/70 dark:bg-stone-800/60 rounded-xl border border-amber-200/80 dark:border-stone-700 space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-amber-900 dark:text-amber-400">
              Men&apos;s Featured Categories:
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {MEN_QUICK_FILTERS.map((filter) => {
                const Icon = filter.icon;
                const isSelected = selectedCategory === filter.category;
                return (
                  <button
                    key={filter.label}
                    onClick={() => setSelectedCategory(isSelected ? 'All' : filter.category)}
                    className={`p-3 rounded-lg border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-stone-900 text-white border-stone-900 dark:bg-stone-100 dark:text-stone-900 dark:border-stone-100 shadow-sm'
                        : 'bg-white dark:bg-stone-800/90 text-stone-800 dark:text-stone-200 border-amber-200/70 dark:border-stone-700 hover:border-amber-400'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400" />
                    <div>
                      <div className="text-xs font-semibold leading-tight">{filter.label}</div>
                      <div className="text-[10px] opacity-70">{filter.sub}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Dedicated Quick Category Badges for Women */}
        {genderFilter === 'women' && (
          <div className="p-4 bg-rose-50/70 dark:bg-stone-800/60 rounded-xl border border-rose-200/80 dark:border-stone-700 space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-rose-950 dark:text-rose-400">
              Women&apos;s Featured Categories:
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {WOMEN_QUICK_FILTERS.map((filter) => {
                const Icon = filter.icon;
                const isSelected = selectedCategory === filter.category;
                return (
                  <button
                    key={filter.label}
                    onClick={() => setSelectedCategory(isSelected ? 'All' : filter.category)}
                    className={`p-3 rounded-lg border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-stone-900 text-white border-stone-900 dark:bg-stone-100 dark:text-stone-900 dark:border-stone-100 shadow-sm'
                        : 'bg-white dark:bg-stone-800/90 text-stone-800 dark:text-stone-200 border-rose-200/70 dark:border-stone-700 hover:border-rose-400'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0 text-rose-600 dark:text-rose-400" />
                    <div>
                      <div className="text-xs font-semibold leading-tight">{filter.label}</div>
                      <div className="text-[10px] opacity-70">{filter.sub}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Category Filter Pills & Sort Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {activeCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-stone-900 text-white border-stone-900 dark:bg-stone-100 dark:text-stone-900 dark:border-stone-100 shadow-xs font-semibold'
                    : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border-stone-300 dark:border-stone-700 hover:border-stone-400 dark:hover:border-stone-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Secondary Controls (Filter toggle & Sort) */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFiltersPanel(!showFiltersPanel)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                showFiltersPanel || selectedSizeUK !== null
                  ? 'bg-stone-900 text-white border-stone-900 dark:bg-stone-100 dark:text-stone-900'
                  : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-300 dark:border-stone-700 hover:border-stone-400'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Indian Size</span>
              {selectedSizeUK && <span className="font-mono ml-1 font-bold">(Ind {selectedSizeUK})</span>}
            </button>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs font-medium bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-300 dark:border-stone-700 rounded-lg px-3 py-1.5 outline-none cursor-pointer"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Collapsible Indian Size Filter Strip */}
        {showFiltersPanel && (
          <div className="p-4 bg-stone-100 dark:bg-stone-800/60 rounded-xl border border-stone-200 dark:border-stone-700/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-800 dark:text-stone-200 uppercase tracking-wide">
                Filter by In-Stock Indian Size ({genderFilter === 'kids' ? 'Kids' : 'Adult'}):
              </span>
              {selectedSizeUK !== null && (
                <button
                  onClick={() => onSelectSizeUK(null)}
                  className="text-xs text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 underline cursor-pointer"
                >
                  Clear size filter
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {sizesToDisplay.map((sz) => (
                <button
                  key={sz}
                  onClick={() => onSelectSizeUK(selectedSizeUK === sz ? null : sz)}
                  className={`w-14 h-10 rounded-lg text-xs font-mono tabular-nums font-medium transition-colors cursor-pointer border flex flex-col items-center justify-center ${
                    selectedSizeUK === sz
                      ? 'bg-stone-900 text-white border-stone-900 dark:bg-stone-100 dark:text-stone-900 dark:border-stone-100 font-bold'
                      : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-300 dark:border-stone-700 hover:border-stone-400'
                  }`}
                >
                  <span>Ind {sz}</span>
                  <span className="text-[9px] opacity-70">
                    {genderFilter === 'kids' && sz >= 8 ? 'Kids' : 'Size'}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Status Strip: Count & Active Filters */}
        <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 pt-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span>Showing <strong className="font-mono text-stone-900 dark:text-stone-100">{filteredProducts.length}</strong> styles</span>
            {selectedCategory !== 'All' && (
              <>
                <span aria-hidden="true">·</span>
                <span className="font-semibold text-stone-900 dark:text-stone-100">{selectedCategory}</span>
              </>
            )}
            {genderFilter !== 'all' && (
              <>
                <span aria-hidden="true">·</span>
                <span className="capitalize font-semibold text-stone-900 dark:text-stone-100">{genderFilter}&apos;s</span>
              </>
            )}
            {searchQuery && (
              <>
                <span aria-hidden="true">·</span>
                <span>Filtered by &ldquo;{searchQuery}&rdquo;</span>
              </>
            )}
          </div>

          {hasActiveFilters && (
            <button
              onClick={resetAllFilters}
              className="flex items-center gap-1 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset all filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpenProductModal={onOpenProductModal}
              onToggleWishlist={onToggleWishlist}
              isWishlisted={wishlistIds.includes(product.id)}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="py-20 text-center space-y-4 bg-stone-100 dark:bg-stone-800/40 rounded-2xl border border-dashed border-stone-300 dark:border-stone-700 mt-8">
          <Search className="w-10 h-10 mx-auto text-stone-400" />
          <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">No footwear matches your selection</h3>
          <p className="text-sm text-stone-500 dark:text-stone-400 max-w-md mx-auto">
            Try resetting your category or size filters to view our full collection of Formal Shoes, Kids Wear, Juttis, and Sneakers.
          </p>
          <button
            onClick={resetAllFilters}
            className="px-5 py-2.5 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white rounded-lg transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}
    </section>
  );
};
