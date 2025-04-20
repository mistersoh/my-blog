import React from 'react';
import Link from 'next/link';
import { getTagCloud } from '@/utils/tags';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '태그 목록 - My Blog',
  description: '블로그의 모든 태그 목록입니다.',
};

export default function TagsPage() {
  const tagCloud = getTagCloud();
  
  // 이름 순으로 정렬
  const sortedTags = [...tagCloud].sort((a, b) => 
    a.name.localeCompare(b.name, 'ko-KR')
  );

  const baseClasses = 'px-3 py-1 rounded-full transition-colors bg-gray-100 hover:bg-blue-50 text-blue-600 font-medium';
  const getWeightClasses = (weight: number) => {
    const size = 0.875 + weight * 0.125;
    return `text-${Math.round(14 + weight * 2)}`;
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <header className="mb-12">
        <h1 className="text-3xl font-bold mb-4 text-center">태그 목록</h1>
        <p className="text-gray-600 text-center">총 {sortedTags.length}개의 태그</p>
      </header>
      
      {sortedTags.length > 0 ? (
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <div className="flex flex-wrap gap-3 justify-center">
            {sortedTags.map((tag) => (
              <Link 
                key={tag.name} 
                href={`/tag/${tag.name}`}
                className={`${
                  baseClasses
                } ${
                  getWeightClasses(tag.weight)
                }`}
              >
                {tag.name} <span className="text-gray-500">({tag.count})</span>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-600">아직 태그가 없습니다.</p>
        </div>
      )}
      
      <div className="mt-8 text-center">
        <Link href="/blog/" className="text-blue-600 hover:underline">
          ← 블로그 목록으로 돌아가기
        </Link>
      </div>
    </div>
  );
} 