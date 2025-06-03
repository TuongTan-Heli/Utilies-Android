import { add } from "../api/budgetApi";
import { getToken } from "../utils/EncStorage";

export const processAddBudget = async (Amount: number, CurrencyId: string, To: Date) => {
    const UserId = JSON.parse(await getToken('userInfo') || '').id;
        if (UserId) {
            const response = await add(UserId, Amount, CurrencyId, To);
            return response.data;
        }
}
