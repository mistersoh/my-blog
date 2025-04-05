import React from 'react';
import { getBlogPost, getBlogPosts } from '@/lib/markdown';

// 블로그 포스트 타입 정의
interface BlogPost {
  id: string;
  contentHtml: string;
  title: string;
  date: string;
  description: string;
  [key: string]: any;
}

// 정적 페이지 경로 생성
export async function generateStaticParams() {
  const posts = getBlogPosts();
  
  return posts.map((post) => ({
    slug: post.id,
  }));
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug) as BlogPost;
  
  return (
    <div className="max-w-4xl mx-auto">
      <article>
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
          <div className="text-gray-500">
            {new Date(post.date).toLocaleDateString('ko-KR')}
          </div>
        </header>
        
        <div 
          className="markdown-body prose max-w-none"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }} 
        />
      </article>
      
      <div className="mt-8 pt-8 border-t">
        <a href="/blog/" className="text-blue-600 hover:underline">← 블로그 목록으로 돌아가기</a>
      </div>
    </div>
  );
} 