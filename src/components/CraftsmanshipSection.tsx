import React from 'react';
import { CRAFTSMANSHIP_PILLARS } from '../data/shoesData';
import { Layers, ShieldCheck, Sparkles, Feather } from 'lucide-react';

const ICONS = [Sparkles, Feather, ShieldCheck, Layers];

export const CraftsmanshipSection: React.FC = () => {
  const [selectedPillar, setSelectedPillar] = React.useState(0);

  return (
    <section id="craftsmanship" className="bg-stone-900 text-stone-100 py-20 px-4 sm:px-6 lg:px-8 border-t border-stone-800">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-2xl space-y-3">
          <div className="text-xs uppercase tracking-widest text-amber-500 font-semibold">
            Centuries of Indian Karigari &amp; Guild Heritage
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Honoring Sacred Crafts. Banishing Shoe Bites.
          </h2>
          <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
            India produces some of the most magnificent leather crafts and threadwork in the world, from Kolhapur&apos;s vegetable-tanned braids to Jaipur&apos;s zardozi embroidery and Agra&apos;s welted lasts. We fuse these generational crafts with modern orthotic foam so you walk in pure comfort.
          </p>
        </div>

        {/* 4 Interactive Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {CRAFTSMANSHIP_PILLARS.map((pillar, index) => {
            const Icon = ICONS[index % ICONS.length];
            const isSelected = selectedPillar === index;

            return (
              <div
                key={pillar.title}
                onClick={() => setSelectedPillar(index)}
                className={`p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-stone-800/90 border-amber-500 shadow-xl ring-1 ring-amber-500'
                    : 'bg-stone-800/40 border-stone-800 hover:border-stone-700 hover:bg-stone-800/60'
                }`}
              >
                <div className="space-y-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    isSelected ? 'bg-amber-400 text-stone-950 font-bold' : 'bg-stone-700/60 text-amber-300'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-base font-semibold text-white">
                    {pillar.title}
                  </h3>

                  <p className="text-xs text-stone-400 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-stone-700/60 text-[11px] font-mono text-amber-200/90">
                  {pillar.detail}
                </div>
              </div>
            );
          })}
        </div>

        {/* Deep Dive Feature Spotlight */}
        <div className="mt-12 bg-stone-800/60 rounded-2xl border border-stone-700/80 p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
              Karigari Highlight: Pillar 0{selectedPillar + 1}
            </span>
            <h4 className="text-xl sm:text-2xl font-bold text-white">
              {CRAFTSMANSHIP_PILLARS[selectedPillar].title}
            </h4>
            <p className="text-sm text-stone-300 leading-relaxed">
              {CRAFTSMANSHIP_PILLARS[selectedPillar].description}
            </p>
            <div className="flex flex-wrap gap-4 text-xs text-stone-400 pt-2 font-mono">
              <span className="border border-stone-700 px-3 py-1.5 rounded-lg text-stone-200">
                Guild: {CRAFTSMANSHIP_PILLARS[selectedPillar].detail}
              </span>
              <span className="border border-stone-700 px-3 py-1.5 rounded-lg text-amber-300">
                100% Zero-Bite Guarantee
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 bg-stone-950/80 p-6 rounded-xl border border-stone-800 space-y-3 font-mono text-xs">
            <div className="flex justify-between border-b border-stone-800 pb-2">
              <span className="text-stone-400">GI Geographical Origin</span>
              <span className="text-amber-400 font-bold">Protected Indian Craft</span>
            </div>
            <div className="flex justify-between border-b border-stone-800 pb-2">
              <span className="text-stone-400">Natural Tannage</span>
              <span className="text-stone-200">Babool Bark &amp; Harda Fruits</span>
            </div>
            <div className="flex justify-between border-b border-stone-800 pb-2">
              <span className="text-stone-400">Embroidery Thread</span>
              <span className="text-stone-200">Tarnish-Free Gold Zari &amp; Tilla</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-400">Insole Softness</span>
              <span className="text-emerald-400 font-bold">7mm Orthopedic Foam</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
