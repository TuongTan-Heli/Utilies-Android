import { quickAdd } from "../api/widgetApi";

export const HandleQuickAdd = async (Name: string, Type: string, Price: number, expenseType: string, session: string, SelectedDate: Date, Note: string) => {
    const response = await quickAdd(Name, Type, Price, expenseType, session, SelectedDate, Note);
    return response.status;
}
