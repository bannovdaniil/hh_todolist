type IsArrayLength = (array: Array<any>) => boolean;

function getIsArrayLength(length: number): IsArrayLength {
  return (array) => array.length === length;
}

const isEmptyArray: IsArrayLength = getIsArrayLength(0);
const hasOneItem: IsArrayLength = getIsArrayLength(1);
const isPenultimateIndex = (index: number, array: Array<any>): boolean => index === array.length - 1;

export default getIsArrayLength;
export { isEmptyArray, hasOneItem, isPenultimateIndex };
export type { IsArrayLength };
