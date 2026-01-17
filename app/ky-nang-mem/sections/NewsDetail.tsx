"use client";

import { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';

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
    return undefined;
  }, [open]);

  return (
    <>
      {label ? (
        <Button
          type="button"
          variant="ghost"
          onClick={openModal}
          className="inline-flex items-center gap-2 text-sm font-semibold text-green-600 hover:text-white hover:bg-green-600 px-3 py-1"
        >
          {label}
        </Button>
      ) : (
        <Button
          type="button"
          variant="ghost"
          onClick={openModal}
          className="inline-flex items-center gap-2 text-sm font-semibold text-green-600 hover:text-white hover:bg-green-600 px-3 py-1"
        >
          Xem chi tiết
        </Button>
      )}

      {open ? (
        <div ref={overlayRef} className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={closeModal} />

          <div className="relative bg-white rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-auto shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-bold">{title}</h3>
              <Button
                type="button"
                variant="ghost"
                onClick={closeModal}
                className="text-slate-600 hover:text-slate-900 h-auto px-2 py-1"
              >
                Đóng
              </Button>
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
