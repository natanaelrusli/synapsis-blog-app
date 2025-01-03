import { Post, PostComment, User } from '@/types/post';
import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://gorest.co.in/public/v2',
});

export const setApiToken = (token: string) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const fetchPosts = async (): Promise<Post[]> => {
  const response = await api.get('/posts');
  return response.data;
};

export const fetchPostDetail = async (postId: string): Promise<Post> => {
  const response = await api.get(`/posts/${postId}`);
  return response.data;
}

export const fetchPostComments = async (postId: string): Promise<PostComment[]> => {
  const response = await api.get(`/posts/${postId}/comments`);
  return response.data;
}

export const fetchUserDetail = async (userId: string): Promise<User> => {
  const response = await api.get(`/users/${userId}`);
  return response.data;
}
