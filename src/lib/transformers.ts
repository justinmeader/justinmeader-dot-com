import type { Post } from './wordpress';

export interface TransformedPost {
  slug: string;
  collection: 'blog';
  data: {
    title: string;
    summary: string;
    date: Date;
    tags: string[];
    featuredImage?: string;
  };
  body: string;
}

export function transformWordPressPost(post: Post): TransformedPost {
  return {
    slug: post.slug,
    collection: 'blog',
    data: {
      title: post.title,
      summary: post.excerpt.replace(/(<([^>]+)>)/gi, ''), // Strip HTML from excerpt
      date: new Date(post.date),
      tags: post.tags?.nodes.map(tag => tag.name) || [],
      featuredImage: post.featuredImage?.node.sourceUrl
    },
    body: post.content
  };
}