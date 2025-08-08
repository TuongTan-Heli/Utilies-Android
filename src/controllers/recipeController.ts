import { addRecipe, searchRecipe } from "../api/recipeApi";
import { Step } from "../models/Step";
import { getToken } from "../utils/EncStorage";

export const search = async (key: string) => {
    return await searchRecipe(key);
}

export const processAddRecipe = async (Name: string, Description: string, Ingredients: string[], Steps: Step[], Image: null) => {
    const UserId = JSON.parse(await getToken('userInfo') || '').id;
    if (UserId) {
        const response = await addRecipe(Name, Description, Ingredients, Steps, Image, UserId);
        return response;
    }
    return 404;
}