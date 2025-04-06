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

export default function BlogPage() {
  const posts = getBlogPosts() as BlogPost[];

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">블로그</h1>
      
      <div className="grid grid-cols-1 gap-6">
        {posts.map((post) => (
          <div key={post.id} className="border border-gray-200 p-6 rounded-lg hover:shadow-md transition">
            <h2 className="text-xl font-bold mb-2">
              <a href={`/blog/${post.id}/`} target="_self" className="nav-link text-blue-600 hover:underline">
                {post.title}
              </a>
            </h2>
            <p className="text-gray-500 mb-2">
              {new Date(post.date).toLocaleDateString('ko-KR')}
            </p>
            <p className="text-gray-600">{post.description}</p>
            <div className="mt-4">
              <a href={`/blog/${post.id}/`} target="_self" className="nav-link text-blue-600 hover:underline">
                계속 읽기 →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 