import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth-utils';
import { prisma } from '@/lib/db';
import { generateDropTimes, getStartOfToday, getEndOfToday } from '@/lib/free-drops';
import { FREE_DROPS_CONFIG } from '@/lib/constants';

export async function POST() {
  try {
    await requireAdmin();

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

    // Get products with stock
    const products = await prisma.product.findMany({
      where: {
        active: true,
        stock: { gt: 0 },
      },
    });

    if (products.length < FREE_DROPS_CONFIG.dailyCount) {
      return NextResponse.json({
        error: `Not enough products in stock. Need at least ${FREE_DROPS_CONFIG.dailyCount}, found ${products.length}`,
      }, { status: 400 });
    }

    // Randomly select products
    const shuffled = products.sort(() => Math.random() - 0.5);
    const selectedProducts = shuffled.slice(0, FREE_DROPS_CONFIG.dailyCount);

    // Generate drop times
    const dropTimes = generateDropTimes(FREE_DROPS_CONFIG.dailyCount);

    // Create drops
    for (let i = 0; i < FREE_DROPS_CONFIG.dailyCount; i++) {
      await prisma.freeDrop.create({
        data: {
          productId: selectedProducts[i].id,
          dropAt: dropTimes[i],
        },
      });
    }

    return NextResponse.json({ 
      success: true, 
      message: `Created ${FREE_DROPS_CONFIG.dailyCount} free drops for today`,
    });
  } catch (error) {
    console.error('Error seeding drops:', error);
    return NextResponse.json({ error: 'Failed to seed drops' }, { status: 500 });
  }
}

