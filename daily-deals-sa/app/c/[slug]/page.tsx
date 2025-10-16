import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';
import { ProductCard } from '@/components/product-card';
import { CATEGORIES, CATEGORY_NAME_TO_SLUG } from '@/lib/constants';
import { Skeleton } from '@/components/ui/skeleton';
import { getStartOfToday, getEndOfToday } from '@/lib/free-drops';

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getCategoryProducts(slug: string) {
  const category = CATEGORIES.find((c) => c.slug === slug);
  if (!category) {
    return null;
  }

  const startOfToday = getStartOfToday();
  const endOfToday = getEndOfToday();

  // Get products matching this category (by slug or by name for backward compatibility)
  const products = await prisma.product.findMany({
    where: {
      active: true,
      stock: { gt: 0 },
      OR: [
        { category: category.name },
        { category: category.slug },
      ],
    },
    orderBy: [
      { featured: 'desc' },
      { discount: 'desc' },
      { createdAt: 'desc' },
    ],
  });

  // Get today's free drops for these products
  const productIds = products.map((p) => p.id);
  const freeDrops = await prisma.freeDrop.findMany({
    where: {
      productId: { in: productIds },
      dropAt: {
        gte: startOfToday,
        lte: endOfToday,
      },
    },
  });

  // Attach free drop info to products
  return products.map((product) => {
    const drop = freeDrops.find((d) => d.productId === product.id);
    return {
      ...product,
      freeDrop: drop || null,
    };
  });
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

async function CategoryContent({ slug }: { slug: string }) {
  const products = await getCategoryProducts(slug);

  if (!products) {
    notFound();
  }

  const category = CATEGORIES.find((c) => c.slug === slug)!;

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="text-6xl mb-4">{category.icon}</div>
        <h2 className="text-2xl font-bold mb-2">No products available</h2>
        <p className="text-muted-foreground">
          We're working on adding more {category.name.toLowerCase()} products. Check back soon!
        </p>
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

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = CATEGORIES.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 border-b">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-5xl">{category.icon}</span>
            <h1 className="text-4xl font-bold">{category.name}</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Browse our selection of {category.name.toLowerCase()} products
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Suspense fallback={<LoadingSkeleton />}>
          <CategoryContent slug={slug} />
        </Suspense>
      </div>
    </div>
  );
}

// Generate static params for all categories
export function generateStaticParams() {
  return CATEGORIES.map((category) => ({
    slug: category.slug,
  }));
}

