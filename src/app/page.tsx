import React from 'react';
import Link from 'next/link';
import { getBlogPosts } from '@/lib/markdown';
import { getTags } from '@/utils/tags';
import Chip from '@/components/Chip';

export default function Home() {
  const posts = getBlogPosts();
  const tags = getTags().slice(0, 5); // 인기 태그 5개만 표시

  return (
    <div className="max-w-4xl mx-auto">
      <section className="mb-10">
        <h1 className="text-4xl font-bold mb-6">사이트에 방문해 주신 여러분들 환영합니다.</h1>
        <p className="text-xl text-gray-600 mb-6">
          저의 이력서와 개인적인 블로그 포스트가 담긴 마크다운 파일을 콘텐츠로 사용하는 정적 웹사이트입니다.
          AWS S3에 배포되어 있으며, GitHub을 통한 CI/CD 파이프라인이 구성되어 있습니다.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-3">이력서</h2>
            <p className="mb-4">저의 경험이 담긴 이력서입니다.</p>
            <Link 
              href="/resume/"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              이력서 보기
            </Link>
          </div>
          <div className="bg-green-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-3">블로그</h2>
            <p className="mb-4">최신 블로그 글을 확인해보세요.</p>
            <Link 
              href="/blog/"
              className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              블로그 보기
            </Link>
          </div>
          <div className="bg-purple-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-3">태그</h2>
            <p className="mb-4">관심 있는 주제별로 글을 찾아보세요.</p>
            <Link 
              href="/tag/"
              className="inline-block bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
            >
              태그 보기
            </Link>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">최신 블로그 게시물</h2>
          <Link href="/blog/" className="text-blue-600 hover:underline">
            모든 글 보기 →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6">
          {posts.slice(0, 3).map((post) => (
            <div key={post.id} className="border border-gray-200 p-6 rounded-lg hover:shadow-md transition">
              <h3 className="text-xl font-bold mb-2">
                <Link href={`/blog/${post.id}/`} className="text-blue-600 hover:underline">
                  {post.title}
                </Link>
              </h3>
              <p className="text-gray-500 mb-2">
                {(() => {
                  try {
                    return new Date(post.date).toLocaleDateString('ko-KR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    });
                  } catch (error) {
                    console.error('날짜 포맷 에러:', error);
                    return '날짜 없음';
                  }
                })()}
              </p>
              <p className="text-gray-600 mb-3">{post.description}</p>
              
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Link key={tag} href={`/tag/${encodeURIComponent(tag)}`}>
                      <Chip>{tag}</Chip>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {tags.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold mb-6">인기 태그</h2>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex flex-wrap gap-3">
              {tags.map((tag) => (
                <Link 
                  key={tag.name} 
                  href={`/tag/${encodeURIComponent(tag.name)}`}
                  className="flex items-center"
                >
                  <Chip>
                    {tag.name} <span className="text-gray-500 ml-1">({tag.count})</span>
                  </Chip>
                </Link>
              ))}
              <Link href="/tag" className="text-blue-600 hover:underline flex items-center">
                모든 태그 보기 →
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
} 