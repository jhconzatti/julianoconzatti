import { useQuery } from "@tanstack/react-query";
import { fetchLatestPost } from "@/services/sanity/posts";

export const useLatestPost = () =>
  useQuery({
    queryKey: ["latest-post"],
    queryFn: fetchLatestPost,
    staleTime: 1000 * 60 * 5,
  });
