import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import HeroSoftSkills from './sections/HeroSoftSkills';
import IntroductionSection from './sections/IntroductionSection';
import type { Metadata } from 'next';
import NewsSection from './sections/NewsSection';
import InstructorsSection from './sections/InstructorsSection';
import CoursesByTypeSection from './sections/CoursesByTypeSection';
import PartnersSection from './sections/PartnersSection';
import ThuVienSection from './sections/ThuVienSection';

export const metadata: Metadata = {
    title: 'Kỹ năng mềm - VISC',
    description: 'Phát triển kỹ năng mềm, nâng tầm sự nghiệp cùng VISC. Đào tạo chất lượng cao với giảng viên giàu kinh nghiệm.',
};

export default function KyNangMemPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />

            <main className="flex-1">
                <HeroSoftSkills />
                <IntroductionSection />
                <CoursesByTypeSection />
                <NewsSection />
                <ThuVienSection />
                <InstructorsSection />
                <PartnersSection />
            </main>

            <Footer />
        </div>
    );
}
