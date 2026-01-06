import { motion } from "framer-motion";
import Link from "next/link";
import { NewsArticle } from "./types";
import { useState } from "react";

interface CompactNewsCardProps {
  article: NewsArticle;
  index: number;
}

export const CompactNewsCard = ({ article, index }: CompactNewsCardProps) => {
  const [imgSrc, setImgSrc] = useState(article.thumbnail);
  const [imgError, setImgError] = useState(false);

  const fallbackImage = "data:image/svg+xml,%3csvg width='400' height='300' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='400' height='300' fill='%23f1f5f9'/%3e%3ctext x='200' y='150' text-anchor='middle' dy='.3em' fill='%236b7280' font-family='system-ui' font-size='16'%3eTin t%E1%BB%A9c%3c/text%3e%3c/svg%3e";

  return (
    <Link href={`/tin-tuc-thong-bao/${article.id}`}>
      <motion.article
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        whileHover={{ 
          y: -2,
          transition: { duration: 0.2, ease: "easeOut" }
        }}
        className="group bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden cursor-pointer"
      >
        {/* Mobile: Horizontal Layout, Desktop: Vertical Layout */}
        <div className="flex sm:block">
          {/* Image Section */}
          <div className="relative w-[30%] h-20 sm:w-full sm:h-24 flex-shrink-0 overflow-hidden bg-gray-100">
            <img
              src={imgError ? fallbackImage : imgSrc}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              onError={() => {
                if (!imgError) {
                  setImgError(true);
                  setImgSrc(fallbackImage);
                }
              }}
            />
            <div className="absolute top-1 left-1 sm:top-2 sm:left-2 px-1.5 py-0.5 sm:px-2 rounded-md text-xs font-medium bg-yellow-600 text-white">
              Tin tức
            </div>
          </div>
      
      {/* Content Section */}
      <div className="flex-1 p-2 sm:p-3 flex flex-col justify-between">
        {/* Date - Desktop only */}
        <div className="hidden sm:flex items-center mb-2 text-gray-500 text-xs">
          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {article.date}
        </div>
        
        {/* Title */}
        <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mb-1 sm:mb-2 group-hover:text-yellow-600 transition-colors leading-tight line-clamp-1 sm:line-clamp-2">
          {article.title}
        </h3>
        
        {/* Description */}
        <p className="text-gray-600 text-xs mb-1 sm:mb-2 leading-relaxed line-clamp-1 sm:line-clamp-2">
          {article.excerpt}
        </p>
        
        {/* Bottom Row: Date and Button */}
        <div className="flex items-center justify-between">
          {/* Date - Mobile only */}
          <div className="flex sm:hidden items-center text-gray-500 text-xs">
            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="truncate">{article.date.split(' ')[0]}</span>
          </div>
          
          {/* Button */}
          <motion.div
            whileHover={{ x: 2 }}
            transition={{ duration: 0.2 }}
            className="flex items-center text-yellow-600 text-xs font-medium group-hover:underline ml-auto sm:ml-0"
          >
            <span className="hidden sm:inline">Đọc thêm</span>
            <span className="sm:hidden">Xem</span>
            <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.div>
        </div>
      </div>
    </div>
  </motion.article>
  </Link>
  );
};