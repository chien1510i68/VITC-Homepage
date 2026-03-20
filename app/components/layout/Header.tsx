'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { TAILWIND_COLORS } from '@/lib/colors';
import { getCourseSchedules, api } from '@/lib/api';
import type { CourseSchedule, CourseBasicInfo } from '@/lib/api/types';
import { MegaMenu } from './MegaMenu';
import SoftSkillsMenu from './SoftSkillsMenu';
import IntroMenu from './IntroMenu';
import LookupMenu from './LookupMenu';
import { useRef } from 'react';
import { getCoursesFromCache, saveCoursesToCache } from '@/lib/cache/coursesCache';
import { motion } from 'framer-motion';
import { CourseRegistrationModal, useCourseRegistration } from '../course-registration';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [showSoftSkillsMenu, setShowSoftSkillsMenu] = useState(false);
  const [showIntroMenu, setShowIntroMenu] = useState(false);
  const [showLookupMenu, setShowLookupMenu] = useState(false);
  const [isSoftSkillsMounted, setIsSoftSkillsMounted] = useState(false);
  const [isIntroMounted, setIsIntroMounted] = useState(false);
  const [isLookupMounted, setIsLookupMounted] = useState(false);
  const { 
    isOpen: isRegistrationOpen, 
    openModal: openRegistrationModal, 
    closeModal: closeRegistrationModal 
  } = useCourseRegistration();

  const [courses, setCourses] = useState<CourseSchedule[]>([]);
  const [coursesBasicInfo, setCoursesBasicInfo] = useState<CourseBasicInfo[]>([]);
  const pathname = usePathname();
  const currentPath = pathname ?? '/';

  // Keep submenu mounted for animation when closing
  useEffect(() => {
    let t: any;
    if (showSoftSkillsMenu && !isSoftSkillsMounted) {
      setIsSoftSkillsMounted(true);
    }
    if (!showSoftSkillsMenu && isSoftSkillsMounted) {
      t = setTimeout(() => setIsSoftSkillsMounted(false), 340);
    }
    return () => clearTimeout(t);
  }, [showSoftSkillsMenu, isSoftSkillsMounted]);

  useEffect(() => {
    let t: any;
    if (showIntroMenu && !isIntroMounted) {
      setIsIntroMounted(true);
    }
    if (!showIntroMenu && isIntroMounted) {
      t = setTimeout(() => setIsIntroMounted(false), 340);
    }
    return () => clearTimeout(t);
  }, [showIntroMenu, isIntroMounted]);

  useEffect(() => {
    let t: any;
    if (showLookupMenu && !isLookupMounted) {
      setIsLookupMounted(true);
    }
    if (!showLookupMenu && isLookupMounted) {
      t = setTimeout(() => setIsLookupMounted(false), 340);
    }
    return () => clearTimeout(t);
  }, [showLookupMenu, isLookupMounted]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const result = await getCourseSchedules();
        setCourses(result.data);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      }
    };

    const loadCoursesBasicInfo = async () => {
      const cached = getCoursesFromCache();
      if (cached) {
        setCoursesBasicInfo(cached);
        return;
      }

      try {
        const data = await api.getCoursesBasicInfo();
        setCoursesBasicInfo(data);
        saveCoursesToCache(data);
      } catch (error) {
        console.error('Failed to fetch courses basic info:', error);
      }
    };

    fetchCourses();
    loadCoursesBasicInfo();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
        setIsMenuOpen(false);
        setShowMegaMenu(false);
        setShowSoftSkillsMenu(false);
        setShowIntroMenu(false);
        setShowLookupMenu(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const navItems = [
    { name: 'Trang chủ', href: '/' },
    { name: 'VNUA', href: 'https://vnua.edu.vn' },
    { name: 'Giới thiệu', href: '/gioi-thieu', hasIntroMenu: true },
    { name: 'Tin học', href: '/tin-hoc', hasMegaMenu: true },
    { name: 'Kỹ năng mềm', href: '/ky-nang-mem', hasSoftSkillsMenu: true },
    { name: 'Tra cứu', href: '/tien-ich-dich-vu', hasLookupMenu: true },
    { name: 'Đăng nhập', href: '#login' },
  ];

  return (
    <>
      {/* Top Banner */}
      <div className="bg-[#07314e] relative font-roboto">
        <div className="w-full px-4 py-2 md:py-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex-shrink-0 w-20 sm:w-32 md:w-44 lg:w-52 flex justify-end items-center">
              <Image
                src="/images/hvnn-logo.png"
                alt="HVNN Logo"
                width={50}
                height={50}
                className="w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 object-contain"
              />
            </div>

            <div className="flex-1 text-center px-2">
              <h1 className="text-white font-bold text-[14px] sm:text-xl md:text-2xl lg:text-3xl tracking-tight sm:tracking-wide leading-normal mb-0 sm:mb-1 uppercase">
                HỌC VIỆN NÔNG NGHIỆP VIỆT NAM
              </h1>
              <h2 className="text-white font-medium sm:font-semibold text-[11px] sm:text-base md:text-lg lg:text-xl tracking-tight sm:tracking-wider leading-normal uppercase">
                TRUNG TÂM TIN HỌC VÀ KỸ NĂNG MỀM VNUA
              </h2>
            </div>

            <div className="flex-shrink-0 w-20 sm:w-32 md:w-44 lg:w-52 flex justify-start items-center">
              <Image
                src="/images/logo.png"
                alt="CSST Logo"
                width={50}
                height={50}
                className="w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 object-contain"
              />
            </div>
          </div>
        </div>
        <div className="h-1 bg-gradient-to-r from-yellow-400 via-green-500 to-yellow-400"></div>
      </div>

      {/* Main Header */}
      <header className={`bg-white border-b border-gray-200 sticky top-0 z-50 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-12 md:h-16">
            <nav className="hidden md:flex items-center space-x-8 h-full">
              {navItems.map((item) => {
                const isActive = currentPath === item.href ||
                  (item.href !== '/' && currentPath.startsWith(item.href));

                if (item.hasMegaMenu) {
                  return (
                    <div
                      key={item.name}
                      className="relative h-full flex items-center"
                      onMouseEnter={() => setShowMegaMenu(true)}
                      onMouseLeave={() => setShowMegaMenu(false)}
                    >
                      <Link
                        href={item.href}
                        className={`text-sm font-medium transition-colors relative flex items-center gap-1 h-full px-2 group ${isActive || showMegaMenu
                          ? `${TAILWIND_COLORS.textPrimary}`
                          : 'text-gray-700 hover:text-green-600'
                          }`}
                      >
                        <span className="relative z-10 transition-transform duration-300 group-hover:-translate-y-0.5">
                          {item.name}
                        </span>
                        <svg
                          className={`w-4 h-4 transition-transform duration-300 ${showMegaMenu ? 'rotate-180' : ''
                            } group-hover:-translate-y-0.5`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                        <motion.span
                          className={`absolute bottom-0 left-0 right-0 h-0.5 ${TAILWIND_COLORS.bgPrimary}`}
                          initial={false}
                          animate={{ scaleX: (isActive || showMegaMenu) ? 1 : 0 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                        />
                        <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${TAILWIND_COLORS.bgPrimary} scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />
                      </Link>
                    </div>
                  );
                }
                if (item.hasIntroMenu) {
                  return (
                    <div
                      key={item.name}
                      className="relative h-full flex items-center"
                      onMouseEnter={() => {
                        setShowIntroMenu(true);
                        setShowMegaMenu(false);
                        setShowSoftSkillsMenu(false);
                        setShowLookupMenu(false);
                      }}
                      onMouseLeave={() => setShowIntroMenu(false)}
                    >
                      <Link
                        href={item.href}
                        className={`text-sm font-medium transition-colors relative flex items-center gap-1 h-full px-3 group ${currentPath === item.href || currentPath.startsWith('/gioi-thieu') || showIntroMenu ? TAILWIND_COLORS.textPrimary : 'text-gray-700 hover:text-green-600'
                          }`}
                      >
                        <span className="relative z-10 transition-transform duration-300 group-hover:-translate-y-0.5">
                          {item.name}
                        </span>
                        <motion.span
                          className={`absolute bottom-0 left-0 right-0 h-0.5 ${TAILWIND_COLORS.bgPrimary}`}
                          initial={false}
                          animate={{ scaleX: (currentPath === item.href || currentPath.startsWith('/gioi-thieu') || showIntroMenu) ? 1 : 0 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                        />
                        <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${TAILWIND_COLORS.bgPrimary} scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />
                      </Link>
                      {isIntroMounted && (
                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-max">
                          <IntroMenu
                            onMouseEnter={() => setShowIntroMenu(true)}
                            onMouseLeave={() => setShowIntroMenu(false)}
                            isOpen={showIntroMenu && !isMenuOpen}
                          />
                        </div>
                      )}
                    </div>
                  );
                }
                if (item.hasSoftSkillsMenu) {
                  return (
                    <div
                      key={item.name}
                      className="relative h-full flex items-center"
                      onMouseEnter={() => {
                        setShowSoftSkillsMenu(true);
                        setShowMegaMenu(false);
                        setShowIntroMenu(false);
                        setShowLookupMenu(false);
                      }}
                      onMouseLeave={() => setShowSoftSkillsMenu(false)}
                    >
                      <Link
                        href={item.href}
                        className={`text-sm font-medium transition-colors relative flex items-center gap-1 h-full px-3 group ${currentPath === item.href || showSoftSkillsMenu ? TAILWIND_COLORS.textPrimary : 'text-gray-700 hover:text-green-600'
                          }`}
                      >
                        <span className="relative z-10 transition-transform duration-300 group-hover:-translate-y-0.5">
                          {item.name}
                        </span>
                        <motion.span
                          className={`absolute bottom-0 left-0 right-0 h-0.5 ${TAILWIND_COLORS.bgPrimary}`}
                          initial={false}
                          animate={{ scaleX: (currentPath === item.href || showSoftSkillsMenu) ? 1 : 0 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                        />
                        <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${TAILWIND_COLORS.bgPrimary} scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />
                      </Link>
                      {isSoftSkillsMounted && (
                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-max">
                          <SoftSkillsMenu
                            courses={courses}
                            onMouseEnter={() => setShowSoftSkillsMenu(true)}
                            onMouseLeave={() => setShowSoftSkillsMenu(false)}
                            isOpen={showSoftSkillsMenu && !isMenuOpen}
                          />
                        </div>
                      )}
                    </div>
                  );
                }
                if (item.hasLookupMenu) {
                  return (
                    <div
                      key={item.name}
                      className="relative h-full flex items-center"
                      onMouseEnter={() => {
                        setShowLookupMenu(true);
                        setShowMegaMenu(false);
                        setShowIntroMenu(false);
                        setShowSoftSkillsMenu(false);
                      }}
                      onMouseLeave={() => setShowLookupMenu(false)}
                    >
                      <Link
                        href={item.href}
                        className={`text-sm font-medium transition-colors relative flex items-center gap-1 h-full px-3 group ${currentPath === item.href || currentPath.startsWith('/tien-ich-dich-vu') || showLookupMenu ? TAILWIND_COLORS.textPrimary : 'text-gray-700 hover:text-green-600'
                          }`}
                      >
                        <span className="relative z-10 transition-transform duration-300 group-hover:-translate-y-0.5">
                          {item.name}
                        </span>
                        <motion.span
                          className={`absolute bottom-0 left-0 right-0 h-0.5 ${TAILWIND_COLORS.bgPrimary}`}
                          initial={false}
                          animate={{ scaleX: (currentPath === item.href || currentPath.startsWith('/tien-ich-dich-vu') || showLookupMenu) ? 1 : 0 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                        />
                        <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${TAILWIND_COLORS.bgPrimary} scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />
                      </Link>
                      {isLookupMounted && (
                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-max">
                          <LookupMenu
                            onMouseEnter={() => setShowLookupMenu(true)}
                            onMouseLeave={() => setShowLookupMenu(false)}
                            isOpen={showLookupMenu && !isMenuOpen}
                          />
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`text-sm font-medium transition-colors relative h-full flex items-center px-2 group ${isActive
                      ? `${TAILWIND_COLORS.textPrimary}`
                      : 'text-gray-700 hover:text-green-600'
                      }`}
                  >
                    <span className="relative z-10 transition-transform duration-300 group-hover:-translate-y-0.5">
                      {item.name}
                    </span>
                    <motion.span
                      className={`absolute bottom-0 left-0 right-0 h-0.5 ${TAILWIND_COLORS.bgPrimary}`}
                      initial={false}
                      animate={{ scaleX: isActive ? 1 : 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                    <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${TAILWIND_COLORS.bgPrimary} scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />
                  </Link>
                );
              })}
            </nav>

            <button
              type="button"
              className="md:hidden absolute right-4 p-2 rounded-md text-gray-700 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden pb-4 space-y-2">
              {navItems.map((item) => {
                const isActive = currentPath === item.href ||
                  (item.href !== '/' && currentPath.startsWith(item.href));

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-3 py-2 rounded-md font-medium transition-colors ${isActive
                      ? `${TAILWIND_COLORS.bgPrimaryLight} ${TAILWIND_COLORS.textPrimaryDark}`
                      : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        <MegaMenu
          isOpen={showMegaMenu}
          onMouseEnter={() => setShowMegaMenu(true)}
          onMouseLeave={() => setShowMegaMenu(false)}
          courses={courses}
          coursesBasicInfo={coursesBasicInfo}
          onOpenRegistration={openRegistrationModal}
        />
      </header>

      {/* Course Registration Modal */}
      <CourseRegistrationModal
        isOpen={isRegistrationOpen}
        onClose={closeRegistrationModal}
      />
    </>
  );
}
