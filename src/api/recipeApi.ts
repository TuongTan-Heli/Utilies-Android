import api from '../config/axiosInstance';
import { Step } from '../models/Step';

export const searchRecipe = async (key: string, userId: string) => {
    return await api.post('/search-recipe', {key, userId});
};

export const addRecipe = async (Name: string, Description: string, Ingredients: string[], Steps: Step[], Image: null, UserId: string) => {
    return await api.post('/add-recipe', { Name, Description, Ingredients, Steps, Image, UserId });
}

export const updateRecipe = async (RecipeId: string, Name: string, Description: string, Ingredients: string[], Steps: Step[], Image: null) => {
    return await api.put('/update-recipe/' + RecipeId, { Name, Description, Ingredients, Steps, Image });
}

export const deleteRecipe = async (RecipeId: string) => {
    return await api.delete('/delete-recipe/' + RecipeId);
}

export const getAllRecipe = async (UserId: string) => {    
    return await api.get('/get-all-recipe/'+ UserId);
};

export const getRecipe = async (RecipeId: string) => {
    return await api.post('/get-recipe/' + RecipeId);
};
