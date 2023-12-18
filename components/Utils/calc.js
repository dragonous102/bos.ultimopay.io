export function truncateFloat(number, decimalPlaces) {
    const factor = Math.pow(10, decimalPlaces);
    return parseFloat((Math.trunc(number * factor) / factor).toFixed(decimalPlaces));
}