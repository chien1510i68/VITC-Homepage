import Link from 'next/link';
import { Card } from '@/components/ui/card';
import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';
import { notFound } from 'next/navigation';
import { getNewsById, getNews } from '@/lib/api/news';

export default async function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let newsItem: any = null;

  try {
    newsItem = await getNewsById(id);
  } catch (error) {
    console.error('Error fetching news:', error);
    notFound();
  }

  if (!newsItem) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  // Get related news
  let relatedNews: any[] = [];
  try {
    const result = await getNews({ page: 0, size: 10 });
    relatedNews = result.data.filter((n: any) => String(n.id) !== String(id)).slice(0, 3);
  } catch (error) {
    console.error('Error fetching related news:', error);
  }

  const htmlContent = newsItem.contentHtml || newsItem.content || '';

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-gray-50 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-6">
            <nav className="flex items-center space-x-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-blue-600">Trang chủ</Link>
              <span>/</span>
              <Link href="/tin-tuc-thong-bao" className="hover:text-blue-600">Tin tức - Thông báo</Link>
              <span>/</span>
              <span className="text-gray-900">{newsItem.title}</span>
            </nav>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Card className="p-8">
                {/* Category Badge */}
                <div className="mb-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${newsItem.category === 'announcement' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                    {newsItem.category === 'announcement' ? 'Thông báo' : 'Tin tức'}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{newsItem.title}</h1>

                {/* Meta Info */}
                <div className="flex items-center space-x-6 text-sm text-gray-600 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {formatDate(newsItem.date)}
                  </div>
                  {newsItem.author && (
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {newsItem.author}
                    </div>
                  )}
                </div>

                {/* Content from API */}
                <div className="prose prose-sm sm:prose lg:prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4 prose-ul:my-4 prose-ul:list-disc prose-ul:pl-6 prose-ol:my-4 prose-ol:list-decimal prose-ol:pl-6 prose-li:text-gray-700 prose-li:mb-2 prose-strong:text-gray-900 prose-strong:font-semibold prose-blockquote:border-l-4 prose-blockquote:pl-4 prose-blockquote:italic prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg prose-img:shadow-md"
                  dangerouslySetInnerHTML={{ __html: htmlContent }}
                />

                {/* Tags */}
                {newsItem.tags && newsItem.tags.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="flex items-center flex-wrap gap-2">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      {newsItem.tags.map((tag: string, index: number) => (
                        <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">{tag}</span>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Related News */}
              {relatedNews.length > 0 && (
                <Card className="p-5 sticky top-24">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                    Bài viết liên quan
                  </h3>
                  <div className="space-y-4">
                    {relatedNews.map((item: any) => (
                      <Link key={item.id} href={`/tin-tuc-thong-bao/${item.id}`} className="block group">
                        <div className="border-l-4 border-gray-300 hover:border-blue-500 pl-3 py-2 transition-colors">
                          <h4 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 line-clamp-2 mb-1">{item.title}</h4>
                          <p className="text-xs text-gray-500">{formatDate(item.date)}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-6">
                    <Link href="/tin-tuc-thong-bao" className="block text-center text-sm text-blue-600 hover:text-blue-700 font-medium">Xem tất cả →</Link>
                  </div>
                </Card>
              )}
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-8">
            <Link href="/tin-tuc-thong-bao" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Quay lại trang tin tức
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
