'use client';

import { useRef } from 'react';
import Link from 'next/link';
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
  EmptyState,
  Button
} from '../components';
import { SAMPLE_NEWS } from '../constants/news';
import { SECTION_PADDING_LG, TEXT_MUTED, TEXT_BODY } from '../constants/classNames';
import { formatDate } from '../utils/formatters';

export default function NewsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });

  if (SAMPLE_NEWS.length === 0) {
    return (
      <section ref={sectionRef} className={SECTION_PADDING_LG}>
        <Container>
          <EmptyState
            title="Không có tin tức"
            description="Không thể tải danh sách tin tức. Vui lòng thử lại sau."
          />
        </Container>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className={SECTION_PADDING_LG} aria-labelledby="news-heading">
      <Container>
        <AnimatedSection isVisible={isVisible} className="mb-12">
          <SectionHeader
            label="Tin tức"
            title="Tin tức — Thông báo"
            description="Danh sách sinh viên đủ điều kiện cấp chứng chỉ và các thông báo liên quan"
            align="center"
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
          {/* Left: Main News (70%) */}
          <div className="lg:col-span-7 space-y-4">
            {SAMPLE_NEWS.slice(0, 4).map((item, idx) => (
              <AnimatedSection key={item.id} isVisible={isVisible} delay={idx * 100}>
                <Card hover className="flex flex-col sm:flex-row overflow-hidden">
                  <div className="relative w-full sm:w-44 h-44 sm:h-auto flex-shrink-0">
                    <ImageWithFallback
                      src={item.image || ''}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-5 flex-1 flex flex-col">
                    <CardHeader>
                      <h4 className="text-lg font-bold text-slate-900 line-clamp-2">
                        <a href={item.url} target="_blank" rel="noreferrer" className="hover:text-sky-600">
                          {item.title}
                        </a>
                      </h4>
                    </CardHeader>

                    {item.excerpt && (
                      <CardBody>
                        <p className={`${TEXT_BODY} line-clamp-3`}>{item.excerpt}</p>
                      </CardBody>
                    )}

                    <CardFooter className="mt-auto flex items-center justify-between">
                      <span className={TEXT_MUTED}>{formatDate(item.date || '')}</span>
                      <Link href={`/tin-tuc-thong-bao/${item.id || item.slug}`}>
                        <Button variant="ghost" size="sm">
                          Xem chi tiết
                        </Button>
                      </Link>
                    </CardFooter>
                  </div>
                </Card>
              </AnimatedSection>
            ))}

            <div className="mt-6 text-center sm:text-left">
              <Link 
                href="https://trungtamkynangmem.vnua.edu.vn/category/danh-sach-sinh-vien-du-dieu-kien-cap-chung-chi/" 
                className="text-sm font-medium text-slate-700 hover:text-sky-600"
              >
                Xem thêm tin khác →
              </Link>
            </div>
          </div>

          {/* Right: Most Read (30%) */}
          <aside className="lg:col-span-3">
            <AnimatedSection isVisible={isVisible} delay={200}>
              <Card>
                <CardHeader>
                  <h5 className="text-sm font-semibold text-slate-900">Tin đọc nhiều</h5>
                </CardHeader>
                <CardBody className="space-y-3">
                  {SAMPLE_NEWS.slice(4, 9).map((item, idx) => (
                    <AnimatedSection key={item.id} isVisible={isVisible} delay={300 + idx * 80}>
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                          <ImageWithFallback
                            src={item.image || ''}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1">
                          <a 
                            href={item.url} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="text-sm font-medium text-slate-900 hover:text-sky-600 line-clamp-2"
                          >
                            {item.title}
                          </a>
                          <div className={`${TEXT_MUTED} mt-1`}>{formatDate(item.date || '')}</div>
                        </div>
                      </div>
                    </AnimatedSection>
                  ))}
                </CardBody>
                <CardFooter>
                  <Link 
                    href="https://trungtamkynangmem.vnua.edu.vn/category/danh-sach-sinh-vien-du-dieu-kien-cap-chung-chi/" 
                    className="text-sm font-medium text-sky-600 hover:underline w-full text-center block"
                  >
                    Xem tất cả
                  </Link>
                </CardFooter>
              </Card>
            </AnimatedSection>
          </aside>
        </div>
      </Container>
    </section>
  );
}
