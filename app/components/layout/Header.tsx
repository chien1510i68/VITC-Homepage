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
import { useRef } from 'react';
import { getCoursesFromCache, saveCoursesToCache } from '@/lib/cache/coursesCache';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [showSoftSkillsMenu, setShowSoftSkillsMenu] = useState(false);
  const [isSoftSkillsMounted, setIsSoftSkillsMounted] = useState(false);
  const [softSkillsPos, setSoftSkillsPos] = useState<{ left: number; top: number } | null>(null);
  const softSkillsAnchorRef = useRef<HTMLDivElement | null>(null);
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
      // wait for animation duration before unmount
      t = setTimeout(() => setIsSoftSkillsMounted(false), 340);
    }

    return () => clearTimeout(t);
  }, [showSoftSkillsMenu, isSoftSkillsMounted]);

  useEffect(() => {
    // Fetch courses for mega menu
    const fetchCourses = async () => {
      try {
        const result = await getCourseSchedules();
        setCourses(result.data);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      }
    };
    
    // Load courses basic info from cache or API
    const loadCoursesBasicInfo = async () => {
      // Try to get from cache first
      const cached = getCoursesFromCache();
      if (cached) {
        setCoursesBasicInfo(cached);
        return;
      }

      // If no cache, fetch from API
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
      
      // Show header when scrolling up, hide when scrolling down
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
        setIsMenuOpen(false); // Close mobile menu when hiding
        setShowMegaMenu(false); // Close mega menu when hiding
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
    // { name: 'Giới thiệu', href: '/gioi-thieu' },
    { name: 'Tin học', href: '/tin-hoc', hasMegaMenu: true },
    { name: 'Kỹ năng mềm', href: '/ky-nang-mem', hasSoftSkillsMenu: true },
    { name: 'Tin tức', href: '/tin-tuc-thong-bao' },
    { name: 'Tra cứu chứng chỉ', href: '/tien-ich-dich-vu' },
    { name: 'Liên hệ', href: '/lien-he' },
  ];

  return (
    <header className={`bg-white border-b border-gray-200 sticky top-0 z-50 transition-transform duration-300 ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image 
              src="/images/logo.jpg"
              alt="VISC Logo"
              width={120}
              height={40}
              className="h-10 w-auto rounded-md"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = currentPath === item.href || 
                (item.href !== '/' && currentPath.startsWith(item.href));
              
              if (item.hasMegaMenu) {
                return (
                  <div
                    key={item.name}
                    className="relative h-16 flex items-center"
                    onMouseEnter={() => setShowMegaMenu(true)}
                    onMouseLeave={() => setShowMegaMenu(false)}
                  >
                    <Link
                      href={item.href}
                      className={`text-sm font-medium transition-colors relative flex items-center gap-1 ${
                        isActive || showMegaMenu
                          ? `${TAILWIND_COLORS.textPrimary}` 
                          : 'text-gray-700 '
                      }`}
                    >
                      {item.name}
                      <svg 
                        className={`w-4 h-4 transition-transform duration-200 ${
                          showMegaMenu ? 'rotate-180' : ''
                        }`} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                      {(isActive || showMegaMenu) && (
                        <span className={`absolute -bottom-[21px] left-0 right-0 h-0.5 ${TAILWIND_COLORS.bgPrimary}`}></span>
                      )}
                    </Link>
                  </div>
                );
              }
              if (item.hasSoftSkillsMenu) {
                return (
                  <div
                    key={item.name}
                    ref={softSkillsAnchorRef}
                    className="relative h-16 flex items-center px-3 rounded-lg transition-colors"
                    onMouseEnter={() => {
                      // compute position for the submenu
                      if (softSkillsAnchorRef.current) {
                        const rect = softSkillsAnchorRef.current.getBoundingClientRect();
                        const menuWidth = window.innerWidth >= 768 ? 384 : 320; // md:w-96 -> 384px, w-80 -> 320px
                        const centerLeft = rect.left + rect.width / 2 - menuWidth / 2;
                        const leftClamped = Math.min(Math.max(centerLeft, 8), window.innerWidth - menuWidth - 8);
                        const top = rect.bottom; // touch the border (no gap)
                        setSoftSkillsPos({ left: leftClamped, top });
                      }
                      setShowSoftSkillsMenu(true);
                      setShowMegaMenu(false);
                    }}
                    onMouseLeave={() => setShowSoftSkillsMenu(false)}
                  >
                    <Link
                      href={item.href}
                      className={`text-sm font-medium transition-colors relative flex items-center gap-1 ${
                          currentPath === item.href ? TAILWIND_COLORS.textPrimary : 'text-gray-700 hover:text-green-600'
                        }`}
                    >
                      {item.name}
                    </Link>
                  </div>
                );
              }

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium transition-colors relative ${
                    isActive 
                      ? `${TAILWIND_COLORS.textPrimary}` 
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <span className={`absolute -bottom-[21px] left-0 right-0 h-0.5 ${TAILWIND_COLORS.bgPrimary}`}></span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Login Button */}
          <div className="hidden md:block">
            <Button asChild>
              <Link href="#login">
                Đăng nhập
              </Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
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

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {navItems.map((item) => {
              const isActive = currentPath === item.href || 
                (item.href !== '/' && currentPath.startsWith(item.href));
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-2 rounded-md font-medium transition-colors ${
                    isActive
                      ? `${TAILWIND_COLORS.bgPrimaryLight} ${TAILWIND_COLORS.textPrimaryDark}`
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              );
            })}
            <div className="px-3">
              <Button asChild className="w-full">
                <Link href="#login" onClick={() => setIsMenuOpen(false)}>
                  Đăng nhập
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Mega Menu Dropdown */}
      <MegaMenu 
        isOpen={showMegaMenu}
        onMouseEnter={() => setShowMegaMenu(true)}
        onMouseLeave={() => setShowMegaMenu(false)}
        courses={courses}
        coursesBasicInfo={coursesBasicInfo}
      />
      {/* Soft Skills Submenu (render as sibling so it can be fixed & full width) */}
      {isSoftSkillsMounted && (
        <div style={softSkillsPos ? { position: 'fixed', left: softSkillsPos.left, top: softSkillsPos.top, zIndex: 60 } : undefined} onMouseEnter={() => setShowSoftSkillsMenu(true)} onMouseLeave={() => setShowSoftSkillsMenu(false)}>
          <SoftSkillsMenu
            courses={courses}
            onMouseEnter={() => setShowSoftSkillsMenu(true)}
            onMouseLeave={() => setShowSoftSkillsMenu(false)}
            isOpen={showSoftSkillsMenu && !isMenuOpen}
          />
        </div>
      )}
    </header>
  );
}
