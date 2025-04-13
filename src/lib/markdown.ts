import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { Post, PostFrontMatter } from '@/types/post';

// 콘텐츠 디렉토리 경로 설정
const contentDirectory = path.join(process.cwd(), 'content');

// 블로그 포스트 가져오기
export function getBlogPosts(): Post[] {
  const postsDirectory = path.join(contentDirectory, 'blog');
  const dirNames = fs.readdirSync(postsDirectory);
  
  return dirNames.map((dirName) => {
    // 디렉토리 내의 index.md 파일 경로
    const fullPath = path.join(postsDirectory, dirName, 'index.md');
    
    // 디렉토리가 아니거나 index.md 파일이 없는 경우 건너뛰기
    if (!fs.statSync(path.join(postsDirectory, dirName)).isDirectory() || 
        !fs.existsSync(fullPath)) {
      return null;
    }
    
    // 마크다운 파일을 문자열로 읽기
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    
    // gray-matter로 메타데이터 섹션 파싱
    const matterResult = matter(fileContents);
    
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
  const fullPath = path.join(postsDirectory, id, 'index.md');
  
  if (!fs.existsSync(fullPath)) {
    throw new Error(`포스트 ${id}를 찾을 수 없습니다.`);
  }
  
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