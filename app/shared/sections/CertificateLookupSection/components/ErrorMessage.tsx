/**
 * ErrorMessage Component - Displays error messages with dismiss functionality
 * @module shared/sections/CertificateLookupSection/components
 */

import { X } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onDismiss: () => void;
}

/**
 * ErrorMessage Component
 * Responsible for displaying error messages only
 */
export function ErrorMessage({ message, onDismiss }: ErrorMessageProps) {
  if (!message) return null;

  return (
    <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
      <div className="flex">
        <div className="ml-3">
          <p className="text-sm font-medium text-red-800">
            {message}
          </p>
        </div>
        <button
          onClick={onDismiss}
          className="ml-auto flex-shrink-0 text-red-500 hover:text-red-700"
          aria-label="Đóng thông báo lỗi"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
