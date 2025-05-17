export const handleDataFromFireStore = (data: any) => {
    const extractedData = [];
    for (const item of data) {
        const itemData = { data: Object, id: String };
        itemData.data = item._fieldsProto;
        itemData.id = item._ref._path.segments[1];
        extractedData.push(itemData);
    }
    return extractedData
}