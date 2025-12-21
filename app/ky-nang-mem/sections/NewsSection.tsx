import React from 'react';
import Link from 'next/link';
import SAMPLE_NEWS from '../../../lib/newsData';

export default function NewsSection() {
  const news = SAMPLE_NEWS;
  return (
    <section className="py-12 lg:py-20" aria-labelledby="news-heading">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl">
        <div className="mb-8 flex items-start justify-between gap-6">
          <div className='mx-auto'>
            <h3 id="news-heading" className="text-3xl lg:text-4xl font-extrabold text-slate-900 text-center">Tin tức — Thông báo</h3>
            <p className="mt-2 text-slate-600 max-w-2xl">Danh sách sinh viên đủ điều kiện cấp chứng chỉ và các thông báo liên quan </p>
          </div>

        
        </div>

        {news.length === 0 ? (
          <div className="rounded-2xl bg-amber-50 border border-amber-100 p-6 text-amber-800">Không thể tải danh sách tin tức. Vui lòng thử lại sau.</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
            {/* Left: 70% (7/10) */}
            <div className="lg:col-span-7 space-y-4">
              {news.slice(0, 4).map((item, idx) => (
                <article
                  key={idx}
                  className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-lg transition-shadow duration-200 flex flex-col sm:flex-row"
                  style={{ opacity: 0, transform: 'translateY(12px)', animation: `newsFadeUp 500ms ease forwards`, animationDelay: `${idx * 100}ms` }}
                >
                  <div className="relative w-full sm:w-44 h-44 sm:h-auto flex-shrink-0">
                    {item.image ? (
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-r from-sky-400 to-emerald-300" />
                    )}
                  </div>

                  <div className="p-4 sm:p-5 flex-1 flex flex-col">
                    <h4 className="text-lg font-bold text-slate-900 line-clamp-2">
                      <a href={item.url} target="_blank" rel="noreferrer" className="hover:text-sky-600">{item.title}</a>
                    </h4>

                    {item.excerpt ? <p className="mt-2 text-sm text-slate-600 line-clamp-3">{item.excerpt}</p> : null}

                    <div className="mt-4 flex items-center justify-between">
                      <div className="text-xs text-slate-500">{item.date || ''}</div>
                        <Link href={`/tin-tuc-thong-bao/${item.id || item.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-sky-600 hover:text-white hover:bg-sky-600 px-3 py-1 rounded-md transition-colors">
                          Xem chi tiết
                        </Link>
                    </div>
                  </div>
                </article>
              ))}

              <div className="mt-2 text-center sm:text-left">
                <Link href="https://trungtamkynangmem.vnua.edu.vn/category/danh-sach-sinh-vien-du-dieu-kien-cap-chung-chi/" className="text-sm font-medium text-slate-700 hover:text-sky-600 mx-auto block">Xem thêm tin khác →</Link>
              </div>
            </div>

            {/* Right: 30% (3/10) - Most Read */}
            <aside className="lg:col-span-3">
              <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
                <h5 className="text-sm font-semibold text-slate-900 mb-3">Tin đọc nhiều</h5>
                <ul className="space-y-3">
                  {news.slice(4, 9).slice(0, 5).map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3"
                      style={{ opacity: 0, transform: 'translateY(8px)', animation: `newsFadeUp 420ms ease forwards`, animationDelay: `${idx * 80}ms` }}
                    >
                      <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                        {item.image ? (
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-slate-200" />
                        )}
                      </div>

                      <div className="flex-1">
                        <a href={item.url} target="_blank" rel="noreferrer" className="text-sm font-medium text-slate-900 hover:text-sky-600 line-clamp-2">{item.title}</a>
                        <div className="text-xs text-slate-500 mt-1">{item.date || ''}</div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 text-center">
                  <Link href="https://trungtamkynangmem.vnua.edu.vn/category/danh-sach-sinh-vien-du-dieu-kien-cap-chung-chi/" className="text-sm font-medium text-sky-600 hover:underline">Xem tất cả</Link>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>

      <style>{`
        @keyframes newsFadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
