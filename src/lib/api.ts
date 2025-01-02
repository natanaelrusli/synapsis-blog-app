import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://gorest.co.in/public/v2',
});

export const setApiToken = (token: string) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};
