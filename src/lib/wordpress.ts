import { GraphQLClient } from 'graphql-request';
import type { WordPressPost, WordPressResponse } from '@types/wordpress';

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
    console.log('Fetching posts from:', endpoint);
    const data = await client.request<WordPressResponse>(query);
    console.log('Posts fetched successfully');
    return data.posts.nodes;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to fetch posts');
  }
}

export async function getPostBySlug(slug: string): Promise<WordPressPost | null> {
  const query = `
    query GetPost($slug: String!) {
      post(id: $slug, idType: SLUG) {
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
  `;

  try {
    console.log('Fetching post with slug:', slug);
    const data = await client.request<{ post: WordPressPost }>(query, { slug });
    console.log('Post fetched successfully');
    return data.post;
  } catch (error) {
    console.error('Error fetching post:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to fetch post');
  }
}