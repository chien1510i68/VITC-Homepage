import React from 'react'
import SAMPLE_THU_VIEN from '../../../lib/thuVienData'

export default function ThuVienSection() {
  const items = SAMPLE_THU_VIEN.slice(0, 6)

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Tài liệu & Thư viện</h2>
        <p className="text-sm text-gray-600 mb-6 text-center">Tổng hợp tài liệu, slide, và video hỗ trợ học tập kỹ năng mềm.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(item => (
            <article key={item.id} className="bg-white shadow-sm rounded-md overflow-hidden hover:shadow-md transition">
              <div>
                <a href={item.url} target="_blank" rel="noreferrer" className="block">
                  <div className="h-44 bg-gray-100 w-full overflow-hidden">
                    {item.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">No image</div>
                    )}
                  </div>
                </a>

                <div className="p-4">
                  <a href={item.url} target="_blank" rel="noreferrer" className="text-lg font-semibold mb-2 block hover:underline">{item.title}</a>
                  {item.excerpt && <p className="text-sm text-gray-600 mb-3">{item.excerpt}</p>}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{item.date || ''}</span>
                    {item.fileUrl ? (
                      <a href={item.fileUrl} target="_blank" rel="noreferrer" className="text-xs text-blue-600">Tải xuống</a>
                    ) : (
                      <a href={item.url} target="_blank" rel="noreferrer" className="text-xs text-blue-600">Xem chi tiết</a>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
