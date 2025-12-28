import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { NewsArticle } from "./types";
import { brandColors } from "@/lib/brandColors";

interface NewsCardProps {
  article: NewsArticle;
  index: number;
}

export const NewsCard = ({ article, index }: NewsCardProps) => (
  <Link href={`/tin-tuc-thong-bao/${article.id}`}>
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={article.thumbnail}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/images/placeholder-news.jpg";
          }}
        />
        <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium text-white"
             style={{ backgroundColor: brandColors.primary }}>
          Tin tức
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center mb-3 text-gray-500 text-sm">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {article.date}
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-green-600 transition-colors line-clamp-2">
          {article.title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-3 mb-4">
          {article.excerpt}
        </p>
        <motion.div
          whileHover={{ x: 5 }}
          className="inline-flex items-center text-green-600 font-medium text-sm hover:underline"
        >
          Đọc thêm
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.div>
      </div>
    </motion.article>
  </Link>
);