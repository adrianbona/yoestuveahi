import axios from 'axios';

const instance = axios.create({
  baseURL: 'localhost:8000',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const instance_test = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

export const google_instance = axios.create({
  baseURL: `${process.env.REACT_APP_CORS_PROXY}https://maps.googleapis.com`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

export default instance;
