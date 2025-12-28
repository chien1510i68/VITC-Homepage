import { Calendar, Clock, MapPin, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TAILWIND_COLORS } from '@/lib/colors';
import { CourseSchedule } from '@/lib/api';

interface CourseScheduleSectionProps {
  schedules: CourseSchedule[];
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
  startDate: string;
  onStartDateChange: (value: string) => void;
  endDate: string;
  onEndDateChange: (value: string) => void;
  onSearch: () => void;
  onSearchKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onClearFilters: () => void;
  isLoading: boolean;
  hasActiveFilters: boolean;
}

export default function CourseScheduleSection({
  schedules,
  searchQuery,
  onSearchQueryChange,
  startDate,
  onStartDateChange,
  endDate,
  onEndDateChange,
  onSearch,
  onSearchKeyDown,
  onClearFilters,
  isLoading,
  hasActiveFilters,
}: CourseScheduleSectionProps) {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className={`inline-block ${TAILWIND_COLORS.bgPrimary} text-white px-4 py-2 rounded-full text-sm font-semibold mb-4`}>
            Lịch khai giảng
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Lịch khai giảng các khóa học
          </h2>
          <p className="text-lg md:text-xl text-green-800/70 max-w-2xl mx-auto font-inter">
            Đăng ký ngay để không bỏ lỡ cơ hội học tập
          </p>
        </div>

        {/* Search & Date Filter - Simple & Clean Design */}
        <div className="mb-8 bg-white border border-green-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search Input */}
            <div className="md:col-span-1">
              <label className="block text-sm font-semibold text-green-900 mb-2 font-inter">
                Tìm kiếm lớp học
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-600" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchQueryChange(e.target.value)}
                  onKeyDown={onSearchKeyDown}
                  placeholder="Nhập tên lớp hoặc môn học..."
                  className="w-full pl-10 pr-10 py-3 border-2 border-green-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-200 font-inter"
                />
                {searchQuery && (
                  <button
                    onClick={() => onSearchQueryChange('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Start Date */}
            <div className="md:col-span-1">
              <label className="block text-sm font-semibold text-green-900 mb-2 font-inter">
                Từ ngày
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-600" />
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => onStartDateChange(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-green-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-200 font-inter"
                />
              </div>
            </div>

            {/* End Date */}
            <div className="md:col-span-1">
              <label className="block text-sm font-semibold text-green-900 mb-2 font-inter">
                Đến ngày
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-600" />
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => onEndDateChange(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-green-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-200 font-inter"
                />
              </div>
            </div>
          </div>

          {/* Search Button & Results */}
          <div className="mt-4 pt-4 border-t border-green-100 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onSearch}
                className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg transition-colors flex items-center gap-2 font-inter"
              >
                <Search className="w-4 h-4" />
                Tìm kiếm
              </button>
              <p className="text-sm text-green-700 font-inter">
                Tìm thấy <strong className="text-green-900 font-bold">{schedules.length}</strong> lớp học
              </p>
            </div>
            
            {hasActiveFilters && (
              <button
                onClick={onClearFilters}
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-green-700 hover:text-green-900 hover:bg-green-50 rounded-lg transition-colors duration-200"
              >
                <X className="w-4 h-4" />
                <span>Xóa bộ lọc</span>
              </button>
            )}
          </div>
        </div>

        {/* Schedule Table */}
        <div className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden">
          {isLoading ? (
            <div className="p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mb-4"></div>
              <p className="text-gray-600">Đang tải lịch khai giảng...</p>
            </div>
          ) : schedules.length === 0 ? (
            <div className="p-12 text-center">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Chưa có lịch khai giảng</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={`${TAILWIND_COLORS.bgPrimary} text-white`}>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Lớp</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Thời gian</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Ngày khai giảng</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Địa điểm học</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Trạng thái</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold">Hành động</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {schedules.map((schedule) => (
                    <tr key={schedule.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-900">{schedule.className}</div>
                        <div className="text-sm text-gray-600">{schedule.courseName}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-700">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">{schedule.schedule}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-700">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm font-medium">{schedule.startDate}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-700">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">{schedule.location}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          schedule.status === 'Đang tuyển sinh' 
                            ? 'bg-green-100 text-green-800'
                            : schedule.status === 'Sắp khai giảng'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {schedule.status || 'Đang tuyển sinh'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Button 
                          size="sm" 
                          className={`${TAILWIND_COLORS.bgPrimary} ${TAILWIND_COLORS.bgPrimaryHover}`}
                        >
                          Đăng ký
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
