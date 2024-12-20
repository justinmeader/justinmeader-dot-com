// WordPress API configuration
export const WORDPRESS_CONFIG = {
  // Default to localhost if environment variable is not set
  API_URL: import.meta.env.WORDPRESS_API_URL || 'http://localhost:10004/graphql',
  
  // Number of posts to fetch per page
  POSTS_PER_PAGE: 100,
  
  // Post status to fetch
  POST_STATUS: 'PUBLISH'
} as const;