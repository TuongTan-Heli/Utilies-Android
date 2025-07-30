import { getToken, removeToken, saveToken } from "../utils/EncStorage";
import { login, register } from "../api/authApi"
import { ToastAndroid } from "react-native";

export const processLoginRequest = async (UserName: string, Password: string, sessionToken: string) => {
    ToastAndroid.show("Logging in with token" + sessionToken, ToastAndroid.SHORT);
    const response = await login(UserName, Password, sessionToken || '');
    if (response.status == 200) {
        const data = response.data;
        saveToken('API_KEY', data.apiKey.ApiKey);
        saveToken('SESSION_TOKEN', data.sessionToken.SessionToken);

        saveToken('userInfo', JSON.stringify(data.data));
        saveToken('logStatus', 'logged');
        ToastAndroid.show('Login successfull', ToastAndroid.SHORT);
    }
    else {
        ToastAndroid.show('Login failed ' + response.status, ToastAndroid.SHORT);

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