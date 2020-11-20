import localStorage from './localStorage';

export const USER_TOKEN_KEY = 'user-auth-token';

export const getUserToken = () => {
  return localStorage.getItem(USER_TOKEN_KEY);
};

export const removeUserToken = () => {
  return localStorage.removeItem(USER_TOKEN_KEY);
};

export const userTokenExists = () => {
  return getUserToken() !== null;
};

export const setUserToken = accessToken => {
  return localStorage.setItem(USER_TOKEN_KEY, accessToken);
};
