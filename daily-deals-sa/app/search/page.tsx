import { Suspense } from 'react';
import { prisma } from '@/lib/db';
import { ProductCard } from '@/components/product-card';
import { Skeleton } from '@/components/ui/skeleton';
import { getStartOfToday, getEndOfToday } from '@/lib/free-drops';

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
  }>;
}

async function searchProducts(query: string) {
  const startOfToday = getStartOfToday();
  const endOfToday = getEndOfToday();

  const products = await prisma.product.findMany({
    where: {
      active: true,
      stock: { gt: 0 },
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
        { category: { contains: query, mode: 'insensitive' } },
      ],
    },
    include: {
      freeDrops: {
        where: {
          dropAt: {
            gte: startOfToday,
            lte: endOfToday,
          },
          claimedAt: null,
        },
        take: 1,
      },
    },
    orderBy: [
      { featured: 'desc' },
      { discount: 'desc' },
    ],
  });

  return products.map(product => ({
    ...product,
    freeDrop: product.freeDrops.length > 0 ? product.freeDrops[0] : null,
  }));
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

async function SearchContent({ query }: { query: string }) {
  const products = await searchProducts(query);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Search Results</h1>
        <p className="text-muted-foreground">
          Found {products.length} result{products.length !== 1 ? 's' : ''} for "{query}"
        </p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-2xl font-bold text-muted-foreground mb-2">No products found</h3>
          <p className="text-muted-foreground">Try a different search term</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q || '';

  if (!query) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h1 className="text-3xl font-bold mb-2">Search Products</h1>
          <p className="text-muted-foreground">Enter a search term to find products</p>
        </div>
      </div>
    );
  }

  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <SearchContent query={query} />
    </Suspense>
  );
}

