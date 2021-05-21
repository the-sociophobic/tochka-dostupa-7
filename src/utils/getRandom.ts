const getRandomElements = (array: any[], amount: number) =>
  array
    .sort(() => Math.random() - .5)
    .slice(0, amount)

const getRandomValues = (object: object & { [key: string]: any }, amount: number) =>
  getRandomElements(Object.keys(object), amount)
    .map(key => object[key])


export {
  getRandomElements,
  getRandomValues
}