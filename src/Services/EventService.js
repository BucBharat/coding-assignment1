import axios from 'axios';

const apiClient = axios.create({
  baseURL: `https://mock.follow.it/`,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default {
  getUsers() {
    return apiClient.get('/profiles.json');
  },
};
