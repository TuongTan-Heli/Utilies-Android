import { quickAdd } from "../api/widgetApi";

export const HandleQuickAdd = async (Name: string, Type: string, Price: number, expenseType: string, session: string, SelectedDate: Date) => {
    const response = await quickAdd(Name, Type, Price, expenseType, session, SelectedDate);
    return response.status;
}
