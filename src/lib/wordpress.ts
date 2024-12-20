import { GraphQLClient } from 'graphql-request';
import type { WordPressPost, WordPressResponse } from '../types/wordpress';

const endpoint = import.meta.env.WORDPRESS_API_URL;

if (!endpoint) {
  throw new Error('WORDPRESS_API_URL environment variable is not set');
}

const client = new GraphQLClient(endpoint, {
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function getAllPosts(): Promise<WordPressPost[]> {
  const query = `
    query GetPosts {
      posts(first: 100, where: { status: PUBLISH }) {
        nodes {
          id
          title
          slug
          content
          excerpt
          date
          featuredImage {
            node {
              sourceUrl
            }
          }
          tags {
            nodes {
              name
            }
          }
        }
      }
    }
  `;

  try {
    const data = await client.request<WordPressResponse>(query);
    return data.posts.nodes;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to fetch posts');
  }
}