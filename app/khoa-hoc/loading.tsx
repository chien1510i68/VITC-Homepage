/**
 * Course Listing Loading State
 */

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header Skeleton */}
        <div className="mb-8 space-y-4">
          <div className="h-10 w-64 bg-gray-200 rounded-lg animate-pulse" />
          <div className="h-6 w-96 bg-gray-200 rounded-lg animate-pulse" />
        </div>

        {/* Filters Skeleton */}
        <div className="mb-8 flex gap-3 overflow-x-auto pb-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-10 w-32 bg-gray-200 rounded-lg animate-pulse flex-shrink-0" />
          ))}
        </div>

        {/* Course Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm">
              {/* Image skeleton */}
              <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" />
              
              {/* Content skeleton */}
              <div className="p-6 space-y-4">
                <div className="h-6 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                <div className="space-y-2">
                  <div className="h-4 bg-gray-100 rounded animate-pulse" />
                  <div className="h-4 bg-gray-100 rounded animate-pulse w-5/6" />
                </div>
                <div className="flex justify-between items-center pt-4">
                  <div className="h-8 w-24 bg-gray-200 rounded animate-pulse" />
                  <div className="h-10 w-32 bg-blue-200 rounded animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
