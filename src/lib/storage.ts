export const setUserData = (name: string, userId: string, token: string) => {
  localStorage.setItem('user_name', name);
  localStorage.setItem('api_token', token);
  localStorage.setItem('user_id', userId);

  document.cookie = `user_name=${name}; path=/;`;
  document.cookie = `user_id=${userId}; path=/;`;
  document.cookie = `api_token=${token}; path=/;`;
};


export const getUserData = () => {
  if (typeof window === 'undefined') return null;

  const name = localStorage.getItem('user_name');
  const token = localStorage.getItem('api_token');

  if (!name || !token) return null;

  return { name, token };
};

export const removeUserData = () => {
  localStorage.removeItem('user_name');
  localStorage.removeItem('api_token');
  localStorage.removeItem('user_id');

  document.cookie = 'user_name=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
  document.cookie = 'user_id=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
  document.cookie = 'api_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
};

