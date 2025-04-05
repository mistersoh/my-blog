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
      </head>
      <body>
        <header className="bg-gray-800 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">
              <a href="/" className="nav-link">정적 웹사이트</a>
            </h1>
            <nav>
              <ul className="flex space-x-4">
                <li><a href="/" className="nav-link hover:text-gray-300">홈</a></li>
                <li><a href="/blog/" className="nav-link hover:text-gray-300">블로그</a></li>
                <li><a href="/resume/" className="nav-link hover:text-gray-300">이력서</a></li>
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

        {/* 클라이언트 측 라우팅을 위한 스크립트 */}
        <script dangerouslySetInnerHTML={{ __html: `
          document.addEventListener('DOMContentLoaded', function() {
            // 모든 내비게이션 링크에 클릭 핸들러 추가
            document.querySelectorAll('.nav-link').forEach(link => {
              link.addEventListener('click', function(e) {
                e.preventDefault();
                const href = this.getAttribute('href');
                
                // 히스토리 API로 URL 변경
                history.pushState({}, '', href);
                
                // 페이지 콘텐츠 로드
                fetch(href === '/' ? '/index.html' : href + 'index.html')
                  .then(response => response.text())
                  .then(html => {
                    // 새 HTML에서 메인 콘텐츠 추출
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(html, 'text/html');
                    const newMain = doc.querySelector('main');
                    
                    // 메인 콘텐츠 교체
                    if (newMain) {
                      document.querySelector('main').innerHTML = newMain.innerHTML;
                    }
                  })
                  .catch(err => {
                    console.error('페이지 로드 오류:', err);
                    window.location.href = href; // 오류 시 일반 네비게이션으로 대체
                  });
              });
            });
            
            // 브라우저 뒤로/앞으로 버튼 처리
            window.addEventListener('popstate', function() {
              // 현재 URL에 맞는 페이지 로드
              const currentPath = window.location.pathname;
              fetch(currentPath === '/' ? '/index.html' : currentPath + 'index.html')
                .then(response => response.text())
                .then(html => {
                  const parser = new DOMParser();
                  const doc = parser.parseFromString(html, 'text/html');
                  const newMain = doc.querySelector('main');
                  
                  if (newMain) {
                    document.querySelector('main').innerHTML = newMain.innerHTML;
                  }
                })
                .catch(() => window.location.reload());
            });
          });
        ` }} />
      </body>
    </html>
  );
} 