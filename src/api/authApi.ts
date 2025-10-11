import api from '../config/axiosInstance';

export const login = async (UserName: string, Password: string, sessionToken: string) => {
    return await api.post('/login', { UserName, Password, sessionToken });
};

export const register = async (UserName: string, Password: string, Email: string) => {
    return await api.post('/register', { UserName, Password, Email });
};

export const updateAccount = async (UserId: string, UserName: string, Email: string, DefaultCurrencyId: string,
    TaskNotiMessage: string,
    EnableUpdateNoti: boolean,
    UpdateNotiMessage: string) => {
    return await api.put('/update-user/' + UserId, {
        UserName, Email, DefaultCurrencyId,
        TaskNotiMessage,
        EnableUpdateNoti,
        UpdateNotiMessage
    });
}

export const changePassword = async (UserId: string, CurrentPassword: string, NewPassword: string) => {
    return await api.put('/change-password/' + UserId, { OldPassword: CurrentPassword, NewPassword });
}
