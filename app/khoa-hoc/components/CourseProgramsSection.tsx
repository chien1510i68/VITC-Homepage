import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Calendar, Clock, Users, Star, Search, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TAILWIND_COLORS } from '@/lib/colors';
import { Program } from '@/lib/api';

interface CourseProgramsSectionProps {
  programs: Program[];
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
  onSearch: () => void;
  onSearchKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onClearFilters: () => void;
  isLoading: boolean;
  hasActiveFilters: boolean;
}

export default function CourseProgramsSection({
  programs,
  categories,
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchQueryChange,
  onSearch,
  onSearchKeyDown,
  onClearFilters,
  isLoading,
  hasActiveFilters,
}: CourseProgramsSectionProps) {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
     <h2 className="text-3xl text-center md:text-4xl font-bold text-gray-900 mb-4">
           Danh sách các khóa học
          </h2>
    
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Course Search Filter - Single Row Compact Design */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchQueryChange(e.target.value)}
                onKeyDown={onSearchKeyDown}
                placeholder="Tìm kiếm khóa học..."
                className="w-full pl-9 pr-9 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all font-inter"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchQueryChange('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category Dropdown */}
            <div className="w-48">
              <select
                value={selectedCategory}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all cursor-pointer bg-white font-inter"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Button */}
            <button
              onClick={onSearch}
              className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg transition-colors flex items-center gap-2 font-inter"
            >
              <Search className="w-4 h-4" />
              Tìm
            </button>

            {/* Results Count */}
            <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-lg">
              <BookOpen className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-900 font-inter">
                {programs.length} khóa học
              </span>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                onClick={onClearFilters}
                className="flex items-center gap-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
                <span className="font-inter">Xóa</span>
              </button>
            )}
          </div>
        </div>

        {/* Programs Grid */}
        {isLoading ? (
          <div className="py-20 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mb-4"></div>
            <p className="text-gray-600 text-lg">Đang tải khóa học...</p>
          </div>
        ) : programs.length === 0 ? (
          <div className="py-20 text-center">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">Không tìm thấy khóa học nào</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {programs.map((program) => (
              <Link key={program.id} href={`/khoa-hoc/${program.id}`}>
                <Card 
                  className="group overflow-hidden border-2 border-gray-200 hover:border-green-500 transition-all duration-300 hover:translate-y-[-4px] cursor-pointer h-full"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden bg-gray-100">
                    <Image
                      src={program.image}
                      alt={program.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {program.isHot && (
                      <div className="absolute top-4 left-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold">
                        Nổi bật
                      </div>
                    )}
                    <div className={`absolute top-4 right-4 ${TAILWIND_COLORS.bgPrimary} text-white px-3 py-1 rounded-full text-xs font-semibold`}>
                      {program.category}
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className={`text-xl mb-2 ${TAILWIND_COLORS.textPrimaryHover} transition-colors`}>
                      {program.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2 text-sm">
                      {program.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{program.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>{program.students}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>{program.sessions}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="font-semibold">{program.rating}</span>
                      </div>
                    </div>

                    {/* Price & CTA */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className={`text-xl font-bold ${TAILWIND_COLORS.textPrimary}`}>
                        {program.price}
                      </div>
                      <Button size="sm" className={`${TAILWIND_COLORS.bgPrimary} ${TAILWIND_COLORS.bgPrimaryHover}`}>
                        Chi tiết
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
