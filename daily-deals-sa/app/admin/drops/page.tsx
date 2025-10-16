'use client'

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface FreeDrop {
  id: string;
  dropAt: string;
  claimedAt: string | null;
  claimedBy: { name: string; email: string } | null;
  product: {
    name: string;
    price: number;
    stock: number;
  };
}

export default function AdminDropsPage() {
  const [drops, setDrops] = useState<FreeDrop[]>([]);
  const [loading, setLoading] = useState(true);
  const [reseeding, setReseeding] = useState(false);

  const fetchDrops = async () => {
    try {
      const res = await fetch('/api/admin/drops');
      if (res.ok) {
        const data = await res.json();
        setDrops(data.drops);
      }
    } catch (error) {
      console.error('Failed to fetch drops:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReseed = async () => {
    if (!confirm('Are you sure you want to reseed today\'s free drops? This will clear existing drops.')) {
      return;
    }

    setReseeding(true);
    try {
      const res = await fetch('/api/admin/drops/seed', { method: 'POST' });
      if (res.ok) {
        toast.success('Free drops reseeded successfully!');
        fetchDrops();
      } else {
        const data = await res.json();
        toast.error(data.error || 'Failed to reseed drops');
      }
    } catch (error) {
      toast.error('Failed to reseed drops');
    } finally {
      setReseeding(false);
    }
  };

  useEffect(() => {
    fetchDrops();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Free Drops Management</h1>
          <p className="text-muted-foreground">Manage today's free drop schedule</p>
        </div>
        <Button onClick={handleReseed} disabled={reseeding}>
          <RefreshCw className={`mr-2 h-4 w-4 ${reseeding ? 'animate-spin' : ''}`} />
          Reseed Today's Drops
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Today's Free Drops ({drops.length})</CardTitle>
          <CardDescription>10 random products dropped between 08:00-12:00 SAST</CardDescription>
        </CardHeader>
        <CardContent>
          {drops.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No drops scheduled for today. Click "Reseed Today's Drops" to generate new ones.
            </p>
          ) : (
            <div className="space-y-4">
              {drops.map((drop, index) => {
                const dropTime = new Date(drop.dropAt);
                const isDropped = dropTime <= new Date();
                const isClaimed = !!drop.claimedAt;

                return (
                  <div
                    key={drop.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium">{drop.product.name}</div>
                        <div className="text-sm text-muted-foreground">
                          R{drop.product.price} • Stock: {drop.product.stock}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-sm text-right">
                        <div className="font-medium">
                          {dropTime.toLocaleTimeString('en-ZA', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </div>
                        <div className="text-muted-foreground">
                          {dropTime.toLocaleDateString('en-ZA')}
                        </div>
                      </div>
                      {isClaimed ? (
                        <Badge variant="secondary">
                          Claimed by {drop.claimedBy?.name || 'Unknown'}
                        </Badge>
                      ) : isDropped ? (
                        <Badge className="bg-green-600 text-white">
                          <Zap className="h-3 w-3 mr-1 fill-current" />
                          Active
                        </Badge>
                      ) : (
                        <Badge variant="outline">Pending</Badge>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

