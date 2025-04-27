'use client';

import React, { useState } from 'react';

interface ResumeContent {
  contentHtml: string;
}

interface LanguageSwitcherProps {
  resumeEn: ResumeContent;
  resumeKo: ResumeContent;
}

export default function LanguageSwitcher({ resumeEn, resumeKo }: LanguageSwitcherProps) {
  const [language, setLanguage] = useState<'en' | 'ko'>('en');

  return (
    <div className="mb-8">
      <div className="flex space-x-4 mb-6">
        <button 
          onClick={() => setLanguage('en')}
          className={`px-4 py-2 rounded transition-colors ${
            language === 'en' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          English
        </button>
        <button 
          onClick={() => setLanguage('ko')}
          className={`px-4 py-2 rounded transition-colors ${
            language === 'ko' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          한국어
        </button>
      </div>
      
      {language === 'en' ? (
        <div className="resume-content">
          <div 
            className="markdown-body prose max-w-none"
            dangerouslySetInnerHTML={{ __html: resumeEn.contentHtml }} 
          />
        </div>
      ) : (
        <div className="resume-content">
          <div 
            className="markdown-body prose max-w-none"
            dangerouslySetInnerHTML={{ __html: resumeKo.contentHtml }} 
          />
        </div>
      )}
    </div>
  );
} 