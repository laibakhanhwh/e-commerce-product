import React from 'react';
import { ShoppingBag, Heart, Search, Ruler, X, Menu, Truck, HelpCircle, User, Shield, Sparkles, Briefcase } from 'lucide-react';
import { Gender, ShoeCategory } from '../types/shoes';

interface NavbarProps {
  genderFilter: Gender;
  onSelectGender: (gender: Gender) => void;
  selectedCategory?: ShoeCategory;
  onSelectCategory?: (category: ShoeCategory) => void;
  onOpenFitFinder: () => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenTracking: () => void;
  onOpenSupport: () => void;
  onOpenAccount: () => void;
  onOpenAdmin: () => void;
  cartCount: number;
  wishlistCount: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  genderFilter,
  onSelectGender,
  selectedCategory,
  onSelectCategory,
  onOpenFitFinder,
  onOpenCart,
  onOpenWishlist,
  onOpenTracking,
  onOpenSupport,
  onOpenAccount,
  onOpenAdmin,
  cartCount,
  wishlistCount,
  searchQuery,
  onSearchChange
}) => {
  const [showSearchInput, setShowSearchInput] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleNavClick = (gender: Gender, category: ShoeCategory = 'All') => {
    onSelectGender(gender);
    if (onSelectCategory) {
      onSelectCategory(category);
    }
    setMobileMenuOpen(false);
    const catalog = document.getElementById('catalog');
    catalog?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-stone-50/95 dark:bg-stone-900/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 transition-colors">
      {/* Editorial Announcement Banner with real clickable actions */}
      <div className="bg-stone-900 text-stone-100 dark:bg-stone-950 px-4 py-1.5 text-center text-xs tracking-wider uppercase font-medium flex flex-wrap items-center justify-center gap-2 sm:gap-4">
        <span>Free Express Delivery Across India on Orders Above ₹1,999</span>
        <span aria-hidden="true" className="opacity-40 hidden sm:inline">·</span>
        <button 
          onClick={onOpenTracking}
          className="hover:text-amber-300 transition-colors cursor-pointer text-xs flex items-center gap-1 text-stone-300"
        >
          <Truck className="w-3.5 h-3.5 text-amber-400" />
          <span>Track Order</span>
        </button>
        <span aria-hidden="true" className="opacity-40 hidden sm:inline">·</span>
        <button 
          onClick={onOpenFitFinder}
          className="underline hover:text-stone-300 transition-colors cursor-pointer text-xs"
        >
          Indian Size Guide
        </button>
        <span aria-hidden="true" className="opacity-40 hidden sm:inline">·</span>
        <button
          onClick={onOpenSupport}
          className="hover:text-amber-300 transition-colors cursor-pointer text-xs flex items-center gap-1 text-stone-300"
        >
          <HelpCircle className="w-3 h-3 text-amber-400" />
          <span>Help &amp; FAQs</span>
        </button>
      </div>

      {/* Main Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4 sm:gap-8">
        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="md:hidden p-2 text-stone-700 dark:text-stone-300 hover:text-stone-900 cursor-pointer"
          aria-label="Open navigation menu"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Zone 1: Brand Wordmark */}
        <a 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('all', 'All');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-xl sm:text-2xl font-bold tracking-widest text-stone-900 dark:text-stone-100 uppercase whitespace-nowrap shrink-0 hover:opacity-85 transition-opacity"
        >
          KADAM<span className="font-light tracking-normal text-amber-700 dark:text-amber-500 ml-1.5 text-base sm:text-lg">ATELIER</span>
        </a>

        {/* Zone 2: Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-7 text-sm font-medium text-stone-600 dark:text-stone-300">
          <button
            onClick={() => handleNavClick('men', 'All')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer pb-0.5 border-b-2 ${
              genderFilter === 'men' 
                ? 'text-stone-900 dark:text-white border-stone-900 dark:border-white font-semibold' 
                : 'border-transparent hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            Men
          </button>
          <button
            onClick={() => handleNavClick('women', 'All')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer pb-0.5 border-b-2 ${
              genderFilter === 'women' 
                ? 'text-stone-900 dark:text-white border-stone-900 dark:border-white font-semibold' 
                : 'border-transparent hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            Women
          </button>
          <button
            onClick={() => handleNavClick('kids', 'All')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer pb-0.5 border-b-2 flex items-center gap-1 ${
              genderFilter === 'kids' 
                ? 'text-amber-800 dark:text-amber-400 border-amber-800 dark:border-amber-400 font-bold' 
                : 'border-transparent hover:text-amber-700 text-stone-700 dark:text-stone-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Kids&apos; Wear</span>
          </button>
          <button
            onClick={() => handleNavClick('all', 'Formal Shoes')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer pb-0.5 border-b-2 flex items-center gap-1 ${
              selectedCategory === 'Formal Shoes' 
                ? 'text-amber-900 dark:text-amber-300 border-amber-900 dark:border-amber-300 font-bold' 
                : 'border-transparent hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5 text-stone-500" />
            <span>Formal Shoes</span>
          </button>
          <button
            onClick={() => handleNavClick('unisex', 'All')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer pb-0.5 border-b-2 ${
              genderFilter === 'unisex' 
                ? 'text-stone-900 dark:text-white border-stone-900 dark:border-white font-semibold' 
                : 'border-transparent hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            Sneakers
          </button>
          <button
            onClick={onOpenFitFinder}
            className="flex items-center gap-1.5 whitespace-nowrap shrink-0 text-stone-700 dark:text-stone-200 hover:text-stone-950 dark:hover:text-white transition-colors cursor-pointer"
          >
            <Ruler className="w-4 h-4 text-stone-500" />
            <span>Fit Finder</span>
          </button>
        </nav>

        {/* Zone 3: Functional Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Quick Search */}
          <div className="relative">
            {showSearchInput ? (
              <div className="flex items-center bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-lg px-2.5 py-1.5 shadow-sm">
                <Search className="w-4 h-4 text-stone-400 shrink-0 mr-2" />
                <input
                  type="text"
                  placeholder="Search Oxfords, Kids, Juttis, Peshawaris..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  autoFocus
                  className="w-36 sm:w-56 text-xs bg-transparent border-none outline-none text-stone-900 dark:text-stone-100 placeholder:text-stone-400"
                />
                <button
                  onClick={() => {
                    setShowSearchInput(false);
                    onSearchChange('');
                  }}
                  className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 cursor-pointer"
                  aria-label="Close search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowSearchInput(true)}
                className="p-2 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-200/50 dark:hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
                aria-label="Search footwear"
                title="Search products"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* User Account / Orders Button */}
          <button
            onClick={onOpenAccount}
            className="p-2 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-200/50 dark:hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
            aria-label="My Account & Orders"
            title="My Account, Addresses & Orders"
          >
            <User className="w-5 h-5" />
          </button>

          {/* Admin / Inventory Management Button */}
          <button
            onClick={onOpenAdmin}
            className="hidden sm:flex p-2 text-stone-600 dark:text-stone-300 hover:text-amber-800 dark:hover:text-amber-400 hover:bg-stone-200/50 dark:hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
            aria-label="Admin Catalog & Inventory"
            title="Admin Panel & Inventory"
          >
            <Shield className="w-5 h-5" />
          </button>

          {/* Wishlist Button */}
          <button
            onClick={onOpenWishlist}
            className="relative p-2 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-200/50 dark:hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
            aria-label="View wishlist"
            title="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-rose-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center tabular-nums">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Drawer Trigger */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white rounded-lg transition-colors cursor-pointer shadow-sm shrink-0"
            aria-label="View shopping bag"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Bag</span>
            <span className="bg-stone-800 dark:bg-stone-200 text-stone-100 dark:text-stone-900 px-1.5 py-0.5 rounded text-[11px] tabular-nums font-mono">
              {cartCount}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex md:hidden animate-fadeIn">
          <div className="w-4/5 max-w-xs bg-white dark:bg-stone-900 h-full p-6 flex flex-col justify-between shadow-2xl overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-4">
                <span className="text-lg font-bold tracking-widest text-stone-900 dark:text-stone-100 uppercase">
                  KADAM<span className="font-light text-amber-700 ml-1 text-sm">ATELIER</span>
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 text-stone-500 hover:text-stone-900 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col space-y-3 text-sm font-medium">
                <button
                  onClick={() => handleNavClick('all', 'All')}
                  className="text-left py-2 px-3 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 cursor-pointer"
                >
                  All Collections
                </button>
                <button
                  onClick={() => handleNavClick('men', 'All')}
                  className="text-left py-2 px-3 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 cursor-pointer"
                >
                  Men&apos;s Footwear
                </button>
                <button
                  onClick={() => handleNavClick('women', 'All')}
                  className="text-left py-2 px-3 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 cursor-pointer"
                >
                  Women&apos;s Footwear
                </button>
                <button
                  onClick={() => handleNavClick('kids', 'All')}
                  className="text-left py-2 px-3 rounded-lg bg-amber-50 dark:bg-stone-800 text-amber-900 dark:text-amber-400 font-semibold cursor-pointer flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span>Kids&apos; Wear</span>
                  </span>
                  <span className="text-[10px] bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-200 px-2 py-0.5 rounded-full uppercase">New</span>
                </button>
                <button
                  onClick={() => handleNavClick('all', 'Formal Shoes')}
                  className="text-left py-2 px-3 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 cursor-pointer flex items-center gap-2"
                >
                  <Briefcase className="w-4 h-4 text-stone-500" />
                  <span>Formal Shoes Edit</span>
                </button>
                <button
                  onClick={() => handleNavClick('unisex', 'All')}
                  className="text-left py-2 px-3 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 cursor-pointer"
                >
                  Urban Sneakers
                </button>
              </div>

              <div className="pt-4 border-t border-stone-200 dark:border-stone-800 space-y-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenFitFinder();
                  }}
                  className="w-full text-left py-2 px-3 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 flex items-center gap-2 text-xs"
                >
                  <Ruler className="w-4 h-4 text-amber-600" />
                  <span>Indian Size Guide &amp; Fit</span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenTracking();
                  }}
                  className="w-full text-left py-2 px-3 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 flex items-center gap-2 text-xs"
                >
                  <Truck className="w-4 h-4 text-emerald-600" />
                  <span>Track Courier Shipment</span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAccount();
                  }}
                  className="w-full text-left py-2 px-3 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 flex items-center gap-2 text-xs"
                >
                  <User className="w-4 h-4 text-stone-600" />
                  <span>My Profile &amp; Past Orders</span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenSupport();
                  }}
                  className="w-full text-left py-2 px-3 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 flex items-center gap-2 text-xs"
                >
                  <HelpCircle className="w-4 h-4 text-stone-600" />
                  <span>Live Support &amp; FAQs</span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdmin();
                  }}
                  className="w-full text-left py-2 px-3 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 flex items-center gap-2 text-xs"
                >
                  <Shield className="w-4 h-4 text-amber-600" />
                  <span>Admin Panel &amp; Inventory</span>
                </button>
              </div>
            </div>

            <div className="pt-6 text-[11px] text-stone-400 border-t border-stone-200 dark:border-stone-800">
              Zero Shoe-Bite Guarantee &middot; Handcrafted in India
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
