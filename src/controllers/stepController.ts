import { deleteStep} from "../api/stepApi";


export const processDeleteStep = async (RecipeId: string) => {
    const response = await deleteStep(RecipeId);
    return response.status;
}

