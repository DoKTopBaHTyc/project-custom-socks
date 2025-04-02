import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
let accessToken = '';

function setAccessToken(newToken) {
  accessToken = newToken;
}

axiosInstance.interceptors.request.use((config) => {
  if (!config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error.config;
    if (error.response?.status === 403 && !prevRequest.sent) {
      try {
        const response = await axiosInstance.get('/tokens/refresh');
        accessToken = response.data.accessToken;
        prevRequest.sent = true;
        prevRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosInstance(prevRequest);
      } catch (refreshError) {
        console.error('Ошибка обновления токена:', refreshError);
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);

export { setAccessToken };

export default axiosInstance;
