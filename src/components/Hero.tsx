import React from 'react';
import { ArrowRight, ShieldCheck, Sparkles, RefreshCw, Briefcase } from 'lucide-react';
import { Gender, ShoeCategory } from '../types/shoes';
import { HERO_IMAGE } from '../data/shoesData';

interface HeroProps {
  onSelectGender: (gender: Gender) => void;
  onSelectCategory?: (category: ShoeCategory) => void;
  onOpenFitFinder: () => void;
  onOpenSupport?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ 
  onSelectGender, 
  onSelectCategory, 
  onOpenFitFinder,
  onOpenSupport
}) => {
  const [imageLoaded, setImageLoaded] = React.useState(false);

  const handleNavigate = (gender: Gender, category: ShoeCategory = 'All') => {
    onSelectGender(gender);
    if (onSelectCategory) {
      onSelectCategory(category);
    }
    const target = document.getElementById('catalog');
    target?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-stone-100 dark:bg-stone-900/60 border-b border-stone-200 dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-6 space-y-6 lg:space-y-8">
            <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-widest text-amber-800 dark:text-amber-400 font-semibold">
              <span>Festival, Wedding &amp; Formal Edition 2026/27</span>
              <span aria-hidden="true">·</span>
              <span>Jaipur, Kolhapur, Agra &amp; Ambur</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-900 dark:text-stone-50 text-balance leading-[1.1]">
              Indian Heritage Karigari. Modern Ergonomic Comfort.
            </h1>

            <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 max-w-xl leading-relaxed">
              Explore authentic GI-tagged Kolhapuris, anti-bite bridal juttis, royal Goodyear-welted Peshawaris, executive formal dress shoes, and now our new handcrafted <strong>Kids&apos; Collection</strong>. Fitted with orthopedic memory foam so the whole family walks without foot pain.
            </p>

            {/* Direct Action Buttons - All Functional */}
            <div className="space-y-3 pt-2">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => handleNavigate('men', 'All')}
                  className="px-5 py-3 text-xs sm:text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white rounded-lg transition-all shadow-sm hover:shadow flex items-center gap-2 cursor-pointer whitespace-nowrap"
                >
                  <span>Men&apos;s Footwear</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleNavigate('women', 'All')}
                  className="px-5 py-3 text-xs sm:text-sm font-semibold text-stone-900 dark:text-stone-100 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 hover:border-stone-400 dark:hover:border-stone-600 rounded-lg transition-all hover:bg-stone-50 dark:hover:bg-stone-750 flex items-center gap-2 cursor-pointer whitespace-nowrap"
                >
                  <span>Women&apos;s Footwear</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Second Row: Kids and Formal quick direct buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  onClick={() => handleNavigate('kids', 'All')}
                  className="px-4 py-2.5 text-xs font-semibold text-amber-950 bg-amber-100 hover:bg-amber-200 dark:bg-amber-900/60 dark:text-amber-200 dark:hover:bg-amber-900 border border-amber-300 dark:border-amber-700 rounded-lg transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap shadow-xs"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-700 dark:text-amber-300" />
                  <span>Shop Kids&apos; Wear (Ages 3-11)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => handleNavigate('all', 'Formal Shoes')}
                  className="px-4 py-2.5 text-xs font-semibold text-stone-900 dark:text-stone-100 bg-stone-200/80 hover:bg-stone-300 dark:bg-stone-800 dark:hover:bg-stone-700 border border-stone-300 dark:border-stone-600 rounded-lg transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap shadow-xs"
                >
                  <Briefcase className="w-3.5 h-3.5 text-stone-600 dark:text-stone-300" />
                  <span>Explore Formal Shoes</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Quick Sizing CTA */}
            <div className="pt-2">
              <button
                onClick={onOpenFitFinder}
                className="inline-flex items-center gap-2 text-xs font-medium text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white transition-colors cursor-pointer group"
              >
                <span className="w-2 h-2 rounded-full bg-amber-600 group-hover:bg-stone-900 dark:group-hover:bg-stone-100 transition-colors" />
                <span>Need help choosing the right fit?</span>
                <span className="underline ml-1 font-semibold">Open Indian Size Guide &rarr;</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-stone-200 dark:bg-stone-800 border border-stone-200/80 dark:border-stone-700/60 aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] group">
              <img
                src={HERO_IMAGE}
                alt="KADAM Indian footwear collection featuring handcrafted royal Peshawari sandal and golden zardozi bridal jutti"
                referrerPolicy="no-referrer"
                onLoad={() => setImageLoaded(true)}
                className={`w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              />

              {!imageLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-gradient-to-br from-stone-200 to-stone-300 dark:from-stone-800 dark:to-stone-900 text-stone-600 dark:text-stone-400">
                  <Sparkles className="w-8 h-8 mb-2 animate-pulse text-amber-500" />
                  <p className="text-xs uppercase tracking-wider font-semibold">KADAM Karigari Edition 2026</p>
                </div>
              )}

              {/* Floating Caption */}
              <div className="absolute bottom-4 left-4 right-4 bg-stone-900/85 backdrop-blur-md text-stone-100 px-4 py-2.5 rounded-lg flex items-center justify-between text-xs">
                <div>
                  <span className="font-semibold">Shahi Peshawari &amp; Noor Bridal Jutti</span>
                  <span className="text-stone-400 ml-2">Hand-stitched in Agra &amp; Jaipur</span>
                </div>
                <span className="font-mono text-amber-300 font-semibold">Zero-Bite Fit</span>
              </div>
            </div>
          </div>

        </div>

        {/* Full-width 3-pillar trust strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 mt-12 border-t border-stone-200 dark:border-stone-800">
          <div className="flex items-start gap-3.5">
            <ShieldCheck className="w-5 h-5 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">Zero Shoe-Bite Guarantee</h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 leading-relaxed">
                7mm orthopedic memory foam and oil-softened leather collar prevent chafing during weddings.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <Sparkles className="w-5 h-5 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">Authentic Heritage Karigars</h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 leading-relaxed">
                GI-tagged bag-tanned Kolhapuris, pure silver/gold tilla needlework, and Goodyear-welted soles.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <RefreshCw className="w-5 h-5 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">7-Day Pan-India Doorstep Exchange</h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 leading-relaxed">
                Need a different size? Our courier will deliver your replacement and collect the original in one visit.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
