/**
 * LookupSection - Reusable section for score and certificate lookup
 * @module shared/sections/LookupSection
 */

"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { api, LookupResult } from '@/lib/api';
import { LookupSectionProps, LookupType } from './types';
import { DEFAULT_PROPS } from './constants';
import { 
  LookupHeader, 
  LookupTabs, 
  LookupForm, 
  LookupResults, 
  LookupHelpSection 
} from './components';

/**
 * LookupSection Component
 * 
 * A flexible section for looking up exam scores and certificates.
 * Can be customized via props for different pages.
 * 
 * @example
 * ```tsx
 * <LookupSection 
 *   title="Tra cứu kết quả"
 *   contactEmail="tinhoc@visc.edu.vn"
 * />
 * ```
 */
export default function LookupSection({
  title = DEFAULT_PROPS.title,
  subtitle = DEFAULT_PROPS.subtitle,
  sectionId = DEFAULT_PROPS.sectionId,
  badge = DEFAULT_PROPS.badge,
  showScoreTab = DEFAULT_PROPS.showScoreTab,
  showCertificateTab = DEFAULT_PROPS.showCertificateTab,
  contactEmail = DEFAULT_PROPS.contactEmail,
  contactPhone = DEFAULT_PROPS.contactPhone,
  className,
  onSearch,
}: LookupSectionProps) {
  const [lookupType, setLookupType] = useState<LookupType>('score');
  const [cccd, setCccd] = useState('');
  const [results, setResults] = useState<LookupResult[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!cccd.trim()) return;
    
    setIsLoading(true);
    setHasSearched(false);
    
    try {
      let data: LookupResult[];
      if (lookupType === 'score') {
        // Use new API for exam results
        data = await api.lookupExamResultsByCCCD(cccd);
      } else {
        data = await api.lookupCertificate(cccd);
      }
      setResults(data);
      setHasSearched(true);
      
      // Call callback if provided
      onSearch?.(lookupType, cccd);
    } catch (error) {
      console.error('Error searching:', error);
      setResults([]);
      setHasSearched(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setCccd('');
    setResults([]);
    setHasSearched(false);
  };

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
        <LookupHeader 
          title={title}
          subtitle={subtitle}
          badge={badge}
        />

        {/* Lookup Type Tabs */}
        <LookupTabs
          lookupType={lookupType}
          setLookupType={setLookupType}
          showScoreTab={showScoreTab}
          showCertificateTab={showCertificateTab}
        />

        {/* Filter Form */}
        <LookupForm
          lookupType={lookupType}
          cccd={cccd}
          setCccd={setCccd}
          isLoading={isLoading}
          onSearch={handleSearch}
          onReset={handleReset}
        />

        {/* Results Table */}
        <LookupResults
          results={results}
          hasSearched={hasSearched}
          lookupType={lookupType}
        />

        {/* Help Section */}
        <LookupHelpSection
          contactPhone={contactPhone}
          contactEmail={contactEmail}
        />
      </div>
    </motion.section>
  );
}


   