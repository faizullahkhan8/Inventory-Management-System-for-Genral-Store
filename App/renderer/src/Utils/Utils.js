export function calculateProfitMargin(costPrice, sellingPrice) {
    const profit = sellingPrice - costPrice;
    return ((profit / sellingPrice) * 100).toFixed(2);
}
