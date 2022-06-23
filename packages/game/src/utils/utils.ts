export const isEmpty = (value: any) =>
  (Array.isArray(value) && !value.length) || (typeof value === 'object' && !Object.keys(value).length);
