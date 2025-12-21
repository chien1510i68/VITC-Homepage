"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { api, AboutTimeline } from '@/lib/api';

// Full-screen Year Intro Section
const YearIntro = ({ year, isFirst = false }: { year: string; isFirst?: boolean }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      className="h-screen flex items-center justify-center sticky top-0 bg-black"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center"
      >
        {isFirst && (
          <motion.p
            className="text-green-400 text-lg md:text-xl mb-4 tracking-widest uppercase"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.2 }}
          >
            Hành trình bắt đầu
          </motion.p>
        )}
        <motion.span
          className="text-[120px] md:text-[200px] lg:text-[280px] font-black bg-gradient-to-b from-white via-white to-gray-600 bg-clip-text text-transparent leading-none"
          style={{
            fontFamily: "'Inter', sans-serif",
            letterSpacing: '-0.05em'
          }}
        >
          {year}
        </motion.span>
        {isFirst && (
          <motion.div
            className="mt-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex flex-col items-center gap-2 text-gray-400">
              <span className="text-sm tracking-wider">CUỘN ĐỂ KHÁM PHÁ</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </motion.div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

// Story Card with parallax image
const StoryCard = ({ item, index }: { item: AboutTimeline; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["50px", "-50px"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className="min-h-screen relative flex items-center py-20">
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: imageY }}
      >
        <div className="absolute inset-0">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-[120%] object-cover"
          />
          <div className={cn(
            "absolute inset-0",
            isEven
              ? "bg-gradient-to-r from-black via-black/80 to-transparent"
              : "bg-gradient-to-l from-black via-black/80 to-transparent"
          )} />
          <div className="absolute inset-0 bg-black/30" />
        </div>
      </motion.div>

      {/* Content */}
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className={cn(
          "max-w-xl",
          isEven ? "ml-0" : "ml-auto"
        )}>
          <motion.div
            style={{ y: contentY, opacity }}
            className="space-y-6"
          >
            {/* Year Badge */}
            <motion.div
              initial={{ opacity: 0, x: isEven ? -30 : 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -30 : 30 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3"
            >
              <div className="w-12 h-[2px] bg-green-400" />
              <span className="text-green-400 font-bold text-lg tracking-wider">
                {item.year || "202X"}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
            >
              {item.title}
            </motion.h3>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-300 leading-relaxed"
            >
              {item.description}
            </motion.p>

            {/* Decorative Line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="w-24 h-1 bg-gradient-to-r from-green-400 to-emerald-500 origin-left"
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-white/50"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </div>
    </div>
  );
};

// Progress Indicator
const ProgressIndicator = ({ items, currentIndex }: { items: AboutTimeline[]; currentIndex: number }) => {
  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3">
      {items.map((item, index) => (
        <div
          key={item.id}
          className={cn(
            "group flex items-center gap-3 cursor-pointer",
          )}
        >
          <span className={cn(
            "text-xs font-medium transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0",
            index === currentIndex ? "text-green-400" : "text-white/60"
          )}>
            {item.year}
          </span>
          <div className={cn(
            "w-2 h-2 rounded-full transition-all duration-300",
            index === currentIndex
              ? "bg-green-400 scale-150"
              : "bg-white/30 group-hover:bg-white/60"
          )} />
        </div>
      ))}
    </div>
  );
};

export default function AboutSection() {
  const [timelineData, setTimelineData] = useState<AboutTimeline[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Update current index based on scroll
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (value) => {
      const index = Math.floor(value * timelineData.length);
      setCurrentIndex(Math.min(index, timelineData.length - 1));
    });
    return () => unsubscribe();
  }, [scrollYProgress, timelineData.length]);

  useEffect(() => {
    const loadTimeline = async () => {
      setIsLoading(true);
      try {
        const data = await api.getAboutTimeline();
        setTimelineData(data);
      } catch (error) {
        console.error('Error loading about timeline:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTimeline();
  }, []);

  if (isLoading) {
    return (
      <section className="h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="w-12 h-12 border-2 border-green-400 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-gray-400">Đang tải hành trình...</p>
        </div>
      </section>
    );
  }

  const firstYear = timelineData[0]?.year || "2014";

  return (
    <section id="about" ref={containerRef} className="bg-black">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-green-400 origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Progress Indicator */}
      <ProgressIndicator items={timelineData} currentIndex={currentIndex} />

      {/* Opening Year */}
      <YearIntro year={firstYear} isFirst={true} />

      {/* Story Sections */}
      {timelineData.map((item, index) => (
        <StoryCard key={item.id} item={item} index={index} />
      ))}

      {/* Closing Section */}
      <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/20 rounded-full blur-[150px] animate-pulse" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center relative z-10 px-6"
        >
          <p className="text-green-400 text-lg mb-4 tracking-widest uppercase">
            Và hành trình vẫn tiếp tục
          </p>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8">
            Tương Lai
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            Hãy cùng VITC viết tiếp những trang sử mới trong hành trình chinh phục công nghệ.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-lg shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-300"
          >
            Đồng hành cùng chúng tôi →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
