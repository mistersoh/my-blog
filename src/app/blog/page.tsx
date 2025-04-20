import React from 'react';
import Link from 'next/link';
import { getBlogPosts } from '@/lib/markdown';
import Chip from '@/components/Chip';
import { Post } from '@/types/post';
import { getTags } from '@/utils/tags';

export default function BlogPage() {
  const posts = getBlogPosts();
  const tags = getTags();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
        <h1 className="text-3xl font-bold">블로그</h1>
        <Link href="/tag" className="text-blue-600 hover:underline mt-2 md:mt-0">
          모든 태그 보기 →
        </Link>
      </div>
      
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.slice(0, 10).map((tag) => (
            <Link key={tag.name} href={`/tag/${encodeURIComponent(tag.name)}`}>
              <Chip>{tag.name} ({tag.count})</Chip>
            </Link>
          ))}
          {tags.length > 10 && (
            <Link href="/tag" className="text-sm text-blue-600 hover:underline flex items-center">
              + {tags.length - 10}개 더 보기
            </Link>
          )}
        </div>
      )}
      
      <div className="grid grid-cols-1 gap-6">
        {posts.map((post) => (
          <div key={post.id} className="border border-gray-200 p-6 rounded-lg hover:shadow-md transition">
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
            <p className="text-gray-600 mb-3">{post.description}</p>
            
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {post.tags.map((tag) => (
                  <Link key={tag} href={`/tag/${encodeURIComponent(tag)}`}>
                    <Chip>{tag}</Chip>
                  </Link>
                ))}
              </div>
            )}
            
            <div className="mt-4">
              <Link href={`/blog/${post.id}/`} className="text-blue-600 hover:underline">
                계속 읽기 →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 