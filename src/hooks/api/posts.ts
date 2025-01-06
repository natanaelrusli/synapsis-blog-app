import { createPost, deletePost, fetchPosts } from "@/lib/api";
import { getUserData } from "@/lib/storage";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { message } from "antd";
import { useRouter } from "next/router";

export const usePosts = (page: number, perPage: number, token?: string) => {
  return useQuery({
    queryKey: ['posts', page, perPage, token],
    queryFn: () => fetchPosts(page, perPage, token),
    placeholderData: keepPreviousData,
    enabled: !!token,
  });
};

export const useCreatePost = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: ({ title, body }: { title: string; body: string }) =>
      createPost(
        {
          title,
          user_id: parseInt(getUserData()?.userId || '', 10),
          body,
          user: getUserData()?.name || '',
        },
        getUserData()?.token || ''
      ),
    onSuccess: () => {
      message.success('Post created');
      router.push('/');
    },
    onError: () => {
      message.error('Failed creating post');
    },
  });
};

export const useDeletePost = (onDelete: () => void) => {
  return useMutation({
      mutationFn: ({ postId }: {postId: number}) => 
        deletePost(
          postId,
          getUserData()?.token || ''
        ),
      onSuccess: () => {
        message.success('Post deleted');
        onDelete();
      },
      onError: () => {
        message.error('Post deletion failed');
      },
    }
  );
}
