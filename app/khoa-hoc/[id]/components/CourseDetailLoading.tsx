import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';

export default function CourseDetailLoading() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-6">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-100 border-t-green-600"></div>
          </div>
          <p className="text-gray-600 text-lg font-medium">Đang tải thông tin khóa học...</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}