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
    // If you're no longer using `render()` you can remove it entirely.
    // If you need it for compatibility, here's a version that silences the type errors:
    async render(): Promise<RenderResult> {
      // Provide explicit any types to avoid warnings about implicit 'any'
      const Content = (( _result: any, _props: any, _slots: any ) => {
        // Return an async generator yielding a simple HTML string
        return (async function* () {
          yield `<div>Hello World</div>`;
        })();
      }) as unknown as RenderResult["Content"];
      
      return {
        Content,
        headings: [],
        remarkPluginFrontmatter: {},
      };
    },
  };
}
