import { add } from "../api/remainingApi";
import { getToken } from "../utils/EncStorage";

export const processAddRemaining = async (Amount: number, CurrencyId: string) => {
    const UserId = JSON.parse(await getToken('userInfo') || '').id;
    if (UserId) {
        const response = await add(UserId, Amount, CurrencyId);
        return response.data;
    }
}
