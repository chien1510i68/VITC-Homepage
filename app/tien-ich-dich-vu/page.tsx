import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { LookupSection, TIEN_ICH_LOOKUP_CONFIG } from '../shared/sections';
import { 
  CTASection
} from './sections';
import TaiLieuSection from './sections/TaiLieuSection';

export default function TienIchDichVuPage() {

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* <HeroSection /> */}
        <LookupSection {...TIEN_ICH_LOOKUP_CONFIG} />
        {/* <UtilitiesSection /> */}
        {/* <ServicesSection /> */}
        <TaiLieuSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
