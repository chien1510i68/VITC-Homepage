'use client';

import { useEffect, useState } from 'react';

/**
 * Custom Multi-channel Direct Chat Buttons (Zalo & Messenger)
 * Displays direct action floating buttons in the bottom-right corner
 * 1-click conversion with premium hover tooltips and pulse wave animations
 */
export default function ChatWidget() {
  const [mounted, setMounted] = useState(false);
  const [zaloPhone, setZaloPhone] = useState('');
  const [fbPageId, setFbPageId] = useState('');

  useEffect(() => {
    setMounted(true);
    // Load config from environment safely on client side
    const phone = process.env.NEXT_PUBLIC_ZALO_PHONE || '';
    const pageId = process.env.NEXT_PUBLIC_FB_PAGE_ID || '';
    
    // Remove dots/spaces for clean Zalo redirection (e.g. 0961.174.239 -> 0961174239)
    setZaloPhone(phone ? phone.replace(/[\s.-]/g, '').trim() : '');
    setFbPageId(pageId ? pageId.trim() : '');
  }, []);

  if (!mounted) return null;

  // Render nothing if both are missing
  if (!zaloPhone && !fbPageId) return null;

  const handleZaloClick = () => {
    if (!zaloPhone) return;
    window.open(`https://zalo.me/${zaloPhone}`, '_blank', 'noopener,noreferrer');
  };

  const handleMessengerClick = () => {
    if (!fbPageId) return;
    window.open(`https://m.me/${fbPageId}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4 items-end font-sans">
      
      {/* 1. ZALO DIRECT FLOATING BUTTON */}
      {zaloPhone && (
        <div className="relative group flex items-center justify-end">
          {/* Hover Tooltip - Premium Slide-in Glassmorphic Card */}
          <div className="absolute right-full mr-3 px-3 py-1.5 bg-white/90 backdrop-blur-sm border border-slate-200 text-slate-800 text-xs font-bold rounded-lg shadow-xl opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap">
            Chat Zalo Tư Vấn
            <div className="absolute top-1/2 -translate-y-1/2 left-full w-0 h-0 border-y-[6px] border-y-transparent border-l-[6px] border-l-white/90 drop-shadow-sm"></div>
          </div>

          {/* Pulse Wave Rings Background */}
          <span className="absolute -inset-1 rounded-full bg-[#0068ff]/30 opacity-75 animate-ping pointer-events-none"></span>
          <span className="absolute -inset-2 rounded-full bg-[#0068ff]/10 opacity-50 animate-pulse pointer-events-none"></span>

          {/* Zalo Button */}
          <button
            onClick={handleZaloClick}
            aria-label="Chat qua Zalo"
            className="relative flex items-center justify-center w-14 h-14 bg-[#0068ff] hover:bg-[#005ad9] text-white rounded-full shadow-[0_4px_20px_rgba(0,104,255,0.4)] hover:shadow-[0_6px_25px_rgba(0,104,255,0.6)] transform hover:-translate-y-1 active:translate-y-0 transition-all duration-300 group-hover:scale-105"
          >
            {/* Stylized high-fidelity Zalo SVG */}
            <svg viewBox="0 0 100 100" className="w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 90c22.091 0 40-17.909 40-40S72.091 10 50 10 10 27.909 10 50c0 8.878 2.894 17.08 7.8 23.754a1.5 1.5 0 01.218 1.157l-2.455 9.82a.75.75 0 00.912.912l9.82-2.455a1.5 1.5 0 011.157.218C32.92 87.106 41.122 90 50 90z" fill="#FFFFFF" />
              <text x="50" y="58" fill="#0068ff" fontWeight="900" fontSize="24" fontFamily="system-ui, -apple-system, sans-serif" textAnchor="middle">zalo</text>
            </svg>
          </button>
        </div>
      )}

      {/* 2. MESSENGER DIRECT FLOATING BUTTON */}
      {fbPageId && (
        <div className="relative group flex items-center justify-end">
          {/* Hover Tooltip - Premium Slide-in Glassmorphic Card */}
          <div className="absolute right-full mr-3 px-3 py-1.5 bg-white/90 backdrop-blur-sm border border-slate-200 text-slate-800 text-xs font-bold rounded-lg shadow-xl opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap">
            Chat Messenger
            <div className="absolute top-1/2 -translate-y-1/2 left-full w-0 h-0 border-y-[6px] border-y-transparent border-l-[6px] border-l-white/90 drop-shadow-sm"></div>
          </div>

          {/* Pulse Wave Rings Background */}
          <span className="absolute -inset-1 rounded-full bg-[#0084ff]/30 opacity-75 animate-ping pointer-events-none" style={{ animationDelay: '0.5s' }}></span>
          <span className="absolute -inset-2 rounded-full bg-[#0084ff]/10 opacity-50 animate-pulse pointer-events-none" style={{ animationDelay: '0.5s' }}></span>

          {/* Messenger Button */}
          <button
            onClick={handleMessengerClick}
            aria-label="Chat qua Facebook Messenger"
            className="relative flex items-center justify-center w-14 h-14 rounded-full shadow-[0_4px_20px_rgba(0,132,255,0.3)] hover:shadow-[0_6px_25px_rgba(0,132,255,0.5)] transform hover:-translate-y-1 active:translate-y-0 transition-all duration-300 group-hover:scale-105 overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #00c6ff 0%, #0072ff 50%, #f7208b 100%)'
            }}
          >
            {/* Facebook Messenger Standard SVG */}
            <svg viewBox="0 0 16 16" fill="currentColor" className="w-8 h-8 text-white" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 7.76C0 3.301 3.493 0 8 0s8 3.301 8 7.76-3.493 7.76-8 7.76c-.81 0-1.586-.107-2.316-.307a.64.64 0 0 0-.427.03l-1.588.702a.64.64 0 0 1-.898-.566l-.044-1.423a.64.64 0 0 0-.215-.456C.956 12.108 0 10.092 0 7.76m5.546-1.459-2.35 3.728c-.225.358.214.761.551.506l2.525-1.916a.48.48 0 0 1 .578-.002l1.869 1.402a1.2 1.2 0 0 0 1.735-.32l2.35-3.728c.226-.358-.214-.761-.551-.506L9.728 7.381a.48.48 0 0 1-.578.002L7.281 5.98a1.2 1.2 0 0 0-1.735.32z" />
            </svg>
          </button>
        </div>
      )}

    </div>
  );
}
