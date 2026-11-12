import React from 'react';
import { Ruler, Check, Info } from 'lucide-react';
import { ShoeProduct, ShoeSize } from '../types/shoes';

interface SizeConversionChartProps {
  product: ShoeProduct;
  selectedSize: ShoeSize | null;
  onSelectSize: (size: ShoeSize) => void;
}

interface IndianSizeRow {
  indSize: number;
  cm: number;
  inches: number;
  widthFit: string;
  recommendedFor: string;
}

const ADULT_INDIAN_SIZES: IndianSizeRow[] = [
  { indSize: 5, cm: 24.5, inches: 9.6, widthFit: 'Standard / Regular (D)', recommendedFor: 'Foot length 24.0 – 24.5 cm' },
  { indSize: 6, cm: 25.1, inches: 9.9, widthFit: 'Standard / Regular (D)', recommendedFor: 'Foot length 24.6 – 25.1 cm' },
  { indSize: 7, cm: 25.8, inches: 10.2, widthFit: 'Standard / Medium (D-E)', recommendedFor: 'Foot length 25.2 – 25.8 cm' },
  { indSize: 8, cm: 26.5, inches: 10.4, widthFit: 'Comfort Fit (E)', recommendedFor: 'Foot length 25.9 – 26.5 cm' },
  { indSize: 9, cm: 27.2, inches: 10.7, widthFit: 'Comfort Fit (E)', recommendedFor: 'Foot length 26.6 – 27.2 cm' },
  { indSize: 10, cm: 27.8, inches: 10.9, widthFit: 'Comfort Wide (EE)', recommendedFor: 'Foot length 27.3 – 27.8 cm' },
  { indSize: 11, cm: 28.5, inches: 11.2, widthFit: 'Broad Toe Box (EE)', recommendedFor: 'Foot length 27.9 – 28.5 cm' },
  { indSize: 12, cm: 29.2, inches: 11.5, widthFit: 'Extra Broad (EEE)', recommendedFor: 'Foot length 28.6 – 29.2 cm' }
];

const KIDS_INDIAN_SIZES: IndianSizeRow[] = [
  { indSize: 8, cm: 15.3, inches: 6.0, widthFit: 'Junior Pediatric Standard', recommendedFor: 'Toddler foot 14.8 – 15.3 cm' },
  { indSize: 9, cm: 16.0, inches: 6.3, widthFit: 'Junior Pediatric Standard', recommendedFor: 'Child foot 15.4 – 16.0 cm' },
  { indSize: 10, cm: 16.8, inches: 6.6, widthFit: 'Junior Comfort Fit', recommendedFor: 'Child foot 16.1 – 16.8 cm' },
  { indSize: 11, cm: 17.5, inches: 6.9, widthFit: 'Junior Comfort Fit', recommendedFor: 'Child foot 16.9 – 17.5 cm' },
  { indSize: 12, cm: 18.5, inches: 7.3, widthFit: 'Junior Roomy Fit', recommendedFor: 'Child foot 17.6 – 18.5 cm' },
  { indSize: 13, cm: 19.3, inches: 7.6, widthFit: 'Junior Roomy Fit', recommendedFor: 'Child foot 18.6 – 19.3 cm' },
  { indSize: 1, cm: 20.0, inches: 7.9, widthFit: 'Senior School Fit', recommendedFor: 'Growing foot 19.4 – 20.0 cm' },
  { indSize: 2, cm: 20.8, inches: 8.2, widthFit: 'Senior School Fit', recommendedFor: 'Growing foot 20.1 – 20.8 cm' },
  { indSize: 3, cm: 21.6, inches: 8.5, widthFit: 'Senior School Fit', recommendedFor: 'Growing foot 20.9 – 21.6 cm' }
];

