/**
 * News Listing Loading State
 */

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header Skeleton */}
        <div className="mb-8 text-center space-y-4">
          <div className="h-12 w-80 mx-auto bg-gray-200 rounded-lg animate-pulse" />
          <div className="h-6 w-96 mx-auto bg-gray-200 rounded-lg animate-pulse" />
        </div>

        {/* Featured Post Skeleton */}
        <div className="mb-12 bg-white rounded-xl overflow-hidden shadow-sm">
          <div className="grid md:grid-cols-2 gap-2">
            <div className="h-96 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" />
            <div className="p-8 space-y-4">
              <div className="h-8 bg-gray-200 rounded animate-pulse" />
              <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4" />
              <div className="space-y-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-4 bg-gray-100 rounded animate-pulse" />
                ))}
              </div>
              <div className="h-10 w-32 bg-blue-200 rounded animate-pulse" />
            </div>
          </div>
        </div>

        {/* News Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm">
              <div className="h-56 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" />
              <div className="p-6 space-y-4">
                <div className="h-6 bg-gray-200 rounded animate-pulse" />
                <div className="space-y-2">
                  <div className="h-4 bg-gray-100 rounded animate-pulse" />
                  <div className="h-4 bg-gray-100 rounded animate-pulse w-5/6" />
                </div>
                <div className="flex justify-between items-center pt-2">
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                  <div className="h-8 w-24 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
