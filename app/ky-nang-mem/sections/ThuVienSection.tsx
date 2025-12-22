'use client';

import { useRef } from 'react';
import { useIntersectionObserver } from '../hooks';
import { 
  SectionHeader, 
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  AnimatedSection,
  Container,
  ImageWithFallback,
  Badge,
  Button
} from '../components';
import { SAMPLE_LIBRARY } from '../constants/library';
import { SECTION_PADDING, GRID_3, TEXT_BODY, TEXT_MUTED } from '../constants/classNames';
import { formatDate } from '../utils/formatters';

const TYPE_LABELS = {
  document: 'Tài liệu',
  slide: 'Slide',
  video: 'Video'
} as const;

const TYPE_COLORS = {
  document: 'bg-sky-100 text-sky-700',
  slide: 'bg-emerald-100 text-emerald-700',
  video: 'bg-violet-100 text-violet-700'
} as const;

export default function ThuVienSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });
  const items = SAMPLE_LIBRARY.slice(0, 6);

  return (
    <section ref={sectionRef} className={SECTION_PADDING}>
      <Container>
        <AnimatedSection isVisible={isVisible} className="mb-12">
          <SectionHeader
            label="Thư viện"
            title="Tài liệu & Thư viện"
            description="Tổng hợp tài liệu, slide, và video hỗ trợ học tập kỹ năng mềm"
            align="center"
          />
        </AnimatedSection>

        <div className={GRID_3}>
          {items.map((item, idx) => (
            <AnimatedSection key={item.id} isVisible={isVisible} delay={idx * 100}>
              <Card hover className="h-full flex flex-col">
                <a href={item.url} target="_blank" rel="noreferrer" className="block">
                  <div className="relative h-44 bg-slate-100 overflow-hidden">
                    <ImageWithFallback
                      src={item.image || ''}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    {item.type && (
                      <div className="absolute top-3 right-3">
                        <Badge className={TYPE_COLORS[item.type]}>
                          {TYPE_LABELS[item.type]}
                        </Badge>
                      </div>
                    )}
                  </div>
                </a>

                <div className="p-4 flex-1 flex flex-col">
                  <CardHeader>
                    <a 
                      href={item.url} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="text-lg font-semibold text-slate-900 hover:text-sky-600 line-clamp-2"
                    >
                      {item.title}
                    </a>
                  </CardHeader>

                  {item.excerpt && (
                    <CardBody className="flex-1">
                      <p className={`${TEXT_BODY} line-clamp-3`}>{item.excerpt}</p>
                    </CardBody>
                  )}

                  <CardFooter className="flex items-center justify-between">
                    <span className={TEXT_MUTED}>{formatDate(item.date || '')}</span>
                    {item.fileUrl ? (
                      <a 
                        href={item.fileUrl} 
                        target="_blank" 
                        rel="noreferrer"
                      >
                        <Button variant="ghost" size="sm">
                          Tải xuống
                        </Button>
                      </a>
                    ) : (
                      <a 
                        href={item.url} 
                        target="_blank" 
                        rel="noreferrer"
                      >
                        <Button variant="ghost" size="sm">
                          Xem chi tiết
                        </Button>
                      </a>
                    )}
                  </CardFooter>
                </div>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </section>
  );
}