export const SizeConversionChart: React.FC<SizeConversionChartProps> = ({
  product,
  selectedSize,
  onSelectSize
}) => {
  const isKids = product.gender === 'kids';
  const isWomen = product.gender === 'women';
  const tableData = isKids ? KIDS_INDIAN_SIZES : ADULT_INDIAN_SIZES;

  return (
    <div className="bg-stone-50 dark:bg-stone-900/60 rounded-xl border border-stone-200 dark:border-stone-800 p-4 space-y-3">
      {/* Header and note */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-900 dark:text-stone-100">
          <Ruler className="w-4 h-4 text-amber-700 dark:text-amber-400" />
          <span>Indian Footwear Size Guide (भारतीय साइज़ गाइड &middot; {isKids ? 'Kids' : isWomen ? "Women's" : "Men's"})</span>
        </div>
        <span className="text-[10px] text-amber-800 dark:text-amber-400 font-semibold bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800/60">
          BIS 15844 Standard
        </span>
      </div>

      <p className="text-[11px] text-stone-500 dark:text-stone-400 leading-relaxed">
        Calibrated specifically for Indian foot anatomy with ample forefoot width and natural instep clearance. Tap any row to select your Indian size.
      </p>

      {/* Indian Size Table */}
      <div className="overflow-x-auto rounded-lg border border-stone-200 dark:border-stone-700/80">
        <table className="w-full text-[11px] text-left">
          <thead className="bg-stone-200/80 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-semibold uppercase tracking-wider text-[10px]">
            <tr>
              <th className="py-2.5 px-3">Indian Size (भारतीय साइज़)</th>
              <th className="py-2.5 px-3">Foot Length (CM)</th>
              <th className="py-2.5 px-3">Inches</th>
              <th className="py-2.5 px-3 hidden sm:table-cell">Forefoot Width / Fit</th>
              <th className="py-2.5 px-3 text-center">Availability</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200 dark:divide-stone-700/60 font-mono">
            {tableData.map((row) => {
              const matchedShoeSize = product.sizes.find((s) => s.ukIndia === row.indSize);
              const isSelected = selectedSize?.ukIndia === row.indSize;
              const inStock = matchedShoeSize ? matchedShoeSize.inStock : false;

              return (
                <tr
                  key={row.indSize}
                  onClick={() => {
                    if (matchedShoeSize && inStock) {
                      onSelectSize(matchedShoeSize);
                    }
                  }}
                  className={`transition-colors ${
                    !matchedShoeSize || !inStock
                      ? 'opacity-40 bg-stone-100/50 dark:bg-stone-900/30 cursor-not-allowed'
                      : isSelected
                      ? 'bg-amber-100/80 dark:bg-amber-950/60 font-bold text-stone-900 dark:text-amber-100 cursor-pointer'
                      : 'hover:bg-stone-100 dark:hover:bg-stone-800/60 cursor-pointer text-stone-800 dark:text-stone-200'
                  }`}
                >
                  <td className="py-2.5 px-3 font-bold flex items-center gap-1.5">
                    {isSelected && <Check className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />}
                    <span>{isKids && row.indSize >= 8 ? `Ind Kids ${row.indSize}` : `Indian Size ${row.indSize}`}</span>
                  </td>
                  <td className="py-2.5 px-3">{row.cm} cm</td>
                  <td className="py-2.5 px-3">{row.inches}&quot;</td>
                  <td className="py-2.5 px-3 font-sans text-[10px] text-stone-500 dark:text-stone-400 hidden sm:table-cell">
                    {row.widthFit}
                  </td>
                  <td className="py-2.5 px-3 text-center font-sans">
                    {matchedShoeSize ? (
                      inStock ? (
                        <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60">
                          In Stock
                        </span>
                      ) : (
                        <span className="text-[10px] text-stone-400 line-through">
                          Sold Out
                        </span>
                      )
                    ) : (
                      <span className="text-[10px] text-stone-400">N/A</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pro tip footer */}
      <div className="flex items-start gap-2 p-2.5 bg-amber-50 dark:bg-amber-950/40 rounded-lg text-[11px] text-amber-900 dark:text-amber-300">
        <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
        <p>
          <strong>Indian Fit Recommendation:</strong> Order your true Indian size. For genuine leather juttis, Peshawaris, and Kolhapuris, the bag-tanned leather naturally contours to the width of your instep within 2 to 3 wearings.
        </p>
      </div>
    </div>
  );
};
