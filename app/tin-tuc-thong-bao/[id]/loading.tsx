/**
 * News Detail Loading State
 */

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Image Skeleton */}
      <div className="w-full h-96 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Article Header Skeleton */}
          <div className="space-y-6 mb-12">
            <div className="flex gap-3">
              <div className="h-6 w-24 bg-blue-200 rounded-full animate-pulse" />
              <div className="h-6 w-32 bg-gray-200 rounded-full animate-pulse" />
            </div>
            
            <div className="h-12 w-full bg-gray-200 rounded-lg animate-pulse" />
            <div className="h-8 w-3/4 bg-gray-200 rounded-lg animate-pulse" />
            
            <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse" />
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
              </div>
              <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>

          {/* Article Content Skeleton */}
          <div className="bg-white rounded-xl p-8 shadow-sm space-y-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 bg-gray-100 rounded animate-pulse" />
                <div className="h-4 bg-gray-100 rounded animate-pulse" />
                <div className="h-4 bg-gray-100 rounded animate-pulse w-5/6" />
              </div>
            ))}
            
            {/* Image placeholder in content */}
            <div className="h-64 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg animate-pulse my-8" />
            
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 bg-gray-100 rounded animate-pulse" />
                <div className="h-4 bg-gray-100 rounded animate-pulse w-4/5" />
              </div>
            ))}
          </div>

          {/* Related Articles Skeleton */}
          <div className="mt-12">
            <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm">
                  <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" />
                  <div className="p-6 space-y-4">
                    <div className="h-6 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 bg-gray-100 rounded animate-pulse w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
