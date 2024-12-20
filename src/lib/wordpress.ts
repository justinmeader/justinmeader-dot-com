import { GraphQLClient } from 'graphql-request';

const endpoint = import.meta.env.WORDPRESS_API_URL;

if (!endpoint) {
  throw new Error('WORDPRESS_API_URL environment variable is not set');
}

// Initialize the GraphQL client with error handling
const client = new GraphQLClient(endpoint, {
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  date: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
    };
  };
  tags?: {
    nodes: {
      name: string;
    }[];
  };
}

export async function getAllPosts(): Promise<Post[]> {
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
    const data = await client.request(query);
    console.log('Posts fetched successfully');
    return data.posts.nodes;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to fetch posts');
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
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
    const data = await client.request(query, { slug });
    console.log('Post fetched successfully');
    return data.post;
  } catch (error) {
    console.error('Error fetching post:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to fetch post');
  }
}