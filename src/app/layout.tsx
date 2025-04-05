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
        <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossOrigin="anonymous"></script>
      </head>
      <body>
        <header className="bg-gray-800 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">
              <a href="/">정적 웹사이트</a>
            </h1>
            <nav>
              <ul className="flex space-x-4">
                <li><a href="/" className="hover:text-gray-300">홈</a></li>
                <li><a href="/blog/" className="hover:text-gray-300">블로그</a></li>
                <li><a href="/resume/" className="hover:text-gray-300">이력서</a></li>
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
            // jQuery를 기다림
            if (typeof jQuery !== 'undefined') {
              initNavigation();
            } else {
              // jQuery가 로드될 때까지 기다림
              const checkJQuery = setInterval(function() {
                if (typeof jQuery !== 'undefined') {
                  clearInterval(checkJQuery);
                  initNavigation();
                }
              }, 100);
            }
            
            function initNavigation() {
              const $ = jQuery;
              
              // 모든 내비게이션 링크에 클릭 핸들러 추가
              $('.nav-link').on('click', function(e) {
                e.preventDefault();
                const href = $(this).attr('href');
                
                // URL 형식 정규화
                let fetchUrl;
                if (href === '/') {
                  fetchUrl = '/index.html';
                } else {
                  // 슬래시로 끝나는 경우 처리
                  fetchUrl = href.endsWith('/') ? href + 'index.html' : href + '/index.html';
                }
                
                // 히스토리 API로 URL 변경
                history.pushState({}, '', href);
                
                // 페이지 콘텐츠 로드
                $.ajax({
                  url: fetchUrl,
                  type: 'GET',
                  dataType: 'html',
                  success: function(html) {
                    // 새 HTML에서 메인 콘텐츠 추출
                    const $html = $(html);
                    const $newMain = $html.find('main');
                    
                    // 메인 콘텐츠 교체
                    if ($newMain.length) {
                      $('main').html($newMain.html());
                      // 페이지 제목 업데이트
                      const newTitle = $html.filter('title').text();
                      if (newTitle) {
                        document.title = newTitle;
                      }
                    }
                  },
                  error: function() {
                    console.error('페이지 로드 오류');
                    window.location.href = href; // 오류 시 일반 네비게이션으로 대체
                  }
                });
              });
              
              // 브라우저 뒤로/앞으로 버튼 처리
              $(window).on('popstate', function() {
                // 현재 URL에 맞는 페이지 로드
                const currentPath = window.location.pathname;
                let fetchUrl;
                
                if (currentPath === '/') {
                  fetchUrl = '/index.html';
                } else {
                  fetchUrl = currentPath.endsWith('/') ? currentPath + 'index.html' : currentPath + '/index.html';
                }
                
                $.ajax({
                  url: fetchUrl,
                  type: 'GET',
                  dataType: 'html',
                  success: function(html) {
                    const $html = $(html);
                    const $newMain = $html.find('main');
                    
                    if ($newMain.length) {
                      $('main').html($newMain.html());
                      // 페이지 제목 업데이트
                      const newTitle = $html.filter('title').text();
                      if (newTitle) {
                        document.title = newTitle;
                      }
                    }
                  },
                  error: function() {
                    window.location.reload();
                  }
                });
              });
            }
          });
        ` }} />
      </body>
    </html>
  );
} 