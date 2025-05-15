import { removeToken, saveToken } from "../utils/EncStorage";
import { login, register } from "./authApi"

export const processLoginRequest = async (UserName: string, Password: string, sessionToken: string) => {
    const response = await login(UserName, Password, sessionToken || '');
    if (response.status == 200) {
        const data = response.data;
        saveToken('API_KEY', data.apiKey.ApiKey);
        saveToken('SESSION_TOKEN', data.sessionToken.SessionToken);
        data.data.UserId = data.apiKey.User._path.segments[1];
        saveToken('userInfo', JSON.stringify(data.data));
        saveToken('logStatus', 'logged');
    }
    else {
        removeToken('API_KEY');
        removeToken('SESSION_TOKEN');
        removeToken('userInfo');
    }
    return response.status;
}

export const processRegisterRequest = async (UserName: string, Password: string, Email: string) => {
    const response = await register(UserName, Password, Email);
    return response.status;
}

export const logout = () => {
    removeToken('API_KEY');
    removeToken('SESSION_TOKEN');
    removeToken('userInfo');
    removeToken('logStatus');
}