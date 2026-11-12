import React from 'react';
import { ArrowRight, Check, Sparkles, Briefcase, Truck, HelpCircle, User, Shield } from 'lucide-react';
import { Gender, ShoeCategory } from '../types/shoes';

interface FooterProps {
  onSelectGender: (gender: Gender) => void;
  onSelectCategory?: (category: ShoeCategory) => void;
  onOpenFitFinder: () => void;
  onOpenTracking: () => void;
  onOpenSupport: () => void;
  onOpenAccount: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectGender,
  onSelectCategory,
  onOpenFitFinder,
  onOpenTracking,
  onOpenSupport,
  onOpenAccount,
  onOpenAdmin
}) => {
  const [email, setEmail] = React.useState('');
  const [subscribed, setSubscribed] = React.useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 4000);
  };

  const handleNav = (gender: Gender, category: ShoeCategory = 'All') => {
    onSelectGender(gender);
    if (onSelectCategory) {
      onSelectCategory(category);
    }
    const catalog = document.getElementById('catalog');
    catalog?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main 5-column footer structure */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-10">
          
          {/* Brand & Ethos (2 columns) */}
          <div className="lg:col-span-2 space-y-4">
            <span className="text-xl font-bold tracking-widest text-white uppercase block">
              KADAM<span className="font-light tracking-normal text-amber-500 ml-1.5 text-base">ATELIER</span>
            </span>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Reviving India&apos;s majestic footwear heritage with modern ergonomic science. Handcrafted by master ustaads across Kolhapur, Jaipur, Amritsar, Agra, and Ambur with an unyielding commitment to zero shoe-bites.
            </p>
            <div className="text-[11px] text-stone-500 font-mono pt-2">
              Heritage Ateliers: Johari Bazaar (Jaipur) &middot; Shivaji Udyam Nagar (Kolhapur) &middot; Sadar Bazaar (Agra)
            </div>
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={onOpenAdmin}
                className="text-[11px] text-stone-400 hover:text-amber-400 flex items-center gap-1 cursor-pointer transition-colors"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Admin Operations Panel</span>
              </button>
            </div>
          </div>

          {/* Men's & Formal Shoes */}
          <div className="space-y-3 text-xs">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-amber-500" />
              <span>Formal &amp; Men</span>
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button 
                  onClick={() => handleNav('all', 'Formal Shoes')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Formal Goodyear Oxfords
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('all', 'Formal Shoes')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Viceroy Double Monk Straps
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('all', 'Formal Shoes')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Women&apos;s Penny Loafers
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('men', 'All')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Royal Peshawaris &amp; Kolhapuris
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('men', 'Sneakers')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Classic Leather Court Sneakers
                </button>
              </li>
            </ul>
          </div>

          {/* Kids' Wear Collection */}
          <div className="space-y-3 text-xs">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5 text-amber-400">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Kids&apos; Wear (New)</span>
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button 
                  onClick={() => handleNav('kids', 'Kids Festive & Ethnic')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Chhote Nawab Velvet Mojaris
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('kids', 'Kids School & Formal')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Junior Scholar Formal Derbies
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('kids', 'Kids Sports & Sneakers')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Little Sprinter Velcro Runners
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('kids', 'Kids Clogs & Sandals')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Junior Cloud-Clog Water Sandals
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenFitFinder}
                  className="text-amber-400 hover:text-amber-300 transition-colors cursor-pointer text-left"
                >
                  Kids Indian Size Guide &rarr;
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Service & Orders */}
          <div className="space-y-3 text-xs">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Concierge &amp; Orders
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button 
                  onClick={onOpenTracking}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1 text-left"
                >
                  <Truck className="w-3.5 h-3.5 text-amber-500" />
                  <span>Live Courier Tracking</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenAccount}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1 text-left"
                >
                  <User className="w-3.5 h-3.5 text-amber-500" />
                  <span>My Account &amp; Past Orders</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenSupport}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1 text-left"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
                  <span>Customer Support &amp; FAQs</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenFitFinder}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Indian Footwear Size Guide
                </button>
              </li>
              <li>
                <a
                  href="#craftsmanship"
                  className="hover:text-white transition-colors cursor-pointer block text-left"
                >
                  Heritage Karigari Standards
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter & WhatsApp Club */}
          <div className="space-y-3 text-xs">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Atelier Newsletter
            </h4>
            <p className="text-stone-400 text-xs">
              Receive updates on festive drops, wedding collection releases, and VIP discount coupons.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs bg-stone-900 border border-stone-800 rounded-l-lg px-3 py-2 text-stone-200 outline-none placeholder:text-stone-500 focus:border-stone-600"
                />
                <button
                  type="submit"
                  className="px-3 bg-stone-100 text-stone-950 font-semibold rounded-r-lg hover:bg-white transition-colors cursor-pointer flex items-center justify-center shrink-0"
                  aria-label="Submit newsletter subscription"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {subscribed && (
                <p className="text-[11px] text-emerald-400 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>Dhanyawad! You are subscribed to Kadam.</span>
                </p>
              )}
            </form>

            <div className="pt-1">
              <span className="text-[11px] text-amber-400 font-mono">Use code <strong>KADAM10</strong> for 10% off</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Subtle Trust markers */}
        <div className="pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
          <div>
            &copy; {new Date().getFullYear()} KADAM Footwear India Pvt. Ltd. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <span>GI Tagged Kolhapur Heritage</span>
            <span aria-hidden="true">·</span>
            <span>Kids Wear &amp; Formal Welted Edits</span>
            <span aria-hidden="true">·</span>
            <span>Make in India</span>
            <span aria-hidden="true">·</span>
            <span>Zero-Bite Comfort Guarantee</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
