import api from '../config/axiosInstance';

export const add = async (UserId: string, Amount: number, CurrencyId: string) => {
    return await api.post('/add-remaining', { UserId, Amount, CurrencyId });
};

export const getLatest = async (UserId: string) => {
    return await api.get('/get-latest-remaining/' + UserId);
};

export const getAll = async (UserId: string) => {
    return await api.get('/get-all-remaining/' + UserId);
};

export const update = async (Id: string, Amount: number, CurrencyId: string, Date: Date) => {
    return await api.put('/update-remaining/' + Id, { Amount, CurrencyId, Day: Date });
};

export const deleteRemaining = async (Id: string) => {
    return await api.delete('/delete-remaining/' + Id);
};