export interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt: string;
  categoryTitles: string[];
}

export interface PostDetail {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  body: unknown;
  mainImage: unknown;
  author: { name: string; image: unknown } | null;
  category: { _id: string; title: string } | null;
  categories: { _id: string; title: string }[] | null;
}

export interface LatestPost {
  title: string;
  slug: { current: string };
  excerpt: string;
}

export interface RelatedPost {
  _id: string;
  title: string;
  slug: { current: string };
}
