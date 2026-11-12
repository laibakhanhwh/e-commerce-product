export type Gender = 'all' | 'men' | 'women' | 'kids' | 'unisex';

export type ShoeCategory =
  | 'All'
  | 'Formal Shoes'
  | 'Sneakers'
  | 'Sports & Running'
  | 'Crocs & Clogs'
  | 'Juttis & Peshawaris'
  | 'Kolhapuris & Sandals'
  | 'Festive Heels & Mules'
  | 'Kids Festive & Ethnic'
  | 'Kids School & Formal'
  | 'Kids Sports & Sneakers'
  | 'Kids Clogs & Sandals';

export interface ShoeSize {
  ukIndia: number;
  eu: number;
  usEquivalent?: number;
  inStock: boolean;
  stockCount?: number;
}

export interface ShoeColor {
  name: string;
  hex: string;
  image?: string;
}

export interface ShoeProduct {
  id: string;
  name: string;
  tagline: string;
  gender: 'men' | 'women' | 'kids' | 'unisex';
  category: ShoeCategory;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  highlightTag?: string;
  image: string;
  colors: ShoeColor[];
  sizes: ShoeSize[];
  widths: string[];
  description: string;
  story: string;
  specs: {
    upper: string;
    lining: string;
    sole: string;
    construction: string;
    origin: string;
  };
  features: string[];
}

export interface CartItem {
  product: ShoeProduct;
  selectedColor: ShoeColor;
  selectedSize: ShoeSize;
  selectedWidth: string;
  quantity: number;
}

export interface FilterState {
  gender: Gender;
  category: ShoeCategory;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating';
  maxPrice: number;
  selectedSizeUK: number | null;
  searchQuery: string;
}
