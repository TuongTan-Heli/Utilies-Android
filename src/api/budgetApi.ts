import api from '../config/axiosInstance';

export const add = async (UserId: string, Amount: number,  CurrencyId: string, To: Date) => {    
    return await api.post('/add-budget', {UserId, Amount, CurrencyId, To});
};

export const getLatest = async (UserId: string) => {
    return await api.get('/get-latest-budget/' + UserId);
};

export const getAll = async (UserId: string) => {
    return await api.get('/get-all-budget/' + UserId);
};

export const update = async (Id: string, Amount: number, CurrencyId: string, Date: Date) => {
    return await api.put('/update-budget/' + Id, { Amount, CurrencyId, To: Date });
};

export const deleteBudget = async (Id: string) => {
    return await api.delete('/delete-budget/' + Id);
};