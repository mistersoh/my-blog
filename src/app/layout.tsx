import React from 'react';
import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Mistersoh's Blog",
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
              <Link href="/">Mistersoh's blog</Link>
            </h1>
            <nav>
              <ul className="flex space-x-4">
                <li><Link href="/" className="hover:text-gray-300">홈</Link></li>
                <li><Link href="/blog" className="hover:text-gray-300">블로그</Link></li>
                <li><Link href="/resume" className="hover:text-gray-300">이력서</Link></li>
              </ul>
            </nav>
          </div>
        </header>
        <main className="container mx-auto p-4">
          {children}
        </main>
        <footer className="bg-gray-800 text-white p-4 mt-8">
          <div className="container mx-auto text-center">
            <p>&copy; {new Date().getFullYear()} Mistersoh's Blog. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
} 