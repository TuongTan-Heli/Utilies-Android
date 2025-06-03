import api from '../config/axiosInstance';

export const add = async (UserId: string, Amount: number, CurrencyId: string, Type: string, Note: string, Special: boolean, Day: Date) => {
    return await api.post('/add-spending', { UserId, Amount, CurrencyId, Type, Note, Special, Day });
};

export const getSpendingInPeriod = async (UserId: string, From: Date, To: Date) => {
    return await api.post('/get-spending-between/' + UserId, { From, To });
};
export const update = async (id: string, Amount: number, CurrencyId: string, Type: string, Note: string, Special: boolean, Day: Date) => {
    return await api.put('/update-spending/' + id, { Amount, CurrencyId, Type, Note, Special, Day });
};
export const deleteSpending = async (id: String) => {
    return await api.delete('/delete-spending/' + id);
};