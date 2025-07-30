import { addRecipe, searchRecipe } from "../api/recipeApi";

export const search = async (key: string) => {
    return await searchRecipe(key);
}

export const processAddRecipe = async (Name: string, Description: string, Ingredients: string[]) => {
    return await addRecipe(Name, Description, Ingredients);
}