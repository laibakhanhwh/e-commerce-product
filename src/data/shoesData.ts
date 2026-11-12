import { ShoeProduct } from '../types/shoes';

export const HERO_IMAGE = '/src/assets/images/hero_indian_footwear_1793682694678.jpg';

export const SHOES_DATA: ShoeProduct[] = [
  // --- MEN'S FORMAL ---
  {
    id: 'oxford-taj-captoe-agra',
    name: 'Taj Cap-Toe Leather Oxford',
    tagline: 'Hand-finished full-grain formal dress shoe from Agra',
    gender: 'men',
    category: 'Formal Shoes',
    price: 5499,
    originalPrice: 6999,
    rating: 4.9,
    reviewCount: 220,
    highlightTag: 'Goodyear Welted',
    image: '/src/assets/images/men_oxford_leather_1793681683842.jpg',
    colors: [
      { name: 'Rich Mahogany Tan', hex: '#4A2518', image: '/src/assets/images/men_oxford_leather_1793681683842.jpg' },
      { name: 'Jet Onyx Black', hex: '#111827', image: '/src/assets/images/oxford_black_leather_1794390024979.jpg' }
    ],
    sizes: [
      { ukIndia: 6, eu: 40, usEquivalent: 7, inStock: true, stockCount: 6 },
      { ukIndia: 7, eu: 41, usEquivalent: 8, inStock: true, stockCount: 10 },
      { ukIndia: 8, eu: 42, usEquivalent: 9, inStock: true, stockCount: 15 },
      { ukIndia: 9, eu: 43, usEquivalent: 10, inStock: true, stockCount: 8 },
      { ukIndia: 10, eu: 44, usEquivalent: 11, inStock: true, stockCount: 5 },
      { ukIndia: 11, eu: 45, usEquivalent: 12, inStock: true, stockCount: 3 }
    ],
    widths: ['Regular (D)', 'Comfort Wide (EE)'],
    description: 'The definitive formal dress shoe for corporate boardrooms, civil services, state dinners, and black-tie galas. Handcrafted in Agra using Grade-A French calfskin and traditional oak-bark tanned soles with channeled stitching.',
    story: 'Agra is India’s historic epicenter of bespoke welted shoemaking. Each Taj Oxford is lasted over 30 days and conditioned with organic beeswax, allowing the footbed to imprint your arch contours seamlessly.',
    specs: {
      upper: 'Full-Grain Grade-A Calfskin Leather',
      lining: 'Chrome-Free Breathable Drum-Dyed Leather',
      sole: 'Channeled Oak-Bark Leather Sole with Brass Toe Taps',
      construction: '360° Goodyear Welted (Indefinitely Resolable)',
      origin: 'Agra, Uttar Pradesh'
    },
    features: [
      'Internal heat-reactive cork bed conforms to your foot arch within 10 wears',
      'Hand-waxed round laces with solid brass aglets',
      'Reinforced heel counter prevents slippage and blisters during long boardroom days',
      'Resolable construction designed for 15+ years of distinguished formal wear'
    ]
  },
  {
    id: 'monkstrap-viceroy-double',
    name: 'Viceroy Double Monk Strap',
    tagline: 'Hand-patinated Italian calfskin with dual brushed brass buckles',
    gender: 'men',
    category: 'Formal Shoes',
    price: 5899,
    originalPrice: 7299,
    rating: 4.8,
    reviewCount: 142,
    highlightTag: 'Dual Brass Buckles',
    image: '/assets/aistudio/Gemini_Generated_Image_jumruvjumruvjumr_fa47910d.png',
    colors: [
      { name: 'Burnished Cognac', hex: '#8B4513', image: '/assets/aistudio/Gemini_Generated_Image_jumruvjumruvjumr_fa47910d.png' },
      { name: 'Onyx Black', hex: '#1C1917', image: '/assets/aistudio/Gemini_Generated_Image_v99ogrv99ogrv99o_b6a2b676.png' }
    ],
    sizes: [
      { ukIndia: 6, eu: 40, usEquivalent: 7, inStock: true, stockCount: 4 },
      { ukIndia: 7, eu: 41, usEquivalent: 8, inStock: true, stockCount: 8 },
      { ukIndia: 8, eu: 42, usEquivalent: 9, inStock: true, stockCount: 12 },
      { ukIndia: 9, eu: 43, usEquivalent: 10, inStock: true, stockCount: 6 },
      { ukIndia: 10, eu: 44, usEquivalent: 11, inStock: true, stockCount: 3 }
    ],
    widths: ['Regular Fit'],
    description: 'A sharp, sartorial statement piece that bridges modern European suiting and Indian formal bandhgalas. Features hand-burnished toe cap shading and elasticated buckle anchors for effortless slip-on comfort.',
    story: 'Crafted in Kanpur by guild leather masters. The double buckle strap design eliminates pressure points on high insteps while providing unmatched silhouette presence.',
    specs: {
      upper: 'Full-Grain Burnished Box Calfskin',
      lining: 'Breathable Glove-Tanned Goatskin',
      sole: 'Natural Leather Sole with Anti-Skid Rubber Island',
      construction: 'Blake-Rapid Welt Construction',
      origin: 'Kanpur, Uttar Pradesh'
    },
    features: [
      'Hidden elastic gussets on buckles for fast slip-on without unbuckling',
      'Orthopedic arch cookie supporting the natural plantar curve',
      'Hand-shaded antique patina finish unique to every pair',
      'Solid forged rust-proof brass hardware'
    ]
  },

  // --- MEN'S SNEAKERS ---
  {
    id: 'sneaker-court-minimalist-white',
    name: 'Kadam Classic Court Sneaker',
    tagline: 'Clean minimalist white leather low-top with caramel gum sole',
    gender: 'men',
    category: 'Sneakers',
    price: 3699,
    originalPrice: 4499,
    rating: 4.9,
    reviewCount: 296,
    highlightTag: '100% Nappa Leather',
    image: '/src/assets/images/men_court_sneaker_1793683551504.jpg',
    colors: [
      { name: 'Chalk White & Tan', hex: '#FAF9F6', image: '/src/assets/images/men_court_sneaker_1793683551504.jpg' },
      { name: 'All White Monochrome', hex: '#FFFFFF', image: '/assets/aistudio/Gemini_Generated_Image_uyyezbuyyezbuyye_87c18a8b.png' },
      { name: 'Pebbled Midnight', hex: '#1E293B', image: '/src/assets/images/sneaker_midnight_navy_1794377196492.jpg' }
    ],
    sizes: [
      { ukIndia: 6, eu: 40, usEquivalent: 7, inStock: true, stockCount: 7 },
      { ukIndia: 7, eu: 41, usEquivalent: 8, inStock: true, stockCount: 14 },
      { ukIndia: 8, eu: 42, usEquivalent: 9, inStock: true, stockCount: 22 },
      { ukIndia: 9, eu: 43, usEquivalent: 10, inStock: true, stockCount: 16 },
      { ukIndia: 10, eu: 44, usEquivalent: 11, inStock: true, stockCount: 9 },
      { ukIndia: 11, eu: 45, usEquivalent: 12, inStock: true, stockCount: 4 }
    ],
    widths: ['Standard Fit'],
    description: 'The quintessential minimalist court sneaker engineered with butter-soft milled nappa leather, a tan suede heel counter, and a durable vulcanized rubber cupsole with 360-degree sidewall stitching.',
    story: 'Designed in Mumbai to replace stiff synthetic fashion trainers with genuine breathable leather. Perfect for smart-casual Fridays, airport travel, denim, and chinos.',
    specs: {
      upper: 'Top-Grade Milled Nappa Leather & Suede Accent',
      lining: 'Calf Leather & Bamboo Terry Moisture-Wicking Lining',
      sole: 'Natural Vulcanized Gum Rubber Cupsole (Stitched 360°)',
      construction: 'Strobel Assembly with Reinforced Sidewall Stitch',
      origin: 'Ambur, Tamil Nadu'
    },
    features: [
      'Removable molded memory foam footbed with active carbon odor absorber',
      '360° sidewall perimeter stitching prevents sole delamination in hot weather',
      'Ultra-padded collar and tongue prevent heel chafing from day one',
      'Waxed tone-on-tone cotton laces with protective aglets'
    ]
  },
  {
    id: 'sneaker-kadam-vayu-runner',
    name: 'Kadam Vayu Urban Sneaker',
    tagline: 'Monsoon-proof breathable knit & suede lifestyle trainer',
    gender: 'men',
    category: 'Sneakers',
    price: 3499,
    originalPrice: 4299,
    rating: 4.8,
    reviewCount: 420,
    highlightTag: 'Monsoon Ready',
    image: '/src/assets/images/unisex_runner_sneaker_1793681685367.jpg',
    colors: [
      { name: 'Chalk Oatmeal', hex: '#D7CEC7' },
      { name: 'Monochrome Slate', hex: '#4B5563' }
    ],
    sizes: [
      { ukIndia: 6, eu: 40, usEquivalent: 7, inStock: true, stockCount: 10 },
      { ukIndia: 7, eu: 41, usEquivalent: 8, inStock: true, stockCount: 18 },
      { ukIndia: 8, eu: 42, usEquivalent: 9, inStock: true, stockCount: 20 },
      { ukIndia: 9, eu: 43, usEquivalent: 10, inStock: true, stockCount: 14 },
      { ukIndia: 10, eu: 44, usEquivalent: 11, inStock: true, stockCount: 9 },
      { ukIndia: 11, eu: 45, usEquivalent: 12, inStock: true, stockCount: 5 }
    ],
    widths: ['Standard Fit'],
    description: 'Engineered specifically for Indian metropolitan commutes. Combines high-rebound Vayu-Foam midsole with wet-grip natural gum rubber lugs for confident traction on wet pavement and train platforms.',
    story: 'Designed in Bengaluru with feedback from daily metro commuters who log 10,000+ steps daily across city pavement, asphalt, and pedestrian bridges.',
    specs: {
      upper: 'Water-Repellent Suede & Bamboo Jacquard Knit',
      lining: 'Antimicrobial Coconut Carbon Mesh',
      sole: 'High-Rebound EVA Midsole with Wet-Traction Gum Rubber',
      construction: 'Strobel Athletic Assembly',
      origin: 'Chennai, Tamil Nadu'
    },
    features: [
      'Removable Ortholite insole treated with natural neem extract to repel odors',
      'Hydrophobic coating sheds rain splashes and city dust',
      'Ultralight 280g construction reduces leg fatigue over long commutes',
      'High-traction gum rubber pods for grip on slick polished granite'
    ]
  },

  // --- MEN'S SPORTS & RUNNING ---
  {
    id: 'sports-velocity-7-aero',
    name: 'Velocity 7 Aero Running Shoe',
    tagline: 'High-rebound road running shoe with aerodynamic propulsion foam',
    gender: 'men',
    category: 'Sports & Running',
    price: 3999,
    originalPrice: 4999,
    rating: 4.9,
    reviewCount: 345,
    highlightTag: 'Aerodynamic Foam',
    image: '/src/assets/images/men_sports_running_shoe_1793683550057.jpg',
    colors: [
      { name: 'Stealth Grey & Electric Teal', hex: '#374151', image: '/src/assets/images/men_sports_running_shoe_1793683550057.jpg' },
      { name: 'Triple Carbon Black', hex: '#111827', image: '/src/assets/images/unisex_runner_sneaker_1793681685367.jpg' },
      { name: 'High-Vis Glacier White', hex: '#F3F4F6', image: '/src/assets/images/men_court_sneaker_1793683551504.jpg' }
    ],
    sizes: [
      { ukIndia: 6, eu: 40, usEquivalent: 7, inStock: true, stockCount: 8 },
      { ukIndia: 7, eu: 41, usEquivalent: 8, inStock: true, stockCount: 16 },
      { ukIndia: 8, eu: 42, usEquivalent: 9, inStock: true, stockCount: 25 },
      { ukIndia: 9, eu: 43, usEquivalent: 10, inStock: true, stockCount: 19 },
      { ukIndia: 10, eu: 44, usEquivalent: 11, inStock: true, stockCount: 11 },
      { ukIndia: 11, eu: 45, usEquivalent: 12, inStock: true, stockCount: 6 }
    ],
    widths: ['Athletic Regular', 'Wide Toe Box (EE)'],
    description: 'Built for morning road runs, 10K marathons, gym workouts, and cross-training. Features hyper-breathable dual-layer jacquard mesh and an energy-return sculpted midsole that cushions 85% of road shock impact.',
    story: 'Engineered with biomechanical testing to withstand hard Indian tarred roads and concrete running tracks. The segmented rocker geometry naturally rolls your foot into the next stride.',
    specs: {
      upper: 'Seamless Engineered High-Ventilation Jacquard Mesh',
      lining: 'Anatomical Moisture-Lock Textile Lining',
      sole: 'Dual-Density Hyper-Rebound EVA with Carbon-Rubber Lug Outsole',
      construction: 'Dynamic Strobel Performance Lasting',
      origin: 'Coimbatore, Tamil Nadu'
    },
    features: [
      '32mm heel stack with 8mm drop for optimal forward kinetic propulsion',
      'Targeted ventilation mesh keeps feet cool during intense 38°C workouts',
      'Molded external TPU heel counter locks heel down to prevent ankle roll',
      'High-abrasion carbon rubber tread pods in high-wear heel strike zones'
    ]
  },

  // --- MEN'S CROCS & CLOGS ---
  {
    id: 'crocs-cloud-clog-olive',
    name: 'Kadam Cloud-Clog Recovery Slide',
    tagline: 'Ultralight waterproof molded foam clog with pivoting heel strap',
    gender: 'men',
    category: 'Crocs & Clogs',
    price: 1899,
    originalPrice: 2499,
    rating: 4.8,
    reviewCount: 388,
    highlightTag: 'Waterproof & Washable',
    image: '/src/assets/images/men_crocs_clogs_1793683549549.jpg',
    colors: [
      { name: 'Army Olive Green', hex: '#4B5320' },
      { name: 'Matte Slate Grey', hex: '#475569' },
      { name: 'Deep Midnight Navy', hex: '#1E293B' }
    ],
    sizes: [
      { ukIndia: 6, eu: 40, usEquivalent: 7, inStock: true, stockCount: 15 },
      { ukIndia: 7, eu: 41, usEquivalent: 8, inStock: true, stockCount: 24 },
      { ukIndia: 8, eu: 42, usEquivalent: 9, inStock: true, stockCount: 35 },
      { ukIndia: 9, eu: 43, usEquivalent: 10, inStock: true, stockCount: 28 },
      { ukIndia: 10, eu: 44, usEquivalent: 11, inStock: true, stockCount: 18 },
      { ukIndia: 11, eu: 45, usEquivalent: 12, inStock: true, stockCount: 10 }
    ],
    widths: ['Roomy Comfort Fit'],
    description: 'The ultimate slip-and-go everyday comfort footwear. Molded from closed-cell Cloud-Foam that is 100% waterproof, odor-resistant, and buoyant. Features 13 ventilation airflow ports to expel water and debris during monsoons.',
    story: 'Engineered for post-workout recovery, highway road trips, weekend errands, and rainy monsoon seasons. The convertible pivoting heel strap lets you wear it as a relaxed slip-on or lock it behind your heel for secure driving.',
    specs: {
      upper: 'Closed-Cell High-Density Cloud-Foam EVA',
      lining: 'Massage-Pod Textured Footbed with Arch Contour',
      sole: 'Lugged Anti-Slip Wet-Grip Siped Sole',
      construction: 'One-Piece Injection Molded Ergonomic Build',
      origin: 'Bhiwandi, Maharashtra'
    },
    features: [
      'Pivoting heel strap switches instantly between slip-on mule and locked-in clog',
      '100% waterproof and washes clean in 10 seconds with water',
      'Strategic ventilation ports allow air circulation and drain water quickly',
      'Textured acupressure footbed stimulates circulation and relieves heel fatigue'
    ]
  },

  // --- MEN'S ETHNIC (PESHAWARIS & JUTTIS & KOLHAPURIS) ---
  {
    id: 'peshawari-royal-walnut',
    name: 'Shahi Royal Peshawari Sandal',
    tagline: 'Hand-burnished full-grain leather sandal with brass buckle',
    gender: 'men',
    category: 'Juttis & Peshawaris',
    price: 4499,
    originalPrice: 5999,
    rating: 4.9,
    reviewCount: 238,
    highlightTag: 'Goodyear Welted Sole',
    image: '/src/assets/images/men_leather_peshawari_1793682694880.jpg',
    colors: [
      { name: 'Walnut Tan', hex: '#6F4E37', image: '/src/assets/images/men_leather_peshawari_1793682694880.jpg' },
      { name: 'Midnight Charcoal', hex: '#1C1917', image: '/src/assets/images/peshawari_black_leather_1794390040618.jpg' },
      { name: 'Oxblood Maroon', hex: '#4A0E17', image: '/src/assets/images/men_leather_peshawari_1793682694880.jpg' }
    ],
    sizes: [
      { ukIndia: 6, eu: 40, usEquivalent: 7, inStock: true, stockCount: 5 },
      { ukIndia: 7, eu: 41, usEquivalent: 8, inStock: true, stockCount: 9 },
      { ukIndia: 8, eu: 42, usEquivalent: 9, inStock: true, stockCount: 14 },
      { ukIndia: 9, eu: 43, usEquivalent: 10, inStock: true, stockCount: 7 },
      { ukIndia: 10, eu: 44, usEquivalent: 11, inStock: true, stockCount: 4 },
      { ukIndia: 11, eu: 45, usEquivalent: 12, inStock: true, stockCount: 3 }
    ],
    widths: ['Regular Fit', 'Comfort Wide Fit'],
    description: 'An iconic silhouette revived for modern sherwanis, kurtas, and tailored linen trousers. Features traditional semi-closed toe design with hand-carved brogue perforations and heavy-gauge Goodyear welted soles.',
    story: 'Crafted in the historic leather hubs of Agra by fourth-generation ustaads. Each upper is steeped in mustard seed and castor oil for three days to achieve zero-bite supple softness.',
    specs: {
      upper: 'Top-Grain Indian Buff & Calfskin Leather',
      lining: 'Breathable Malmal Goat Leather (No-Sweat Finish)',
      sole: 'Natural Oak-Bark Compressed Leather with Rubber Grip Pad',
      construction: 'Traditional 360° Goodyear Lockstitch',
      origin: 'Agra, Uttar Pradesh'
    },
    features: [
      'Anti-Shoe-Bite padded heel collar engineered for extended wedding ceremonies',
      'Solid forged brass buckle with 5-hole adjustment for broad arches',
      'Double-cushioned memory foam footbed absorbs impact on marble floors',
      'Water-resistant natural wax finish prevents staining'
    ]
  },
  {
    id: 'kolhapuri-chappal-athani-tan',
    name: 'Athani Heritage Kolhapuri Chappal',
    tagline: 'Pure vegetable-tanned leather with hand-braided thong strap',
    gender: 'men',
    category: 'Kolhapuris & Sandals',
    price: 2899,
    originalPrice: 3499,
    rating: 4.8,
    reviewCount: 186,
    highlightTag: 'GI-Tagged Kolhapur Craft',
    image: '/src/assets/images/men_kolhapuri_chappal_1793682696242.jpg',
    colors: [
      { name: 'Kaccha Honey Tan', hex: '#BA7A44' },
      { name: 'Mahogany Brown', hex: '#4E2E1D' },
      { name: 'Natural Saffron Tan', hex: '#D27D2D' }
    ],
    sizes: [
      { ukIndia: 6, eu: 40, usEquivalent: 7, inStock: true, stockCount: 4 },
      { ukIndia: 7, eu: 41, usEquivalent: 8, inStock: true, stockCount: 8 },
      { ukIndia: 8, eu: 42, usEquivalent: 9, inStock: true, stockCount: 15 },
      { ukIndia: 9, eu: 43, usEquivalent: 10, inStock: true, stockCount: 10 },
      { ukIndia: 10, eu: 44, usEquivalent: 11, inStock: true, stockCount: 6 },
      { ukIndia: 11, eu: 45, usEquivalent: 12, inStock: true, stockCount: 2 }
    ],
    widths: ['Regular Fit'],
    description: 'Handcrafted in Athani and Kolhapur following the 800-year-old Geographical Indication (GI) protected tradition. Punched with traditional suryavanshi motifs and bound with hand-twisted leather cords.',
    story: 'Tanned using natural extracts of babool bark and harda fruit. Our modern edition incorporates an invisible rubber crepe underlay so you get authentic acoustic character without slippage on polished tile.',
    specs: {
      upper: '100% Bag-Tanned Buff Leather',
      lining: 'Natural Grain Unlined Footbed (Takes Foot Contour)',
      sole: 'Stacked Leather Sole with Anti-Slip TPR Island',
      construction: 'Traditional Hand-Braided Cord Stitching',
      origin: 'Kolhapur, Maharashtra'
    },
    features: [
      'Authentic hand-knotted braided toe loop that softens with wear',
      'Zero synthetic adhesives: joined exclusively with braided leather cords',
      'Naturally cooling in peak Indian summer heat (40°C+)',
      'Subtle brass tacks reinforcement at high-stress anchor points'
    ]
  },
  {
    id: 'jutti-amritsari-tilla-men',
    name: 'Patiala Royal Tilla Mojari',
    tagline: 'Pure buffalo leather Punjabi jutti with silver & gold tilla',
    gender: 'men',
    category: 'Juttis & Peshawaris',
    price: 3299,
    originalPrice: 3999,
    rating: 4.8,
    reviewCount: 168,
    highlightTag: 'Curled Panna Toe',
    image: '/src/assets/images/hero_indian_footwear_1793682694678.jpg',
    colors: [
      { name: 'Heritage Tan & Gold', hex: '#9C6644' },
      { name: 'Royal Velvet Black', hex: '#1E1E24' }
    ],
    sizes: [
      { ukIndia: 6, eu: 40, usEquivalent: 7, inStock: true, stockCount: 5 },
      { ukIndia: 7, eu: 41, usEquivalent: 8, inStock: true, stockCount: 9 },
      { ukIndia: 8, eu: 42, usEquivalent: 9, inStock: true, stockCount: 12 },
      { ukIndia: 9, eu: 43, usEquivalent: 10, inStock: true, stockCount: 8 },
      { ukIndia: 10, eu: 44, usEquivalent: 11, inStock: true, stockCount: 4 }
    ],
    widths: ['Traditional Broad'],
    description: 'The definitive Punjabi royal mojari featuring an elegant curved toe (noke) and dense kasab tilla needlework. An essential pairing for achkans, bandhgalas, and wedding sherwanis.',
    story: 'Stitched by master artisans in Amritsar using single-piece vegetable-tanned leather sole. We soften the inner counters with natural almond oil to prevent the classic mojari bite.',
    specs: {
      upper: 'Full-Grain Buffalo Hide with Metallic Tilla Threading',
      lining: 'Vegetable-Tanned Cowhide with Velvet Rim',
      sole: 'Hand-Hammered Raw Buff Hide Sole',
      construction: 'Traditional Hand-Stitched Punjabi Welt',
      origin: 'Amritsar, Punjab'
    },
    features: [
      'Pre-conditioned leather eliminates the traditional 2-week break-in bite',
      'Hand-turned curved toe retains shape without collapsing',
      'Double-stitched cotton-cord sole built for sangeet dancing',
      'Breathable all-leather construction stays cool in North Indian summers'
    ]
  },

  // --- WOMEN'S STYLES ---
  {
    id: 'bridal-jutti-zardozi-gold',
    name: 'Noor Zardozi Bridal Jutti',
    tagline: 'Hand-embroidered ivory silk jutti with genuine antique gold tilla',
    gender: 'women',
    category: 'Juttis & Peshawaris',
    price: 3899,
    originalPrice: 4899,
    rating: 4.9,
    reviewCount: 312,
    highlightTag: 'Zero-Bite Padded Sole',
    image: '/src/assets/images/women_bridal_jutti_1793682696164.jpg',
    colors: [
      { name: 'Ivory & Antique Gold', hex: '#E6D7B8', image: '/src/assets/images/women_bridal_jutti_1793682696164.jpg' },
      { name: 'Sindoor Crimson', hex: '#8B1E28', image: '/src/assets/images/jutti_ruby_red_1794390054390.jpg' },
      { name: 'Rani Rose Pink', hex: '#C25975', image: '/src/assets/images/jutti_ruby_red_1794390054390.jpg' }
    ],
    sizes: [
      { ukIndia: 3, eu: 36, usEquivalent: 5.5, inStock: true, stockCount: 6 },
      { ukIndia: 4, eu: 37, usEquivalent: 6.5, inStock: true, stockCount: 12 },
      { ukIndia: 5, eu: 38, usEquivalent: 7.5, inStock: true, stockCount: 18 },
      { ukIndia: 6, eu: 39, usEquivalent: 8.5, inStock: true, stockCount: 11 },
      { ukIndia: 7, eu: 40, usEquivalent: 9.5, inStock: true, stockCount: 7 },
      { ukIndia: 8, eu: 41, usEquivalent: 10.5, inStock: true, stockCount: 4 }
    ],
    widths: ['Comfort Regular', 'Broad Toe Box'],
    description: 'Bespoke bridal footwear designed for hours of sangeet dancing and wedding pheras. Elaborately embroidered by Jaipur karigars using centuries-old zardozi needlework on pure mulberry raw silk.',
    story: 'Traditional juttis often pinch the toes; our atelier reconstructed the inner last with a 7mm orthopedic memory foam quilt, ensuring your feet stay pillowy soft through every ritual.',
    specs: {
      upper: 'Pure Raw Mulberry Silk with Hand-stitched Zardozi & Dabka',
      lining: 'Velvet-soft Milled Cowhide with Padded Quilt',
      sole: 'Vegetable-Tanned Buffalo Leather Sole (Hand-stitched)',
      construction: 'Authentic Turned Mojari Construction',
      origin: 'Jaipur, Rajasthan'
    },
    features: [
      '7mm dual-layer memory foam cushion prevents bridal foot fatigue',
      'Anti-chafing padded back seam guaranteed against shoe bites',
      'Embroidered with non-tarnishing gold electroplated zari threads',
      'Natural textured leather sole with anti-slip scoring'
    ]
  },
  {
    id: 'kolhapuri-heel-mule-rosegold',
    name: 'Meera Kolhapuri Block Heel Mule',
    tagline: 'Metallic braided Kolhapuri strap on a 50mm architectural block heel',
    gender: 'women',
    category: 'Festive Heels & Mules',
    price: 3699,
    originalPrice: 4499,
    rating: 4.9,
    reviewCount: 194,
    highlightTag: '50mm Balanced Heel',
    image: '/src/assets/images/women_kolhapuri_heels_1793682696442.jpg',
    colors: [
      { name: 'Rose Gold & Champ', hex: '#B76E79' },
      { name: 'Antique Gold', hex: '#CFB53B' },
      { name: 'Deep Bronze', hex: '#614E3F' }
    ],
    sizes: [
      { ukIndia: 3, eu: 36, usEquivalent: 5.5, inStock: true, stockCount: 5 },
      { ukIndia: 4, eu: 37, usEquivalent: 6.5, inStock: true, stockCount: 9 },
      { ukIndia: 5, eu: 38, usEquivalent: 7.5, inStock: true, stockCount: 16 },
      { ukIndia: 6, eu: 39, usEquivalent: 8.5, inStock: true, stockCount: 12 },
      { ukIndia: 7, eu: 40, usEquivalent: 9.5, inStock: true, stockCount: 4 }
    ],
    widths: ['Standard Fit'],
    description: 'The contemporary fusion of Maharashtra’s heritage Kolhapuri toe-ring braid with an ergonomic 50mm cylindrical block heel. Pairs effortlessly with Kanjeevaram sarees, lehengas, or modern indowestern coordinates.',
    story: 'Designed in Mumbai to eliminate the wobbly heel pain of Indian celebrations. The broad block base ensures confident footing on lawn weddings, carpets, and dance floors.',
    specs: {
      upper: 'Metallic Foil Finished Leather with Hand-Braided T-Strap',
      lining: 'Ultra-Soft Vegan Suede with Cushion Inlay',
      sole: 'Resilient Neolite Sole with Vibram Rubber Top-Lift',
      construction: 'Handcrafted Strobel Fusion Assembly',
      origin: 'Mumbai, Maharashtra'
    },
    features: [
      '50mm (2-inch) solid block heel provides all-day stability',
      'Orthopedic arch cookie supporting the natural plantar curve',
      'Hand-woven toe ring with softened leather backing prevents chafing',
      'Ghungroo-inspired micro brass bead embellishments'
    ]
  },
  {
    id: 'slingback-sitaara-nude',
    name: 'Sitaara Sculpted Slingback Pump',
    tagline: 'Nude glove leather kitten heel with cushioned footbed',
    gender: 'women',
    category: 'Festive Heels & Mules',
    price: 4199,
    originalPrice: 4999,
    rating: 4.9,
    reviewCount: 154,
    highlightTag: '45mm Comfy Heel',
    image: '/src/assets/images/women_minimalist_heel_1793681683962.jpg',
    colors: [
      { name: 'Nude Almond', hex: '#D6C0B3' },
      { name: 'Deep Espresso', hex: '#2B1E1A' }
    ],
    sizes: [
      { ukIndia: 3, eu: 36, usEquivalent: 5.5, inStock: true, stockCount: 6 },
      { ukIndia: 4, eu: 37, usEquivalent: 6.5, inStock: true, stockCount: 10 },
      { ukIndia: 5, eu: 38, usEquivalent: 7.5, inStock: true, stockCount: 15 },
      { ukIndia: 6, eu: 39, usEquivalent: 8.5, inStock: true, stockCount: 8 },
      { ukIndia: 7, eu: 40, usEquivalent: 9.5, inStock: true, stockCount: 4 }
    ],
    widths: ['Regular Fit'],
    description: 'The versatile office-to-cocktail heel designed for the Indian woman. Crafted from butter-soft sheepskin nappa with a sculpted 45mm heel and a concealed ball-of-foot gel pad.',
    story: 'Styled to complement both formal Western pant suits and pastel Chanderi or Organza sarees without sinking into banquet lawn grass.',
    specs: {
      upper: 'Premium Italian Drum-Tanned Sheep Nappa',
      lining: 'Soft Goatskin with High-Density Latex Inlay',
      sole: 'Natural Leather Sole with Anti-Skid Rubber Island',
      construction: 'Italian Sacchetto Flexible Method',
      origin: 'Ambur, Tamil Nadu'
    },
    features: [
      '45mm flared kitten heel designed for 8+ hour comfort',
      'Dual-density ball-of-foot cushioning prevents burning sensation',
      'Adjustable slingback strap with hidden elastic stretch loop',
      'Tapered chisel toe accommodates natural Indian toe spread'
    ]
  },

  // --- WOMEN'S FORMAL COLLECTION ---
  {
    id: 'loafer-aurelia-penny-leather',
    name: 'Aurelia Hand-Patinated Leather Penny Loafer',
    tagline: 'Luxury formal Goodyear-welted penny loafer with cushioned arch support',
    gender: 'women',
    category: 'Formal Shoes',
    price: 4499,
    originalPrice: 5999,
    rating: 4.9,
    reviewCount: 168,
    highlightTag: 'Full-Grain Box Calf',
    image: '/src/assets/images/women_formal_loafer_1794376047195.jpg',
    colors: [
      { name: 'Cognac Saddle Brown', hex: '#7A3816' },
      { name: 'Midnight Onyx Black', hex: '#1C1917' }
    ],
    sizes: [
      { ukIndia: 3, eu: 36, usEquivalent: 5.5, inStock: true, stockCount: 6 },
      { ukIndia: 4, eu: 37, usEquivalent: 6.5, inStock: true, stockCount: 10 },
      { ukIndia: 5, eu: 38, usEquivalent: 7.5, inStock: true, stockCount: 14 },
      { ukIndia: 6, eu: 39, usEquivalent: 8.5, inStock: true, stockCount: 9 },
      { ukIndia: 7, eu: 40, usEquivalent: 9.5, inStock: true, stockCount: 5 },
      { ukIndia: 8, eu: 41, usEquivalent: 10.5, inStock: true, stockCount: 3 }
    ],
    widths: ['Regular Fit', 'Comfort Wide (EE)'],
    description: 'A benchmark in women’s corporate footwear. Handcrafted in Ambur using French box calfskin with authentic hand-stitched apron apron seams and an ergonomic molded leather insole that cushions high insteps.',
    story: 'Engineered for women in leadership, law, finance, and creative direction who demand classic tailored sartorial elegance without sacrificing all-day walking ease.',
    specs: {
      upper: 'Top-Tier French Box Calfskin Leather',
      lining: 'Soft Glove-Tanned Breathable Goatskin',
      sole: 'Natural Oak-Bark Leather Sole with Anti-Skid Rubber Pod',
      construction: 'Blake-Rapid Flexible Stitched Welting',
      origin: 'Ambur, Tamil Nadu'
    },
    features: [
      'Built-in orthopedic arch cookie supporting natural posture during long meetings',
      'Subtle 20mm stacked leather heel with brass nail accents',
      'Zero break-in period with buttery glove-tanned interior leather lining',
      'Pairs seamlessly with power suits, tailored trousers, and formal Indian attire'
    ]
  },
  {
    id: 'derby-rajputana-brogue-walnut',
    name: 'Rajputana Wingtip Brogue Oxford',
    tagline: 'Hand-punched medallion broguing on full-grain Agra calfskin',
    gender: 'men',
    category: 'Formal Shoes',
    price: 5999,
    originalPrice: 7499,
    rating: 4.9,
    reviewCount: 182,
    highlightTag: 'Goodyear Welted',
    image: '/src/assets/images/men_oxford_leather_1793681683842.jpg',
    colors: [
      { name: 'Walnut Antique Tan', hex: '#633519' },
      { name: 'Raven Formal Black', hex: '#0F172A' }
    ],
    sizes: [
      { ukIndia: 6, eu: 40, usEquivalent: 7, inStock: true, stockCount: 5 },
      { ukIndia: 7, eu: 41, usEquivalent: 8, inStock: true, stockCount: 12 },
      { ukIndia: 8, eu: 42, usEquivalent: 9, inStock: true, stockCount: 16 },
      { ukIndia: 9, eu: 43, usEquivalent: 10, inStock: true, stockCount: 11 },
      { ukIndia: 10, eu: 44, usEquivalent: 11, inStock: true, stockCount: 7 },
      { ukIndia: 11, eu: 45, usEquivalent: 12, inStock: true, stockCount: 4 }
    ],
    widths: ['Regular (D)', 'Comfort Wide (EE)'],
    description: 'A distinguished British-Indian formal silhouette featuring perforated wingtip detailing and a chiseled toe box. Finished by hand with natural carnauba wax in Agra ateliers.',
    story: 'Inspired by the ceremonial formal wardrobes of royal courts and ambassadors, built on our proprietary zero-bite last.',
    specs: {
      upper: 'Full-Grain Grade-A Agra Calfskin',
      lining: 'Natural Drum-Dyed Cowhide',
      sole: '360° Goodyear Welted Leather Sole with Rubber Island',
      construction: 'Indefinitely Resolable Goodyear Welt',
      origin: 'Agra, Uttar Pradesh'
    },
    features: [
      'Cork footbed filler adapts to individual foot pressure patterns',
      'Solid brass eyelets with hand-waxed cotton dress laces',
      'Reinforced heel counter ensuring zero heel-slip on marble floors'
    ]
  },

  // --- KIDS' WEAR COLLECTION ---
  {
    id: 'kids-chhotenawab-velvet-jutti',
    name: 'Chhote Nawab Hand-Embroidered Velvet Mojari',
    tagline: 'Kids royal wedding & festive jutti with Zero-Bite plush velvet cushioning',
    gender: 'kids',
    category: 'Kids Festive & Ethnic',
    price: 1899,
    originalPrice: 2499,
    rating: 4.9,
    reviewCount: 138,
    highlightTag: 'Zero-Bite Soft Padded',
    image: '/src/assets/images/kids_festive_jutti_1794376016117.jpg',
    colors: [
      { name: 'Royal Maroon & Gold Zari', hex: '#6B1D2F' },
      { name: 'Imperial Emerald & Tilla', hex: '#1B4D3E' },
      { name: 'Midnight Navy Velvet', hex: '#1B2A4A' }
    ],
    sizes: [
      { ukIndia: 8, eu: 25, inStock: true, stockCount: 8 },
      { ukIndia: 9, eu: 27, inStock: true, stockCount: 12 },
      { ukIndia: 10, eu: 28, inStock: true, stockCount: 15 },
      { ukIndia: 11, eu: 29, inStock: true, stockCount: 10 },
      { ukIndia: 12, eu: 31, inStock: true, stockCount: 7 },
      { ukIndia: 13, eu: 32, inStock: true, stockCount: 6 },
      { ukIndia: 1, eu: 33, inStock: true, stockCount: 5 },
      { ukIndia: 2, eu: 34, inStock: true, stockCount: 4 }
    ],
    widths: ['Comfort Fit for Growing Feet'],
    description: 'Specially created for little princes and princesses attending weddings, Diwali, Eid, and family ceremonies. Built with a 6mm orthopedic foam footbed and soft velvet heel guards that eliminate traditional jutti bites completely.',
    story: 'Hand-embroidered in Jaipur by generational karigars using non-tarnishing gold zari and pure cotton threadwork, lined with child-safe breathable fabric.',
    specs: {
      upper: 'Royal Silk Velvet with Hand Dabka & Sitaara Needlework',
      lining: 'Breathable Padded Cotton Velvet with 6mm Ortho Foam',
      sole: 'Flexible Genuine Leather Sole with Anti-Skid Rubber Grip',
      construction: 'Traditional Hand-Turned Mojari with Reinforced Seams',
      origin: 'Jaipur, Rajasthan'
    },
    features: [
      'Padded velvet collar prevents blisters during dancing and running at sangeets',
      'Child-safe non-toxic natural adhesives and vegetable tanning',
      'Dual-textured non-slip bottom keeps kids secure on polished banquet marble floors',
      'Comfortable slip-on fit that stays snug without sliding off'
    ]
  },
  {
    id: 'kids-junior-oxford-derby',
    name: 'Junior Scholar Cushioned School & Formal Derby',
    tagline: 'Scuff-resistant genuine leather formal shoe with padded ankle collar',
    gender: 'kids',
    category: 'Kids School & Formal',
    price: 1799,
    originalPrice: 2299,
    rating: 4.8,
    reviewCount: 215,
    highlightTag: 'Scuff-Resistant',
    image: '/src/assets/images/kids_formal_shoe_1794376029163.jpg',
    colors: [
      { name: 'Polished Black Box Leather', hex: '#111827' },
      { name: 'Heritage Deep Brown', hex: '#3E2723' }
    ],
    sizes: [
      { ukIndia: 8, eu: 25, inStock: true, stockCount: 6 },
      { ukIndia: 9, eu: 27, inStock: true, stockCount: 10 },
      { ukIndia: 10, eu: 28, inStock: true, stockCount: 14 },
      { ukIndia: 11, eu: 29, inStock: true, stockCount: 12 },
      { ukIndia: 12, eu: 31, inStock: true, stockCount: 8 },
      { ukIndia: 13, eu: 32, inStock: true, stockCount: 9 },
      { ukIndia: 1, eu: 33, inStock: true, stockCount: 7 },
      { ukIndia: 2, eu: 34, inStock: true, stockCount: 5 }
    ],
    widths: ['Wide Toe-Box (Kids Ortho)'],
    description: 'The definitive formal and premium school dress shoe designed to withstand active playground runs while meeting the strictest school uniforms, debates, competitions, and ceremonial events.',
    story: 'Built in Agra using durable action leather with a flexible shock-absorbing sole that protects children’s developing posture and arches.',
    specs: {
      upper: 'Full-Grain Box Action Leather (Scuff & Water Resistant)',
      lining: 'Moisture-Absorbing Bamboo Microfiber',
      sole: 'Non-Marking Lightweight Flexible TPR Sole',
      construction: 'Direct Stitched Reinforcement Welting',
      origin: 'Agra, Uttar Pradesh'
    },
    features: [
      'Reinforced toe bumper resists daily playground scuffs and kicks',
      'High-density memory foam arch insert cushions energetic steps',
      'Padded foam collar prevents Achilles tendon chafing',
      'Waxed cotton laces with secure tie hold for active school days'
    ]
  },
  {
    id: 'kids-speedy-velcro-runner',
    name: 'Little Sprinter Lightweight Velcro Sneaker',
    tagline: 'Ultra-cushioned running sneaker with effortless hook-and-loop strap',
    gender: 'kids',
    category: 'Kids Sports & Sneakers',
    price: 1699,
    originalPrice: 2199,
    rating: 4.9,
    reviewCount: 172,
    highlightTag: 'Easy Velcro Strap',
    image: '/src/assets/images/kids_velcro_sneaker_1794376065853.jpg',
    colors: [
      { name: 'Navy Blue & Chalk White', hex: '#1E3A8A' },
      { name: 'Slate Grey & Electric Volt', hex: '#475569' }
    ],
    sizes: [
      { ukIndia: 8, eu: 25, inStock: true, stockCount: 9 },
      { ukIndia: 9, eu: 27, inStock: true, stockCount: 11 },
      { ukIndia: 10, eu: 28, inStock: true, stockCount: 18 },
      { ukIndia: 11, eu: 29, inStock: true, stockCount: 14 },
      { ukIndia: 12, eu: 31, inStock: true, stockCount: 8 },
      { ukIndia: 13, eu: 32, inStock: true, stockCount: 10 },
      { ukIndia: 1, eu: 33, inStock: true, stockCount: 6 },
      { ukIndia: 2, eu: 34, inStock: true, stockCount: 5 }
    ],
    widths: ['Standard Kids Fit'],
    description: 'Feather-light sports sneaker engineered with breathable sandwich mesh, responsive bouncy EVA midsole, and high-traction rubber outsole for cricket, football, running, and all-day park playtime.',
    story: 'Designed with podiatric pediatric guidelines to ensure natural toe splay and unconstrained bone growth for energetic children.',
    specs: {
      upper: 'Breathable 3D Sandwich Mesh with Durable Synthetic Overlays',
      lining: 'Soft Antibacterial CoolMax Fabric',
      sole: 'High-Rebound Dual-Density Phylon EVA & Rubber Lug',
      construction: 'Strobel Lightweight Athletic Construction',
      origin: 'Jalandhar, Punjab'
    },
    features: [
      'Quick single-pull velcro strap lets kids put shoes on independently in seconds',
      'Orthotic heel cup cradles developing foot arches and balances gait',
      'Machine washable on cold cycle for muddy weekend playtime',
      'Non-marking gum rubber pods for gym floors and indoor courts'
    ]
  },
  {
    id: 'kids-cloud-clog-waterproof',
    name: 'Junior Cloud-Clog Waterproof Sandal',
    tagline: 'Buoyant antimicrobial EVA foam clog with pivot safety heel strap',
    gender: 'kids',
    category: 'Kids Clogs & Sandals',
    price: 1199,
    originalPrice: 1599,
    rating: 4.8,
    reviewCount: 146,
    highlightTag: 'Waterproof & Odor-Free',
    image: '/src/assets/images/men_crocs_clogs_1793683549549.jpg',
    colors: [
      { name: 'Cerulean Splash Blue', hex: '#0284C7' },
      { name: 'Sunshine Mango Yellow', hex: '#F59E0B' },
      { name: 'Jet Black Carbon', hex: '#18181B' }
    ],
    sizes: [
      { ukIndia: 8, eu: 25, inStock: true, stockCount: 10 },
      { ukIndia: 9, eu: 27, inStock: true, stockCount: 12 },
      { ukIndia: 10, eu: 28, inStock: true, stockCount: 15 },
      { ukIndia: 11, eu: 29, inStock: true, stockCount: 14 },
      { ukIndia: 12, eu: 31, inStock: true, stockCount: 9 },
      { ukIndia: 13, eu: 32, inStock: true, stockCount: 7 },
      { ukIndia: 1, eu: 33, inStock: true, stockCount: 6 }
    ],
    widths: ['Comfort Roomy Fit'],
    description: 'The ultimate monsoon and holiday shoe for kids. Quick-drying, washable with water, anti-slip grooved tread, and ventilated ports for cool air circulation.',
    story: 'Molded using eco-friendly closed-cell foam that resists bacteria, odor, and water absorption. Perfect for beach trips, rainy days, and casual weekends.',
    specs: {
      upper: 'Molded Closed-Cell Aerated EVA Foam',
      lining: 'Textured Anti-Slip Massage Footbed',
      sole: 'Integrated Shock-Absorbing EVA Sole with Drainage Channels',
      construction: 'Single-Mold Monocoque Waterproof Form',
      origin: 'Mumbai, Maharashtra'
    },
    features: [
      'Pivoting heel strap shifts forward for easy slip-on or backward for active lockdown',
      'Side ventilation ports shed water, mud, and sand rapidly',
      'Cleans in seconds with plain tap water and mild soap'
    ]
  }
];

