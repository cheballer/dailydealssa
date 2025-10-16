import { PrismaClient } from '@prisma/client';
import { generateDropTimes, getStartOfToday, getEndOfToday } from '../lib/free-drops';
import { FREE_DROPS_CONFIG } from '../lib/constants';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting free drops seed for today...');

  const startOfToday = getStartOfToday();
  const endOfToday = getEndOfToday();

  // Clear existing drops for today
  await prisma.freeDrop.deleteMany({
    where: {
      dropAt: {
        gte: startOfToday,
        lte: endOfToday,
      },
    },
  });
  console.log('Cleared existing drops for today');

  // Get products with stock
  const products = await prisma.product.findMany({
    where: {
      active: true,
      stock: { gt: 0 },
    },
  });

  if (products.length < FREE_DROPS_CONFIG.dailyCount) {
    console.error(`Not enough products in stock. Need at least ${FREE_DROPS_CONFIG.dailyCount}, found ${products.length}`);
    process.exit(1);
  }

  // Randomly select products for drops
  const shuffled = products.sort(() => Math.random() - 0.5);
  const selectedProducts = shuffled.slice(0, FREE_DROPS_CONFIG.dailyCount);

  // Generate random drop times
  const dropTimes = generateDropTimes(FREE_DROPS_CONFIG.dailyCount);

  // Create free drops
  for (let i = 0; i < FREE_DROPS_CONFIG.dailyCount; i++) {
    await prisma.freeDrop.create({
      data: {
        productId: selectedProducts[i].id,
        dropAt: dropTimes[i],
      },
    });
  }

  console.log(`✅ Created ${FREE_DROPS_CONFIG.dailyCount} free drops for today:`);
  
  // Display the schedule
  const drops = await prisma.freeDrop.findMany({
    where: {
      dropAt: {
        gte: startOfToday,
        lte: endOfToday,
      },
    },
    include: {
      product: {
        select: {
          name: true,
          price: true,
        },
      },
    },
    orderBy: {
      dropAt: 'asc',
    },
  });

  drops.forEach((drop, index) => {
    const dropTime = new Date(drop.dropAt).toLocaleTimeString('en-ZA', {
      timeZone: FREE_DROPS_CONFIG.timezone,
      hour: '2-digit',
      minute: '2-digit',
    });
    console.log(`  ${index + 1}. ${dropTime} - ${drop.product.name} (R${drop.product.price})`);
  });
}

main()
  .catch((e) => {
    console.error('Error seeding drops:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

