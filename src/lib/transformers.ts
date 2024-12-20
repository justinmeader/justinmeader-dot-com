import type { CollectionEntry } from "astro:content";
import type { WordPressPost } from '../types/wordpress';

export type TransformedPost = CollectionEntry<"blog">;

export function transformWordPressPost(post: WordPressPost): TransformedPost {
  return {
    id: post.id,
    slug: post.slug,
    body: post.content,
    collection: 'blog',
    data: {
      title: post.title,
      summary: post.excerpt.replace(/(<([^>]+)>)/gi, ''),
      date: new Date(post.date),
      tags: post.tags?.nodes.map((tag) => tag.name) || [],
      draft: false
    },
    render: async () => ({
      Content: () => post.content,
      headings: [],
      remarkPluginFrontmatter: {}
    })
  };
}