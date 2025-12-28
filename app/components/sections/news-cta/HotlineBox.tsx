import { motion } from "framer-motion";
import { brandColors } from "@/lib/brandColors";

export const HotlineBox = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6, delay: 0.4 }}
    className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 rounded-xl text-center"
    style={{ 
      background: `linear-gradient(135deg, ${brandColors.secondary} 0%, #e53e3e 100%)` 
    }}
  >
    <div className="flex items-center justify-center mb-4">
      <div className="bg-white/20 p-3 rounded-full">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      </div>
    </div>
    
    <h4 className="text-lg font-bold mb-2">Hotline tư vấn</h4>
    <p className="text-white/90 text-sm mb-4">
      Gọi ngay để được hỗ trợ 24/7
    </p>
    
    <motion.a
      href="tel:0123456789"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="inline-block bg-white text-orange-600 font-bold text-lg px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
    >
      📞 012.345.6789
    </motion.a>
    
    <p className="text-white/80 text-xs mt-3">
      Miễn phí cuộc gọi
    </p>
  </motion.div>
);