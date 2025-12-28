"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';

interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

const statsData: StatItem[] = [
  {
    value: 15,
    suffix: "+",
    label: "Năm kinh nghiệm"
  },
  {
    value: 10000,
    suffix: "+",
    label: "Học viên"
  },
  {
    value: 98,
    suffix: "%",
    label: "Hài lòng"
  },
  {
    value: 100,
    suffix: "+",
    label: "Doanh nghiệp"
  }
];

function AnimatedCounter({ 
  value, 
  suffix, 
  duration = 2 
}: { 
  value: number; 
  suffix: string; 
  duration?: number; 
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { 
    duration: duration * 1000,
    bounce: 0 
  });
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-100px" 
  });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      setDisplayValue(Math.round(latest));
    });
  }, [springValue]);

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(num % 1000 === 0 ? 0 : 1) + 'k';
    }
    return num.toString();
  };

  return (
    <span ref={ref} className="tabular-nums">
      {formatNumber(displayValue)}{suffix}
    </span>
  );
}

function StatCard({ stat, index }: { stat: StatItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: "easeOut"
      }}
      className="text-center py-8 border-r border-slate-200 last:border-r-0"
    >
      {/* Counter Value */}
      <div className="mb-4">
        <div className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-green-600 via-green-700 to-emerald-800 bg-clip-text text-transparent">
          <AnimatedCounter 
            value={stat.value} 
            suffix={stat.suffix}
            duration={2.5}
          />
        </div>
      </div>

      {/* Label */}
      <p className="text-slate-600 font-medium text-lg uppercase tracking-wider">
        {stat.label}
      </p>
    </motion.div>
  );
}

export default function StatsSection() {
  const ref = useRef<HTMLElement>(null);

  return (
    <section 
      ref={ref}
      className="py-20 bg-slate-50"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Những con số nói lên tất cả
          </h2>
          
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Hơn một thập kỷ đồng hành cùng hàng nghìn học viên trên con đường chinh phục công nghệ
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4">
            {statsData.map((stat, index) => (
              <StatCard key={index} stat={stat} index={index} />
            ))}
          </div>
        </div>

        {/* Bottom Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-lg text-slate-600">
            Hãy trở thành một phần trong những con số ấn tượng này
          </p>
        </motion.div>
      </div>
    </section>
  );
}