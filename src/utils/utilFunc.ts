export const toArr = (str: string | number | (string | number)[]): (string | number)[] => {
    return Array.isArray(str) ? str : [str];
}