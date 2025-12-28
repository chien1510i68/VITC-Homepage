"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { api, AboutTimeline } from '@/lib/api';

// Timeline Item Component with Hover Effect
const TimelineItem = ({ item, index, isLast }: { item: AboutTimeline; index: number; isLast: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -100 : 100 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative flex items-center py-4"
    >
      {/* Content Container */}
      <div className={cn(
        "w-full flex items-center",
        isLeft ? "justify-start" : "justify-end"
      )}>
        <div className={cn(
          "relative max-w-md group cursor-pointer",
          isLeft ? "mr-8" : "ml-8"
        )}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Compact Timeline Card */}
          <motion.div
            className="relative bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
            initial={{ height: 60 }}
            animate={{ height: isHovered ? "auto" : 60 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            whileHover={{ 
              boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
              y: -2
            }}
          >
            {/* Always Visible - Year and Title */}
            <div className="flex items-center h-15 px-4 py-3">
              <div className="flex-shrink-0">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                  {item.year || "202X"}
                </span>
              </div>
              <h3 className="ml-3 text-sm font-semibold text-gray-900 line-clamp-1 flex-1">
                {item.title}
              </h3>
              <motion.div
                animate={{ rotate: isHovered ? 90 : 0 }}
                transition={{ duration: 0.2 }}
                className="flex-shrink-0 ml-2"
              >
                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.div>
            </div>

            {/* Hover Content */}
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: isHovered ? 1 : 0,
                height: isHovered ? "auto" : 0,
              }}
              transition={{ duration: 0.3 }}
              className="border-t border-gray-100"
            >
              <div className="p-4 space-y-3">
                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.description}
                </p>
                
                {/* Image */}
                {item.image && (
                  <div className="relative rounded-lg overflow-hidden aspect-video">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="w-12 h-1 bg-emerald-500 rounded-full"
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Connection to timeline */}
          <div className={cn(
            "absolute top-1/2 w-4 h-0.5 bg-emerald-300 -translate-y-1/2",
            isLeft ? "-right-12" : "-left-12"
          )} />
        </div>
      </div>

      {/* Timeline Dot */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <motion.div
          className="w-3 h-3 rounded-full bg-emerald-500 border-2 border-white shadow-lg"
          whileHover={{ scale: 1.5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {/* Pulse effect on hover */}
          <motion.div
            className="absolute inset-0 rounded-full bg-emerald-500"
            animate={{
              scale: isHovered ? [1, 2, 2.5] : 1,
              opacity: isHovered ? [0.7, 0.3, 0] : 0,
            }}
            transition={{ duration: 1, repeat: isHovered ? Infinity : 0 }}
          />
        </motion.div>
      </div>

      {/* Vertical Line */}
      {!isLast && (
        <div className="absolute left-1/2 top-8 w-0.5 h-8 bg-gradient-to-b from-emerald-200 to-emerald-100 -translate-x-0.5" />
      )}
    </motion.div>
  );
};

export default function AboutSection() {
  const [timelineData, setTimelineData] = useState<AboutTimeline[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
      <section className="py-12 bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full mx-auto mb-3"
          />
          <p className="text-gray-600 text-sm">Đang tải...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compact Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Hành trình
            <span className="text-emerald-600"> VITC</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Những mốc quan trọng trong quá trình phát triển của chúng tôi
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </motion.div>

        {/* Compact Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Central Timeline Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-200 via-emerald-300 to-emerald-200 -translate-x-0.5" />
          
          {/* Timeline Items */}
          <div className="space-y-6">
            {timelineData.map((item, index) => (
              <TimelineItem
                key={item.id}
                item={item}
                index={index}
                isLast={index === timelineData.length - 1}
              />
            ))}
          </div>
        </div>

        {/* Compact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-12 pt-8 border-t border-gray-200"
        >
          <p className="text-gray-600 mb-4">
            Hãy trở thành một phần trong hành trình tiếp theo
          </p>
          <motion.button
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 10px 30px rgba(16, 185, 129, 0.2)"
            }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg"
          >
            Khám phá khóa học
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
