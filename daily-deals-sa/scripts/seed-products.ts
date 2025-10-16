import { PrismaClient } from '@prisma/client';
import { CATEGORIES } from '../lib/constants';

const prisma = new PrismaClient();

const sampleProducts = [
  // Electronics
  { name: 'Smart LED TV 55"', description: '4K Ultra HD, Smart features, HDR support', price: 6999, originalPrice: 8999, category: 'Electronics', image: '/placeholder.svg', sku: 'TV-55-001' },
  { name: 'Wireless Earbuds Pro', description: 'Active noise cancellation, 30hr battery', price: 1299, originalPrice: 1999, category: 'Electronics', image: '/wireless-earbuds-black.jpg', sku: 'WE-PRO-001' },
  { name: 'Bluetooth Speaker Portable', description: 'Waterproof, 360° sound, 12hr battery', price: 449, originalPrice: 799, category: 'Electronics', image: '/bluetooth-speaker-portable.jpg', sku: 'BS-PORT-001' },
  
  // Phones & Accessories
  { name: 'Smartphone Case Premium', description: 'Shockproof, wireless charging compatible', price: 199, originalPrice: 349, category: 'Phones & Accessories', image: '/placeholder.svg', sku: 'CASE-PREM-001' },
  { name: 'Phone Screen Protector', description: 'Tempered glass, anti-scratch, 9H hardness', price: 89, originalPrice: 149, category: 'Phones & Accessories', image: '/placeholder.svg', sku: 'SCREEN-PRO-001' },
  { name: 'Wireless Charger Pad', description: 'Fast charging, LED indicator, universal', price: 249, originalPrice: 399, category: 'Phones & Accessories', image: '/placeholder.svg', sku: 'WCHG-PAD-001' },
  
  // Computers & Tablets
  { name: 'Gaming Mouse RGB', description: 'Programmable buttons, 16000 DPI, ergonomic', price: 549, originalPrice: 899, category: 'Computers & Tablets', image: '/gaming-mouse-rgb.jpg', sku: 'GMOUSE-RGB-001' },
  { name: 'Mechanical Keyboard', description: 'RGB backlit, Cherry MX switches, compact', price: 899, originalPrice: 1499, category: 'Computers & Tablets', image: '/placeholder.svg', sku: 'KEYB-MECH-001' },
  { name: 'USB-C Hub 7-in-1', description: 'HDMI, USB 3.0, SD card reader, PD charging', price: 349, originalPrice: 599, category: 'Computers & Tablets', image: '/placeholder.svg', sku: 'HUB-7IN1-001' },
  
  // Appliances
  { name: 'Air Fryer Modern', description: '5.5L capacity, digital display, 8 presets', price: 1299, originalPrice: 1999, category: 'Appliances', image: '/modern-air-fryer-kitchen-appliance.jpg', sku: 'AF-MOD-001' },
  { name: 'Electric Kettle Stainless', description: 'Rapid boil, auto shut-off, 1.7L', price: 349, originalPrice: 599, category: 'Appliances', image: '/electric-kettle-stainless.jpg', sku: 'EK-STEEL-001' },
  { name: 'Coffee Maker Automatic', description: 'Programmable, 12-cup capacity, anti-drip', price: 799, originalPrice: 1299, category: 'Appliances', image: '/placeholder.svg', sku: 'CM-AUTO-001' },
  
  // Hardware
  { name: 'Cordless Drill Set', description: '20V lithium battery, 50-piece accessory kit', price: 1299, originalPrice: 1899, category: 'Hardware', image: '/cordless-drill-power-tool.jpg', sku: 'DRILL-CD-001' },
  { name: 'LED Work Light Tool', description: 'Rechargeable, magnetic base, 1000 lumens', price: 299, originalPrice: 499, category: 'Hardware', image: '/led-work-light-tool.jpg', sku: 'LED-WORK-001' },
  { name: 'Tool Set 100-Piece', description: 'Complete household toolkit, durable case', price: 899, originalPrice: 1499, category: 'Hardware', image: '/placeholder.svg', sku: 'TOOL-100-001' },
  
  // Gaming
  { name: 'Gaming Headset Pro', description: '7.1 surround sound, noise-canceling mic', price: 799, originalPrice: 1299, category: 'Gaming', image: '/placeholder.svg', sku: 'GHEAD-PRO-001' },
  { name: 'Controller Wireless', description: 'Bluetooth, rechargeable, vibration feedback', price: 549, originalPrice: 899, category: 'Gaming', image: '/placeholder.svg', sku: 'CTRL-WIRE-001' },
  
  // Fashion
  { name: 'Men\'s Watch Smart', description: 'Fitness tracking, heart rate, GPS', price: 1499, originalPrice: 2499, category: 'Fashion', image: '/smart-watch-fitness.png', sku: 'WATCH-SM-001' },
  { name: 'Sunglasses Polarized', description: 'UV400 protection, unisex, lightweight', price: 299, originalPrice: 599, category: 'Fashion', image: '/placeholder.svg', sku: 'SUNG-POL-001' },
  
  // Shoes
  { name: 'Running Shoes Pro', description: 'Breathable mesh, cushioned sole, lightweight', price: 899, originalPrice: 1499, category: 'Shoes', image: '/placeholder.svg', sku: 'SHOE-RUN-001' },
  { name: 'Sneakers Casual', description: 'Canvas material, comfortable fit, various colors', price: 599, originalPrice: 999, category: 'Shoes', image: '/placeholder.svg', sku: 'SNEAK-CAS-001' },
  
  // Beauty & Personal Care
  { name: 'Hair Dryer Professional', description: 'Ionic technology, 3 heat settings, 2000W', price: 549, originalPrice: 899, category: 'Beauty & Personal Care', image: '/placeholder.svg', sku: 'HDRY-PRO-001' },
  { name: 'Electric Toothbrush', description: 'Sonic cleaning, 2min timer, USB charging', price: 399, originalPrice: 699, category: 'Beauty & Personal Care', image: '/placeholder.svg', sku: 'ETBR-SON-001' },
  
  // Health
  { name: 'Digital Thermometer', description: 'Instant read, fever alarm, memory function', price: 149, originalPrice: 249, category: 'Health', image: '/placeholder.svg', sku: 'THERM-DIG-001' },
  { name: 'Blood Pressure Monitor', description: 'Automatic, large display, 2-user memory', price: 549, originalPrice: 899, category: 'Health', image: '/placeholder.svg', sku: 'BP-MON-001' },
  
  // Sports & Outdoors
  { name: 'Yoga Mat Premium', description: 'Non-slip, eco-friendly, 6mm thick', price: 299, originalPrice: 499, category: 'Sports & Outdoors', image: '/placeholder.svg', sku: 'YOGA-MAT-001' },
  { name: 'Camping Tent 4-Person', description: 'Waterproof, easy setup, UV protection', price: 1499, originalPrice: 2499, category: 'Sports & Outdoors', image: '/placeholder.svg', sku: 'TENT-4P-001' },
  
  // Toys & Games
  { name: 'Building Blocks Set', description: '500 pieces, educational, compatible', price: 349, originalPrice: 599, category: 'Toys & Games', image: '/placeholder.svg', sku: 'BLOCKS-500-001' },
  { name: 'RC Car Remote Control', description: 'High-speed, rechargeable, all-terrain', price: 599, originalPrice: 999, category: 'Toys & Games', image: '/placeholder.svg', sku: 'RC-CAR-001' },
  
  // Baby
  { name: 'Baby Monitor Video', description: 'HD camera, night vision, two-way audio', price: 1299, originalPrice: 1999, category: 'Baby', image: '/placeholder.svg', sku: 'BMON-VID-001' },
  { name: 'Baby Stroller Lightweight', description: 'Foldable, 5-point harness, cup holder', price: 1799, originalPrice: 2999, category: 'Baby', image: '/placeholder.svg', sku: 'STROL-LT-001' },
  
  // Home & Garden
  { name: 'Robot Vacuum Cleaner', description: 'Smart navigation, auto-charge, app control', price: 2999, originalPrice: 4999, category: 'Home & Garden', image: '/placeholder.svg', sku: 'RVAC-SMART-001' },
  { name: 'Garden Tool Set', description: '10-piece set, stainless steel, ergonomic', price: 499, originalPrice: 899, category: 'Home & Garden', image: '/placeholder.svg', sku: 'GTOOL-10-001' },
  
  // Furniture
  { name: 'Office Chair Ergonomic', description: 'Lumbar support, adjustable, mesh back', price: 1999, originalPrice: 3499, category: 'Furniture', image: '/placeholder.svg', sku: 'CHAIR-ERG-001' },
  { name: 'Study Desk Modern', description: 'Cable management, spacious, sturdy', price: 2499, originalPrice: 3999, category: 'Furniture', image: '/placeholder.svg', sku: 'DESK-MOD-001' },
  
  // Kitchen & Dining
  { name: 'Knife Set Professional', description: '12-piece, German steel, wooden block', price: 899, originalPrice: 1499, category: 'Kitchen & Dining', image: '/placeholder.svg', sku: 'KNIFE-12-001' },
  { name: 'Cookware Set Non-Stick', description: '10-piece, induction compatible, dishwasher safe', price: 1499, originalPrice: 2499, category: 'Kitchen & Dining', image: '/placeholder.svg', sku: 'COOK-10-001' },
  
  // Office & Stationery
  { name: 'Planner 2025 Deluxe', description: 'Monthly/weekly views, goal tracker, leather cover', price: 199, originalPrice: 349, category: 'Office & Stationery', image: '/placeholder.svg', sku: 'PLAN-2025-001' },
  { name: 'Pen Set Luxury', description: 'Ballpoint & rollerball, gift box, refillable', price: 399, originalPrice: 699, category: 'Office & Stationery', image: '/placeholder.svg', sku: 'PEN-LUX-001' },
  
  // Books
  { name: 'Cookbook South African', description: 'Traditional recipes, illustrated, hardcover', price: 349, originalPrice: 499, category: 'Books', image: '/placeholder.svg', sku: 'BOOK-COOK-001' },
  { name: 'Novel Bestseller Bundle', description: '3 popular titles, fiction, paperback', price: 499, originalPrice: 749, category: 'Books', image: '/placeholder.svg', sku: 'BOOK-BUND-001' },
  
  // Pet Supplies
  { name: 'Pet Bed Orthopedic', description: 'Memory foam, washable cover, anti-slip', price: 599, originalPrice: 999, category: 'Pet Supplies', image: '/placeholder.svg', sku: 'PET-BED-001' },
  { name: 'Automatic Pet Feeder', description: 'Programmable, portion control, 6L capacity', price: 899, originalPrice: 1499, category: 'Pet Supplies', image: '/placeholder.svg', sku: 'PET-FEED-001' },
  
  // Automotive
  { name: 'Car Phone Holder', description: 'Dashboard mount, 360° rotation, sturdy grip', price: 149, originalPrice: 299, category: 'Automotive', image: '/placeholder.svg', sku: 'CAR-HOLD-001' },
  { name: 'Dash Cam HD', description: '1080p, night vision, loop recording, G-sensor', price: 899, originalPrice: 1499, category: 'Automotive', image: '/placeholder.svg', sku: 'DASH-CAM-001' },
  
  // DIY & Tools
  { name: 'Paint Roller Set', description: 'Professional grade, multiple sizes, tray included', price: 199, originalPrice: 349, category: 'DIY & Tools', image: '/placeholder.svg', sku: 'PAINT-ROL-001' },
  { name: 'Measuring Tape Laser', description: 'Digital, 40m range, accuracy ±2mm', price: 449, originalPrice: 799, category: 'DIY & Tools', image: '/placeholder.svg', sku: 'MEAS-LAS-001' },
  
  // Groceries
  { name: 'Organic Coffee Beans', description: 'Fair trade, dark roast, 1kg bag', price: 179, originalPrice: 249, category: 'Groceries', image: '/placeholder.svg', sku: 'GROC-COFF-001' },
  { name: 'Snack Box Variety', description: 'Assorted treats, 20 items, family size', price: 299, originalPrice: 449, category: 'Groceries', image: '/placeholder.svg', sku: 'GROC-SNACK-001' },
  
  // Travel & Luggage
  { name: 'Luggage Set 3-Piece', description: 'Hardshell, spinner wheels, TSA locks', price: 2499, originalPrice: 3999, category: 'Travel & Luggage', image: '/placeholder.svg', sku: 'LUG-SET3-001' },
  { name: 'Travel Backpack Anti-Theft', description: 'USB charging port, waterproof, laptop compartment', price: 599, originalPrice: 999, category: 'Travel & Luggage', image: '/placeholder.svg', sku: 'TRAV-BACK-001' },
];

async function main() {
  console.log('Starting product seed...');

  // Clear existing products
  await prisma.product.deleteMany({});
  console.log('Cleared existing products');

  // Create products with randomized stock and featured status
  for (const product of sampleProducts) {
    const stock = Math.floor(Math.random() * 50) + 5; // 5-54 items
    const featured = Math.random() < 0.2; // 20% chance of being featured
    const discount = product.originalPrice
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0;

    await prisma.product.create({
      data: {
        ...product,
        stock,
        featured,
        discount,
        active: true,
      },
    });
  }

  const count = await prisma.product.count();
  console.log(`✅ Created ${count} products`);
}

main()
  .catch((e) => {
    console.error('Error seeding products:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

