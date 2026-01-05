'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Tin học page error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="text-6xl">⚠️</div>
        <h2 className="text-2xl font-bold text-gray-900">
          Đã xảy ra lỗi
        </h2>
        <p className="text-gray-600">
          Xin lỗi, có lỗi xảy ra khi tải trang Tin học. Vui lòng thử lại.
        </p>
        <Button onClick={reset} className="mt-4">
          Thử lại
        </Button>
      </div>
    </div>
  );
}
