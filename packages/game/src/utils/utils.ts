export const isEmpty = (value: any) =>
  (Array.isArray(value) && !value.length) || (typeof value === 'object' && !Object.keys(value).length);

export const shuffle = (array: Array<any>) => {
  const shuffled = array;
  shuffled.forEach((element: any, index: number) => {
    const rand = Math.floor(Math.random() * shuffled.length);
    shuffled[index] = shuffled[rand];
    shuffled[rand] = element;
  });
  return shuffled;
};
