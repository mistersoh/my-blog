import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

// 콘텐츠 디렉토리 경로 설정
const contentDirectory = path.join(process.cwd(), 'content');

// 블로그 포스트 가져오기
export function getBlogPosts() {
  const postsDirectory = path.join(contentDirectory, 'blog');
  const fileNames = fs.readdirSync(postsDirectory);
  
  return fileNames.map((fileName) => {
    // 파일 이름에서 .md 확장자 제거하여 ID로 사용
    const id = fileName.replace(/\.md$/, '');
    
    // 마크다운 파일을 문자열로 읽기
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    
    // gray-matter로 메타데이터 섹션 파싱
    const matterResult = matter(fileContents);
    
    return {
      id,
      ...matterResult.data,
    };
  });
}

// 이력서 가져오기
export function getResume(locale = 'en') {
  const resumeDirectory = path.join(contentDirectory, 'resume');
  const fileName = locale === 'ko' ? 'resume_ko.md' : 'resume_en.md';
  const fullPath = path.join(resumeDirectory, fileName);
  
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);
  
  return {
    content: matterResult.content,
    ...matterResult.data,
  };
}

// 특정 블로그 포스트 가져오기
export async function getBlogPost(id: string) {
  const postsDirectory = path.join(contentDirectory, 'blog');
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  
  // gray-matter로 메타데이터 섹션 파싱
  const matterResult = matter(fileContents);
  
  // remark로 마크다운을 HTML로 변환
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  
  const contentHtml = processedContent.toString();
  
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}

// 이력서 HTML 가져오기
export async function getResumeHtml(locale = 'en') {
  const resume = getResume(locale);
  
  // remark로 마크다운을 HTML로 변환
  const processedContent = await remark()
    .use(html)
    .process(resume.content);
  
  const contentHtml = processedContent.toString();
  
  return {
    contentHtml,
    ...resume,
  };
} 