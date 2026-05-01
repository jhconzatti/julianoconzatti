import { client } from "@/lib/sanityClient";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import type { Post, PostDetail, LatestPost, RelatedPost } from "./types";

const builder = imageUrlBuilder(client);
export const urlFor = (source: SanityImageSource) => builder.image(source);

export const fetchLatestPost = (): Promise<LatestPost | null> =>
  client.fetch(`
    *[_type == "post"] | order(publishedAt desc) [0] {
      title,
      slug,
      "excerpt": pt::text(body[0])
    }
  `);

export const fetchAllPosts = (): Promise<Post[]> =>
  client.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt,
      "excerpt": pt::text(body[0]),
      "categoryTitles": coalesce(
        category->title,
        categories[]->title
      )
    }
  `);

export const fetchPostBySlug = (slug: string): Promise<PostDetail | null> =>
  client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      _id, title, slug, publishedAt, body, mainImage,
      "author": author->{name, image},
      "category": category->{_id, title},
      "categories": categories[]->{_id, title}
    }`,
    { slug },
  );

export const fetchRelatedPosts = (
  categoryIds: string[],
  postId: string,
): Promise<RelatedPost[]> =>
  client.fetch(
    `*[_type == "post" && references($categoryIds) && _id != $postId] | order(publishedAt desc) [0...3] {
      _id, title, slug
    }`,
    { categoryIds, postId },
  );
