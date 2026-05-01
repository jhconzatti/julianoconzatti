import { useQuery } from "@tanstack/react-query";
import { fetchAllPosts } from "@/services/sanity/posts";

export const usePosts = () =>
  useQuery({
    queryKey: ["posts"],
    queryFn: fetchAllPosts,
    staleTime: 1000 * 60 * 5,
  });
