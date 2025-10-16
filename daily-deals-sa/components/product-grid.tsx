import { Suspense } from 'react';
import { ProductCard } from "@/components/product-card"
import { prisma } from '@/lib/db';
import { Skeleton } from './ui/skeleton';

async function getProducts() {
  const products = await prisma.product.findMany({
    where: {
      active: true,
      stock: { gt: 0 },
    },
    orderBy: [
      { featured: 'desc' },
      { discount: 'desc' },
    ],
    take: 8,
  });

  return products;
}

function LoadingSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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

async function ProductList() {
  const products = await getProducts();

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export function ProductGrid() {
  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">Featured Deals</h2>
          <p className="text-lg text-muted-foreground">Limited stock on all items. Grab them before they're gone!</p>
        </div>

        <Suspense fallback={<LoadingSkeleton />}>
          <ProductList />
        </Suspense>
      </div>
    </section>
  )
}
