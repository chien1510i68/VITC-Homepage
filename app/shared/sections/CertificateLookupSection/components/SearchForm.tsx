/**
 * SearchForm Component - Handles certificate search input and submission
 * @module shared/sections/CertificateLookupSection/components
 */

import { Search, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TAILWIND_COLORS } from '@/lib/colors';

interface SearchFormProps {
  cccd: string;
  isLoading: boolean;
  onCccdChange: (value: string) => void;
  onSearch: () => void;
}

/**
 * SearchForm Component
 * Responsible for handling user input and search submission only
 */
export function SearchForm({ cccd, isLoading, onCccdChange, onSearch }: SearchFormProps) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="bg-gray-50 rounded-2xl p-6 md:p-8 border-2 border-gray-200 mb-8">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          <Award className="w-6 h-6 inline-block mr-2" />
          Tra cứu chứng chỉ
        </h3>
        <p className="text-gray-600">Nhập số CCCD/CMND để tra cứu thông tin chứng chỉ của bạn</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          type="text"
          placeholder="Nhập số CCCD/CMND/MSV..."
          value={cccd}
          onChange={(e) => onCccdChange(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1"
          aria-label="Số CCCD/CMND"
        />
        <Button
          onClick={onSearch}
          disabled={isLoading || !cccd.trim()}
          className={`${TAILWIND_COLORS.bgPrimary} hover:bg-green-700 text-white px-8 py-2`}
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Đang tìm...
            </>
          ) : (
            <>
              <Search className="w-4 h-4 mr-2" />
              Tra cứu
            </>
          )}
        </Button>
      </div>

      <p className="text-sm text-gray-600 mt-4">
        Nhập số CCCD/CMND để tra cứu thông tin chứng chỉ đã cấp
      </p>
    </div>
  );
}
