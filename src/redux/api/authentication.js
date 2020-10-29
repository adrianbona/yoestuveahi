import axios from './axios';

export function login({ email, password }) {
  // TODO: REMOVE AFTER API IMPLEMENTATION
  if (email === 'test@test.com') {
    return Promise.resolve({
      id: '203e4cf0-040e-4825-8138-e723df7e535b',
      email
    });
  }

  return axios.post('/auth/login', {
    body: {
      email,
      password
    }
  });
}

export default {
  login
};
