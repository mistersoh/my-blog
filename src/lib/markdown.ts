import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { Post, PostFrontMatter } from '@/types/post';

// 콘텐츠 디렉토리 경로 설정
const contentDirectory = path.join(process.cwd(), 'content');

// 날짜 문자열을 유효한 형식으로 변환하는 함수
function formatDate(dateStr: string): string {
  // 날짜 형식이 없거나 유효하지 않은 경우 현재 날짜 반환
  if (!dateStr) return new Date().toISOString();
  
  // 날짜 형식이 YYYY-MM-DD인지 확인
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  if (datePattern.test(dateStr)) {
    return dateStr;
  }
  
  try {
    // 날짜 문자열을 Date 객체로 변환하고 다시 ISO 문자열로 변환
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      return new Date().toISOString();
    }
    return date.toISOString();
  } catch (error) {
    console.error(`Invalid date format: ${dateStr}`, error);
    return new Date().toISOString();
  }
}

// 블로그 포스트 가져오기
export function getBlogPosts(): Post[] {
  const postsDirectory = path.join(contentDirectory, 'blog');
  const dirNames = fs.readdirSync(postsDirectory);
  
  return dirNames.map((dirName) => {
    // 디렉토리 내의 index.md 또는 index.mdx 파일 경로
    const mdPath = path.join(postsDirectory, dirName, 'index.md');
    const mdxPath = path.join(postsDirectory, dirName, 'index.mdx');
    
    // 디렉토리가 아니거나 index.md/index.mdx 파일이 없는 경우 건너뛰기
    if (!fs.statSync(path.join(postsDirectory, dirName)).isDirectory() || 
        (!fs.existsSync(mdPath) && !fs.existsSync(mdxPath))) {
      return null;
    }
    
    // 존재하는 파일 경로 선택
    const fullPath = fs.existsSync(mdxPath) ? mdxPath : mdPath;
    
    // 마크다운 파일을 문자열로 읽기
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    
    // gray-matter로 메타데이터 섹션 파싱
    const matterResult = matter(fileContents);
    
    // 날짜 형식 처리
    if (matterResult.data.date) {
      matterResult.data.date = formatDate(matterResult.data.date);
    }
    
    return {
      id: dirName,
      ...matterResult.data,
    } as Post;
  }).filter(Boolean) as Post[]; // null 값 제거
}

// 이력서 가져오기
export function getResume(locale = 'en'): PostFrontMatter & { content: string } {
  const resumeDirectory = path.join(contentDirectory, 'resume');
  const fileName = locale === 'ko' ? 'resume_ko.md' : 'resume_en.md';
  const fullPath = path.join(resumeDirectory, fileName);
  
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);
  
  return {
    content: matterResult.content,
    ...matterResult.data,
  } as PostFrontMatter & { content: string };
}

// 특정 블로그 포스트 가져오기
export async function getBlogPost(id: string): Promise<Post & { contentHtml: string }> {
  const postsDirectory = path.join(contentDirectory, 'blog');
  const mdPath = path.join(postsDirectory, id, 'index.md');
  const mdxPath = path.join(postsDirectory, id, 'index.mdx');
  
  // 존재하는 파일 경로 선택
  let fullPath;
  if (fs.existsSync(mdxPath)) {
    fullPath = mdxPath;
  } else if (fs.existsSync(mdPath)) {
    fullPath = mdPath;
  } else {
    throw new Error(`포스트 ${id}를 찾을 수 없습니다.`);
  }
  
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  
  // gray-matter로 메타데이터 섹션 파싱
  const matterResult = matter(fileContents);
  
  // 날짜 형식 처리
  if (matterResult.data.date) {
    matterResult.data.date = formatDate(matterResult.data.date);
  }
  
  // remark로 마크다운을 HTML로 변환
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  
  const contentHtml = processedContent.toString();
  
  return {
    id,
    contentHtml,
    ...matterResult.data,
  } as Post & { contentHtml: string };
}

// 이력서 HTML 가져오기
export async function getResumeHtml(locale = 'en'): Promise<PostFrontMatter & { contentHtml: string }> {
  const resume = getResume(locale);
  
  // remark로 마크다운을 HTML로 변환
  const processedContent = await remark()
    .use(html)
    .process(resume.content);
  
  const contentHtml = processedContent.toString();
  
  return {
    contentHtml,
    ...resume,
  } as PostFrontMatter & { contentHtml: string };
} 