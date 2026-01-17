import { useState, useEffect, useMemo, useCallback, startTransition } from 'react';
import { api, Program } from '@/lib/api';

export function useCoursePrograms() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [courseSearchQuery, setCourseSearchQuery] = useState('');
  const [submittedCourseSearch, setSubmittedCourseSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Load programs
  useEffect(() => {
    const loadPrograms = async () => {
      setIsLoading(true);
      try {
        const programsData = await api.getCourses(0, 30);
        setPrograms(programsData);
      } catch (error) {
        console.error('Error loading programs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPrograms();
  }, []);

  // Fixed categories - không gọi API
  const categories = useMemo(() => {
    return ['Tất cả', 'Tin học', 'Kỹ năng mềm'];
  }, []);

  // Filter programs
  const filteredPrograms = useMemo(() => {
    return programs.filter(program => {
      // Map category names to type
      let matchesCategory = true;
      if (selectedCategory === 'Tin học') {
        matchesCategory = program.type === 'IT';
      } else if (selectedCategory === 'Kỹ năng mềm') {
        matchesCategory = program.type === 'SOFT_SKILLS';
      } else if (selectedCategory !== 'Tất cả') {
        matchesCategory = program.category === selectedCategory;
      }
      
      const matchesSearch = submittedCourseSearch === '' || 
        program.title.toLowerCase().includes(submittedCourseSearch.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
  }, [programs, selectedCategory, submittedCourseSearch]);

  // Search handlers
  const handleSearch = useCallback(() => {
    setSubmittedCourseSearch(courseSearchQuery);
  }, [courseSearchQuery]);

  const handleSearchKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }, [handleSearch]);

  const updateSearchQuery = useCallback((value: string) => {
    startTransition(() => {
      setCourseSearchQuery(value);
    });
  }, []);

  const clearFilters = useCallback(() => {
    setCourseSearchQuery('');
    setSubmittedCourseSearch('');
    setSelectedCategory('Tất cả');
  }, []);

  return {
    programs,
    filteredPrograms,
    categories,
    selectedCategory,
    setSelectedCategory,
    courseSearchQuery,
    updateSearchQuery,
    submittedCourseSearch,
    isLoading,
    handleSearch,
    handleSearchKeyDown,
    clearFilters,
  };
}
