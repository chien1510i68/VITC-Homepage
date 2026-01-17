'use client';

import { useState, useEffect } from 'react';
import SharedThuVienSection from '@/app/shared/sections/ThuVienSection';
import { fetchLatestDocuments, type Document } from '@/lib/api/documents';
import type { LibraryItem } from '../types';

export default function ThuVienSection() {
  const [documents, setDocuments] = useState<LibraryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDocuments = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const result = await fetchLatestDocuments(6);
        
        console.log('📚 Documents API Response:', result);
        
        if (result.success && result.data) {
          console.log('📄 Documents items:', result.data.items);
          
          // Convert API Document to LibraryItem
          const items: LibraryItem[] = result.data.items.map((doc: Document) => ({
            id: doc.id,
            title: doc.title,
            excerpt: doc.excerpt,
            image: doc.image,
            date: doc.createdAt,
            url: doc.url,
            fileUrl: doc.fileUrl,
            // Map to type if needed, or default to 'document'
            type: 'document' as const
          }));
          
          console.log('✅ Converted items:', items);
          setDocuments(items);
        } else {
          console.error('❌ API Error:', result.error);
          setError(result.error || 'Không thể tải danh sách tài liệu');
          setDocuments([]);
        }
      } catch (err) {
        console.error('❌ Error loading documents:', err);
        setError('Có lỗi xảy ra khi tải tài liệu');
        setDocuments([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadDocuments();
  }, []);

  if (isLoading) {
    return (
      <section id="resources" className="py-8 sm:py-10 md:py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl">
          <div className="text-center mb-8">
            <div className="inline-block bg-sky-100 text-sky-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Thư viện
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-4">
              Tài liệu & Thư viện
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-3xl border border-slate-100 shadow-md h-80 animate-pulse">
                <div className="h-44 bg-gray-200 rounded-t-3xl"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="resources" className="py-8 sm:py-10 md:py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl">
          <div className="text-center">
            <div className="inline-block bg-sky-100 text-sky-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Thư viện
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-4">
              Tài liệu & Thư viện
            </h2>
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-md mx-auto">
              <p className="text-red-600">{error}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <SharedThuVienSection
      id="resources"
      items={documents}
      maxItems={6}
    />
  );
}
