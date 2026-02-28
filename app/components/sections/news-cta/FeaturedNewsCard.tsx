import { motion } from "framer-motion";
import Link from "next/link";
import { NewsArticle } from "./types";
import { useState } from "react";

interface FeaturedNewsCardProps {
  article: NewsArticle;
}

export const FeaturedNewsCard = ({ article }: FeaturedNewsCardProps) => {
  const [imgSrc, setImgSrc] = useState(article.thumbnail);
  const [imgError, setImgError] = useState(false);

  const fallbackImage = "/images/thu-vien/news.avif";

  return (
    <Link href={`/tin-tuc-thong-bao/${article.id}`}>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        whileHover={{ 
          y: -4,
          transition: { duration: 0.3, ease: "easeOut" }
        }}
        className="group bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer h-full"
      >
        {/* Image Section */}
        <div className="relative w-full h-64 sm:h-80 overflow-hidden bg-gray-100">
          <img
            src={imgError ? fallbackImage : imgSrc}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={() => {
              if (!imgError) {
                setImgError(true);
                setImgSrc(fallbackImage);
              }
            }}
          />
          <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg text-sm font-semibold bg-yellow-600 text-white shadow-md">
            Tin nổi bật
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
    
        {/* Content Section */}
        <div className="p-6">
          {/* Date */}
          <div className="flex items-center mb-3 text-gray-500 text-sm">
            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {article.date}
          </div>
          
          {/* Title */}
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 group-hover:text-yellow-600 transition-colors leading-tight line-clamp-2">
            {article.title}
          </h3>
          
          {/* Description */}
          <p className="text-gray-600 text-sm sm:text-base mb-4 leading-relaxed line-clamp-3">
            {article.excerpt}
          </p>
          
          {/* Read More Button */}
          <motion.div
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
            className="inline-flex items-center text-yellow-600 text-sm font-semibold group-hover:underline"
          >
            Đọc thêm
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.div>
        </div>
      </motion.article>
    </Link>
  );
};
