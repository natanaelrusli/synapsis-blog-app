import axios from 'axios';
import { ApiResponse } from '@/types/api';
import { Post, PostComment, PostData, User } from '@/types/post';

export const api = axios.create({
  baseURL: 'https://gorest.co.in/public/v1',
});

export const setApiToken = (token: string) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const handleApiCall = async <T>(callback: () => Promise<T>, token?: string): Promise<T> => {
  if (token) setApiToken(token);
  return callback();
};

export const fetchPosts = async (page: number, perPage: number, token?: string): Promise<ApiResponse<Post[]>> => {
  return handleApiCall(() => api.get(`/posts?page=${page}&per_page=${perPage}`).then(res => res.data), token);
};

export const fetchPostDetail = async (postId: string, token?: string): Promise<ApiResponse<Post>> => {
  return handleApiCall(() => api.get(`/posts/${postId}`).then(res => res.data), token);
};

export const fetchPostComments = async (postId: string): Promise<ApiResponse<PostComment[]>> => {
  return api.get(`/posts/${postId}/comments`).then(res => res.data);
};

export const fetchUserDetail = async (userId: string, token?: string): Promise<ApiResponse<User>> => {
  return handleApiCall(() => api.get(`/users/${userId}`).then(res => res.data), token);
};

export const fetchUsers = async (): Promise<ApiResponse<User[]>> => {
  return api.get(`/users`).then(res => res.data);
};

export const createPost = async (postData: PostData, token?: string): Promise<ApiResponse<Post>> => {
  return handleApiCall(() => api.post('/posts', postData).then(res => res.data), token);
};

export const updatePostDetail = async (postData: PostData, token?: string) => {
  return handleApiCall(() => api.put(`/posts/${postData.id}`, { ...postData }).then(res => res.data), token);
};

export const fetchUsersPosts = async (userId: string, token?: string): Promise<ApiResponse<Post[]>> => {
  return handleApiCall(() => api.get(`/users/${userId}/posts`).then(res => ({
    status: res.status,
    ...res.data
  })), token);
};

export const deletePost = async (postId: number, token: string): Promise<void> => {
  return handleApiCall(() => api.delete(`/posts/${postId}`).then(res => res.data), token);
};
