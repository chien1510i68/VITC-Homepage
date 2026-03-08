'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchLatestDocuments, type Document } from '@/lib/api/documents';
import { getSafeImageUrl, getFallbackImage } from '../utils/imageUtils';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { Calendar, Download, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LibraryItem {
  id: string | number;
  title: string;
  excerpt?: string;
  image?: string;
  date?: string;
  url?: string;
  fileUrl?: string;
  type: 'document' | 'slide' | 'video';
}

function DocumentCard({ item }: { item: LibraryItem }) {
  return (
    <article className="group bg-white rounded-2xl border border-slate-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden flex flex-col h-full">
      <div className="relative h-40 sm:h-44 lg:h-36 w-full bg-slate-50">
        <ImageWithFallback
          src={getSafeImageUrl(item.image, 'document')}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          fallbackSrc={getFallbackImage('document')}
        />
        <div className="absolute top-3 right-3">
          <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/90 text-green-600 shadow-sm">
            {item.type === 'slide' ? 'Slide' : item.type === 'video' ? 'Video' : 'Tài liệu'}
          </span>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h4 className="text-sm font-bold text-slate-900 line-clamp-2 group-hover:text-green-600 transition-colors">
          {item.title}
        </h4>

        {item.excerpt && (
          <p className="mt-2 text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {item.excerpt}
          </p>
        )}

        <div className="mt-auto pt-4 flex items-center justify-between gap-2">
          <div className="flex items-center text-[10px] text-slate-400 font-medium">
            <Calendar className="w-3 h-3 mr-1" />
            {item.date ? new Date(item.date).toLocaleDateString('vi-VN') : 'Mới cập nhật'}
          </div>

          <div className="flex items-center gap-1">
            {item.url && (
              <a href={item.url} target="_blank" rel="noreferrer">
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0 rounded-full text-slate-400 hover:text-green-600 hover:bg-green-50">
                  <Eye className="w-4 h-4" />
                </Button>
              </a>
            )}
            {item.fileUrl && (
              <a href={item.fileUrl} target="_blank" rel="noreferrer">
                <Button size="sm" variant="outline" className="h-8 px-3 rounded-full text-xs font-semibold border-slate-200 text-slate-600 hover:bg-green-600 hover:text-white hover:border-green-600 transition-all">
                  <Download className="w-3.5 h-3.5 mr-1" />
                  Tải
                </Button>
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function ThuVienSection() {
  const [documents, setDocuments] = useState<LibraryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDocuments = async () => {
      try {
        setIsLoading(true);
        const result = await fetchLatestDocuments(4); // Lấy 4 item cho 1 hàng

        if (result.success && result.data) {
          const items: LibraryItem[] = result.data.items.map((doc: Document) => ({
            id: doc.id,
            title: doc.title,
            excerpt: doc.excerpt,
            image: doc.image,
            date: doc.createdAt,
            url: doc.url,
            fileUrl: doc.fileUrl,
            type: 'document'
          }));
          setDocuments(items);
        }
      } catch (err) {
        console.error('❌ Error loading documents:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadDocuments();
  }, []);

  return (
    <section id="resources" className="py-6 lg:py-12 bg-white">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-10">
          <h3 className="text-2xl font-bold text-slate-900">Thư viện tài liệu</h3>
          <p className="mt-2 text-sm text-slate-500 max-w-2xl mx-auto">
            Tổng hợp tài liệu, bài giảng và video hỗ trợ rèn luyện kỹ năng mềm
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-slate-50 rounded-2xl h-64 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {documents.slice(0, 4).map((item) => (
                <DocumentCard key={item.id} item={item} />
              ))}
            </div>

            {/* View All Button */}
            <div className="mt-12 text-center">
              <Link
                href="/tien-ich-dich-vu#tai-lieu"
                className="inline-flex items-center gap-2 px-8 py-2.5 bg-white border border-slate-200 text-slate-700 font-medium text-sm rounded-full hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
              >
                <span>Xem tất cả tài liệu</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
