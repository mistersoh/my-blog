import React from 'react';
import Link from 'next/link';
import { getPostsByTag, getTags } from '@/utils/tags';
import { Metadata } from 'next';

interface TagPageProps {
  params: {
    tag: string;
  };
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { tag } = params;
  const decodedTag = decodeURIComponent(tag);
  return {
    title: `${decodedTag} 태그의 포스트 - My Blog`,
    description: `${decodedTag} 태그를 가진 포스트 목록입니다.`,
  };
}

export async function generateStaticParams() {
  const tags = getTags();
  return tags.map((tag) => ({
    tag: encodeURIComponent(tag.name),
  }));
}

export default function TagPage({ params }: TagPageProps) {
  const { tag } = params;
  const decodedTag = decodeURIComponent(tag);
  const posts = getPostsByTag(decodedTag);

  return (
    <div className="max-w-4xl mx-auto py-8">
      <header className="mb-12">
        <h1 className="text-3xl font-bold mb-4 text-center">
          <span className="text-blue-600">{decodedTag}</span> 태그의 포스트
        </h1>
        <p className="text-gray-600 text-center">총 {posts.length}개의 포스트</p>
      </header>
      
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 gap-8">
          {posts.map((post) => (
            <article key={post.id} className="border border-gray-200 p-6 rounded-lg hover:shadow-md transition">
              <h2 className="text-xl font-bold mb-2">
                <Link href={`/blog/${post.id}/`} className="text-blue-600 hover:underline">
                  {post.title}
                </Link>
              </h2>
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
              {post.description && (
                <p className="text-gray-600 mb-4">{post.description}</p>
              )}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tagName) => (
                    <Link 
                      key={tagName} 
                      href={`/tag/${encodeURIComponent(tagName)}`} 
                      className={`text-sm bg-gray-100 px-3 py-1 rounded-full ${
                        tagName.toLowerCase() === decodedTag.toLowerCase() 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {tagName}
                    </Link>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-600">태그와 일치하는 포스트가 없습니다.</p>
        </div>
      )}
      
      <div className="mt-8 text-center">
        <Link href="/blog/" className="text-blue-600 hover:underline">
          ← 모든 포스트 보기
        </Link>
      </div>
    </div>
  );
} 