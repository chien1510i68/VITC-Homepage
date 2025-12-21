"use client";

import { useCallback, useEffect, useRef, useState } from 'react';

export default function NewsDetail({ title, contentHtml, label }: { title: string; contentHtml?: string; label?: string }) {
  const [open, setOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  const openModal = useCallback(() => setOpen(true), []);
  const closeModal = useCallback(() => setOpen(false), []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') closeModal();
    }
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, closeModal]);

  // Prevent background scroll when modal open
  useEffect(() => {
    if (open) {
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = original; };
    }
  }, [open]);

  return (
    <>
      {label ? (
        <button onClick={openModal} className="inline-flex items-center gap-2 text-sm font-semibold text-sky-600 hover:text-white hover:bg-sky-600 px-3 py-1 rounded-md transition-colors">
          {label}
        </button>
      ) : (
        <button onClick={openModal} className="inline-flex items-center gap-2 text-sm font-semibold text-sky-600 hover:text-white hover:bg-sky-600 px-3 py-1 rounded-md transition-colors">
          Xem chi tiết
        </button>
      )}

      {open ? (
        <div ref={overlayRef} className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={closeModal} />

          <div className="relative bg-white rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-auto shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-bold">{title}</h3>
              <button onClick={closeModal} className="text-slate-600 hover:text-slate-900">Đóng</button>
            </div>

            <div className="p-6 prose max-w-none">
              {contentHtml ? (
                <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
              ) : (
                <div>Không có nội dung chi tiết.</div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
