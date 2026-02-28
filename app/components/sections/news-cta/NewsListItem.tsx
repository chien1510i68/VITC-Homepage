import { motion } from "framer-motion";
import Link from "next/link";
import { NewsArticle } from "./types";

interface NewsListItemProps {
  article: NewsArticle;
  index: number;
}

export const NewsListItem = ({ article, index }: NewsListItemProps) => {
  return (
    <Link href={`/tin-tuc-thong-bao/${article.id}`}>
      <motion.article
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        whileHover={{ 
          x: 4,
          transition: { duration: 0.2 }
        }}
        className="group pb-4 mb-4 border-b border-gray-200 last:border-b-0 last:mb-0 last:pb-0 cursor-pointer"
      >
        {/* Date */}
        <div className="flex items-center mb-2 text-gray-500 text-xs">
          <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {article.date}
        </div>
        
        {/* Title */}
        <h4 className="text-sm font-semibold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors leading-snug line-clamp-2">
          {article.title}
        </h4>
        
        {/* Read More Link */}
        <motion.div
          whileHover={{ x: 2 }}
          transition={{ duration: 0.2 }}
          className="inline-flex items-center text-yellow-600 text-xs font-medium"
        >
          Xem chi tiết
          <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.div>
      </motion.article>
    </Link>
  );
};
