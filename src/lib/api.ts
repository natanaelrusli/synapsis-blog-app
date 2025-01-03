import { ApiResponse } from '@/types/api';
import { Post, PostComment, User } from '@/types/post';
import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://gorest.co.in/public/v1',
});

export const apiv2 = axios.create({
  baseURL: 'https://gorest.co.in/public/v2',
});

export const setApiToken = (token: string) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const fetchPosts = async (page: number, perPage: number): Promise<ApiResponse<Post[]>> => {
  const response = await api.get(`/posts?page=${page}&per_page=${perPage}`);
  return response.data;
};

export const fetchPostDetail = async (postId: string): Promise<ApiResponse<Post>> => {
  const response = await api.get(`/posts/${postId}`);
  return response.data;
}

export const fetchPostComments = async (postId: string): Promise<ApiResponse<PostComment[]>> => {
  const response = await api.get(`/posts/${postId}/comments`);
  return response.data;
}

export const fetchUserDetail = async (userId: string): Promise<ApiResponse<User>> => {
  const response = await api.get(`/users/${userId}`);
  return response.data;
}
