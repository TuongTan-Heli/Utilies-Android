import { quickAdd } from "../api/widgetApi";

export const HandleQuickAdd = async (Name: string, Type: string, Price: number, expenseType: string, session: string) => {
    const response = await quickAdd(Name, Type, Price, expenseType, session);
    return response.status;
}
