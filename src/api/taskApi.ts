import api from '../config/axiosInstance';

export const add = async (UserId: string, Name: string, Description: string, Type: string, Deadline: Date, EnableNoti: boolean, Priority: number, NotiOnDeadline: number, Price: number, CurrencyId: string) => {    
    return await api.post('/add-task', { UserId, Name, Description, Type, Deadline, EnableNoti, Priority, NotiOnDeadline , Price, CurrencyId});
};

export const getAllTask = async (UserId: string) => {    
    return await api.get('/get-all-task/'+ UserId);
};