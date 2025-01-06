import { fetchPosts } from "@/lib/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const usePosts = (page: number, perPage: number, token?: string) => {
  return useQuery({
    queryKey: ['posts', page, perPage, token],
    queryFn: () => fetchPosts(page, perPage, token),
    placeholderData: keepPreviousData,
    enabled: !!token,
  });
};
