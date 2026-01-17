'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';
import { fetchDocuments, Document } from '@/lib/api/documents';

const ITEMS_PER_PAGE = 21;

type DocumentType = 'ALL' | 'SOFT_SKILLS' | 'IT_SKILLS';

const TYPE_OPTIONS = [
  { value: 'ALL' as DocumentType, label: 'Tất cả' },
  { value: 'SOFT_SKILLS' as DocumentType, label: 'Kỹ năng mềm' },
  { value: 'IT_SKILLS' as DocumentType, label: 'Tin học' },
];

export default function LibraryPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedType, setSelectedType] = useState<DocumentType>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  // Fetch documents when page or type changes
  useEffect(() => {
    async function loadDocuments() {
      setLoading(true);
      setError(null);

      try {
        const filterRequest: any = {
          page: currentPage,
          size: ITEMS_PER_PAGE,
        };

        // Add type filter only if not ALL
        if (selectedType !== 'ALL') {
          filterRequest.type = selectedType;
        }

        const response = await fetchDocuments(filterRequest);

        if (response.success && response.data) {
          setDocuments(response.data.items || []);
          setTotal(response.data.total || 0);
        } else {
          setError(response.error || 'Không thể tải dữ liệu');
        }
      } catch (err) {
        setError('Đã xảy ra lỗi khi tải dữ liệu');
      } finally {
        setLoading(false);
      }
    }

    loadDocuments();
  }, [currentPage, selectedType]);

  // Handle type filter change
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(e.target.value as DocumentType);
    setCurrentPage(0); // Reset to first page when filter changes
  };

  // Handle search
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Filter documents by search query (client-side)
  const filteredDocuments = searchQuery
    ? documents.filter((doc) =>
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (doc.excerpt && doc.excerpt.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : documents;

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-gradient-to-br from-gray-50 to-green-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Page Header */}
          <div className="text-center mb-10">
         
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Tài liệu & Thư viện
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Tổng hợp tài liệu, slide, và video hỗ trợ học tập
            </p>
          </div>

          {/* Filter Section */}
          <div className="mb-8 bg-white rounded-2xl shadow-md p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Search Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Tìm kiếm tài liệu..."
                  className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Type Dropdown */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                </div>
                <select
                  value={selectedType}
                  onChange={handleTypeChange}
                  className="w-full pl-11 pr-10 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all appearance-none bg-white cursor-pointer"
                >
                  {TYPE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Results count */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-600">
                Tìm thấy <span className="font-semibold text-gray-900">{searchQuery ? filteredDocuments.length : total}</span> tài liệu
                {searchQuery && <span className="text-gray-400 ml-1">(đang lọc)</span>}
              </p>
            </div>
          </div>

          {/* Content */}
          {loading ? (
            <LoadingSkeleton />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : filteredDocuments.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              {/* Documents Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {filteredDocuments.map((doc) => (
                  <DocumentCard key={doc.id} document={doc} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

// Document Card Component
function DocumentCard({ document }: { document: Document }) {
  const [imageError, setImageError] = useState(false);
  const imageSrc = imageError || !document.image 
    ? '/images/thu-vien/document-image.avif' 
    : document.image;

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col overflow-hidden">
      <a href={document.url} target="_blank" rel="noreferrer" className="block">
        <div className="relative h-48 bg-gray-100 overflow-hidden">
          <Image
            src={imageSrc}
            alt={document.title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            onError={() => setImageError(true)}
          />
        </div>
      </a>

      <div className="p-5 flex-1 flex flex-col">
        <div className="mb-3">
          <a 
            href={document.url} 
            target="_blank" 
            rel="noreferrer" 
            className="text-lg font-semibold text-gray-900 hover:text-green-600 line-clamp-2 transition-colors"
          >
            {document.title}
          </a>
        </div>

        {document.excerpt && (
          <div className="flex-1 mb-3">
            <p className="text-gray-600 text-sm line-clamp-3">{document.excerpt}</p>
          </div>
        )}

        <div className="flex items-center justify-between gap-2 mt-auto pt-4 border-t border-gray-100">
          <span className="text-gray-500 text-sm">{formatDate(document.createdAt)}</span>
          {document.fileUrl && (
            <a 
              href={document.fileUrl} 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-green-600 hover:text-green-700 font-medium text-sm transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Tải xuống
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// Pagination Component
function Pagination({ currentPage, totalPages, onPageChange }: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 0; i < totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage < 3) {
        pages.push(0, 1, 2, 3, '...', totalPages - 1);
      } else if (currentPage > totalPages - 4) {
        pages.push(0, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1);
      } else {
        pages.push(0, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages - 1);
      }
    }

    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-2">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
        className={`px-4 py-2 rounded-lg font-medium transition-all ${
          currentPage === 0
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-white text-gray-700 hover:bg-green-50 hover:text-green-600 border border-gray-200'
        }`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Page Numbers */}
      {getPageNumbers().map((page, index) => (
        typeof page === 'number' ? (
          <button
            key={index}
            onClick={() => onPageChange(page)}
            className={`w-10 h-10 rounded-lg font-medium transition-all ${
              currentPage === page
                ? 'bg-green-600 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-green-50 hover:text-green-600 border border-gray-200'
            }`}
          >
            {page + 1}
          </button>
        ) : (
          <span key={index} className="px-2 text-gray-400">...</span>
        )
      ))}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
        className={`px-4 py-2 rounded-lg font-medium transition-all ${
          currentPage === totalPages - 1
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-white text-gray-700 hover:bg-green-50 hover:text-green-600 border border-gray-200'
        }`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}

// Loading Skeleton
function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-md overflow-hidden animate-pulse">
          <div className="h-48 bg-gray-200" />
          <div className="p-5">
            <div className="h-6 bg-gray-200 rounded mb-3 w-3/4" />
            <div className="h-4 bg-gray-200 rounded mb-2" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
          </div>
        </div>
      ))}
    </div>
  );
}

// Error Message
function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">Đã xảy ra lỗi</h3>
      <p className="text-gray-600">{message}</p>
    </div>
  );
}

// Empty State
function EmptyState() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6">
        <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <h3 className="text-2xl font-semibold text-gray-900 mb-3">Không tìm thấy tài liệu</h3>
      <p className="text-gray-600 mb-6">Hiện chưa có tài liệu nào trong danh mục này</p>
    </div>
  );
}
