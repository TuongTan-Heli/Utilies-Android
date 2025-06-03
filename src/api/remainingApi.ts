import api from '../config/axiosInstance';

export const add = async (UserId: string, Amount: number, CurrencyId: string) => {
    return await api.post('/add-remaining', { UserId, Amount, CurrencyId });
};