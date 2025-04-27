import React from 'react';
import { getResumeHtml } from '@/lib/markdown';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default async function ResumePage() {
  const resumeEn = await getResumeHtml('en');
  const resumeKo = await getResumeHtml('ko');
  
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">이력서</h1>
      <LanguageSwitcher resumeEn={resumeEn} resumeKo={resumeKo} />
    </div>
  );
} 