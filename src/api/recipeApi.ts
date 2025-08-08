import api from '../config/axiosInstance';
import { Step } from '../models/Step';

export const searchRecipe = async (key: string) => {
    return await api.post('/search-recipe/' + key);
};

export const addRecipe = async (Name: string, Description: string, Ingredients: string[], Steps: Step[], Image: null, UserId: string) => {
    console.log({ Name, Description, Ingredients, Steps, Image, UserId });
    // return await api.post('/add-recipe', { Name, Description, Ingredients, Steps, Image, UserId });
}