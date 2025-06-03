import { add, deleteBudget, getAll, getLatest, update } from "../api/budgetApi";
import { getToken } from "../utils/EncStorage";

export const processAddBudget = async (Amount: number, CurrencyId: string, To: Date) => {
    const UserId = JSON.parse(await getToken('userInfo') || '').id;
    if (UserId) {
        const response = await add(UserId, Amount, CurrencyId, To);
        return response.data;
    }
}

export const processGetAllBudget = async () => {
    const UserId = JSON.parse(await getToken('userInfo') || '').id;
    if (UserId) {
        const response = await getAll(UserId);
        return response.data;
    }
}

export const processGetLatestBudget = async () => {
    const UserId = JSON.parse(await getToken('userInfo') || '').id;
    if (UserId) {
        const response = await getLatest(UserId);
        return response.data;
    }
}

export const processUpdateBudget = async (BudgetId: string, Amount: number, CurrencyId: string, To: Date) => {
    const response = await update(BudgetId, Amount, CurrencyId, To);
    return response.status;

}

export const processDeleteBudget = async (BudgetId: string) => {
    const response = await deleteBudget(BudgetId);
    return response.status;

}