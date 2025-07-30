import axios from 'axios';
import { API_URL } from '@env';
import { saveToken, getToken } from '../utils/EncStorage';
import { ToastAndroid } from 'react-native';


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
);

api.interceptors.response.use(
  response =>  {
  return response;
  },
  error => {
    switch (error.response?.status) {
      case 401:
        ToastAndroid.show(error.response.data, ToastAndroid.SHORT);
        break;
      case 404:
        ToastAndroid.show(error.response.data, ToastAndroid.SHORT);
        break;
      default:
        ToastAndroid.show('Something went wrong'
          + 'with' + error.response.request.responseURL
          , ToastAndroid.SHORT);
        return error.response?.status
    }
  }
);

export default api;
