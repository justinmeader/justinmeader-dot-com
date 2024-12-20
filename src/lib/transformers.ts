import type { WordPressPost } from '../types/wordpress';

export interface TransformedPost {
  id: string;
  slug: string;
  collection: 'blog';
  data: {
    title: string;
    summary: string;
    date: Date;
    tags: string[];
    draft?: boolean;
    featuredImage?: string;
  };
  body: string;
  render: () => Promise<{ Content: any }>;
}

export function transformWordPressPost(post: WordPressPost): TransformedPost {
  return {
    id: post.id,
    slug: post.slug,
    collection: 'blog',
    data: {
      title: post.title,
      summary: post.excerpt.replace(/(<([^>]+)>)/gi, ''),
      date: new Date(post.date),
      tags: post.tags?.nodes.map((tag) => tag.name) || [],
      draft: false,
      featuredImage: post.featuredImage?.node.sourceUrl
    },
    body: post.content,
    render: async () => ({ Content: () => post.content })
  };
}