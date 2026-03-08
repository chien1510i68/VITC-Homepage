"use client";

import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import CourseHeroSection from './components/CourseHeroSection';
import CourseScheduleSection from './components/CourseScheduleSection';
import CourseProgramsSection from './components/CourseProgramsSection';
import { CourseRegistrationModal, useCourseRegistration } from '../components/course-registration';
import { useCoursePrograms } from './hooks/useCoursePrograms';
import { useCourseSchedules } from './hooks/useCourseSchedules';
import { CourseSchedule, Program } from '@/lib/api';

export default function KhoaHocPage() {
  // Course registration modal
  const { isOpen, selectedCourseId, openModal, closeModal } = useCourseRegistration();

  // Use custom hooks for data management
  const {
    programs,
    filteredPrograms,
    categories,
    selectedCategory,
    setSelectedCategory,
    courseSearchQuery,
    updateSearchQuery: updateProgramSearchQuery,
    submittedCourseSearch,
    isLoading: isLoadingPrograms,
    handleSearch: handleProgramSearch,
    handleSearchKeyDown: handleProgramSearchKeyDown,
    clearFilters: clearProgramFilters,
  } = useCoursePrograms();

  const {
    filteredSchedules,
    searchQuery: scheduleSearchQuery,
    updateSearchQuery: updateScheduleSearchQuery,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    submittedScheduleSearch,
    submittedStartDate,
    submittedEndDate,
    isLoading: isLoadingSchedules,
    handleSearch: handleScheduleSearch,
    handleSearchKeyDown: handleScheduleSearchKeyDown,
    clearFilters: clearScheduleFilters,
  } = useCourseSchedules();

  // Handle registration for schedule
  const handleScheduleRegister = (schedule: CourseSchedule) => {
    // Use schedule ID as courseId for modal
    openModal(schedule.id.toString());
  };

  // Handle registration for program
  const handleProgramRegister = (program: Program) => {
    // Use program ID as courseId for modal
    openModal(typeof program.id === 'string' ? program.id : String(program.id));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <CourseHeroSection programsCount={programs.length} />
        
        <CourseScheduleSection
          schedules={filteredSchedules}
          searchQuery={scheduleSearchQuery}
          onSearchQueryChange={updateScheduleSearchQuery}
          startDate={startDate}
          onStartDateChange={setStartDate}
          endDate={endDate}
          onEndDateChange={setEndDate}
          onSearch={handleScheduleSearch}
          onSearchKeyDown={handleScheduleSearchKeyDown}
          onClearFilters={clearScheduleFilters}
          isLoading={isLoadingSchedules}
          hasActiveFilters={!!(submittedScheduleSearch || submittedStartDate || submittedEndDate)}
          onRegister={handleScheduleRegister}
        />
        
        <CourseProgramsSection
          programs={filteredPrograms}
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          searchQuery={courseSearchQuery}
          onSearchQueryChange={updateProgramSearchQuery}
          onSearch={handleProgramSearch}
          onSearchKeyDown={handleProgramSearchKeyDown}
          onClearFilters={clearProgramFilters}
          isLoading={isLoadingPrograms}
          hasActiveFilters={!!(courseSearchQuery || submittedCourseSearch || selectedCategory !== 'Tất cả')}
          onRegister={handleProgramRegister}
        />
      </main>

      <Footer />
      
      {/* Course Registration Modal */}
      <CourseRegistrationModal
        isOpen={isOpen}
        onClose={closeModal}
        defaultCourseId={selectedCourseId}
      />
    </div>
  );
}
