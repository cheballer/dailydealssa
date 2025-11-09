// Category definitions
export const CATEGORIES = [
  { slug: 'electronics', name: 'Electronics', icon: '📱' },
  { slug: 'appliances', name: 'Appliances', icon: '🏠' },
  { slug: 'hardware', name: 'Hardware', icon: '🔧' },
  { slug: 'phones-accessories', name: 'Phones & Accessories', icon: '📱' },
  { slug: 'computers-tablets', name: 'Computers & Tablets', icon: '💻' },
  { slug: 'gaming', name: 'Gaming', icon: '🎮' },
  { slug: 'tv-audio', name: 'TV & Audio', icon: '📺' },
  { slug: 'cameras-photo', name: 'Cameras & Photo', icon: '📷' },
  { slug: 'fashion', name: 'Fashion', icon: '👔' },
  { slug: 'shoes', name: 'Shoes', icon: '👟' },
  { slug: 'beauty-personal-care', name: 'Beauty & Personal Care', icon: '💄' },
  { slug: 'health', name: 'Health', icon: '🏥' },
  { slug: 'sports-outdoors', name: 'Sports & Outdoors', icon: '⚽' },
  { slug: 'toys-games', name: 'Toys & Games', icon: '🎲' },
  { slug: 'baby', name: 'Baby', icon: '👶' },
  { slug: 'home-garden', name: 'Home & Garden', icon: '🏡' },
  { slug: 'furniture', name: 'Furniture', icon: '🛋️' },
  { slug: 'kitchen-dining', name: 'Kitchen & Dining', icon: '🍽️' },
  { slug: 'office-stationery', name: 'Office & Stationery', icon: '📝' },
  { slug: 'books', name: 'Books', icon: '📚' },
  { slug: 'music-instruments', name: 'Music & Instruments', icon: '🎸' },
  { slug: 'pet-supplies', name: 'Pet Supplies', icon: '🐾' },
  { slug: 'automotive', name: 'Automotive', icon: '🚗' },
  { slug: 'diy-tools', name: 'DIY & Tools', icon: '🔨' },
  { slug: 'groceries', name: 'Groceries', icon: '🛒' },
  { slug: 'travel-luggage', name: 'Travel & Luggage', icon: '🧳' },
] as const;

export type CategorySlug = typeof CATEGORIES[number]['slug'];

// Map category names to slugs for backward compatibility
export const CATEGORY_NAME_TO_SLUG: Record<string, CategorySlug> = {
  'Electronics': 'electronics',
  'Appliances': 'appliances',
  'Hardware': 'hardware',
  'Phones & Accessories': 'phones-accessories',
  'Computers & Tablets': 'computers-tablets',
  'Gaming': 'gaming',
  'TV & Audio': 'tv-audio',
  'Cameras & Photo': 'cameras-photo',
  'Fashion': 'fashion',
  'Shoes': 'shoes',
  'Beauty & Personal Care': 'beauty-personal-care',
  'Health': 'health',
  'Sports & Outdoors': 'sports-outdoors',
  'Toys & Games': 'toys-games',
  'Baby': 'baby',
  'Home & Garden': 'home-garden',
  'Furniture': 'furniture',
  'Kitchen & Dining': 'kitchen-dining',
  'Office & Stationery': 'office-stationery',
  'Books': 'books',
  'Music & Instruments': 'music-instruments',
  'Pet Supplies': 'pet-supplies',
  'Automotive': 'automotive',
  'DIY & Tools': 'diy-tools',
  'Groceries': 'groceries',
  'Travel & Luggage': 'travel-luggage',
};

// Free drops configuration
export const FREE_DROPS_CONFIG = {
  dailyCount: 10,
  startHour: 8, // 08:00 SAST
  endHour: 12, // 12:00 SAST
  timezone: 'Africa/Johannesburg',
} as const;

// Payment modes
export type PaymentMode = 'mock' | 'live';

export const PAYMENT_MODE: PaymentMode = (process.env.PAYMENTS_MODE as PaymentMode) || 'mock';


