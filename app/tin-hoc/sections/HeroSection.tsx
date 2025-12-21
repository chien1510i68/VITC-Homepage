'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    image: 'https://vitc.edu.vn/image_slide/30c93369-fff9-4932-9b62-f72820d7a598',
    title: 'Nâng cao năng lực, mở rộng tương lai',
    description: 'VITC cung cấp các chương trình đào tạo chất lượng cao với mục tiêu giúp bạn nâng cao kỹ năng nghề nghiệp',
    highlight: {
      title: 'Chính sách ưu đãi hội viên',
      content: 'Nhận nhiều ưu đãi đặc biệt khi trở thành thành viên của VITC'
    }
  },
  {
    id: 2,
    image: 'https://vitc.edu.vn/image_slide/17549ace-62bb-4015-a1c0-30d4b10f375e',
    title: 'Đào tạo chuyên nghiệp, thực chiến',
    description: 'Học với đội ngũ giảng viên giàu kinh nghiệm, chương trình cập nhật theo xu hướng công nghệ mới nhất',
    highlight: {
      title: 'Cam kết đầu ra',
      content: 'Hỗ trợ việc làm và kết nối doanh nghiệp sau khóa học'
    }
  },
  {
    id: 3,
    image: 'https://vitc.edu.vn/image_slide/14b0a5de-3c48-4be0-afd3-bebd91a2e180',
    title: '',
    description: '',
    highlight: {
      title: '',
      content: ''
    }
  }
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  return (
    <section className="relative w-full h-[65vh] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover object-center"
              priority={index === 0}
              sizes="100vw"
              quality={90}
            />
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center text-white transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center text-white transition-all"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
