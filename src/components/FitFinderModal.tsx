import React from 'react';
import { X, Ruler, Check, ArrowRight, Info, Sparkles } from 'lucide-react';
import { SIZE_CONVERSIONS, KIDS_SIZE_CONVERSIONS } from '../data/shoesData';

interface FitFinderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplySize: (sizeUK: number) => void;
}

export const FitFinderModal: React.FC<FitFinderModalProps> = ({
  isOpen,
  onClose,
  onApplySize
}) => {
  const [genderMode, setGenderMode] = React.useState<'men' | 'women' | 'kids'>('men');
  const [calculationMode, setCalculationMode] = React.useState<'measurement' | 'brand'>('measurement');
  const [footLengthCm, setFootLengthCm] = React.useState<number>(26.0);
  const [selectedBrand, setSelectedBrand] = React.useState('Bata');
  const [brandSize, setBrandSize] = React.useState<number>(8);
  const [footWidth, setFootWidth] = React.useState<'narrow' | 'standard' | 'wide'>('standard');

  // Handle changing gender mode and resetting slider ranges appropriately
  const handleGenderChange = (mode: 'men' | 'women' | 'kids') => {
    setGenderMode(mode);
    if (mode === 'kids') {
      setFootLengthCm(17.5);
      setSelectedBrand('Bata Kids');
      setBrandSize(11);
    } else if (mode === 'women') {
      setFootLengthCm(24.0);
      setSelectedBrand('Bata');
      setBrandSize(5);
    } else {
      setFootLengthCm(26.0);
      setSelectedBrand('Bata');
      setBrandSize(8);
    }
  };

  // Compute recommended UK/India size
  const recommendedSize = React.useMemo(() => {
    if (genderMode === 'kids') {
      if (calculationMode === 'measurement') {
        const match = KIDS_SIZE_CONVERSIONS.find((c) => c.cm >= footLengthCm) || KIDS_SIZE_CONVERSIONS[KIDS_SIZE_CONVERSIONS.length - 1];
        return {
          ukIndia: match.ukIndia,
          eu: match.eu,
          cm: match.cm,
          extraInfo: match.approxAge
        };
      } else {
        const match = KIDS_SIZE_CONVERSIONS.find((c) => c.ukIndia === Math.round(brandSize)) || KIDS_SIZE_CONVERSIONS[3];
        return {
          ukIndia: match.ukIndia,
          eu: match.eu,
          cm: match.cm,
          extraInfo: match.approxAge
        };
      }
    }

    if (calculationMode === 'measurement') {
      const match = SIZE_CONVERSIONS.find((c) => c.cm >= footLengthCm) || SIZE_CONVERSIONS[SIZE_CONVERSIONS.length - 1];
      return {
        ukIndia: match.ukIndia,
        eu: match.eu,
        cm: match.cm,
        extraInfo: undefined
      };
    } else {
      // Indian brand comparator logic
      let adjustedUK = brandSize;
      if (selectedBrand === 'Nike India' || selectedBrand === 'Adidas India') {
        // Sports shoes run 0.5 size smaller than Indian ethnic leather lasts
        adjustedUK = Math.max(3, brandSize - 0.5);
      }
      
      const match = SIZE_CONVERSIONS.find((c) => c.ukIndia >= Math.round(adjustedUK)) || SIZE_CONVERSIONS[5];
      return {
        ukIndia: match.ukIndia,
        eu: match.eu,
        cm: match.cm,
        extraInfo: undefined
      };
    }
  }, [genderMode, calculationMode, footLengthCm, selectedBrand, brandSize]);

  const handleApply = () => {
    onApplySize(recommendedSize.ukIndia);
    onClose();
    const catalog = document.getElementById('catalog');
    catalog?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div 
        className="relative bg-white dark:bg-stone-900 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-stone-500 hover:text-stone-900 dark:hover:text-white transition-colors cursor-pointer"
          aria-label="Close fit finder"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2.5 text-stone-900 dark:text-stone-100 mb-1">
          <Ruler className="w-5 h-5 text-amber-700 dark:text-amber-400" />
          <h2 className="text-xl sm:text-2xl font-bold">Indian Footwear Size Guide &amp; Fit Calculator</h2>
        </div>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
          Calibrated to Indian BIS standard sizing. Handcrafted juttis, formal welted shoes, sneakers, and kids footwear calibrated for zero shoe-bites.
        </p>

        {/* 3-Way Category/Gender Toggle */}
        <div className="mt-6 flex items-center justify-center gap-1 p-1 bg-stone-100 dark:bg-stone-800 rounded-xl">
          <button
            onClick={() => handleGenderChange('men')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              genderMode === 'men'
                ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-xs font-bold'
                : 'text-stone-500 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            Men (Ind 6 - 12)
          </button>
          <button
            onClick={() => handleGenderChange('women')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              genderMode === 'women'
                ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-xs font-bold'
                : 'text-stone-500 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            Women (Ind 3 - 8)
          </button>
          <button
            onClick={() => handleGenderChange('kids')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
              genderMode === 'kids'
                ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-xs font-bold'
                : 'text-stone-500 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Kids (Ind Kids 8 - 3)</span>
          </button>
        </div>

        {/* Mode Selector */}
        <div className="mt-4 flex gap-4 text-xs border-b border-stone-200 dark:border-stone-800 pb-3">
          <button
            onClick={() => setCalculationMode('measurement')}
            className={`font-semibold pb-1 cursor-pointer transition-colors ${
              calculationMode === 'measurement'
                ? 'border-b-2 border-stone-900 dark:border-stone-100 text-stone-900 dark:text-white'
                : 'text-stone-400 hover:text-stone-700'
            }`}
          >
            Measure Foot (cm / inches)
          </button>
          <button
            onClick={() => setCalculationMode('brand')}
            className={`font-semibold pb-1 cursor-pointer transition-colors ${
              calculationMode === 'brand'
                ? 'border-b-2 border-stone-900 dark:border-stone-100 text-stone-900 dark:text-white'
                : 'text-stone-400 hover:text-stone-700'
            }`}
          >
            Compare with Indian Brands (Bata, Metro, Woodland)
          </button>
        </div>

        {/* Input Controls */}
        <div className="mt-6 space-y-6">
          {calculationMode === 'measurement' ? (
            <div className="space-y-3 bg-stone-50 dark:bg-stone-800/40 p-4 rounded-xl border border-stone-200 dark:border-stone-700/60">
              <div className="flex items-center justify-between text-xs">
                <label className="font-semibold text-stone-800 dark:text-stone-200">
                  {genderMode === 'kids' ? "Child's Foot Length (Heel to Longest Toe):" : "Foot Length from Heel to Longest Toe:"}
                </label>
                <span className="font-mono text-sm font-bold text-stone-900 dark:text-stone-100">
                  {footLengthCm} cm / {(footLengthCm / 2.54).toFixed(1)} inches
                </span>
              </div>
              <input
                type="range"
                min={genderMode === 'kids' ? 15 : 22}
                max={genderMode === 'kids' ? 22 : 29}
                step="0.5"
                value={footLengthCm}
                onChange={(e) => setFootLengthCm(parseFloat(e.target.value))}
                className="w-full accent-amber-700 dark:accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-stone-400 font-mono">
                {genderMode === 'kids' ? (
                  <>
                    <span>15 cm (Ind Kids 8)</span>
                    <span>18.5 cm (Ind Kids 12)</span>
                    <span>22 cm (Ind Size 3)</span>
                  </>
                ) : (
                  <>
                    <span>22 cm (Ind Size 3)</span>
                    <span>25.3 cm (Ind Size 7)</span>
                    <span>29 cm (Ind Size 11)</span>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-stone-50 dark:bg-stone-800/40 p-4 rounded-xl border border-stone-200 dark:border-stone-700/60">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-800 dark:text-stone-200">
                  Your Current Shoe Brand:
                </label>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full text-xs bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-lg p-2.5 outline-none cursor-pointer"
                >
                  {genderMode === 'kids' ? (
                    <>
                      <option value="Bata Kids">Bata Kids (Standard Indian Sizing)</option>
                      <option value="Clarks Junior">Clarks Junior (Pediatric Standard)</option>
                      <option value="Puma Kids">Puma Kids (Sports Fit)</option>
                      <option value="Crocs Kids">Crocs Kids (Roomy Fit)</option>
                    </>
                  ) : (
                    <>
                      <option value="Bata">Bata India (Standard Indian Sizing)</option>
                      <option value="Metro">Metro Shoes (Standard Indian Sizing)</option>
                      <option value="Woodland">Woodland (Standard Indian Sizing)</option>
                      <option value="Red Tape">Red Tape (Standard Indian Sizing)</option>
                      <option value="Nike India">Nike India (Sports Fit)</option>
                      <option value="Adidas India">Adidas India (Sports Fit)</option>
                    </>
                  )}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-800 dark:text-stone-200">
                  Your Size in {selectedBrand}:
                </label>
                <select
                  value={brandSize}
                  onChange={(e) => setBrandSize(parseFloat(e.target.value))}
                  className="w-full text-xs bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-lg p-2.5 outline-none cursor-pointer font-mono"
                >
                  {genderMode === 'kids' ? (
                    [8, 9, 10, 11, 12, 13, 1, 2, 3].map((s) => (
                      <option key={s} value={s}>
                        {s >= 8 ? `Ind Kids ${s}` : `Indian Size ${s}`}
                      </option>
                    ))
                  ) : (
                    [3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((s) => (
                      <option key={s} value={s}>Indian Size {s}</option>
                    ))
                  )}
                </select>
              </div>
            </div>
          )}

          {/* Width Preference */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-stone-800 dark:text-stone-200">
              Your Forefoot Width:
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setFootWidth('narrow')}
                className={`py-2 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                  footWidth === 'narrow'
                    ? 'bg-stone-900 text-white border-stone-900 dark:bg-stone-100 dark:text-stone-900'
                    : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-300 dark:border-stone-700'
                }`}
              >
                Slender Fit
              </button>
              <button
                onClick={() => setFootWidth('standard')}
                className={`py-2 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                  footWidth === 'standard'
                    ? 'bg-stone-900 text-white border-stone-900 dark:bg-stone-100 dark:text-stone-900'
                    : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-300 dark:border-stone-700'
                }`}
              >
                Standard Regular Fit
              </button>
              <button
                onClick={() => setFootWidth('wide')}
                className={`py-2 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                  footWidth === 'wide'
                    ? 'bg-stone-900 text-white border-stone-900 dark:bg-stone-100 dark:text-stone-900'
                    : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-300 dark:border-stone-700'
                }`}
              >
                Comfort Broad Toe Fit
              </button>
            </div>
          </div>

          {/* Recommendation Card */}
          <div className="bg-stone-900 text-white dark:bg-stone-800 p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-amber-400 font-medium">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Your Recommended KADAM Size:</span>
              </div>
              <div className="text-3xl font-extrabold font-mono tracking-tight text-white flex items-baseline justify-center sm:justify-start flex-wrap gap-2">
                <span>
                  {genderMode === 'kids' && recommendedSize.ukIndia >= 8
                    ? `Ind Kids ${recommendedSize.ukIndia}`
                    : `Indian Size ${recommendedSize.ukIndia}`}
                </span>
                {recommendedSize.extraInfo && (
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-sans font-semibold">
                    {recommendedSize.extraInfo}
                  </span>
                )}
                <span className="text-sm font-normal text-stone-400">
                  ({recommendedSize.cm} cm foot length)
                </span>
              </div>
              <p className="text-[11px] text-stone-400">
                {genderMode === 'kids'
                  ? "Crafted on pediatric Indian lasts with 10mm growth room & zero shoe-bites."
                  : "Crafted on anatomical Indian lasts for zero shoe-bites."}
              </p>
            </div>

            <button
              onClick={handleApply}
              className="px-6 py-3 bg-white text-stone-900 hover:bg-stone-100 font-semibold text-xs rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer shrink-0 whitespace-nowrap"
            >
              <span>Filter Catalog to Indian Size {recommendedSize.ukIndia}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Sizing Guarantee Note */}
          <div className="flex items-start gap-2 text-[11px] text-stone-500 dark:text-stone-400">
            <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              Free Doorstep Exchanges across 19,000+ Indian pincodes. If your jutti or Kolhapuri needs a different size, our delivery partner exchanges it at your doorstep.
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};
