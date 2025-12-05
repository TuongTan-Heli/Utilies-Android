import { NativeModules } from 'react-native';

const { SecureStorage } = NativeModules;
// Save session token
export const saveToken = async (name: string, token: string) => {
  await SecureStorage.setItem(name, token);
};

// Retrieve session token
export const getToken = async (name: string) => {
  return await SecureStorage.getItem(name);
};

// Remove session token
export const removeToken = async (name: string) => {
  await SecureStorage.removeItem(name);
};