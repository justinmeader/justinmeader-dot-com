import type { CollectionEntry, RenderResult } from "astro:content";
import type { WordPressPost } from "../types/wordpress";

export type TransformedPost = CollectionEntry<"blog">;

export function transformWordPressPost(post: WordPressPost): TransformedPost {
  const contentString = (post.content ?? '').toString();

  return {
    id: post.id.toString(),
    slug: post.slug,
    body: contentString,
    collection: "blog",
    data: {
      title: post.title ?? '',
      summary: (post.excerpt ?? '').replace(/(<([^>]+)>)/gi, ''),
      date: new Date(post.date),
      tags: post.tags?.nodes.map((tag) => tag.name) || [],
      draft: false,
    },
    // If you're not using `Content` anymore, you can remove `render` entirely.
    // But if you still need `render` for some reason, just provide types for parameters:
    async render(): Promise<RenderResult> {
      const Content = ((result: unknown, props: Record<string, unknown>, slots: Record<string, unknown>) => {
        // Just return a simple piece of HTML, or remove entirely if not used.
        return Promise.resolve('<div>Hello World</div>');
      }) as RenderResult["Content"];

      return {
        Content,
        headings: [],
        remarkPluginFrontmatter: {},
      };
    },
  };
}
