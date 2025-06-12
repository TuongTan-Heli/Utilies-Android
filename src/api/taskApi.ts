import api from '../config/axiosInstance';

export const add = async (UserId: string, Name: string, Description: string, Type: string, Deadline: Date, EnableNoti: boolean, Priority: number, NotiOnDeadline: number, Price: number, CurrencyId: string) => {    
    return await api.post('/add-task', { UserId, Name, Description, Type, Deadline, EnableNoti, Priority, NotiOnDeadline , Price, CurrencyId});
};

export const update = async (TaskId: string, Name: string, Description: string, Type: string, Deadline: Date, Done: any, EnableNoti: boolean, Priority: number, NotiOnDeadline: number, Price: number, CurrencyId: string) => {    
    return await api.put('/update-task/' + TaskId, {Name, Description, Type, Deadline, Done, EnableNoti, Priority, NotiOnDeadline , Price, CurrencyId});
};

export const deleteTask = async (TaskId: string) => {    
    return await api.delete('/delete-task/' + TaskId);
};

export const getAllTask = async (UserId: string) => {    
    api.get('/get-all-task/'+ UserId);
    return await api.get('/get-all-task/'+ UserId);
};