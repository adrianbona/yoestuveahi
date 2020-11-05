import axios from 'axios';

export const instance = axios.create({
  baseURL: process.env.REACT_APP_URL_BACKEND,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  }
});

export const google = axios.create({
  baseURL: `${process.env.REACT_APP_CORS_PROXY}${process.env.REACT_APP_URL_GOOGLE}`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});
