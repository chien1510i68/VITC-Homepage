import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center px-4">
          <div className="inline-block">
            <div className="relative">
              <div className="absolute inset-0 bg-green-500 blur-3xl opacity-20 animate-pulse"></div>
              <h1 className="relative text-6xl md:text-8xl font-bold text-gray-800 mb-4">
                🚧
              </h1>
            </div>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
            Đang phát triển
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Trang chủ của chúng tôi đang được nâng cấp để mang đến trải nghiệm tốt hơn.
            <br />
            Vui lòng quay lại sau.
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            <a
              href="/tin-hoc"
              className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors shadow-lg"
            >
              Xem khóa học Tin học
            </a>
            <a
              href="/tin-tuc-thong-bao"
              className="px-6 py-3 bg-white text-gray-800 font-semibold rounded-lg hover:bg-gray-50 transition-colors shadow-lg border border-gray-200"
            >
              Tin tức & Thông báo
            </a>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
