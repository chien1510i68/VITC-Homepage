import { useState, useEffect, useMemo, useCallback, startTransition } from 'react';
import { api, CourseSchedule } from '@/lib/api';

export function useCourseSchedules() {
  const [schedules, setSchedules] = useState<CourseSchedule[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [submittedScheduleSearch, setSubmittedScheduleSearch] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [submittedStartDate, setSubmittedStartDate] = useState('');
  const [submittedEndDate, setSubmittedEndDate] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Load schedules
  useEffect(() => {
    const loadSchedules = async () => {
      setIsLoading(true);
      try {
        const schedulesData = await api.getCourseSchedules();
        setSchedules(schedulesData);
      } catch (error) {
        console.error('Error loading schedules:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSchedules();
  }, []);

  // Filter schedules
  const filteredSchedules = useMemo(() => {
    return schedules.filter(schedule => {
      const matchesSearch = submittedScheduleSearch === '' || 
        schedule.className.toLowerCase().includes(submittedScheduleSearch.toLowerCase());
      
      const matchesDateRange = (!submittedStartDate || new Date(schedule.startDate) >= new Date(submittedStartDate)) &&
                               (!submittedEndDate || new Date(schedule.startDate) <= new Date(submittedEndDate));
      
      return matchesSearch && matchesDateRange;
    });
  }, [schedules, submittedScheduleSearch, submittedStartDate, submittedEndDate]);

  // Search handlers
  const handleSearch = useCallback(() => {
    setSubmittedScheduleSearch(searchQuery);
    setSubmittedStartDate(startDate);
    setSubmittedEndDate(endDate);
  }, [searchQuery, startDate, endDate]);

  const handleSearchKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }, [handleSearch]);

  const updateSearchQuery = useCallback((value: string) => {
    startTransition(() => {
      setSearchQuery(value);
    });
  }, []);

  const clearFilters = useCallback(() => {
    setSearchQuery('');
    setStartDate('');
    setEndDate('');
    setSubmittedScheduleSearch('');
    setSubmittedStartDate('');
    setSubmittedEndDate('');
  }, []);

  return {
    schedules,
    filteredSchedules,
    searchQuery,
    updateSearchQuery,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    submittedScheduleSearch,
    submittedStartDate,
    submittedEndDate,
    isLoading,
    handleSearch,
    handleSearchKeyDown,
    clearFilters,
  };
}
