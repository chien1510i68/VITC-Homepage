"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Users, Calendar, BookOpen, Star, CheckCircle } from 'lucide-react';
import { TAILWIND_COLORS } from '@/lib/colors';
import { api, Program } from '@/lib/api';

export default function ProgramsSection() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPrograms = async () => {
      setIsLoading(true);
      try {
        const data = await api.getPrograms();
        setPrograms(data);
        if (data.length > 0) {
          setSelectedProgram(data[0]);
        }
      } catch (error) {
        console.error('Error loading programs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPrograms();
  }, []);

  if (isLoading) {
    return (
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white" id="programs">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600">Đang tải chương trình học...</p>
        </div>
      </section>
    );
  }

  if (!selectedProgram || programs.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50" id="programs">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
         
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-4">
            Khám phá khóa học phù hợp với bạn
          </h2>
          
        </div>

        

        {/* Main Content: Left Detail + Right List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Selected Program Detail */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden border-0">
              {/* Featured Image */}
              <div className={`relative h-64 md:h-80 bg-gradient-to-br ${TAILWIND_COLORS.gradientPrimary} overflow-hidden`}>
                <Image
                  src={selectedProgram.image}
                  alt={selectedProgram.title}
                  fill
                  className="object-cover opacity-90 transition-transform duration-500 hover:scale-110"
                />
                {selectedProgram.isHot && (
                  <div className="absolute top-4 left-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                    Nổi bật
                  </div>
                )}
                <div className={`absolute top-4 right-4 ${TAILWIND_COLORS.bgPrimary} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                  {selectedProgram.category}
                </div>
              </div>

              <CardContent className="p-6 md:p-8">
                {/* Title */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`${TAILWIND_COLORS.bgPrimaryLight} ${TAILWIND_COLORS.textPrimaryDark} px-3 py-1 rounded-full text-xs font-semibold`}>
                      {selectedProgram.category}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="font-bold text-gray-900">{selectedProgram.rating}</span>
                      <span className="text-sm text-gray-500">({selectedProgram.students})</span>
                    </div>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    {selectedProgram.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {selectedProgram.description}
                  </p>
                </div>

                {/* Highlights */}
                <div className="mb-6">
                  <h4 className="font-bold text-gray-900 mb-4 text-lg">Nội dung chính</h4>
                  <div className="space-y-3">
                    {selectedProgram.highlights.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className={`w-5 h-5 ${TAILWIND_COLORS.textPrimary} flex-shrink-0 mt-0.5`} />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Instructor and Price */}
                <div className="flex items-center justify-between py-6 border-t border-gray-200">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Giảng viên</div>
                    <div className="font-semibold text-gray-900 text-lg">
                      {typeof selectedProgram.instructor === 'string' 
                        ? selectedProgram.instructor 
                        : selectedProgram.instructor.name}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500 mb-1">Học phí</div>
                    <div className={`text-2xl font-bold ${TAILWIND_COLORS.textPrimary}`}>{selectedProgram.price}</div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex gap-3">
                  <Button className={`flex-1 ${TAILWIND_COLORS.bgPrimary} ${TAILWIND_COLORS.bgPrimaryHover} text-white py-6 text-base font-semibold`}>
                    Đăng ký ngay →
                  </Button>
                  <Button variant="outline" className="px-6 py-6 text-base font-semibold border-2">
                    Chi tiết
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right: Programs List */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className={`p-4 border-b border-gray-200 bg-gradient-to-r ${TAILWIND_COLORS.gradientLight}`}>
                  <h3 className="font-bold text-gray-900 text-lg">Danh sách khóa học</h3>
                  <p className="text-sm text-gray-600 mt-1">{programs.length} khóa học</p>
                </div>
                
                {/* Scrollable List */}
                <div className="overflow-y-auto max-h-[600px] custom-scrollbar">
                  {programs.map((program) => (
                    <button
                      key={program.id}
                      onClick={() => setSelectedProgram(program)}
                      className={`w-full p-4 border-b border-gray-100 hover:bg-gray-50 transition-all text-left ${
                        selectedProgram.id === program.id ? `${TAILWIND_COLORS.bgPrimaryLightest} border-l-4 ${TAILWIND_COLORS.borderPrimary}` : ''
                      }`}
                    >
                      <div className="flex gap-3">
                        <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                          <Image
                            src={program.image}
                            alt={program.title}
                            fill
                            className="object-cover transition-transform duration-300 hover:scale-110"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h4 className="font-semibold text-gray-900 text-sm line-clamp-2">
                              {program.title}
                            </h4>
                            {program.isHot && (
                              <span className="text-xs font-semibold text-orange-500">HOT</span>
                            )}
                          </div>
                          <div className="flex items-center gap-1 mb-1">
                            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                            <span className="text-xs font-medium text-gray-700">{program.rating}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {program.students}
                            </span>
                            <span>•</span>
                            <span>{program.duration}</span>
                          </div>
                          <div className={`mt-2 font-bold ${TAILWIND_COLORS.textPrimary} text-sm`}>
                            {program.price}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* View All Button */}
                <div className="p-4 border-t border-gray-200 bg-gray-50">
                  <Button variant="link" className={`w-full ${TAILWIND_COLORS.textPrimary} font-semibold`}>
                    Xem tất cả khóa học →
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </section>
  );
}
