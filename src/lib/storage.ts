import {
  COOKIE_TOKEN_KEY,
  COOKIE_USER_ID_KEY,
  COOKIE_USER_NAME_KEY,
} from "@/constants/auth";

export const getCookie = (cname: string) => {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export const setUserData = (name: string, userId: string, token: string) => {
  document.cookie = `user_name=${name}; path=/;`;
  document.cookie = `user_id=${userId}; path=/;`;
  document.cookie = `api_token=${token}; path=/;`;
};


export const getUserData = () => {
  if (typeof window === 'undefined') return null;

  const name = getCookie(COOKIE_USER_NAME_KEY) || '';
  const token = getCookie(COOKIE_TOKEN_KEY) || '';
  const userId = getCookie(COOKIE_USER_ID_KEY) || '';

  if (!name || !token) return null;

  return { name, token, userId };
};

export const removeUserData = () => {
  document.cookie = 'user_name=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
  document.cookie = 'user_id=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
  document.cookie = 'api_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
};