export const KIDS_SIZE_CONVERSIONS = [
  { ukIndia: 8, eu: 25, approxAge: '3 - 3.5 Years', cm: 15.1, inches: 5.94 },
  { ukIndia: 9, eu: 27, approxAge: '3.5 - 4 Years', cm: 15.9, inches: 6.26 },
  { ukIndia: 10, eu: 28, approxAge: '4 - 5 Years', cm: 16.8, inches: 6.61 },
  { ukIndia: 11, eu: 29, approxAge: '5 - 6 Years', cm: 17.6, inches: 6.93 },
  { ukIndia: 12, eu: 31, approxAge: '6 - 7 Years', cm: 18.5, inches: 7.28 },
  { ukIndia: 13, eu: 32, approxAge: '7 - 8 Years', cm: 19.3, inches: 7.60 },
  { ukIndia: 1, eu: 33, approxAge: '8 - 9 Years', cm: 20.2, inches: 7.95 },
  { ukIndia: 2, eu: 34, approxAge: '9 - 10 Years', cm: 21.0, inches: 8.27 },
  { ukIndia: 3, eu: 35, approxAge: '10 - 11 Years', cm: 21.9, inches: 8.62 }
];

export const CRAFTSMANSHIP_PILLARS = [
  {
    title: 'GI-Certified Kolhapuri Heritage',
    description: 'Authentic bag-tanned leathers processed with natural babool bark and myrobalan extracts. Hand-punched with centuries-old geometric motifs without a drop of chemical dye.',
    detail: 'Maharashtra & North Karnataka Karigar Guilds.'
  },
  {
    title: 'Hand Zardozi & Tilla Karigari',
    description: 'Every bridal jutti and festive mojari is hand-embroidered by generational artisans in Jaipur and Amritsar using dabka, sitaara, and real non-tarnishing gold electroplated zari.',
    detail: 'Up to 36 hours of hand needlework per individual pair.'
  },
  {
    title: 'Zero-Bite Anti-Chafe Engineering',
    description: 'Traditional Indian shoes are notorious for painful shoe bites. We engineer every pair with 7mm dual-density memory foam footbeds and seamless velvet-lined collars.',
    detail: 'Double cushioning tested for 12+ hour Indian weddings.'
  },
  {
    title: 'Agra & Kanpur Goodyear Welted Leather',
    description: 'Our formal Oxfords, Peshawaris, and boots are handcrafted in India’s historic leather capitals using 360° lock-stitch welted construction that lasts decades and can be resoled indefinitely.',
    detail: 'Full-grain Grade-A hides with oak-bark tanned leather soles.'
  }
];

