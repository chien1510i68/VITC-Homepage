'use client';

import Script from 'next/script';
import { useEffect } from 'react';

/**
 * Facebook Messenger Customer Chat Plugin
 * Icon hiển thị ở góc dưới bên trái
 */

// Extend JSX to recognize Facebook custom attributes
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'div': React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
        attribution?: string;
        page_id?: string;
        theme_color?: string;
        logged_in_greeting?: string;
        logged_out_greeting?: string;
      };
    }
  }
}

export default function ChatWidget() {
  const PAGE_ID = process.env.NEXT_PUBLIC_FB_PAGE_ID || '';

  useEffect(() => {
    // Override CSS để đặt icon ở góc dưới bên trái
    const style = document.createElement('style');
    style.innerHTML = `
      .fb_dialog, 
      .fb-customerchat iframe {
        right: auto !important;
        left: 20px !important;
      }
      
      /* Đảm bảo bubble chat cũng ở bên trái */
      .fb_dialog.fb_dialog_advanced {
        right: auto !important;
        left: 20px !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  if (!PAGE_ID) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('⚠️ Facebook Chat: Thiếu NEXT_PUBLIC_FB_PAGE_ID trong .env');
    }
    return null;
  }

  return (
    <>
      {/* Facebook Root Element - Required */}
      <div id="fb-root"></div>

      {/* Facebook Customer Chat Plugin */}
      <div
        className="fb-customerchat"
        {...({
          attribution: 'biz_inbox',
          page_id: PAGE_ID,
          theme_color: '#0084ff',
          logged_in_greeting: 'Xin chào! Chúng tôi có thể giúp gì cho bạn? 👋',
          logged_out_greeting: 'Xin chào! Vui lòng đăng nhập Facebook để chat với chúng tôi. 💬',
        } as any)}
      />

      {/* Load Facebook SDK using Next.js Script component */}
      <Script
        id="facebook-messenger-chat"
        strategy="lazyOnload"
        onLoad={() => {
          if (process.env.NODE_ENV === 'development') {
            console.log('✅ Facebook Messenger SDK loaded');
          }
        }}
        onError={(e) => {
          console.error('❌ Failed to load Facebook Messenger SDK:', e);
        }}
      >
        {`
          window.fbAsyncInit = function() {
            FB.init({
              xfbml: true,
              version: 'v18.0'
            });
          };

          (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = 'https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js';
            fjs.parentNode.insertBefore(js, fjs);
          }(document, 'script', 'facebook-jssdk'));
        `}
      </Script>
    </>
  );
}
