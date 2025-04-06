import React from 'react';
import { getBlogPosts } from '@/lib/markdown';

// 블로그 포스트 타입 정의
interface BlogPost {
  id: string;
  title: string;
  date: string;
  description: string;
  [key: string]: any;
}

export default function Home() {
  const posts = getBlogPosts() as BlogPost[];

  return (
    <div className="max-w-4xl mx-auto">
      <section className="mb-10">
        <h1 className="text-4xl font-bold mb-6">마크다운 기반 정적 웹사이트에 오신 것을 환영합니다</h1>
        <p className="text-xl text-gray-600 mb-6">
          이 웹사이트는 마크다운 파일을 콘텐츠로 사용하는 정적 웹사이트입니다.
          AWS S3에 배포되어 있으며, GitHub을 통한 CI/CD 파이프라인이 구성되어 있습니다.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-3">이력서</h2>
            <p className="mb-4">전문적인 이력서를 확인해보세요.</p>
            <a 
              href="/resume/index.html" 
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              이력서 보기
            </a>
          </div>
          <div className="bg-green-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-3">블로그</h2>
            <p className="mb-4">최신 블로그 글을 확인해보세요.</p>
            <a 
              href="/blog/index.html" 
              className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              블로그 보기
            </a>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6">최신 블로그 게시물</h2>
        <div className="grid grid-cols-1 gap-6">
          {posts.map((post) => (
            <div key={post.id} className="border border-gray-200 p-6 rounded-lg hover:shadow-md transition">
              <h3 className="text-xl font-bold mb-2">
                <a href={`/blog/${post.id}/index.html`} className="text-blue-600 hover:underline">
                  {post.title}
                </a>
              </h3>
              <p className="text-gray-500 mb-2">
                {new Date(post.date).toLocaleDateString('ko-KR')}
              </p>
              <p className="text-gray-600">{post.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
} 