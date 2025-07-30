import api from '../config/axiosInstance';

export const searchRecipe = async (key: string) => {
    return await api.post('/search-recipe/' + key);
};

export const addRecipe = async (Name: string, Description: string, Ingredients: string[]) => {
    return await api.post('/add-recipe', { Name, Description, Ingredients });
}