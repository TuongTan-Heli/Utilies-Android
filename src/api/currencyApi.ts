import api from '../config/axiosInstance';

export const getAllCurrency = async () => {    
    return await api.get('/get-all-currency');
};