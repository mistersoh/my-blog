import React from 'react';
import { getResumeHtml } from '@/lib/markdown';

export default async function ResumePage() {
  const resumeEn = await getResumeHtml('en');
  const resumeKo = await getResumeHtml('ko');
  
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">이력서</h1>
      
      <div className="mb-8">
        <div className="flex space-x-4 mb-6">
          <button 
            id="btn-en" 
            className="px-4 py-2 bg-blue-600 text-white rounded active"
            data-lang="en"
          >
            English
          </button>
          <button 
            id="btn-ko" 
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded"
            data-lang="ko"
          >
            한국어
          </button>
        </div>
        
        <div id="resume-en" className="resume-content">
          <div 
            className="markdown-body prose max-w-none"
            dangerouslySetInnerHTML={{ __html: resumeEn.contentHtml }} 
          />
        </div>
        
        <div id="resume-ko" className="resume-content hidden">
          <div 
            className="markdown-body prose max-w-none"
            dangerouslySetInnerHTML={{ __html: resumeKo.contentHtml }} 
          />
        </div>
      </div>
      
      <script dangerouslySetInnerHTML={{ __html: `
        document.addEventListener('DOMContentLoaded', function() {
          document.querySelectorAll('button[data-lang]').forEach(button => {
            button.addEventListener('click', function() {
              const lang = this.getAttribute('data-lang');
              toggleLanguage(lang);
            });
          });
        });
        
        function toggleLanguage(lang) {
          // 모든 버튼 비활성화
          document.querySelectorAll('button[data-lang]').forEach(btn => {
            btn.classList.remove('bg-blue-600', 'text-white');
            btn.classList.add('bg-gray-200', 'text-gray-800');
          });
          
          // 선택된 버튼 활성화
          document.getElementById('btn-' + lang).classList.remove('bg-gray-200', 'text-gray-800');
          document.getElementById('btn-' + lang).classList.add('bg-blue-600', 'text-white');
          
          // 모든 이력서 숨기기
          document.querySelectorAll('.resume-content').forEach(content => {
            content.classList.add('hidden');
          });
          
          // 선택된 이력서 표시
          document.getElementById('resume-' + lang).classList.remove('hidden');
        }
      ` }} />
    </div>
  );
} 