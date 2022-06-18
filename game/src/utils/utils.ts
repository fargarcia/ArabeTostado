export const isEmpty = (value: Object | Array<any>) =>
    Array.isArray(value) && !value.length ||
    typeof value === 'object' && !Object.keys(value).length
