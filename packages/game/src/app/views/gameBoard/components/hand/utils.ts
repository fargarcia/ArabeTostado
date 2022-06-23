export const getRelativePosition = (index: number, length: number): number =>
  length % 2
    ? index - Math.floor(length / 2)
    : index >= length / 2
    ? index - length / 2 + 1
    : index - length / 2;
