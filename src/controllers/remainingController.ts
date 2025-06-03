import { add, deleteRemaining, getAll, getLatest, update } from "../api/remainingApi";
import { getToken } from "../utils/EncStorage";

export const processAddRemaining = async (Amount: number, CurrencyId: string) => {
    const UserId = JSON.parse(await getToken('userInfo') || '').id;
    if (UserId) {
        const response = await add(UserId, Amount, CurrencyId);
        return response.data;
    }
}

export const processGetAllRemaining = async () => {
    const UserId = JSON.parse(await getToken('userInfo') || '').id;
    if (UserId) {
        const response = await getAll(UserId);
        return response.data;
    }
}

export const processGetLatestRemaining = async () => {
    const UserId = JSON.parse(await getToken('userInfo') || '').id;
    if (UserId) {
        const response = await getLatest(UserId);
        return response.data;
    }
}

export const processUpdateRemaining = async (RemainingId: string, Amount: number, CurrencyId: string, Date: Date) => {
    const response = await update(RemainingId, Amount, CurrencyId, Date);
    return response.status;
}

export const processDeleteRemaining = async (RemainingId: string) => {
    const response = await deleteRemaining(RemainingId);
    return response.status;
}