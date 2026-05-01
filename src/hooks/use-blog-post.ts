import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPostBySlug, fetchRelatedPosts } from "@/services/sanity/posts";

export const useBlogPost = (slug: string | undefined) => {
  const postQuery = useQuery({
    queryKey: ["post", slug],
    queryFn: () => fetchPostBySlug(slug!),
    enabled: !!slug,
    staleTime: 1000 * 60 * 5,
  });

  const categoryIds = useMemo(() => {
    const post = postQuery.data;
    if (!post) return [];
    const refs: string[] = [];
    if (post.category?._id) refs.push(post.category._id);
    if (post.categories?.length)
      post.categories.forEach((c) => {
        if (c._id) refs.push(c._id);
      });
    return [...new Set(refs)];
  }, [postQuery.data]);

  const relatedQuery = useQuery({
    queryKey: ["related-posts", categoryIds, postQuery.data?._id],
    queryFn: () => fetchRelatedPosts(categoryIds, postQuery.data!._id),
    enabled: categoryIds.length > 0 && !!postQuery.data?._id,
    select: (data) => data.filter((p) => p?.title && p?.slug),
    staleTime: 1000 * 60 * 5,
  });

  return {
    post: postQuery.data ?? null,
    isLoading: postQuery.isLoading,
    relatedPosts: relatedQuery.data ?? [],
  };
};
