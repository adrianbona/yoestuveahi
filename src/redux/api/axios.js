import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const google = axios.create({
  baseURL: `${process.env.REACT_APP_CORS_PROXY}https://maps.googleapis.com`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});
