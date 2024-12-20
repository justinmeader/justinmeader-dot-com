import type { CollectionEntry, RenderResult } from "astro:content";
import type { WordPressPost } from "../types/wordpress";

// We know this is what we eventually need to produce.
export type TransformedPost = CollectionEntry<"blog">;

export function transformWordPressPost(post: WordPressPost): TransformedPost {
  return {
    id: post.id.toString(),
    slug: post.slug,
    body: post.content,
    collection: "blog",
    data: {
      title: post.title,
      summary: post.excerpt.replace(/(<([^>]+)>)/gi, ""), // Strip HTML tags
      date: new Date(post.date),
      tags: post.tags?.nodes.map((tag) => tag.name) || [],
      draft: false,
    },
    render: async (): Promise<RenderResult> => {
      // Implementing the signature of AstroComponentFactory:
      // (result, props, slots) => AsyncGenerator<...>
      const Content: RenderResult["Content"] = (result, props, slots) => {
        return (async function*() {
          yield `<div>${post.content}</div>`;
        })();
      };

      return {
        Content,
        headings: [],
        remarkPluginFrontmatter: {},
      };
    },
  };
}
