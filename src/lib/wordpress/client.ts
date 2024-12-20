import { GraphQLClient } from 'graphql-request';
import { WORDPRESS_CONFIG } from '@config/wordpress';

const client = new GraphQLClient(WORDPRESS_CONFIG.API_URL, {
  headers: {
    'Content-Type': 'application/json',
  },
});

export default client;