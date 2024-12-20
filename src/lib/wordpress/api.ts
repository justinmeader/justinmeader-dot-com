import type { WordPressPost, WordPressResponse, WordPressPostResponse } from '@types/wordpress';
import { client } from './client';
import { GET_ALL_POSTS, GET_POST_BY_SLUG } from './queries';

export async function getAllPosts(): Promise<WordPressPost[]> {
  try {
    const data = await client.request<WordPressResponse>(GET_ALL_POSTS);
    return data.posts.nodes;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to fetch posts');
  }
}

export async function getPostBySlug(slug: string): Promise<WordPressPost | null> {
  try {
    const data = await client.request<WordPressPostResponse>(GET_POST_BY_SLUG, { slug });
    return data.post;
  } catch (error) {
    console.error('Error fetching post:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to fetch post');
  }
}