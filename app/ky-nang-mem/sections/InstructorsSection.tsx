'use client';

import { useRef, useState, useEffect } from 'react';
import { useIntersectionObserver } from '@/app/shared/hooks';
import { 
  SectionHeader, 
  LeaderCard, 
  InstructorCarousel,
  AnimatedSection,
  Container
} from '../components';
import { 
  LEADERSHIP
} from '../constants/instructors';
import { SECTION_PADDING_LG, GRADIENT_SECONDARY, HEADING_3, TEXT_BODY, GRID_2 } from '../constants/classNames';
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
    <section ref={sectionRef} className={`${GRADIENT_SECONDARY} ${SECTION_PADDING_LG}`}>
      <Container maxWidth="7xl">
        
        {/* Hero Section */}
        <AnimatedSection isVisible={isVisible} className="mb-12 sm:mb-16 md:mb-20 lg:mb-24">
          <SectionHeader
            label="Đội ngũ giảng viên"
            title={
              <>
                Giảng viên giàu{' '}
                <span className="text-green-600">
                  kinh nghiệm
                </span>
              </>
            }
            description="Là những giảng viên giàu kinh nghiệm giảng dạy, kết hợp cùng chuyên gia doanh nghiệp, giúp sinh viên phát triển kỹ năng mềm sát thực tế và nhu cầu tuyển dụng."
            align="center"
          />
        </AnimatedSection>

        {/* Leadership Team */}
        <AnimatedSection isVisible={isVisible} delay={100} className="mb-16 sm:mb-20 md:mb-24 lg:mb-32">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h3 className={HEADING_3 + ' mb-3 sm:mb-4'}>Ban lãnh đạo</h3>
            <p className={TEXT_BODY}>
              Đội ngũ lãnh đạo giàu kinh nghiệm, tâm huyết với công tác đào tạo
            </p>
          </div>

          <div className={`${GRID_2} max-w-3xl mx-auto`}>
            {LEADERSHIP.map((leader, index) => (
              <LeaderCard key={leader.id} leader={leader} delay={200 + index * 100} />
            ))}
          </div>
        </AnimatedSection>

        {/* Instructors Carousel */}
        <AnimatedSection isVisible={isVisible} delay={200}>
          <InstructorCarousel instructors={instructors} />
          
        </AnimatedSection>
      </Container>
    </section>
  );
}
