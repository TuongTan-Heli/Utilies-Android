import api from '../config/axiosInstance';

export const login = async (UserName: string, Password: string, sessionToken: string) => {
    return await api.post('/login', { UserName, Password, sessionToken });
};

export const register = async (data: any) => {
    return await api.post('/register', data);
};
