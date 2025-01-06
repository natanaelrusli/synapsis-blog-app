import axios from 'axios';
import { ApiResponse } from '@/types/api';
import { Post, PostComment, PostData, User } from '@/types/post';
import { message } from 'antd';

export const api = axios.create({
  baseURL: 'https://gorest.co.in/public/v1',
});

export const apiv2 = axios.create({
  baseURL: 'https://gorest.co.in/public/v2',
});

export const setApiToken = (token: string) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
};

export const fetchPosts = async (page: number, perPage: number, token?: string): Promise<ApiResponse<Post[]>> => {
  if (token) {
    setApiToken(token);
  }

  const response = await api.get(`/posts?page=${page}&per_page=${perPage}`);

  return response.data;
};

export const fetchPostDetail = async (postId: string, token?: string): Promise<ApiResponse<Post>> => {
  if (token) {
    setApiToken(token);
  }

  const response = await api.get(`/posts/${postId}`, token ? setApiToken(token || '') : {});

  return response.data;
}

export const fetchPostComments = async (postId: string): Promise<ApiResponse<PostComment[]>> => {
  const response = await api.get(`/posts/${postId}/comments`);
  return response.data;
}

export const fetchUserDetail = async (userId: string, token?: string): Promise<ApiResponse<User>> => {
  if (token) {
    setApiToken(token);
  }

  const response = await api.get(`/users/${userId}`);
  
  return response.data;
}

export const fetchUsers = async (): Promise<ApiResponse<User[]>> => {
  const response = await api.get(`/users`);
  return response.data;
}

export const createPost = async (postData: PostData, token?: string): Promise<ApiResponse<Post>> => {
  if (token) {
    setApiToken(token);
  }

  const response = await api.post('/posts', postData);
  return response.data;
};

export const updatePostDetail = async (postData: PostData, token?: string) => {
  if (token) {
    setApiToken(token);
  }

  const response = await api.put(`/posts/${postData.id}`, {
    ...postData
  });
  return response.data;
}

export const fetchUsersPosts = async (userId: string, token?: string): Promise<ApiResponse<Post[]>> => {
  if (token) {
    setApiToken(token);
  }

  const response = await api.get(`/users/${userId}/posts`);

  return {
    status: response.status,
    ...response.data
  };
}

export const deletePost = async (postId: string, token: string): Promise<void> => {
  if (!token) {
    message.error('failed to delete post');
    return;
  }

  setApiToken(token);
  const response = await api.delete(`/posts/${postId}`);
  return response.data;
}
