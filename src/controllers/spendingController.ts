import { add, deleteSpending, getSpendingInPeriod, update } from "../api/spendingApi";
import { getToken } from "../utils/EncStorage";

export const processAddSpending = async (Amount: number, CurrencyId: string, Type: string, Note: string, Special: boolean, Date: Date) => {
    const UserId = JSON.parse(await getToken('userInfo') || '').id;
    if (UserId) {
        const response = await add(UserId, Amount, CurrencyId, Type, Note, Special, Date);
        return response.data;
    }
}
export const processUpdateSpending = async (SpendingId: string, Amount: number, CurrencyId: string, Type: string, Note: string, Special: boolean, Date: Date) => {
    return await update(SpendingId, Amount, CurrencyId, Type, Note, Special, Date);
}
export const processDeleteSpending = async (SpendingId: string) => {
    return await deleteSpending(SpendingId);
}

export const getSpendingInMonth = async () => {
    const UserId = JSON.parse(await getToken('userInfo') || '').id;
    if (UserId) {
        const today = new Date();
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        const response = await getSpendingInPeriod(UserId, firstDayOfMonth, lastDayOfMonth);
        return response.data;
    }
}

export const getSpendingInWeek = async () => {
    const UserId = JSON.parse(await getToken('userInfo') || '').id;
    if (UserId) {
        const currentDate = new Date();
        const dayOfWeek = currentDate.getDay(); // 0 (Sun) to 6 (Sat)

        // Start of the week (Sunday)
        const firstDayOfWeek = new Date(currentDate);
        firstDayOfWeek.setDate(currentDate.getDate() - dayOfWeek);

        // End of the week (Saturday)
        const lastDayOfWeek = new Date(currentDate);
        lastDayOfWeek.setDate(currentDate.getDate() + (6 - dayOfWeek));
        const response = await getSpendingInPeriod(UserId, firstDayOfWeek, lastDayOfWeek);
        return response.data;
    }
}

export const processSearchSpending = async (FromDate: Date, ToDate: Date) => {
    const UserId = JSON.parse(await getToken('userInfo') || '').id;
    if (UserId) {
        const response = await getSpendingInPeriod(UserId, FromDate, ToDate);
        return response.data;
    }
}

