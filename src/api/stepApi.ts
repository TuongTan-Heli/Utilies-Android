import api from '../config/axiosInstance';

export const deleteStep = async (stepId: string) => {
    return await api.post('/delete-step/' + stepId);
}