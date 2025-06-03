import api from '../config/axiosInstance';

export const add = async (UserId: string, Amount: number,  CurrencyId: string, To: Date) => {    
    return await api.post('/add-budget', {UserId, Amount, CurrencyId, To});
};