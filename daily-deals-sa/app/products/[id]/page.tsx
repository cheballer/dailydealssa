import { Suspense } from 'react';
import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';
import { ProductDetail } from '@/components/product-detail';
import { Skeleton } from '@/components/ui/skeleton';
import { getStartOfToday, getEndOfToday } from '@/lib/free-drops';

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getProduct(id: string) {
  const startOfToday = getStartOfToday();
  const endOfToday = getEndOfToday();

  const product = await prisma.product.findUnique({
    where: { id },
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
  });

  return product;
}

function LoadingSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Skeleton className="aspect-square w-full" />
        <div className="space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    </div>
  );
}

async function ProductContent({ id }: { id: string }) {
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <ProductContent id={id} />
    </Suspense>
  );
}

