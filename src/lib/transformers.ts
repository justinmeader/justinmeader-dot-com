import type { CollectionEntry, RenderResult } from "astro:content";
import type { WordPressPost } from "../types/wordpress";

export type TransformedPost = CollectionEntry<"blog">;

export function transformWordPressPost(post: WordPressPost): TransformedPost {
  const contentString = post.content ?? '';

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
    async render(): Promise<RenderResult> {
      // Define a no-op Content to satisfy the type requirements
      const Content = ((result: unknown, props: Record<string, unknown>, slots: Record<string, unknown>) => {
        // Return an empty async generator
        return (async function* () {})();
      }) as unknown as RenderResult["Content"];

      return {
        Content,
        headings: [],
        remarkPluginFrontmatter: {},
      };
    },
  };
}
