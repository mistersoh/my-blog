import React from 'react';
import Link from 'next/link';
import { getBlogPost, getBlogPosts } from '@/lib/markdown';
import Chip from '@/components/Chip';
import { Post } from '@/types/post';
import { Metadata } from 'next';

// 정적 페이지 경로 생성
export async function generateStaticParams() {
  const posts = getBlogPosts();
  
  return posts.map((post) => ({
    slug: post.id,
  }));
}

// 메타데이터 생성
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getBlogPost(params.slug);
  
  return {
    title: `${post.title} - My Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
    },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug);
  
  return (
    <div className="max-w-4xl mx-auto">
      <article>
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-gray-500">
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
            </span>
            <span className="text-gray-300 px-2">•</span>
            <span className="text-gray-500">{post.author}</span>
          </div>
          
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <Link key={tag} href={`/tag/${tag}`}>
                  <Chip>{tag}</Chip>
                </Link>
              ))}
            </div>
          )}
          
          {post.description && (
            <p className="text-gray-700 text-lg italic">{post.description}</p>
          )}
        </header>
        
        <div 
          className="markdown-body prose prose-blue max-w-none"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }} 
        />
      </article>
      
      <div className="mt-8 pt-8 border-t">
        <div className="flex justify-between items-center">
          <Link href="/blog" className="text-blue-600 hover:underline">
            ← 블로그 목록으로 돌아가기
          </Link>
          
          <Link href="/tag" className="text-blue-600 hover:underline">
            태그 목록 보기 →
          </Link>
        </div>
      </div>
    </div>
  );
} 