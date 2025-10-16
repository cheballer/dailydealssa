import { Suspense } from 'react';
import { prisma } from '@/lib/db';
import { ProductCard } from '@/components/product-card';
import { getStartOfToday, getEndOfToday } from '@/lib/free-drops';
import { Skeleton } from '@/components/ui/skeleton';
import { Zap, TrendingDown } from 'lucide-react';

async function getTodaysDeals() {
  const startOfToday = getStartOfToday();
  const endOfToday = getEndOfToday();

  // Get products that have discounts or are featured
  const products = await prisma.product.findMany({
    where: {
      active: true,
      stock: { gt: 0 },
      OR: [
        { discount: { gt: 0 } },
        { featured: true },
      ],
    },
    orderBy: {
      discount: 'desc',
    },
  });

  // Get today's free drops
  const freeDrops = await prisma.freeDrop.findMany({
    where: {
      dropAt: {
        gte: startOfToday,
        lte: endOfToday,
      },
    },
    include: {
      product: true,
    },
  });

  // Combine and deduplicate
  const productsWithDrops = products.map((product) => {
    const drop = freeDrops.find((d) => d.productId === product.id);
    return {
      ...product,
      freeDrop: drop || null,
    };
  });

  // Add any free drop products that aren't already in the list
  const additionalDropProducts = freeDrops
    .filter((drop) => !products.find((p) => p.id === drop.productId))
    .map((drop) => ({
      ...drop.product,
      freeDrop: drop,
    }));

  return [...productsWithDrops, ...additionalDropProducts];
}

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="flex flex-col gap-4">
          <Skeleton className="aspect-square w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  );
}

async function DealsContent() {
  const products = await getTodaysDeals();

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <TrendingDown className="h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-2">No deals available right now</h2>
        <p className="text-muted-foreground">Check back soon for amazing deals!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default function TodaysDealsPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 border-b">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="h-10 w-10 fill-primary text-primary" />
            <h1 className="text-4xl font-bold">Today's Deals</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Limited-time offers and daily free drops. Grab them before they're gone!
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Suspense fallback={<LoadingSkeleton />}>
          <DealsContent />
        </Suspense>
      </div>
    </div>
  );
}

