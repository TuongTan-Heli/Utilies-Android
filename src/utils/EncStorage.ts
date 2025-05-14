import EncryptedStorage from 'react-native-encrypted-storage';

// Save session token
export const saveToken = async (name: string, token: string) => {
  await EncryptedStorage.setItem(name, token);
};

// Retrieve session token
export const getToken = async (name: string) => {
  return await EncryptedStorage.getItem(name);
};

// Remove session token
export const removeToken = async (name: string) => {
  await EncryptedStorage.removeItem(name);
};