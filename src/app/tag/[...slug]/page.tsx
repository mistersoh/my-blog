import React from 'react';
import Link from 'next/link';
import { getPostsByTag, getTags } from '@/utils/tags';
import { getBlogPosts } from '@/lib/markdown';
import { Metadata } from 'next';

interface TagPageProps {
  params: {
    slug: string[];
  };
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { slug } = params;
  const tagName = slug.join('/');
  
  return {
    title: `${tagName} 태그의 포스트 - My Blog`,
    description: `${tagName} 태그를 가진 포스트 목록입니다.`,
  };
}

export async function generateStaticParams() {
  const tags = getTags();
  
  // 각 태그에 대해 가능한 모든 경로를 생성
  const params = [];
  
  for (const tag of tags) {
    // 1. 태그 이름에 공백이 있는 경우 (예: "Vibe Coding")
    if (tag.name.includes(' ')) {
      // 전체 이름을 단일 세그먼트로 (예: slug: ["Vibe Coding"])
      params.push({ slug: [tag.name] });
      
      // URL 인코딩된 버전 (예: slug: ["Vibe%20Coding"])
      params.push({ slug: [encodeURIComponent(tag.name)] });
    } else {
      // 2. 일반 태그 (공백 없음)
      params.push({ slug: [tag.name] });
    }
  }
  
  return params;
}

export default function TagPage({ params }: TagPageProps) {
  const { slug } = params;
  // 모든 슬러그 세그먼트를 결합하여 태그 이름 생성
  let tagName = slug.join('/');
  
  // URL 디코딩 (필요한 경우)
  try {
    // 이미 디코딩되었는지 확인
    const decoded = decodeURIComponent(tagName);
    if (decoded !== tagName) {
      tagName = decoded;
    }
  } catch (e) {
    // 디코딩 오류 무시 (이미 디코딩되어 있음)
  }
  
  const posts = getPostsByTag(tagName);
  
  return (
    <div className="max-w-4xl mx-auto py-8">
      <header className="mb-12">
        <h1 className="text-3xl font-bold mb-4 text-center">
          <span className="text-blue-600">{tagName}</span> 태그의 포스트
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
                  {post.tags.map((tagText) => (
                    <Link 
                      key={tagText} 
                      href={`/tag/${tagText}`}
                      className={`text-sm bg-gray-100 px-3 py-1 rounded-full ${
                        tagText === tagName 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {tagText}
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