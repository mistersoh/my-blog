export interface PostFrontMatter {
  title: string;
  description?: string;
  date: string;
  tags?: string[];
  author: string;
}

export interface Post extends PostFrontMatter {
  id: string;
  slug?: string;
  content?: string;
  contentHtml?: string;
} 