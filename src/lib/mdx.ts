import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkToc from 'remark-toc';

// 노드 타입 정의
interface Node {
  children: any[];
  properties?: {
    className: string[];
    [key: string]: any;
  };
  [key: string]: any;
}

// MDX 옵션 설정
export const mdxOptions = {
  remarkPlugins: [
    remarkGfm,
    [remarkToc, { heading: "목차", tight: true }]
  ],
  rehypePlugins: [
    rehypeSlug,
    [rehypeAutolinkHeadings, { 
      behavior: 'wrap',
      properties: {
        className: ['anchor']
      }
    }],
    [rehypePrettyCode, { 
      theme: 'github-dark',
      onVisitLine(node: Node) {
        // 줄 번호 스타일링
        if (node.children.length === 0) {
          node.children = [{
            type: 'text',
            value: ' ',
          } as any];
        }
      },
      onVisitHighlightedLine(node: Node) {
        if (!node.properties) {
          node.properties = { className: [] };
        }
        node.properties.className.push('highlighted');
      },
      onVisitHighlightedWord(node: Node) {
        if (!node.properties) {
          node.properties = { className: [] };
        }
        node.properties.className = ['word'];
      }
    }]
  ]
};

// 코드 블록에 사용할 추가 설정
export const codeBlockOptions = {
  lineNumbers: true,
  showCopyButton: true,
  highlightedLines: true,
};

// MdxComponent 타입 정의
export type MdxComponents = {
  [component: string]: any;
}; 