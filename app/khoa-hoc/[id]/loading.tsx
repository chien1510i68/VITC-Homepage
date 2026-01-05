/**
 * Course Detail Loading State
 */

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Skeleton */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="h-8 w-32 bg-blue-200 rounded-full animate-pulse" />
            <div className="h-12 w-3/4 bg-gray-200 rounded-lg animate-pulse" />
            <div className="h-6 w-full bg-gray-200 rounded-lg animate-pulse" />
            <div className="h-6 w-5/6 bg-gray-200 rounded-lg animate-pulse" />
            
            <div className="flex gap-4 pt-4">
              <div className="h-12 w-40 bg-blue-200 rounded-lg animate-pulse" />
              <div className="h-12 w-40 bg-gray-200 rounded-lg animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm space-y-4">
                <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse" />
                <div className="space-y-2">
                  {[...Array(4)].map((_, j) => (
                    <div key={j} className="h-4 bg-gray-100 rounded animate-pulse" />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24 space-y-6">
              <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg animate-pulse" />
              <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="h-5 w-5 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 flex-1 bg-gray-200 rounded animate-pulse" />
                  </div>
                ))}
              </div>
              <div className="h-12 w-full bg-blue-200 rounded-lg animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
