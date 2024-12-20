export interface WordPressImage {
  node: {
    sourceUrl: string;
  };
}

export interface WordPressTag {
  nodes: {
    name: string;
  }[];
}

export interface WordPressPost {
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

export interface WordPressResponse {
  posts: {
    nodes: WordPressPost[];
  };
}

export interface WordPressPostResponse {
  post: WordPressPost;
}