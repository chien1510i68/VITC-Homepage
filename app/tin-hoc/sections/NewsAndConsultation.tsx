'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ArrowRight, User, Phone, Mail, GraduationCap, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { apiFetch } from '@/lib/api/base';
import { getCoursesBasicInfo } from '@/lib/api/courses';
import { submitConsultation } from '@/lib/api/consultation';
import type { NewsArticle } from '@/types/news';
import type { CourseBasicInfo } from '@/lib/api/types';

function formatDate(dateString: string): string {
    if (!dateString) return '';
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', { month: 'short', day: '2-digit' }).replace('.', '');
    } catch {
        return dateString;
    }
}

function getFallbackImage(): string {
    return 'https://placehold.co/400x300/f8fafc/64748b?text=VITC';
}

export default function NewsAndConsultation() {
    const [allNews, setAllNews] = useState<NewsArticle[]>([]);
    const [newsLoading, setNewsLoading] = useState(true);
    const [courses, setCourses] = useState<CourseBasicInfo[]>([]);
    const [formData, setFormData] = useState({ name: '', phone: '', email: '', program: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const newsResponse = await apiFetch('/api/v1/news/filter', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ page: 0, category: 'IT', size: 5 })
                });
                if (newsResponse.ok) {
                    const result = await newsResponse.json();
                    if (result.success && result.data) {
                        setAllNews(result.data.filter((item: any) => item.status === 'PUBLISHED').map((item: any) => ({
                            id: item.id,
                            title: item.title,
                            date: item.createdAt,
                            image: (item.imageUrl && !item.imageUrl.includes('example.com')) ? item.imageUrl.split('?')[0] : getFallbackImage(),
                        })));
                    }
                }
            } catch (err) { console.error(err); } finally { setNewsLoading(false); }

            try {
                const coursesData = await getCoursesBasicInfo();
                setCourses(coursesData.filter(c => c.type === 'IT'));
            } catch (err) { console.error(err); }
        };
        fetchData();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.phone || !formData.program) return;
        setIsSubmitting(true);
        const result = await submitConsultation({
            username: formData.name,
            email: formData.email || '',
            phoneNumber: formData.phone,
            course: formData.program,
            type: 'IT',
            note: 'Simple Form Design',
        });
        setIsSubmitting(false);
        if (result.success) {
            setIsSuccess(true);
            setFormData({ name: '', phone: '', email: '', program: '' });
            setTimeout(() => setIsSuccess(false), 5000);
        }
    };

    return (
        <section className="py-6 md:py-24 bg-[#fafbfc] relative overflow-hidden">
            {/* Dynamic Background */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-green-50/50 -skew-x-12 translate-x-20 z-0"></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch">

                    {/* Section: News Feed (Minimalist) */}
                    <div className="flex-1 space-y-6 mx-2 lg:mx-0">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-green-600 font-bold tracking-widest text-xs sm:text-sm uppercase">
                                <Sparkles className="w-4 h-4" />
                                <span>Insight & Updates</span>
                            </div>
                            <h2 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 tracking-normal leading-tight">
                                Cùng VITC cập nhật <br /><span className="text-green-600">kiến thức mới.</span>
                            </h2>
                        </div>

                        <div className="grid gap-3">
                            {newsLoading ? (
                                [...Array(5)].map((_, i) => <div key={i} className="h-12 bg-slate-100 rounded-xl animate-pulse"></div>)
                            ) : (
                                allNews.map((item) => (
                                    <Link key={item.id} href={`/tin-tuc-thong-bao/${item.id}`} className="group flex items-center gap-3">
                                        <div className="relative w-12 h-12 flex-shrink-0 bg-slate-100 rounded-lg overflow-hidden shadow-sm group-hover:shadow-md transition-all">
                                            <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                            <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-sm font-bold text-slate-800 line-clamp-1 group-hover:text-green-600 transition-colors mb-0.5">
                                                {item.title}
                                            </h3>
                                            <div className="flex items-center text-xs text-slate-400 font-medium">
                                                {formatDate(item.date)}
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            )}
                        </div>

                        <Link href="/tin-tuc-thong-bao?category=IT" className="inline-flex items-center gap-2 font-bold text-slate-900 border-b-2 border-green-500 pb-1 hover:text-green-600 transition-colors uppercase text-sm tracking-normal">
                            Tất cả bài viết <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>

                    {/* Section: Simple Registration (Minimalist Premium) */}
                    <div className="w-full lg:w-[380px] flex-shrink-0 mx-2 lg:mx-0">
                        <div className="bg-white rounded-2xl lg:rounded-[32px] shadow-[0_16px_32px_-8px_rgba(0,0,0,0.06)] p-6 lg:p-8 relative border border-slate-100 h-full flex flex-col justify-center">

                            {isSuccess ? (
                                <div className="text-center space-y-3 animate-in fade-in zoom-in duration-500">
                                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto text-white shadow-lg shadow-green-200">
                                        <ArrowRight className="w-8 h-8 rotate-[-45deg]" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900">Great!</h3>
                                    <p className="text-slate-500 text-sm">VITC sẽ gọi cho bạn trong ít phút nữa để tư vấn lộ trình tốt nhất.</p>
                                </div>
                            ) : (
                                <>
                                    <div className="mb-6">
                                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1">Tư vấn lộ trình</h3>
                                        <p className="text-slate-500 text-sm leading-relaxed">Đơn giản hóa việc học tin học, bắt đầu từ con số 0 ngay hôm nay.</p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="space-y-1">
                                            <Input
                                                placeholder="Họ tên của bạn"
                                                name="name"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="h-12 border-none bg-slate-50 rounded-xl px-4 focus:bg-white focus:ring-2 focus:ring-green-500 transition-all font-medium text-slate-900 placeholder:text-slate-400 text-sm"
                                            />
                                        </div>

                                        <div className="space-y-1">
                                            <Input
                                                placeholder="Số điện thoại"
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                className="h-12 border-none bg-slate-50 rounded-xl px-4 focus:bg-white focus:ring-2 focus:ring-green-500 transition-all font-medium text-slate-900 placeholder:text-slate-400 text-sm"
                                            />
                                        </div>

                                        <div className="space-y-1 relative">
                                            <select
                                                name="program"
                                                value={formData.program}
                                                onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                                                className="w-full h-12 bg-slate-50 border-none rounded-xl px-4 appearance-none focus:bg-white focus:ring-2 focus:ring-green-500 transition-all font-medium text-slate-900 outline-none text-sm"
                                            >
                                                <option value="">Chọn khóa học</option>
                                                {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                                            </select>
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-20">
                                                <GraduationCap className="w-5 h-5" />
                                            </div>
                                        </div>

                                        <Button
                                            disabled={isSubmitting}
                                            className="w-full h-12 bg-slate-900 hover:bg-green-600 text-white font-bold text-base rounded-xl transition-all duration-300 shadow-lg shadow-slate-200 hover:shadow-green-200 hover:-translate-y-0.5"
                                        >
                                            {isSubmitting ? "SENDING..." : "BẮT ĐẦU NGAY"}
                                        </Button>

                                        <p className="text-[10px] text-center text-slate-300 font-bold uppercase tracking-[0.2em]">
                                            No spam. Only consultation.
                                        </p>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
