import { getToken } from "./EncStorage";

export const handleDataFromFireStore = (data: any) => {
    const extractedData: itemFromFireStore[] = [];
    for (const item of data) {
        const itemData = { data: Object, id: String };
        itemData.data = item._fieldsProto;
        itemData.id = item._ref._path.segments[1];
        extractedData.push(itemData);
    }
    return extractedData
}

interface itemFromFireStore {
    id: any;
    data: any;
}

export function groupBy<T>(array: T[], key: keyof T, knownTypes: string[]): Record<string, T[]> {
  return array.reduce((result, currentItem) => {
    const rawKey = currentItem[key] as unknown as string;
    const groupKey = knownTypes.includes(rawKey) ? rawKey : "Others";

    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(currentItem);
    return result;
  }, {} as Record<string, T[]>);
}

export async function getUserDefaultCurrency() {
  return JSON.parse(await getToken('userInfo') || '').DefaultCurrency;
}