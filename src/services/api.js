import axios from 'axios';

const api = axios.create();

api.defaults.headers.post['Content-Type'] = 'application/json';
api.defaults.headers.post.Accept = 'application/json';

api.interceptors.request.use(async (config) => {
  // config.headers.Authorization = `Bearer ${token}`;

  return config;
});

export default api;
