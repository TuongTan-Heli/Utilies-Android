import axios from 'axios';
// import EncryptedStorage from 'react-native-encrypted-storage';
import { API_URL } from '@env';
import { saveToken, getToken } from '../utils/EncStorage';


const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

api.interceptors.request.use(
  async config => {
    const token = await getToken('API_KEY');
    if (token) {
      config.headers['x-api-key'] = token;
    }
    return config;
  },
  // error => Promise.reject(error)
);

api.interceptors.response.use(
  response => response,
  error => {
    switch (error.response?.status) {
      case 401:
        console.log('Unauthorized, maybe redirect to login.');
        break;
      default:
        console.log('Somthing went wrong' + error.response?.status);
        return error.response?.status
    }
  }
);

export default api;
