import type { WordPressPost, WordPressResponse } from '@types/wordpress';
import { client } from './client';
import { GET_ALL_POSTS } from './queries';
import { WORDPRESS_CONFIG } from '@config/wordpress';

export async function getAllPosts(): Promise<WordPressPost[]> {
  try {
    const data = await client.request<WordPressResponse>(GET_ALL_POSTS, {
      first: WORDPRESS_CONFIG.POSTS_PER_PAGE,
      status: WORDPRESS_CONFIG.POST_STATUS
    });
    return data.posts.nodes;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to fetch posts');
  }
}