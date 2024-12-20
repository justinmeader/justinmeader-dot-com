export const GET_ALL_POSTS = `
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

export const GET_POST_BY_SLUG = `
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