import { GraphQLClient } from 'graphql-request';
import { WORDPRESS_CONFIG } from '@config/wordpress';

// Create a singleton client instance
const client = new GraphQLClient(WORDPRESS_CONFIG.API_URL, {
  headers: {
    'Content-Type': 'application/json',
  },
});

export { client };