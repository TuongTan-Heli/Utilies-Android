import { getToken, removeToken, saveToken } from "../utils/EncStorage";
import { changePassword, login, register, updateAccount } from "../api/authApi"
import { ToastAndroid } from "react-native";

export const processLoginRequest = async (UserName: string, Password: string, sessionToken: string) => {
    ToastAndroid.show(sessionToken ? "Logging in with session..." : "Logging in...", ToastAndroid.SHORT);

    const response = await login(UserName, Password, sessionToken || '');
    if (response.status === 200) {
        const { data } = response;
        await Promise.all([
            saveToken('API_KEY', data.apiKey.ApiKey),
            saveToken('SESSION_TOKEN', data.sessionToken.SessionToken),
            saveToken('userInfo', JSON.stringify(data.data)),
            saveToken('logStatus', 'logged'),
        ]);
    } else {
        await Promise.all([
            removeToken('API_KEY'),
            removeToken('SESSION_TOKEN'),
            removeToken('userInfo'),
        ]);
    }

    return response;
}

export const processRegisterRequest = async (UserName: string, Password: string, Email: string) => {
    const response = await register(UserName, Password, Email);
    return response.status;
}

export const processUpdateAccount = async (UserId: string, UserName: string, Email: string, DefaultCurrencyId: string,
    TaskNotiMessage: string,
    EnableUpdateNoti: boolean,
    UpdateNotiMessage: string) => {
    const response = await updateAccount(UserId, UserName, Email, DefaultCurrencyId,
        TaskNotiMessage,
        EnableUpdateNoti,
        UpdateNotiMessage);

    return response.status;
}

export const handleChangePassword = async (CurrentPassword: string, NewPassword: string) => {
    const UserId = JSON.parse(await getToken('userInfo') || '').id;
    if (UserId) {
        const response = await changePassword(UserId, CurrentPassword, NewPassword);
        return response.status;
    }
}

export const logout = () => {
    removeToken('API_KEY');
    removeToken('SESSION_TOKEN');
    removeToken('userInfo');
    removeToken('logStatus');
}