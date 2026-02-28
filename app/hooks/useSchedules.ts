import { useState, useEffect } from 'react';
import * as api from '@/lib/api';
import { Schedule } from '../shared/sections/ScheduleSection/types';

interface UseSchedulesOptions {
  page?: number;
  size?: number;
}

interface UseSchedulesReturn {
  schedules: Schedule[];
  isLoading: boolean;
  error: Error | null;
}

/**
 * Custom hook to fetch and manage course schedules
 * Separates data fetching logic from component
 */
export function useSchedules(options: UseSchedulesOptions = {}): UseSchedulesReturn {
  const { page = 0, size = 10 } = options;
  
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadSchedules = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const result = await api.getCourseSchedules({ page, size });
        
        // Transform API data to Schedule format
        const transformedSchedules: Schedule[] = result.data.map(schedule => ({
          id: String(schedule.id),
          className: schedule.className || schedule.courseName,
          time: schedule.schedule,
          startDate: schedule.startDate,
          location: schedule.location || 'Chưa xác định',
          subject: schedule.courseName,
          status: schedule.status || 'Sắp khai giảng'
        }));
        
        setSchedules(transformedSchedules);
      } catch (err) {
        console.error('❌ Failed to load schedules:', err);
        setError(err instanceof Error ? err : new Error('Unknown error'));
        setSchedules([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadSchedules();
  }, [page, size]);

  return { schedules, isLoading, error };
}
