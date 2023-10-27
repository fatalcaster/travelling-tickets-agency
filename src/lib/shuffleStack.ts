export function moveFrontToBack<T>(arr: Array<T>) {
  const newArr: Array<T> = [];
  for (let i = 1; i < arr.length; i++) {
    newArr.push(arr[i]);
  }
  newArr.push(arr[0]);
  return newArr;
}
