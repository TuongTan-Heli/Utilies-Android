export interface Step {
  Action: string;
  Ingredients: string[];
  Note: string;
  RecipeId: string
}

export const defaultStep: Step = {
  Action: "",
  Ingredients: [],
  Note: "",
  RecipeId: ""
};
