import { Button } from '@/components/ui/button';
import { TAILWIND_COLORS } from '@/lib/colors';

export function CTASection() {
  return (
    <section className={`py-16 bg-gradient-to-br ${TAILWIND_COLORS.bgPrimary} text-white`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Cần hỗ trợ thêm?
        </h2>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Đội ngũ nhân viên của chúng tôi luôn sẵn sàng hỗ trợ bạn
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button 
            size="lg"
            className="bg-white text-green-700 hover:bg-gray-100 text-lg px-8"
          >
            Liên hệ ngay
          </Button>
          <Button 
            size="lg"
            variant="outline"
            className="border-2 border-white text-white hover:bg-white/10 text-lg px-8"
          >
            Hotline: 0123.456.789
          </Button>
        </div>
      </div>
    </section>
  );
}
