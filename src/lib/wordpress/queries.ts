// Define all GraphQL queries in one place
export const GET_ALL_POSTS = `
  query GetPosts($first: Int!, $status: PostStatusEnum!) {
    posts(first: $first, where: { status: $status }) {
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