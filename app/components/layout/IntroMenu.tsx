"use client";

import Link from 'next/link';

interface IntroMenuProps {
  isOpen?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const menuItems = [
  {
    title: 'Chức năng, nhiệm vụ',
    href: '/gioi-thieu/chuc-nang-nhiem-vu',
  },
  {
    title: 'Cơ cấu tổ chức',
    href: '/gioi-thieu/co-cau-to-chuc',
  }
];

export default function IntroMenu({ isOpen = true, onMouseEnter, onMouseLeave }: IntroMenuProps) {
  const propsOnMouseEnter = onMouseEnter;
  const propsOnMouseLeave = onMouseLeave;

  return (
    <div onMouseEnter={propsOnMouseEnter} onMouseLeave={propsOnMouseLeave} className="pointer-events-auto pt-2">
      <div className="w-64">
        <div className={`rounded-lg overflow-hidden shadow-xl border border-gray-200 transform transition-all duration-300 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
          <div className={`bg-white text-gray-900 p-2 ${isOpen ? 'animate-in fade-in slide-in-from-top-4 duration-300' : ''}`}> 
            <nav className="py-2">
              <ul className="space-y-1">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className="block px-4 py-3 rounded-lg text-sm font-semibold text-gray-700 hover:text-green-600 hover:bg-green-50 transition-colors"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
