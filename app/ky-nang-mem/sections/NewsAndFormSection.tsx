'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Calendar, ArrowRight, TrendingUp, Bell } from 'lucide-react';
import type { NewsArticle } from '@/types/news';
import { getSafeImageUrl, getFallbackImage } from '../utils/imageUtils';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { apiFetch } from '@/lib/api/base';
import ConsultationForm from '../../components/sections/ConsultationForm';

function formatDate(dateString: string): string {
    if (!dateString) return '';
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch {
        return dateString;
    }
}

export default function NewsAndFormSection() {
    const [announcements, setAnnouncements] = useState<NewsArticle[]>([]);
    const [news, setNews] = useState<NewsArticle[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadNews = async () => {
            try {
                const response = await apiFetch('/api/v1/news/filter', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        page: 0,
                        category: 'SOFT_SKILLS',
                        size: 20
                    })
                });

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }

                const result = await response.json();

                if (result.success && result.data) {
                    const allArticles = result.data;

                    const announcementItems = allArticles
                        .filter((item: any) => item.type === 'ANNOUNCEMENT' && item.status === 'PUBLISHED')
                        .map((item: any) => ({
                            id: item.id,
                            title: item.title,
                            description: item.summary || '',
                            date: item.createdAt,
                            image: item.imageUrl || '',
                            category: item.type
                        }))
                        .slice(0, 3); // Giảm số lượng để vừa khung 50/50

                    const newsItems = allArticles
                        .filter((item: any) => item.type === 'NEWS' && item.status === 'PUBLISHED')
                        .map((item: any) => ({
                            id: item.id,
                            title: item.title,
                            description: item.summary || '',
                            date: item.createdAt,
                            image: item.imageUrl || '',
                            category: item.type
                        }))
                        .slice(0, 3); // Giảm số lượng để vừa khung 50/50

                    setAnnouncements(announcementItems);
                    setNews(newsItems);
                }
            } catch (error) {
                console.error('Error loading news:', error);
                setAnnouncements([]);
                setNews([]);
            } finally {
                setIsLoading(false);
            }
        };
        loadNews();
    }, []);

    const combinedNews = [...announcements, ...news].slice(0, 6);

    if (isLoading) {
        return (
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
                </div>
            </section>
        );
    }

    return (
        <section id="news" className="py-8 lg:py-12 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Left: News & Announcements */}
                    <div className="space-y-8">
                        <div className="flex flex-col gap-2">
                            <h2 className="text-3xl font-bold text-gray-900">Tin tức & Thông báo</h2>
                            <div className="h-1 w-20 bg-green-500 rounded-full"></div>
                        </div>

                        <div className="space-y-4">
                            {combinedNews.map((item) => (
                                <Link
                                    key={item.id}
                                    href={`/tin-tuc-thong-bao/${item.id || item.slug}`}
                                    className="group flex gap-4 p-4 bg-gray-50 rounded-xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-green-100"
                                >
                                    <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                                        <ImageWithFallback
                                            src={getSafeImageUrl(item.image, 'news')}
                                            alt={item.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                                            fallbackSrc={getFallbackImage('news')}
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0 py-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${announcements.some(a => a.id === item.id)
                                                ? 'bg-red-50 text-red-600'
                                                : 'bg-blue-50 text-blue-600'
                                                }`}>
                                                {announcements.some(a => a.id === item.id) ? 'Thông báo' : 'Tin tức'}
                                            </span>
                                            <span className="text-[10px] text-gray-500 flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                {formatDate(item.date || '')}
                                            </span>
                                        </div>
                                        <h3 className="text-sm font-bold text-gray-900 group-hover:text-green-600 transition-colors line-clamp-2">
                                            {item.title}
                                        </h3>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        <Link
                            href="/tin-tuc-thong-bao?category=SOFT_SKILLS"
                            className="inline-flex items-center gap-2 text-green-600 font-bold hover:gap-3 transition-all"
                        >
                            Xem tất cả tin tức
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>

                    {/* Right: Registration Form */}
                    <div id="contact" className="sticky top-24">
                        <ConsultationForm isSubSection={true} />
                    </div>
                </div>
            </div>
        </section>
    );
}
