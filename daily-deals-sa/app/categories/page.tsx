import { CATEGORIES } from '@/lib/constants';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Grid } from 'lucide-react';

export default function CategoriesPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 border-b">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center gap-3 mb-4">
            <Grid className="h-10 w-10 text-primary" />
            <h1 className="text-4xl font-bold">Browse Categories</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Explore our wide range of products across all categories
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {CATEGORIES.map((category) => (
            <Link key={category.slug} href={`/c/${category.slug}`}>
              <Card className="group cursor-pointer overflow-hidden transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6 flex flex-col items-center justify-center text-center gap-3">
                  <div className="text-4xl group-hover:scale-110 transition-transform">
                    {category.icon}
                  </div>
                  <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

