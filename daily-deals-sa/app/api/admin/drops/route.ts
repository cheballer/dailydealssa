import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth-utils';
import { prisma } from '@/lib/db';
import { getStartOfToday, getEndOfToday } from '@/lib/free-drops';

export async function GET() {
  try {
    await requireAdmin();

    const startOfToday = getStartOfToday();
    const endOfToday = getEndOfToday();

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
            stock: true,
          },
        },
        claimedBy: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        dropAt: 'asc',
      },
    });

    return NextResponse.json({ drops });
  } catch (error) {
    console.error('Error fetching drops:', error);
    return NextResponse.json({ error: 'Failed to fetch drops' }, { status: 500 });
  }
}

