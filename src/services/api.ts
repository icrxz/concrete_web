import axios from 'axios';

const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});

api.interceptors.response.use((response) => response, (error) => {
  const auth = localStorage.getItem('Authenticated');
  if (error.response.status === 401 && auth === 'true') {
    localStorage.setItem('Authenticated', 'false');
    window.location.href = '/';
  }

  return Promise.reject(error);
});

export default api;
