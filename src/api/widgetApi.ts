import api from '../config/axiosInstance';

export const quickAdd = async (Name: string, Type: string, Price: number, ExpenseType: string, session: string) => { 
       
    return await api.post('/quick-add', { Name, Type, Price, ExpenseType, session });
};