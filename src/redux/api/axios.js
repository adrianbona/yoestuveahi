import axios from 'axios';
import { getUserToken } from '../../components/authentication/session';

const token = getUserToken();

export const instance = axios.create({
  baseURL: process.env.REACT_APP_URL_BACKEND,
  headers: {
    'Content-Type': 'application/json',
    Authorization: token ? `token ${token}` : ''
  }
});

export const google = axios.create({
  baseURL: `${process.env.REACT_APP_CORS_PROXY}${process.env.REACT_APP_URL_GOOGLE}`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});
