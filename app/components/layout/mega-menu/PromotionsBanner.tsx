import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function PromotionsBanner() {
  return (
    <div className="mt-4 p-4 rounded-lg bg-gradient-to-r from-red-600 to-red-700 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-24 -mt-24" />
      <div className="relative">
        <h3 className="text-sm font-bold mb-2.5 flex items-center gap-1.5">
          <span>🎁</span>
          Ưu đãi đặc biệt tháng 12
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="flex items-start gap-2">
            <span className="text-base flex-shrink-0">💰</span>
            <span>Giảm <strong>15%</strong> học phí khi đăng ký nhóm từ 3 người</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-base flex-shrink-0">📚</span>
            <span>Tặng kèm tài liệu học tập trị giá <strong>500.000đ</strong></span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-base flex-shrink-0">🎓</span>
            <span>Miễn phí <strong>thi lại 1 lần</strong> nếu không đạt</span>
          </div>
        </div>
        <Button 
          asChild 
          className="mt-3 bg-white text-red-700 hover:bg-gray-100 font-semibold shadow-md text-xs h-8"
        >
          <Link href="/lien-he">🔥 Đăng ký ngay</Link>
        </Button>
      </div>
    </div>
  );
}
