/**
 * Global Loading UI
 * Displayed when navigating between routes
 */

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="text-center space-y-6">
        {/* Logo Skeleton */}
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl animate-pulse" />
        </div>
        
        {/* Spinner */}
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto" />
        </div>
        
        {/* Text */}
        <div className="space-y-2">
          <div className="h-6 w-48 bg-gray-200 rounded-lg animate-pulse mx-auto" />
          <div className="h-4 w-32 bg-gray-100 rounded-lg animate-pulse mx-auto" />
        </div>
      </div>
    </div>
  );
}
