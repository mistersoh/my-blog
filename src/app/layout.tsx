import React from 'react';
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '마크다운 정적 웹사이트',
  description: '마크다운 파일을 사용하여 생성된 정적 웹사이트',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        {/* 캐시 방지 메타 태그 */}
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <header className="bg-gray-800 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">
              <a href="/index.html">정적 웹사이트</a>
            </h1>
            <nav>
              <ul className="flex space-x-4">
                <li><a href="/index.html" className="hover:text-gray-300">홈</a></li>
                <li><a href="/blog/index.html" className="hover:text-gray-300">블로그</a></li>
                <li><a href="/resume/index.html" className="hover:text-gray-300">이력서</a></li>
              </ul>
            </nav>
          </div>
        </header>
        <main className="container mx-auto p-4">
          {children}
        </main>
        <footer className="bg-gray-800 text-white p-4 mt-8">
          <div className="container mx-auto text-center">
            <p>&copy; {new Date().getFullYear()} 마크다운 정적 웹사이트. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
} 