export const SIZE_CONVERSIONS = [
  { ukIndia: 3, eu: 36, usWomen: 5.5, usMen: 4, cm: 22.5, inches: 8.85 },
  { ukIndia: 4, eu: 37, usWomen: 6.5, usMen: 5, cm: 23.2, inches: 9.15 },
  { ukIndia: 5, eu: 38, usWomen: 7.5, usMen: 6, cm: 24.0, inches: 9.45 },
  { ukIndia: 6, eu: 39, usWomen: 8.5, usMen: 7, cm: 24.7, inches: 9.72 },
  { ukIndia: 7, eu: 40, usWomen: 9.5, usMen: 7.5, cm: 25.3, inches: 9.96 },
  { ukIndia: 8, eu: 41, usWomen: 10.5, usMen: 8.5, cm: 26.0, inches: 10.24 },
  { ukIndia: 9, eu: 42, usWomen: 11.5, usMen: 9, cm: 26.7, inches: 10.51 },
  { ukIndia: 10, eu: 43, usWomen: 12.5, usMen: 10, cm: 27.3, inches: 10.75 },
  { ukIndia: 11, eu: 44, usWomen: 13.5, usMen: 11, cm: 28.0, inches: 11.02 },
  { ukIndia: 12, eu: 45, usWomen: 14.5, usMen: 12, cm: 28.7, inches: 11.30 }
];

export const INDIAN_CITIES = [
  'Mumbai',
  'Delhi NCR',
  'Bengaluru',
  'Hyderabad',
  'Kolkata',
  'Chennai',
  'Ahmedabad',
  'Pune',
  'Jaipur',
  'Lucknow',
  'Chandigarh',
  'Kochi'
];
