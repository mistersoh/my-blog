import { Post, Tag } from '@/types/post';
import { getBlogPosts } from '@/lib/markdown';

/**
 * 모든 태그 목록과 각 태그별 포스트 수를 반환합니다.
 */
export function getTags(): Tag[] {
  const posts = getBlogPosts();

  return posts
    .filter(({ tags }) => !!tags && tags.length > 0)
    .flatMap(({ tags }) => tags as string[])
    .reduce(
      (acc, tag) => {
        const lowerCased = tag.toLowerCase();

        if (acc.map.has(lowerCased)) {
          const index = acc.result.findIndex((x) => x.name.toLowerCase() === lowerCased);
          acc.result[index].count++;
        } else {
          acc.map.set(lowerCased, tag);
          acc.result.push({ name: tag, count: 1 });
        }

        return acc;
      },
      { map: new Map<string, string>(), result: [] as Tag[] },
    ).result;
}

/**
 * 특정 태그가 포함된 포스트 목록을 반환합니다.
 */
export function getPostsByTag(tag: string): Post[] {
  const posts = getBlogPosts();
  
  return posts.filter(({ tags }) => 
    tags?.some((x) => x.toLowerCase() === tag.toLowerCase())
  );
}

/**
 * 태그 클라우드 데이터를 반환합니다.
 * count 값에 따라 가중치(weight)가 계산됩니다.
 */
export function getTagCloud(): (Tag & { weight: number })[] {
  const tags = getTags();
  
  if (tags.length === 0) return [];
  
  const maxCount = Math.max(...tags.map(tag => tag.count));
  const minCount = Math.min(...tags.map(tag => tag.count));
  const range = maxCount - minCount;
  
  return tags.map(tag => ({
    ...tag,
    // 1-5 사이의 가중치 계산 (태그 클라우드 사이즈 조절용)
    weight: range === 0 
      ? 3 // 모든 태그가 같은 수일 경우 중간 가중치
      : Math.ceil((tag.count - minCount) / range * 4) + 1
  }));
} 