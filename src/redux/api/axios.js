import axios from 'axios';

const instance = axios.create({
  baseURL: 'localhost',
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

export default instance;
