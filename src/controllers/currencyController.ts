import { getAllCurrency } from "../api/currencyApi";

export const getAll = async () => {
    const response = await getAllCurrency();
    return response.data;
}
