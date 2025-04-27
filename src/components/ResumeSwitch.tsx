'use client';

import React, { useEffect, useState } from 'react';

interface ResumeSwitchProps {
  resumeEnHtml: string;
  resumeKoHtml: string;
}

export default function ResumeSwitch({ resumeEnHtml, resumeKoHtml }: ResumeSwitchProps) {
  const [activeLanguage, setActiveLanguage] = useState<'en' | 'ko'>('en');
  
  const switchLanguage = (lang: 'en' | 'ko') => {
    setActiveLanguage(lang);
  };
  
  return (
    <div className="mb-8">
      <div className="flex space-x-4 mb-6">
        <button 
          onClick={() => switchLanguage('en')}
          className={`px-4 py-2 rounded ${
            activeLanguage === 'en' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-800'
          }`}
        >
          English
        </button>
        <button 
          onClick={() => switchLanguage('ko')}
          className={`px-4 py-2 rounded ${
            activeLanguage === 'ko' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-800'
          }`}
        >
          한국어
        </button>
      </div>
      
      {activeLanguage === 'en' ? (
        <div className="resume-content">
          <div 
            className="markdown-body prose max-w-none"
            dangerouslySetInnerHTML={{ __html: resumeEnHtml }} 
          />
        </div>
      ) : (
        <div className="resume-content">
          <div 
            className="markdown-body prose max-w-none"
            dangerouslySetInnerHTML={{ __html: resumeKoHtml }} 
          />
        </div>
      )}
    </div>
  );
} 