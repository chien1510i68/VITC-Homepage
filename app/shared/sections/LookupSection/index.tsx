/**
 * LookupSection - Reusable section for score and certificate lookup
 * @module shared/sections/LookupSection
 */

"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { api, LookupResult } from '@/lib/api';
import { LookupSectionProps, LookupType, CertificateType } from './types';
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
  const [certificateType, setCertificateType] = useState<CertificateType>('all');
  const [results, setResults] = useState<LookupResult[]>([]);
  const [allResults, setAllResults] = useState<LookupResult[]>([]); // Store all results for filtering
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Debug: Monitor state changes to ensure UI updates correctly
  useEffect(() => {
    console.log(`📊 State update: lookupType=${lookupType}, hasSearched=${hasSearched}, results.length=${results.length}`);
  }, [lookupType, hasSearched, results.length]);

  // Filter results when certificate type changes
  useEffect(() => {
    if (allResults.length > 0 && lookupType === 'certificate') {
      const filtered = certificateType === 'all' 
        ? allResults 
        : allResults.filter(result => result.certificateType === certificateType);
      setResults(filtered);
    }
  }, [certificateType, allResults, lookupType]);

  // Handle tab change and clear previous results
  const handleTabChange = (newLookupType: LookupType) => {
    // Only clear if actually switching to different tab
    if (newLookupType !== lookupType) {
      console.log(`🔄 Switching from ${lookupType} to ${newLookupType} - clearing results`);
      
      // Clear all states immediately to hide results table
      setResults([]);
      setAllResults([]);
      setHasSearched(false);
      setCccd('');
      setCertificateType('all'); // Reset certificate type
      
      // Then update the lookup type
      setLookupType(newLookupType);
      
      console.log(`✅ Tab switched to ${newLookupType} - UI should be cleared`);
    }
  };

  const handleSearch = async () => {
    if (!cccd.trim()) return;
    
    setIsLoading(true);
    setHasSearched(false);
    
    try {
      let data: LookupResult[];
      if (lookupType === 'score') {
        // Use new API for exam results
        data = await api.lookupExamResultsByCCCD(cccd);
        setResults(data);
        setAllResults(data);
      } else {
        // Certificate lookup - get all results and filter
        data = await api.lookupCertificate(cccd);
        setAllResults(data); // Store all results for filtering
        
        // Filter immediately based on selected certificate type
        const filtered = certificateType === 'all' 
          ? data 
          : data.filter(result => result.certificateType === certificateType);
        setResults(filtered);
      }
      setHasSearched(true);
      
      // Call callback if provided
      onSearch?.(lookupType, cccd);
    } catch (error) {
      console.error('Error searching:', error);
      setResults([]);
      setAllResults([]);
      setHasSearched(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setCccd('');
    setResults([]);
    setAllResults([]);
    setHasSearched(false);
    setCertificateType('all');
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
          setLookupType={handleTabChange}
          showScoreTab={showScoreTab}
          showCertificateTab={showCertificateTab}
        />

        {/* Filter Form */}
        <LookupForm
          lookupType={lookupType}
          cccd={cccd}
          setCccd={setCccd}
          certificateType={certificateType}
          setCertificateType={setCertificateType}
          isLoading={isLoading}
          onSearch={handleSearch}
          onReset={handleReset}
        />

        {/* Results Table */}
        <LookupResults
          results={results}
          hasSearched={hasSearched}
          lookupType={lookupType}
          certificateType={certificateType}
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


   