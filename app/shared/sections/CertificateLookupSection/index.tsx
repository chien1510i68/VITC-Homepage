/**
 * CertificateLookupSection - Specialized section for certificate lookup using new API
 * @module shared/sections/CertificateLookupSection
 */

"use client";

import { motion } from 'framer-motion';
import { TAILWIND_COLORS } from '@/lib/colors';
import { ErrorMessage } from './components/ErrorMessage';
import { SearchForm } from './components/SearchForm';
import { CertificateTable } from './components/CertificateTable';
import { useCertificateLookup } from './hooks/useCertificateLookup';

interface CertificateLookupSectionProps {
  title?: string;
  subtitle?: string;
  sectionId?: string;
  badge?: string;
  contactEmail?: string;
  contactPhone?: string;
  className?: string;
  onSearch?: (cccd: string) => void;
}

/**
 * CertificateLookupSection Component
 * 
 * A section for looking up certificates using the new Spring Boot API.
 * Refactored following Single Responsibility Principle (SRP).
 * 
 * @example
 * ```tsx
 * <CertificateLookupSection 
 *   title="Tra cứu chứng chỉ"
 *   contactEmail="support@visc.edu.vn"
 * />
 * ```
 */
export default function CertificateLookupSection({
  title = "Tra cứu chứng chỉ",
  subtitle = "Nhập số CCCD/CMND để tra cứu thông tin chứng chỉ của bạn",
  sectionId = "tra-cuu-chung-chi",
  badge = "Tra cứu thông tin",
  contactEmail = "support@visc.edu.vn",
  contactPhone = "0123456789",
  className,
  onSearch,
}: CertificateLookupSectionProps) {
  const {
    cccd,
    results,
    hasSearched,
    isLoading,
    errorMessage,
    setCccd,
    setErrorMessage,
    handleSearch,
    handleReset,
  } = useCertificateLookup(onSearch);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className={`py-10 md:py-16 bg-gradient-to-b from-white to-gray-50 ${className || ''}`}
      id={sectionId}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className={`inline-block ${TAILWIND_COLORS.bgPrimary} text-white px-4 py-2 rounded-full text-sm font-semibold mb-4`}>
            {badge}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Error Message */}
        <ErrorMessage 
          message={errorMessage} 
          onDismiss={() => setErrorMessage('')} 
        />

        {/* Search Form */}
        <SearchForm 
          cccd={cccd}
          isLoading={isLoading}
          onCccdChange={setCccd}
          onSearch={handleSearch}
        />

        {/* Results Section */}
        {hasSearched && (
          <CertificateTable 
            results={results}
            cccd={cccd}
            onReset={handleReset}
          />
        )}

        {/* Help Section */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-2">
            Cần hỗ trợ? Liên hệ:
          </p>
          <div className="flex justify-center gap-4 text-sm">
            <a href={`mailto:${contactEmail}`} className={`${TAILWIND_COLORS.textPrimary} hover:underline`}>
              {contactEmail}
            </a>
            <span className="text-gray-400">|</span>
            <a href={`tel:${contactPhone}`} className={`${TAILWIND_COLORS.textPrimary} hover:underline`}>
              {contactPhone}
            </a>
          </div>
        </div>
      </div>
    </motion.section>
  );
}