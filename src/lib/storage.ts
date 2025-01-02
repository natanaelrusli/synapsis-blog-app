export const setUserData = (name: string, token: string) => {
  localStorage.setItem('user_name', name);
  localStorage.setItem('api_token', token);
};

export const getUserData = () => {
  if (typeof window === 'undefined') return null;

  const name = localStorage.getItem('user_name');
  const token = localStorage.getItem('api_token');

  if (!name || !token) return null;

  return { name, token };
};
