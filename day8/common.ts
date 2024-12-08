export function pairs<T>(items: T[]): T[][]  {
  const pairs = []
  items.forEach((item, i) => {
    items.forEach((item2, i2) => {
      if (i != i2) {
        pairs.push([item, item2])
      }
    })
  })
  return pairs
}