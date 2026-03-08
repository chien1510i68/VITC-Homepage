'use client';

import { useRef, useState, useEffect } from 'react';
import { useIntersectionObserver } from '@/app/shared/hooks';
import {
  SectionHeader,
  InstructorCarousel,
  AnimatedSection,
  Container
} from '../components';
// import {
//   LEADERSHIP
// } from '../constants/instructors';
import { SECTION_PADDING_LG, GRADIENT_SECONDARY } from '../constants/classNames';
import type { Instructor } from '../types';
import * as api from '@/lib/api';

export default function InstructorsSection() {
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });

  useEffect(() => {
    const loadInstructors = async () => {
      try {
        setLoading(true);
        const result = await api.getInstructors('SOFT_SKILLS');

        // Convert API instructors to local format
        const converted: Instructor[] = result.map((inst: any) => ({
          id: inst.id,
          name: inst.fullName || inst.name || inst.username,
          degree: inst.degree || 'Giảng viên',
          specialty: inst.specialty || inst.description || '',
          image: inst.avatarUrl || inst.image || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop'
        }));

        setInstructors(converted);
      } catch (error) {
        console.error('❌ Failed to load instructors:', error);
        setInstructors([]);
      } finally {
        setLoading(false);
      }
    };

    loadInstructors();
  }, []);

  return (
    <section id="instructors" ref={sectionRef} className={`${GRADIENT_SECONDARY} ${SECTION_PADDING_LG}`}>
      <Container maxWidth="7xl">

        {/* Hero Section */}
        <AnimatedSection isVisible={isVisible} className="mb-8 lg:mb-12">
          <SectionHeader
            label="Đội ngũ giảng viên"
            title={
              ""
            }
            description="Là những giảng viên giàu kinh nghiệm giảng dạy, kết hợp cùng chuyên gia doanh nghiệp, giúp sinh viên phát triển kỹ năng mềm sát thực tế và nhu cầu tuyển dụng."
            align="center"
          />
        </AnimatedSection>

        {/* Instructors Carousel */}
        <AnimatedSection isVisible={isVisible} delay={200}>
          <InstructorCarousel instructors={instructors} />
        </AnimatedSection>
      </Container>
    </section>
  );
}
