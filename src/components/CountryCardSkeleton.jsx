
import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";

const CountryCardSkeleton = () => {
  return (
    <div className="bg-card text-card-foreground rounded-lg overflow-hidden hover-scale card-shadow h-full flex flex-col animate-pulse">
      <div className="h-40 overflow-hidden bg-muted">
        <Skeleton className="w-full h-full" />
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <Skeleton className="h-6 w-3/4 mb-4" />
        <div className="space-y-2 mt-auto">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </div>
    </div>
  );
};

export default CountryCardSkeleton;
